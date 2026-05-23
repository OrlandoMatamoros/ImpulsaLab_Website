"""
Render the Impulsa Lab MascotV15 (mantarraya geometrica 3 ejes) to PNG/ICO.
Pure-Pillow geometry port of components/MascotV15.tsx (viewBox 0 0 256 256).

Output:
  app/icon.png         (512x512)
  app/apple-icon.png   (180x180)
  app/favicon.ico      (multi-res: 16/32/48)

Style: Opcion B -> background navy #0a0e1a, body white #FFFFFF, eyes cyan #00BFFF.
"""

from PIL import Image, ImageDraw
from pathlib import Path

# ---- colores LOCKED (regla #33, marca pagada) -------------------------------
BG_NAVY     = (10, 14, 26, 255)     # #0a0e1a
BODY_WHITE  = (255, 255, 255, 255)  # #FFFFFF
EYE_CYAN    = (0, 191, 255, 255)    # #00BFFF

# ---- coordenadas en sistema viewBox 0..256 ----------------------------------
# Cuernos cefalicos: 2 lineas, strokeWidth 7
HORN_LEFT   = ((118, 78), (112, 44))
HORN_RIGHT  = ((138, 78), (144, 44))
HORN_WIDTH  = 7

# Cuerpo: path con quadratic bezier curves
# d="M118 78 L20 130 Q50 160 124 174 L128 178 L132 174 Q206 160 236 130 L138 78 Q128 80 118 78 Z"
# Lo descomponemos en una polyline aproximando cada Q con N pasos.

def quad_bezier(p0, p1, p2, steps=40):
    """Return polyline approximating quadratic Bezier P0-control P1-P2."""
    pts = []
    for i in range(steps + 1):
        t = i / steps
        x = (1-t)**2 * p0[0] + 2*(1-t)*t * p1[0] + t*t * p2[0]
        y = (1-t)**2 * p0[1] + 2*(1-t)*t * p1[1] + t*t * p2[1]
        pts.append((x, y))
    return pts

def build_body_polygon():
    pts = []
    # M 118 78  -> start
    pts.append((118, 78))
    # L 20 130
    pts.append((20, 130))
    # Q 50 160 , 124 174  (control=50,160 end=124,174)
    pts += quad_bezier((20, 130), (50, 160), (124, 174))[1:]
    # L 128 178
    pts.append((128, 178))
    # L 132 174
    pts.append((132, 174))
    # Q 206 160 , 236 130
    pts += quad_bezier((132, 174), (206, 160), (236, 130))[1:]
    # L 138 78
    pts.append((138, 78))
    # Q 128 80 , 118 78  (slight bump along the top between the horns)
    pts += quad_bezier((138, 78), (128, 80), (118, 78))[1:]
    # Z (close)
    return pts

def build_tail_polyline():
    # "M128 178 Q134 208 122 240" stroke width 2
    return quad_bezier((128, 178), (134, 208), (122, 240), steps=60)

# Ojos: circles cx,cy r en viewBox coords
EYES = [
    ((118, 108), 2.5),
    ((138, 108), 2.5),
]

def render(size: int, padding_ratio: float = 0.08) -> Image.Image:
    """Render mantarraya icon at given size with Opcion B colors."""
    img = Image.new("RGBA", (size, size), BG_NAVY)
    draw = ImageDraw.Draw(img, "RGBA")

    # Scaling: viewBox 0..256 mapped into a centered square with padding.
    # We give the mascota generous padding so it doesnt touch the edges.
    pad = int(size * padding_ratio)
    inner = size - 2 * pad
    scale = inner / 256.0
    off_x = pad
    off_y = pad

    def vb(point):
        return (off_x + point[0] * scale, off_y + point[1] * scale)

    def vb_int(point):
        x, y = vb(point)
        return (int(round(x)), int(round(y)))

    # ---- Cuerpo (white polygon) ---------------------------------------------
    body_pts = [vb(p) for p in build_body_polygon()]
    draw.polygon(body_pts, fill=BODY_WHITE)

    # ---- Cuernos cefalicos (white rounded lines) ----------------------------
    horn_w = max(2, int(round(HORN_WIDTH * scale)))
    for (a, b) in (HORN_LEFT, HORN_RIGHT):
        ax, ay = vb(a)
        bx, by = vb(b)
        draw.line([(ax, ay), (bx, by)], fill=BODY_WHITE, width=horn_w)
        # Rounded caps via small circles at endpoints
        r = horn_w / 2.0
        draw.ellipse([ax - r, ay - r, ax + r, ay + r], fill=BODY_WHITE)
        draw.ellipse([bx - r, by - r, bx + r, by + r], fill=BODY_WHITE)

    # ---- Cola (white thin curve) --------------------------------------------
    tail_w = max(1, int(round(2 * scale)))
    tail_pts = [vb(p) for p in build_tail_polyline()]
    draw.line(tail_pts, fill=BODY_WHITE, width=tail_w, joint="curve")

    # ---- Ojos (cyan circles) ------------------------------------------------
    for (center, r) in EYES:
        cx, cy = vb(center)
        rr = max(1.5, r * scale)
        draw.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=EYE_CYAN)

    return img

def render_supersampled(size: int, ss: int = 4, padding_ratio: float = 0.08) -> Image.Image:
    """Render at ss*size and downscale with LANCZOS for anti-aliased edges."""
    big = render(size * ss, padding_ratio=padding_ratio)
    return big.resize((size, size), Image.LANCZOS)

def main():
    root = Path(__file__).resolve().parent.parent
    app = root / "app"
    app.mkdir(exist_ok=True)

    # 1) icon.png 512x512
    icon = render_supersampled(512, ss=4, padding_ratio=0.10)
    icon.save(app / "icon.png", "PNG", optimize=True)
    print("Wrote", app / "icon.png", icon.size)

    # 2) apple-icon.png 180x180 (a touch more padding for iOS rounded mask)
    apple = render_supersampled(180, ss=6, padding_ratio=0.12)
    apple.save(app / "apple-icon.png", "PNG", optimize=True)
    print("Wrote", app / "apple-icon.png", apple.size)

    # 3) favicon.ico multi-res 16/32/48
    # Pillow's ICO writer reads the .sizes kwarg AND any frames passed via
    # append_images. We render each target size separately with supersampling
    # (tighter padding for tiny sizes so the mantarraya remains recognizable)
    # and combine them into a single multi-frame .ico.
    f16 = render_supersampled(16, ss=16, padding_ratio=0.04)
    f32 = render_supersampled(32, ss=12, padding_ratio=0.05)
    f48 = render_supersampled(48, ss=8,  padding_ratio=0.06)
    f48.save(
        app / "favicon.ico",
        format="ICO",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[f16, f32],
    )
    print("Wrote", app / "favicon.ico", "(16/32/48)")

if __name__ == "__main__":
    main()
