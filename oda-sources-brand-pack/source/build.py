import json, os, io, struct, shutil
import cairosvg
from PIL import Image

NAVY, RED, WHITE = "#01215B", "#BF0808", "#FFFFFF"
P = json.load(open('paths.json'))
OUT = '/home/claude/work/pack'
if os.path.exists(OUT): shutil.rmtree(OUT)
for d in ['public/brand/logo', 'public/brand/navbar', 'public/brand/mark', 'public/icons', 'public/og', 'public/social', 'source', 'preview', 'snippets']:
    os.makedirs(f'{OUT}/{d}', exist_ok=True)

def w(path, data, mode='w'):
    with open(f'{OUT}/{path}', mode) as f: f.write(data)

def svg(viewbox, body, title="ODA Sources — Import &amp; Export", extra=""):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{viewbox}" role="img" aria-label="{title}" {extra}>\n'
            f'<title>{title}</title>\n{body}\n</svg>\n')

def paths(c_navy, c_red, tagline=True):
    s = f'<g fill-rule="evenodd">\n<path fill="{c_navy}" d="{P["navy_oda"]}"/>\n<path fill="{c_navy}" d="{P["navy_sources"]}"/>\n'
    if tagline:
        s += f'<path fill="{c_navy}" d="{P["navy_tag"]}"/>\n<path fill="{c_red}" d="{P["red_tag"]}"/>\n'
    return s + '</g>'

VB_FULL = "40 142 1209 212"
VB_WORD = "40 142 1209 146"

def png(svg_str, path, width=None, height=None, bg=None):
    kw = {}
    if width: kw['output_width'] = width
    if height: kw['output_height'] = height
    if bg: kw['background_color'] = bg
    cairosvg.svg2png(bytestring=svg_str.encode(), write_to=f'{OUT}/{path}', **kw)

# ---------- 1. Logos ----------
full = svg(VB_FULL, paths(NAVY, RED))
word = svg(VB_WORD, paths(NAVY, RED, False))
mono = svg(VB_FULL, paths(NAVY, NAVY))
white = svg(VB_FULL, paths(WHITE, WHITE))
word_white = svg(VB_WORD, paths(WHITE, WHITE, False))
w('public/brand/logo/logo-full.svg', full)
w('public/brand/logo/logo-wordmark.svg', word)
w('public/brand/logo/logo-mono-navy.svg', mono)
w('public/brand/logo/logo-white.svg', white)
w('public/brand/logo/logo-wordmark-white.svg', word_white)
for wd in (3840, 1920, 960, 480):
    png(full, f'public/brand/logo/logo-full-{wd}.png', wd)
for wd in (1920, 960):
    png(word, f'public/brand/logo/logo-wordmark-{wd}.png', wd)
    png(white, f'public/brand/logo/logo-white-{wd}.png', wd)
    png(mono, f'public/brand/logo/logo-mono-navy-{wd}.png', wd)
png(word_white, 'public/brand/logo/logo-wordmark-white-1920.png', 1920)
# fond blanc opaque (emails, documents, WhatsApp...)
png(full, 'public/brand/logo/logo-full-1920-white-bg.png', 1920, bg=WHITE)

# ---------- 2. Navbar ----------
w('public/brand/navbar/logo-navbar.svg', full)
w('public/brand/navbar/logo-navbar-compact.svg', word)
ratio_full = 1209/212; ratio_word = 1209/146
for k, hh in (('', 64), ('@2x', 128), ('@3x', 192)):
    png(full, f'public/brand/navbar/logo-navbar{k}.png', width=round(hh*ratio_full), height=hh)
for k, hh in (('', 40), ('@2x', 80), ('@3x', 120)):
    png(word, f'public/brand/navbar/logo-navbar-compact{k}.png', width=round(hh*ratio_word), height=hh)

# ---------- 3. Mark (icone carree "ODA") ----------
# ODA occupe x 46..465, y 148..282 dans l'espace du logo source
ODA_X0, ODA_Y0, ODA_W, ODA_H = 46, 148, 419, 134

def mark_svg(ratio=0.80, radius=0.22, bar=True, bar_h=0.05, gap=0.06, bg=NAVY, fg=WHITE, size=512, bar_color=RED):
    S = size
    ow = ratio * S
    s = ow / ODA_W
    oh = ODA_H * s
    bh = bar_h * S if bar else 0
    g = gap * S if bar else 0
    total = oh + g + bh
    top = (S - total) / 2
    left = (S - ow) / 2
    rect = ''
    if bg:
        rect = f'<rect width="{S}" height="{S}" rx="{radius*S:.1f}" fill="{bg}"/>' if radius else f'<rect width="{S}" height="{S}" fill="{bg}"/>'
    body = rect + f'\n<g transform="translate({left:.2f} {top:.2f}) scale({s:.5f}) translate({-ODA_X0} {-ODA_Y0})" fill="{fg}" fill-rule="evenodd"><path d="{P["navy_oda"]}"/></g>'
    if bar:
        body += f'\n<rect x="{left:.2f}" y="{top+oh+g:.2f}" width="{ow:.2f}" height="{bh:.2f}" rx="{bh/2:.2f}" fill="{bar_color}"/>'
    return svg(f"0 0 {S} {S}", body, title="ODA Sources")

any_icon = mark_svg()                                          # coins arrondis (PWA 'any', mark)
fav_icon = mark_svg(ratio=0.86, radius=0.2, bar_h=0.07, gap=0.07)   # lisible a 16/32 px
mask_icon = mark_svg(ratio=0.60, radius=0, bar_h=0.04, gap=0.05)    # plein cadre, zone de securite 80 %
apple_icon = mark_svg(ratio=0.72, radius=0, bar_h=0.045, gap=0.055) # iOS arrondit lui-meme
w('public/favicon.svg', fav_icon)
w('public/brand/mark/logo-mark.svg', any_icon)
w('public/brand/mark/logo-mark-fullbleed.svg', mask_icon)
for sz in (16, 32, 48):
    png(fav_icon, f'public/favicon-{sz}x{sz}.png', sz)
for sz in (72, 96, 128, 144, 152, 192, 384, 512):
    png(any_icon, f'public/icons/icon-{sz}.png', sz)
for sz in (192, 512):
    png(mask_icon, f'public/icons/icon-maskable-{sz}.png', sz)
png(apple_icon, 'public/apple-touch-icon.png', 180)
png(mask_icon, 'public/mstile-150x150.png', 150)
for sz in (256, 1024):
    png(any_icon, f'public/brand/mark/logo-mark-{sz}.png', sz)

# favicon.ico (PNG 16/32/48, ecrit a la main pour garder chaque rendu dedie)
imgs = []
for sz in (16, 32, 48):
    b = io.BytesIO()
    cairosvg.svg2png(bytestring=fav_icon.encode(), write_to=b, output_width=sz, output_height=sz)
    imgs.append((sz, b.getvalue()))
hdr = struct.pack('<HHH', 0, 1, len(imgs))
off = 6 + 16*len(imgs)
ent, blobs = b'', b''
for sz, data in imgs:
    ent += struct.pack('<BBBBHHII', sz, sz, 0, 0, 1, 32, len(data), off + len(blobs))
    blobs += data
w('public/favicon.ico', hdr + ent + blobs, 'wb')

# safari pinned tab (monochrome, un seul fond noir)
pin = svg("0 0 512 512", f'<g transform="translate({(512-410)/2:.2f} 160) scale({410/ODA_W:.5f}) translate({-ODA_X0} {-ODA_Y0})" fill="#000" fill-rule="evenodd"><path d="{P["navy_oda"]}"/></g><rect x="{(512-410)/2:.2f}" y="{160+ODA_H*410/ODA_W+34:.2f}" width="410" height="26" rx="13" fill="#000"/>', title="ODA Sources")
w('public/safari-pinned-tab.svg', pin)

# ---------- 4. Social ----------
logo_png = Image.open(f'{OUT}/public/brand/logo/logo-full-3840.png').convert('RGBA')
def og_canvas(W, H, logo_w, name, band=14, shift=-8):
    c = Image.new('RGB', (W, H), 'white')
    lg = logo_png.resize((logo_w, round(logo_w*logo_png.height/logo_png.width)), Image.LANCZOS)
    x = (W - lg.width)//2
    y = (H - band - lg.height)//2 + shift
    c.paste(lg, (x, y), lg)
    # bande basse : navy a gauche, rouge a droite (echo des deux traits du logo)
    from PIL import ImageDraw
    d = ImageDraw.Draw(c)
    d.rectangle([0, H-band, W//2, H], fill=NAVY)
    d.rectangle([W//2, H-band, W, H], fill=RED)
    c.save(f'{OUT}/{name}', optimize=True)
og_canvas(1200, 630, 1000, 'public/og/og-image.png')
og_canvas(1200, 600, 1000, 'public/og/twitter-image.png')
og_canvas(1200, 1200, 1000, 'public/og/og-square-1200.png', band=22, shift=0)
# avatar (WhatsApp, LinkedIn, Facebook, Instagram : recadres en cercle)
png(mask_icon, 'public/social/avatar-1024.png', 1024)
png(mark_svg(ratio=0.60, radius=0.5, bar_h=0.04, gap=0.05), 'public/social/avatar-round-1024.png', 1024)

shutil.copy('src.jpg', f'{OUT}/source/logo-original.jpg')
print('ok')
