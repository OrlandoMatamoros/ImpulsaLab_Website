"""Verify favicon.ico multi-res frames at the raw header level."""
from pathlib import Path
import struct
from PIL import IcoImagePlugin, Image

ico = Path(__file__).resolve().parent.parent / "app" / "favicon.ico"
data = ico.read_bytes()

# ICO header: reserved(2) + type(2) + count(2)
reserved, ico_type, count = struct.unpack("<HHH", data[:6])
print(f"ICO header: reserved={reserved} type={ico_type} count={count}")

# Directory entries (16 bytes each)
sizes = []
for i in range(count):
    off = 6 + i * 16
    w = data[off]; h = data[off+1]
    if w == 0: w = 256
    if h == 0: h = 256
    color_count = data[off+2]
    bpp_or_planes = struct.unpack("<H", data[off+6:off+8])[0]
    img_size = struct.unpack("<I", data[off+8:off+12])[0]
    img_offset = struct.unpack("<I", data[off+12:off+16])[0]
    print(f"  frame {i}: {w}x{h}, colors={color_count}, bpp_or_planes={bpp_or_planes}, size={img_size} bytes, offset={img_offset}")
    sizes.append((w, h))

print("Sizes:", sizes)

# Also dump each frame via PIL IcoImageFile
print("--- PIL IcoFile internal ---")
with open(ico, "rb") as f:
    ico_file = IcoImagePlugin.IcoFile(f)
    print("PIL sees sizes:", ico_file.sizes())
    for sz in sorted(ico_file.sizes()):
        im = ico_file.getimage(sz)
        out = Path(__file__).resolve().parent / f"_favicon_{sz[0]}x{sz[1]}.png"
        im.convert("RGBA").save(out, "PNG")
        print(f"  wrote {out}")
