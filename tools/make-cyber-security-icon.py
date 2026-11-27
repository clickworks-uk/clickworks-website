"""
Generate the Cyber Security service icon in the set's halftone style.

Method, matched to the existing icons: draw the glyph as crisp line art on a
supersampled canvas, measure the ink coverage of each cell of an axis-aligned
screen, then place one dot per cell with its area proportional to that
coverage. Dot diameter therefore goes as sqrt(coverage), which is what keeps
the apparent grey of the halftone equal to the grey of the original.
"""

from PIL import Image, ImageDraw
import numpy as np

SIZE = 420          # final canvas, as the rest of the set
SS = 4              # supersampling factor while drawing
PITCH = 14          # screen pitch at final scale, measured off the set
MAX_DOT = 1.09      # largest dot, as a multiple of pitch: dots just touch

W = SIZE * SS


def bezier(points, steps=120):
    """Sample a cubic Bezier."""
    p0, p1, p2, p3 = [np.array(p, dtype=float) for p in points]
    t = np.linspace(0, 1, steps)[:, None]
    return (
        (1 - t) ** 3 * p0
        + 3 * (1 - t) ** 2 * t * p1
        + 3 * (1 - t) * t**2 * p2
        + t**3 * p3
    )


def shield_outline():
    """
    A shield: flat top with rounded corners, straight shoulders, then both
    sides sweeping in to a point at the bottom.
    """
    top_y, mid_y, tip_y = 0.175, 0.50, 0.875
    left_x, right_x = 0.175, 0.825
    r = 0.06  # corner radius

    pts = []
    # top edge, left to right
    pts += [(left_x + r, top_y), (right_x - r, top_y)]
    # top-right corner
    pts += list(
        bezier(
            [
                (right_x - r, top_y),
                (right_x - r * 0.45, top_y),
                (right_x, top_y + r * 0.45),
                (right_x, top_y + r),
            ],
            30,
        )
    )
    # right shoulder, straight
    pts += [(right_x, mid_y)]
    # right side sweeping in to the tip
    pts += list(
        bezier(
            [
                (right_x, mid_y),
                (right_x, tip_y - 0.16),
                (0.5 + 0.17, tip_y - 0.02),
                (0.5, tip_y),
            ],
            80,
        )
    )
    # mirror for the left half, walking back up
    right_half = [p for p in pts]
    left_half = [(1.0 - x, y) for (x, y) in reversed(right_half)]
    return right_half + left_half


def draw_glyph() -> Image.Image:
    """Black line art on white, at the supersampled size."""
    img = Image.new("L", (W, W), 255)
    d = ImageDraw.Draw(img)

    outline = [(x * W, y * W) for (x, y) in shield_outline()]

    # The shield is an outline, like the laptop and the magnifier, not a
    # solid: fill it then knock the inside back out.
    d.polygon(outline, fill=0)
    stroke = 0.066 * W
    inner = []
    cx, cy = 0.5 * W, 0.53 * W
    for x, y in outline:
        vx, vy = x - cx, y - cy
        length = (vx * vx + vy * vy) ** 0.5 or 1.0
        inner.append((x - vx / length * stroke, y - vy / length * stroke))
    d.polygon(inner, fill=255)

    # Keyhole: a circle with a tapering slot below it, solid.
    # Big enough that the screen can actually resolve it: at a 14px pitch a
    # keyhole under about three cells across comes out as an undifferentiated
    # blob, which is what the first attempt did.
    kx, ky, kr = 0.5 * W, 0.435 * W, 0.105 * W
    d.ellipse([kx - kr, ky - kr, kx + kr, ky + kr], fill=0)
    d.polygon(
        [
            (kx - kr * 0.44, ky + kr * 0.30),
            (kx + kr * 0.44, ky + kr * 0.30),
            (kx + kr * 0.30, ky + kr * 2.55),
            (kx - kr * 0.30, ky + kr * 2.55),
        ],
        fill=0,
    )
    return img


def halftone(glyph: Image.Image) -> Image.Image:
    """One dot per screen cell, area proportional to that cell's ink."""
    ink = 1.0 - np.asarray(glyph, dtype=float) / 255.0

    out = Image.new("L", (W, W), 0)   # alpha channel: 0 = clear
    d = ImageDraw.Draw(out)

    cells = SIZE // PITCH
    for row in range(cells):
        for col in range(cells):
            y0, y1 = row * PITCH * SS, (row + 1) * PITCH * SS
            x0, x1 = col * PITCH * SS, (col + 1) * PITCH * SS
            coverage = ink[y0:y1, x0:x1].mean()
            if coverage < 0.02:
                continue
            # sqrt so that dot AREA tracks coverage, not dot width
            diameter = MAX_DOT * PITCH * SS * (coverage ** 0.5)
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            r = diameter / 2
            d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=255)

    alpha = out.resize((SIZE, SIZE), Image.LANCZOS)
    icon = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    icon.putalpha(alpha)
    # Black ink everywhere the alpha is non-zero.
    rgb = Image.new("RGB", (SIZE, SIZE), (0, 0, 0))
    icon = Image.merge("RGBA", (*rgb.split(), alpha))
    return icon


if __name__ == "__main__":
    import sys

    glyph = draw_glyph()
    glyph.resize((SIZE, SIZE), Image.LANCZOS).save(sys.argv[1])
    halftone(glyph).save(sys.argv[2])
    print("wrote", sys.argv[1], sys.argv[2])
