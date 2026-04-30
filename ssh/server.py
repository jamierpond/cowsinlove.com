#!/usr/bin/env python3
"""SSH gateway: anonymous connections drop straight into main.py on a PTY."""
import asyncio
import fcntl
import os
import pty
import struct
import subprocess
import sys
import termios
from pathlib import Path

import asyncssh

SCRIPT = "/usr/local/bin/cowsinlove.py"
HOST_KEY_DIR = Path(os.environ.get("SSH_HOST_KEY_DIR", "/data/ssh_keys"))
HOST_KEY_FILES = [("ed25519", "ssh_host_ed25519_key"), ("rsa", "ssh_host_rsa_key")]
LISTEN_HOST = "0.0.0.0"
LISTEN_PORT = int(os.environ.get("SSH_PORT", "22"))


def _ensure_host_keys():
    HOST_KEY_DIR.mkdir(parents=True, exist_ok=True)
    paths = []
    for kind, name in HOST_KEY_FILES:
        path = HOST_KEY_DIR / name
        if not path.exists():
            subprocess.run(
                ["ssh-keygen", "-q", "-t", kind, "-N", "", "-f", str(path)],
                check=True,
            )
        paths.append(str(path))
    return paths


def _set_winsize(fd, rows, cols):
    try:
        fcntl.ioctl(fd, termios.TIOCSWINSZ, struct.pack("HHHH", rows, cols, 0, 0))
    except OSError:
        pass


class _Server(asyncssh.SSHServer):
    def begin_auth(self, username):
        return False  # no credentials required

    def password_auth_supported(self):
        return False

    def public_key_auth_supported(self):
        return False


async def _handle(process: asyncssh.SSHServerProcess):
    term = process.get_terminal_type()
    if not term:
        process.stderr.write("interactive TTY required (try: ssh -t cowsinlove.com)\r\n")
        process.exit(1)
        return

    cols, rows, _, _ = process.get_terminal_size()
    master_fd, slave_fd = pty.openpty()
    _set_winsize(master_fd, rows or 24, cols or 80)

    env = {
        "TERM": term,
        "LANG": "C.UTF-8",
        "LC_ALL": "C.UTF-8",
        "PATH": "/usr/local/bin:/usr/bin:/bin",
        "HOME": "/tmp",
    }

    def _attach_controlling_tty():
        fcntl.ioctl(0, termios.TIOCSCTTY, 0)

    proc = await asyncio.create_subprocess_exec(
        sys.executable, SCRIPT,
        stdin=slave_fd, stdout=slave_fd, stderr=slave_fd,
        env=env,
        start_new_session=True,
        preexec_fn=_attach_controlling_tty,
    )
    os.close(slave_fd)

    loop = asyncio.get_running_loop()
    done = asyncio.Event()

    def _pty_readable():
        try:
            data = os.read(master_fd, 4096)
        except OSError:
            data = b""
        if not data:
            try:
                loop.remove_reader(master_fd)
            except Exception:
                pass
            done.set()
            return
        try:
            process.stdout.write(data.decode("utf-8", errors="replace"))
        except (BrokenPipeError, ConnectionResetError):
            done.set()

    loop.add_reader(master_fd, _pty_readable)

    async def _ssh_to_pty():
        try:
            while not done.is_set():
                try:
                    data = await process.stdin.read(4096)
                except asyncssh.TerminalSizeChanged as ev:
                    _set_winsize(master_fd, ev.height, ev.width)
                    continue
                except (asyncssh.BreakReceived, asyncssh.SignalReceived):
                    continue
                if not data:
                    break
                if isinstance(data, str):
                    data = data.encode("utf-8", errors="replace")
                try:
                    os.write(master_fd, data)
                except OSError:
                    break
        finally:
            try:
                proc.terminate()
            except ProcessLookupError:
                pass

    forward = asyncio.create_task(_ssh_to_pty())
    rc = await proc.wait()
    forward.cancel()
    try:
        loop.remove_reader(master_fd)
    except Exception:
        pass
    try:
        os.close(master_fd)
    except OSError:
        pass
    process.exit(rc if rc is not None else 0)


async def _run():
    keys = _ensure_host_keys()
    await asyncssh.create_server(
        _Server, LISTEN_HOST, LISTEN_PORT,
        server_host_keys=keys,
        process_factory=_handle,
        keepalive_interval=30,
    )
    print(f"cowsinlove ssh listening on {LISTEN_HOST}:{LISTEN_PORT}", flush=True)
    await asyncio.Future()


if __name__ == "__main__":
    try:
        asyncio.run(_run())
    except KeyboardInterrupt:
        pass
