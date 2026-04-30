#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""
cowsinlove.com - SSH TUI

Two cows in a field, pulsing heart eyes, looping kiss animation,
waving "cowsinlove.com" banner above. Press q to quit.
"""
import curses
import locale
import math
import random
import time

locale.setlocale(locale.LC_ALL, "")

BANNER = [
    "                       _       _                                     ",
    "  ___ _____      _____(_)_ __ | | _____   _____   ___ ___  _ __ ___  ",
    " / __/ _ \\ \\ /\\ / / __| | '_ \\| |/ _ \\ \\ / / _ \\ / __/ _ \\| '_ ` _ \\ ",
    "| (_| (_) \\ V  V /\\__ \\ | | | | | (_) \\ V /  __/| (_| (_) | | | | | |",
    " \\___\\___/ \\_/\\_/ |___/_|_| |_|_|\\___/ \\_/ \\___(_)___\\___/|_| |_| |_|",
]

# 'E' = heart-eye slot (two adjacent Es per cow), replaced at render time.
# Left cow faces right; right cow faces left. They lean toward the centre.
LEFT_COW = [
    r"      ^__^           ",
    r" _____/(EE)          ",
    r"/     /(__)          ",
    r"W----||U             ",
    r" ||  ||              ",
]

RIGHT_COW = [
    r"           ^__^      ",
    r"          (EE)\_____ ",
    r"          (__)\     \\",
    r"             U||----W",
    r"               ||  ||",
]

HEART_FRAMES = ["♥♥", "❤❤", "♥♥", "♡♡"]
KISS_HEARTS = "♥❤♡·"
GRASS_CHARS = ".,'`v\".,\"`'.v,'"
CLOUD = " (   ).  "


def safe_addstr(stdscr, y, x, text, attr=0):
    h, w = stdscr.getmaxyx()
    if y < 0 or y >= h or x >= w:
        return
    if x < 0:
        text = text[-x:]
        x = 0
    if x + len(text) > w:
        text = text[: w - x]
    if not text:
        return
    try:
        stdscr.addstr(y, x, text, attr)
    except curses.error:
        pass


def draw_banner(stdscr, screen_w, t, color):
    amp = 1
    banner_w = max(len(r) for r in BANNER)
    if banner_w + 2 > screen_w:
        # too narrow: drop in plain
        title = "cowsinlove.com"
        x = max(0, (screen_w - len(title)) // 2)
        safe_addstr(stdscr, 1, x, title, color | curses.A_BOLD)
        return
    start_x = (screen_w - banner_w) // 2
    for row_i, line in enumerate(BANNER):
        for col_i, ch in enumerate(line):
            if ch == " ":
                continue
            offset = int(round(math.sin(col_i * 0.22 + t * 3.0) * amp))
            y = 1 + row_i + offset + amp
            x = start_x + col_i
            safe_addstr(stdscr, y, x, ch, color | curses.A_BOLD)


def draw_cow(stdscr, cow, x, y, t, body_color, heart_color):
    frame_i = int(t * 5) % len(HEART_FRAMES)
    hearts = HEART_FRAMES[frame_i]
    pulse_attr = heart_color | (curses.A_BOLD if frame_i % 2 == 0 else 0)
    eye_idx = 0
    for i, line in enumerate(cow):
        for j, c in enumerate(line):
            if c == " ":
                continue
            if c == "E":
                safe_addstr(stdscr, y + i, x + j, hearts[eye_idx % 2], pulse_attr)
                eye_idx += 1
            else:
                safe_addstr(stdscr, y + i, x + j, c, body_color | curses.A_BOLD)


def draw_grass(stdscr, w, h, grass_color):
    for row, y in enumerate((h - 2, h - 1)):
        for x in range(w):
            ch = GRASS_CHARS[(x * 3 + y * 7 + row) % len(GRASS_CHARS)]
            safe_addstr(stdscr, y, x, ch, grass_color)


def draw_clouds(stdscr, w, t, color):
    cloud_y = 7
    if cloud_y < 0:
        return
    period = w + len(CLOUD) + 20
    for offset in (0, period // 2):
        x = int((t * 4 + offset)) % period - len(CLOUD)
        safe_addstr(stdscr, cloud_y, x, CLOUD, color | curses.A_DIM)


def draw_sun(stdscr, w, t, color):
    cx = w - 8
    if cx < 10:
        return
    cy = 7
    rays = ["\\ | /", " \\|/ ", "--O--", " /|\\ ", "/ | \\"]
    pulse = int(t * 3) % 2
    attr = color | (curses.A_BOLD if pulse else 0)
    for i, line in enumerate(rays):
        safe_addstr(stdscr, cy - 2 + i, cx - 2, line, attr)


def main(stdscr):
    curses.curs_set(0)
    curses.start_color()
    try:
        curses.use_default_colors()
        bg = -1
    except curses.error:
        bg = curses.COLOR_BLACK
    curses.init_pair(1, curses.COLOR_RED, bg)
    curses.init_pair(2, curses.COLOR_WHITE, bg)
    curses.init_pair(3, curses.COLOR_GREEN, bg)
    curses.init_pair(4, curses.COLOR_MAGENTA, bg)
    curses.init_pair(5, curses.COLOR_YELLOW, bg)
    curses.init_pair(6, curses.COLOR_CYAN, bg)

    HEART = curses.color_pair(1)
    COW = curses.color_pair(2)
    GRASS = curses.color_pair(3)
    BANNER_C = curses.color_pair(4)
    SUN = curses.color_pair(5)
    SKY = curses.color_pair(6)

    stdscr.nodelay(True)
    stdscr.timeout(40)

    t0 = time.time()
    hearts = []  # [x_float, y_float, age, drift]

    while True:
        ch = stdscr.getch()
        if ch in (ord("q"), ord("Q"), 27, 3):
            break

        stdscr.erase()
        h, w = stdscr.getmaxyx()
        t = time.time() - t0

        if h < 18 or w < 50:
            msg = "terminal too small (need >=50x18)"
            safe_addstr(stdscr, h // 2, max(0, (w - len(msg)) // 2), msg, COW)
            stdscr.refresh()
            continue

        draw_sun(stdscr, w, t, SUN)
        draw_clouds(stdscr, w, t, SKY)
        draw_banner(stdscr, w, t, BANNER_C)

        # Kiss cycle: cows lean in, kiss, lean back.
        cycle = (math.sin(t * 1.1) + 1) / 2  # 0..1
        max_gap = 10
        min_gap = 0
        cow_gap = int(round(max_gap - (max_gap - min_gap) * cycle))
        kissing = cycle > 0.88

        bob_l = 1 if int(t * 5) % 2 == 0 else 0
        bob_r = 1 if int(t * 5 + 1) % 2 == 0 else 0

        cow_h = len(LEFT_COW)
        # Face columns within each cow (where the inner edge of the face sits).
        left_face_col = 10   # rightmost column of left cow's face
        right_face_col = 10  # leftmost column of right cow's face
        centre_x = w // 2
        ground_y = h - cow_h - 2

        left_face_x = centre_x - cow_gap // 2 - 1
        right_face_x = centre_x + (cow_gap - cow_gap // 2)
        left_x = left_face_x - left_face_col
        right_x = right_face_x - right_face_col

        draw_cow(stdscr, LEFT_COW, left_x, ground_y + bob_l, t, COW, HEART)
        draw_cow(stdscr, RIGHT_COW, right_x, ground_y + bob_r, t, COW, HEART)

        # Smooch: spawn hearts in the gap during kiss
        if kissing:
            if len(hearts) < 14 and random.random() < 0.55:
                hearts.append(
                    [
                        float(centre_x + random.randint(-1, 1)),
                        float(ground_y + 1),
                        0,
                        random.uniform(-0.25, 0.25),
                    ]
                )
            # big kiss heart between snouts
            big = "❤"
            safe_addstr(
                stdscr,
                ground_y + 1,
                centre_x,
                big,
                HEART | curses.A_BOLD | curses.A_REVERSE,
            )

        new_hearts = []
        for hx, hy, age, drift in hearts:
            hy -= 0.35
            hx += drift + math.sin(age * 0.4) * 0.3
            age += 1
            if age >= 28 or hy < 1:
                continue
            ch_pulse = KISS_HEARTS[(age // 2) % len(KISS_HEARTS)]
            attr = HEART | (curses.A_BOLD if age % 4 < 2 else 0)
            safe_addstr(stdscr, int(hy), int(hx), ch_pulse, attr)
            new_hearts.append([hx, hy, age, drift])
        hearts = new_hearts

        draw_grass(stdscr, w, h, GRASS)

        hint = "press q to quit  -  cowsinlove.com"
        safe_addstr(stdscr, h - 1, max(0, w - len(hint) - 1), hint, GRASS | curses.A_DIM)

        stdscr.refresh()


if __name__ == "__main__":
    try:
        curses.wrapper(main)
    except KeyboardInterrupt:
        pass
