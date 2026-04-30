# syntax=docker/dockerfile:1.7
FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim AS build

ENV UV_LINK_MODE=copy \
    UV_PYTHON_DOWNLOADS=never

RUN --mount=type=cache,target=/root/.cache/uv \
    uv venv /opt/venv && \
    VIRTUAL_ENV=/opt/venv uv pip install asyncssh==2.18.0

FROM python:3.12-slim

COPY --from=build /opt/venv /opt/venv

ENV PATH=/opt/venv/bin:$PATH \
    LANG=C.UTF-8 \
    LC_ALL=C.UTF-8 \
    SSH_HOST_KEY_DIR=/data/ssh_keys \
    SSH_PORT=22

COPY main.py /usr/local/bin/cowsinlove.py
COPY server.py /usr/local/bin/server.py
RUN chmod +x /usr/local/bin/cowsinlove.py /usr/local/bin/server.py

EXPOSE 22

CMD ["python3", "/usr/local/bin/server.py"]
