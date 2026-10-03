import json, time
import numpy as np
from PIL import Image
import potrace

S = 3  # upscale factor for tracing
NAVY = np.array([1, 33, 91], float)
RED = np.array([191, 8, 8], float)

a = np.asarray(Image.open('src.jpg').convert('RGB')).astype(float)
H, W, _ = a.shape
M = np.stack([255 - NAVY, 255 - RED], axis=1)          # 3x2
P = np.linalg.pinv(M)                                   # 2x3
d = (255 - a).reshape(-1, 3) @ P.T                      # N x 2 -> (alpha_navy, alpha_red)
an = np.clip(d[:, 0], 0, 1).reshape(H, W)
ar = np.clip(d[:, 1], 0, 1).reshape(H, W)
np.save('alpha_navy.npy', an); np.save('alpha_red.npy', ar)

def up(alpha):
    im = Image.fromarray((alpha * 255).astype(np.uint8)).resize((W * S, H * S), Image.LANCZOS)
    return np.asarray(im).astype(float) / 255

UN, UR = up(an), up(ar)

def region(arr, x0, y0, x1, y1):
    out = np.zeros_like(arr, dtype=bool)
    out[y0 * S:y1 * S, x0 * S:x1 * S] = arr[y0 * S:y1 * S, x0 * S:x1 * S] > 0.5
    return out

def to_path(mask, bbox):
    x0, y0, x1, y1 = bbox
    sub = mask[y0 * S:y1 * S, x0 * S:x1 * S]
    bm = potrace.Bitmap(~sub)
    plist = bm.trace(turdsize=6, alphamax=1.0, opticurve=True, opttolerance=0.2)
    parts = []
    f = lambda p: f"{(p.x / S + x0):.2f} {(p.y / S + y0):.2f}"
    for curve in plist:
        parts.append("M" + f(curve.start_point))
        for seg in curve.segments:
            if seg.is_corner:
                parts.append("L" + f(seg.c) + " L" + f(seg.end_point))
            else:
                parts.append("C" + f(seg.c1) + " " + f(seg.c2) + " " + f(seg.end_point))
        parts.append("Z")
    return " ".join(parts)

jobs = {
    'navy_oda':     (UN, (40, 140, 480, 290)),
    'navy_sources': (UN, (500, 140, 1250, 290)),
    'navy_tag':     (UN, (50, 298, 1250, 356)),
    'red_tag':      (UR, (50, 298, 1250, 356)),
}
out = {}
for k, (arr, bb) in jobs.items():
    t = time.time()
    x0, y0, x1, y1 = bb
    m = np.zeros((H * S, W * S), bool)
    m[y0 * S:y1 * S, x0 * S:x1 * S] = arr[y0 * S:y1 * S, x0 * S:x1 * S] > 0.5
    out[k] = to_path(m, bb)
    print(k, len(out[k]), 'chars', round(time.time() - t, 1), 's', flush=True)
json.dump(out, open('paths.json', 'w'))
