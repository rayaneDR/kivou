"""Generate the original code-drawn Kivou icon; no third-party artwork."""
from pathlib import Path
from PIL import Image, ImageDraw

root = Path(__file__).resolve().parent.parent
image = Image.new("RGBA", (256, 256), (0, 0, 0, 0))
draw = ImageDraw.Draw(image)
draw.rounded_rectangle((0, 0, 255, 255), radius=58, fill="#edf1fa")
ink = "#18202d"
for points in [[(77, 55), (77, 201)], [(80, 140), (178, 55)], [(116, 111), (184, 201)]]:
    draw.line(points, fill=ink, width=24)
    for x, y in points:
        draw.ellipse((x - 12, y - 12, x + 12, y + 12), fill=ink)
draw.ellipse((187, 48, 211, 72), fill=ink)
image.save(root / "app" / "icon.png")
image.save(root / "app" / "icon.ico", sizes=[(16, 16), (32, 32), (48, 48), (256, 256)])
