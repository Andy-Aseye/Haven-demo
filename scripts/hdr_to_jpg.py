"""
Convert Radiance RGBE (.hdr) panoramas to 4K WebP.
Pure Python + numpy + Pillow — no external C libraries needed.
Applies ACES filmic tone mapping to match Three.js ACESFilmicToneMapping.
"""
import os
import numpy as np
from PIL import Image

HDR_DIR = os.path.join(os.path.dirname(__file__), "..", "public")
TARGET_SIZE = (4096, 2048)
WEBP_QUALITY = 85


def read_hdr(path: str) -> np.ndarray:
    """Return H×W×3 float32 linear-light RGB array from a Radiance RGBE file."""
    with open(path, "rb") as f:
        buf = bytearray(f.read())

    # Locate end of ASCII header (blank line = double newline)
    header_end = buf.index(b"\n\n") + 2

    # Resolution line: "-Y height +X width"
    res_end = buf.index(b"\n", header_end)
    res = buf[header_end:res_end].decode()
    i = res_end + 1
    _, h_str, _, w_str = res.split()
    h, w = int(h_str), int(w_str)

    result = np.zeros((h, w, 3), dtype=np.float32)

    for y in range(h):
        # New-style RLE scanline marker: 0x02 0x02 <width high> <width low>
        if buf[i] == 2 and buf[i + 1] == 2:
            sw = (buf[i + 2] << 8) | buf[i + 3]
            assert sw == w, f"Scanline width mismatch: {sw} != {w}"
            i += 4

            scan = np.zeros((4, w), dtype=np.uint8)
            for c in range(4):
                col = 0
                while col < w:
                    code = buf[i]
                    i += 1
                    if code > 128:          # run
                        cnt = code - 128
                        val = buf[i]
                        i += 1
                        scan[c, col : col + cnt] = val
                    else:                   # non-run (literal)
                        cnt = code
                        scan[c, col : col + cnt] = buf[i : i + cnt]
                        i += cnt
                    col += cnt
        else:
            # Old / uncompressed format — raw RGBE pixels
            raw = np.frombuffer(buf[i : i + w * 4], dtype=np.uint8).reshape(w, 4)
            i += w * 4
            scan = raw.T  # (4, w)

        # RGBE → linear float: mantissa/256 * 2^(e-128)
        e = scan[3].astype(np.float32)
        exp = e - 128.0 - 8.0
        scale = np.where(e > 0, np.power(2.0, exp), 0.0)
        result[y, :, 0] = scan[0] * scale
        result[y, :, 1] = scan[1] * scale
        result[y, :, 2] = scan[2] * scale

    return result


def aces_filmic(x: np.ndarray) -> np.ndarray:
    """ACES filmic tone map — identical to Three.js ACESFilmicToneMapping."""
    a, b, c, d, e = 2.51, 0.03, 2.43, 0.59, 0.14
    return np.clip((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0)


FILES = [
    "newman_lobby_4k.hdr",
    "lythwood_lounge_4k.hdr",
    "glasshouse_interior_4k.hdr",
    "brown_photostudio_02_4k.hdr",
]

print(f"Target: {TARGET_SIZE[0]}×{TARGET_SIZE[1]} WebP @ quality {WEBP_QUALITY}\n")

for fn in FILES:
    src = os.path.join(HDR_DIR, fn)
    stem = fn.replace("_4k.hdr", "")
    dst = os.path.join(HDR_DIR, f"{stem}_4k.webp")

    print(f"  {fn} …", end=" ", flush=True)

    hdr = read_hdr(src)                                 # linear float RGB
    ldr = aces_filmic(hdr)                              # tone map
    srgb = np.power(np.clip(ldr, 0, 1), 1.0 / 2.2)    # gamma encode

    img = Image.fromarray((srgb * 255).astype(np.uint8))
    img = img.resize(TARGET_SIZE, Image.LANCZOS)
    img.save(dst, "WEBP", quality=WEBP_QUALITY)

    src_mb = os.path.getsize(src) / 1_000_000
    dst_kb = os.path.getsize(dst) / 1_000
    ratio = src_mb * 1000 / dst_kb
    print(f"{src_mb:.1f} MB  →  {dst_kb:.0f} KB  ({ratio:.0f}× smaller)  ✓")

print("\nDone.")
