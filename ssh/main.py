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

_BANNER_TEXT = "cowsinlove.com"
# rounded-figlet glyph per letter; each letter wiggles independently.
LETTERS = [
    # 'c'
    ['       ', '       ', '  ____ ', ' / ___)', '( (___ ', ' \\____)'],
    # 'o'
    ['       ', '       ', '  ___  ', ' / _ \\ ', '| |_| |', ' \\___/ '],
    # 'w'
    ['       ', '       ', ' _ _ _ ', '| | | |', '| | | |', ' \\___/ '],
    # 's'
    ['      ', '      ', '  ___ ', ' /___)', '|___ |', '(___/ '],
    # 'i'
    [' _ ', '(_)', ' _ ', '| |', '| |', '|_|'],
    # 'n'
    ['       ', '       ', ' ____  ', '|  _ \\ ', '| | | |', '|_| |_|'],
    # 'l'
    [' _  ', '| | ', '| | ', '| | ', '| | ', ' \\_)'],
    # 'o'
    ['       ', '       ', '  ___  ', ' / _ \\ ', '| |_| |', ' \\___/ '],
    # 'v'
    ['       ', '       ', ' _   _ ', '| | | |', ' \\ V / ', '  \\_/  '],
    # 'e'
    ['       ', '       ', ' _____ ', '| ___ |', '| ____|', '|_____)'],
    # '.'
    ['   ', '   ', '   ', '   ', ' _ ', '(_)'],
    # 'c'
    ['       ', '       ', '  ____ ', ' / ___)', '( (___ ', ' \\____)'],
    # 'o'
    ['       ', '       ', '  ___  ', ' / _ \\ ', '| |_| |', ' \\___/ '],
    # 'm'
    ['       ', '       ', ' ____  ', '|    \\ ', '| | | |', '|_|_|_|'],
]
LETTER_H = len(LETTERS[0])
LETTER_WIDTHS = [len(g[0]) for g in LETTERS]
LETTER_SPACING = 0  # glyphs already have inner padding
BANNER_WIDTH = sum(LETTER_WIDTHS) + LETTER_SPACING * (len(LETTERS) - 1)
N_LETTERS = len(LETTERS)

# 'E' = heart-eye slot (two adjacent Es per cow), replaced at render time.
# Left cow faces right; right cow faces left. They lean toward the centre.
# Line-art cow. `E` marks heart-eye slots (originally `oo`).
# COW_RIGHT has its head on the right of the figure → used as the LEFT cow in
# the scene so its face points toward the centre.
COW_RIGHT = [
    "           __n__n__   ",
    "    .------`-\\EE/-'   ",
    "   /  ##  ## (oo)     ",
    "  / \\## __   ./       ",
    "     |//YY \\|/        ",
    "     |||   |||        ",
]


def _mirror_row(s):
    flips = {"(": ")", ")": "(", "\\": "/", "/": "\\", "'": "`", "`": "'", "<": ">", ">": "<"}
    return "".join(flips.get(c, c) for c in s[::-1])


COW_LEFT = [_mirror_row(r) for r in COW_RIGHT]

LEFT_COW = COW_RIGHT   # left side of scene → faces right
RIGHT_COW = COW_LEFT   # right side of scene → faces left

# Face anchor = front edge of head (rightmost ink on the eye row).
_EYE_ROW = 2
LEFT_COW_FACE_COL = max(j for j, c in enumerate(COW_RIGHT[_EYE_ROW]) if c != " ")
RIGHT_COW_FACE_COL = min(j for j, c in enumerate(COW_LEFT[_EYE_ROW]) if c != " ")
COW_HEIGHT = len(COW_RIGHT)

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


def draw_banner(stdscr, screen_w, t, rainbow_attrs):
    amp = 1
    if BANNER_WIDTH + 2 > screen_w:
        title = _BANNER_TEXT
        x = max(0, (screen_w - len(title)) // 2)
        safe_addstr(stdscr, 1, x, title, rainbow_attrs[0])
        return
    start_x = (screen_w - BANNER_WIDTH) // 2
    base_y = 1 + amp
    cursor_x = start_x
    n_colors = len(rainbow_attrs)
    for li, glyph in enumerate(LETTERS):
        phase = li * 0.9 + t * 3.6
        dy = int(round(math.sin(phase) * amp))
        dx = int(round(math.cos(phase * 0.5) * 0.6))
        # rainbow cycles through letters and time
        attr = rainbow_attrs[(li + int(t * 3)) % n_colors]
        for r, line in enumerate(glyph):
            for c, ch in enumerate(line):
                if ch == " ":
                    continue
                safe_addstr(
                    stdscr,
                    base_y + r + dy,
                    cursor_x + c + dx,
                    "█",
                    attr,
                )
        cursor_x += LETTER_WIDTHS[li] + LETTER_SPACING


def draw_cow(stdscr, cow, x, y, t, palette):
    """Render a line-art cow. `E` slots animate as heart eyes; `#` are patches."""
    frame_i = int(t * 5) % len(HEART_FRAMES)
    hearts = HEART_FRAMES[frame_i]
    eye_attr = palette["eye"] | (curses.A_BOLD if frame_i % 2 == 0 else 0)
    eye_idx = 0
    for i, line in enumerate(cow):
        for j, c in enumerate(line):
            if c == " ":
                continue
            ry, rx = y + i, x + j
            if c == "E":
                safe_addstr(stdscr, ry, rx, hearts[eye_idx % 2], eye_attr)
                eye_idx += 1
            elif c == "#":
                safe_addstr(stdscr, ry, rx, "#", palette["patch"])
            else:
                safe_addstr(stdscr, ry, rx, c, palette["ink"])


def paint_region(stdscr, y0, y1, w, attr):
    blank = " " * w
    for y in range(y0, y1):
        safe_addstr(stdscr, y, 0, blank, attr)


def draw_grass(stdscr, w, h, ground_y, grass_color):
    # Only the bottom strip — leave cow rows alone so legs aren't overwritten.
    strip_top = max(ground_y, h - 2)
    for y in range(strip_top, h):
        for x in range(w):
            ch = GRASS_CHARS[(x * 3 + y * 7) % len(GRASS_CHARS)]
            if (x + y) % 3 == 0:
                continue
            safe_addstr(stdscr, y, x, ch, grass_color | curses.A_BOLD)


def draw_clouds(stdscr, w, t, color):
    cloud_y = 10
    if cloud_y < 0:
        return
    period = w + len(CLOUD) + 20
    for offset in (0, period // 2):
        x = int((t * 4 + offset)) % period - len(CLOUD)
        safe_addstr(stdscr, cloud_y, x, CLOUD, color | curses.A_BOLD)


def draw_rainbow_arc(stdscr, w, ground_y, rainbow_attrs):
    """Half-arc rainbow arching across the sky, anchored to the ground."""
    # Arc geometry — large radius so the arc is gentle.
    cx = w // 2
    radius_x = max(20, w // 3)
    radius_y = max(8, ground_y - 4)
    if radius_y < 6:
        return
    # Draw n concentric arcs, one per rainbow band.
    samples = max(80, w * 2)
    for band, attr in enumerate(rainbow_attrs):
        rx = radius_x - band
        ry = radius_y - band
        if rx <= 0 or ry <= 0:
            continue
        for s in range(samples):
            theta = math.pi * s / (samples - 1)  # 0..pi
            x = int(round(cx - rx * math.cos(theta)))
            y = int(round(ground_y - ry * math.sin(theta)))
            if 0 <= y < ground_y - 1 and 0 <= x < w:
                safe_addstr(stdscr, y, x, "█", attr)


def draw_sun(stdscr, w, t, color):
    cx = w - 8
    if cx < 10:
        return
    cy = 12
    rays = ["\\ | /", " \\|/ ", "--O--", " /|\\ ", "/ | \\"]
    pulse = int(t * 3) % 2
    attr = color | (curses.A_BOLD if pulse else 0)
    for i, line in enumerate(rays):
        safe_addstr(stdscr, cy - 2 + i, cx - 2, line, attr)


def main(stdscr):
    curses.curs_set(0)
    curses.start_color()
    has_256 = curses.COLORS >= 256

    # Baked palette. fg/bg explicit so colours are guaranteed.
    if has_256:
        SKY_BG     = 117  # light blue
        GRASS_BG   = 22   # dark grass green
        GRASS_FG   = 120  # bright grass blade
        CLOUD_FG   = 231  # white
        SUN_FG     = 226  # bright yellow
        COW_WHITE  = 231  # cow ink (line art)
        COW_BLACK  = 16   # cow patch chars
        HEART_FG   = 197  # hot pink
        BANNER_FG  = 200  # hot pink
    else:
        SKY_BG     = curses.COLOR_BLUE
        GRASS_BG   = curses.COLOR_GREEN
        GRASS_FG   = curses.COLOR_GREEN
        CLOUD_FG   = curses.COLOR_WHITE
        SUN_FG     = curses.COLOR_YELLOW
        COW_WHITE  = curses.COLOR_WHITE
        COW_BLACK  = curses.COLOR_BLACK
        HEART_FG   = curses.COLOR_RED
        BANNER_FG  = curses.COLOR_MAGENTA

    # Pairs: (fg, bg).
    curses.init_pair(1,  HEART_FG,   SKY_BG)     # heart in sky
    curses.init_pair(2,  GRASS_FG,   GRASS_BG)   # grass blades
    curses.init_pair(3,  BANNER_FG,  SKY_BG)     # banner letter
    curses.init_pair(4,  SUN_FG,     SKY_BG)     # sun
    curses.init_pair(5,  CLOUD_FG,   SKY_BG)     # cloud + sky fill
    curses.init_pair(6,  HEART_FG,   GRASS_BG)   # heart over grass
    curses.init_pair(7,  COW_WHITE,  GRASS_BG)   # white cow line-art ink
    curses.init_pair(8,  COW_BLACK,  GRASS_BG)   # black patch chars

    # Rainbow palette for the banner (and arc).
    if has_256:
        RAINBOW_FG = [196, 208, 226, 46, 51, 21, 201]
    else:
        RAINBOW_FG = [
            curses.COLOR_RED,
            curses.COLOR_YELLOW,
            curses.COLOR_GREEN,
            curses.COLOR_CYAN,
            curses.COLOR_BLUE,
            curses.COLOR_MAGENTA,
        ]
    RAINBOW_BASE = 20
    for i, fg in enumerate(RAINBOW_FG):
        curses.init_pair(RAINBOW_BASE + i, fg, SKY_BG)
    RAINBOW_ATTRS = [
        curses.color_pair(RAINBOW_BASE + i) | curses.A_BOLD
        for i in range(len(RAINBOW_FG))
    ]

    HEART_SKY  = curses.color_pair(1)
    GRASS      = curses.color_pair(2)
    SUN        = curses.color_pair(4)
    SKY        = curses.color_pair(5)
    HEART_GND  = curses.color_pair(6)
    COW_PALETTE = {
        "ink":   curses.color_pair(7) | curses.A_BOLD,
        "patch": curses.color_pair(8) | curses.A_BOLD,
        "eye":   curses.color_pair(6) | curses.A_BOLD,
    }

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

        if h < 22 or w < 60:
            msg = "terminal too small (need >=60x22)"
            safe_addstr(stdscr, h // 2, max(0, (w - len(msg)) // 2), msg, GRASS)
            stdscr.refresh()
            continue

        cow_h = COW_HEIGHT
        ground_y = h - cow_h - 2

        # Bake the regions: blue sky above, green ground below.
        paint_region(stdscr, 0, ground_y, w, SKY)
        paint_region(stdscr, ground_y, h, w, GRASS)

        draw_clouds(stdscr, w, t, SKY)
        draw_sun(stdscr, w, t, SUN)
        draw_rainbow_arc(stdscr, w, ground_y, RAINBOW_ATTRS)
        draw_banner(stdscr, w, t, RAINBOW_ATTRS)

        # Kiss cycle: cows lean in, kiss, lean back.
        cycle = (math.sin(t * 1.1) + 1) / 2  # 0..1
        max_gap = 8
        min_gap = 0
        cow_gap = int(round(max_gap - (max_gap - min_gap) * cycle))
        kissing = cycle > 0.88

        bob_l = 1 if int(t * 5) % 2 == 0 else 0
        bob_r = 1 if int(t * 5 + 1) % 2 == 0 else 0

        centre_x = w // 2
        left_face_x = centre_x - cow_gap // 2 - 1
        right_face_x = centre_x + (cow_gap - cow_gap // 2)
        left_x = left_face_x - LEFT_COW_FACE_COL
        right_x = right_face_x - RIGHT_COW_FACE_COL

        draw_cow(stdscr, LEFT_COW, left_x, ground_y + bob_l, t, COW_PALETTE)
        draw_cow(stdscr, RIGHT_COW, right_x, ground_y + bob_r, t, COW_PALETTE)

        # Smooch: spawn hearts in the gap during kiss.
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
            big_attr = HEART_GND | curses.A_BOLD
            safe_addstr(stdscr, ground_y + 1, centre_x, "❤", big_attr)

        new_hearts = []
        for hx, hy, age, drift in hearts:
            hy -= 0.35
            hx += drift + math.sin(age * 0.4) * 0.3
            age += 1
            if age >= 28 or hy < 1:
                continue
            ch_pulse = KISS_HEARTS[(age // 2) % len(KISS_HEARTS)]
            pair = HEART_SKY if int(hy) < ground_y else HEART_GND
            attr = pair | (curses.A_BOLD if age % 4 < 2 else 0)
            safe_addstr(stdscr, int(hy), int(hx), ch_pulse, attr)
            new_hearts.append([hx, hy, age, drift])
        hearts = new_hearts

        draw_grass(stdscr, w, h, ground_y, GRASS)

        hint = "press q to quit  -  cowsinlove.com"
        safe_addstr(stdscr, h - 1, max(0, w - len(hint) - 1), hint, GRASS | curses.A_DIM)

        stdscr.refresh()


if __name__ == "__main__":
    try:
        curses.wrapper(main)
    except KeyboardInterrupt:
        pass
