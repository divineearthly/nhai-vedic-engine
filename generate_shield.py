from PIL import Image, ImageDraw

# Android Icon Sizes
sizes = { "mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192 }

def generate_shield(size):
    # Dark Matrix Background
    img = Image.new('RGBA', (1024, 1024), (5, 5, 5, 255))
    draw = ImageDraw.Draw(img)
    
    # Neon Cyan Outer Shield Bounds
    shield_coords = [(512, 100), (850, 250), (850, 650), (512, 950), (174, 650), (174, 250)]
    draw.polygon(shield_coords, outline=(0, 229, 255, 255), width=45)
    
    # Inner NHAI Yellow Data Core
    core_coords = [(512, 350), (700, 450), (700, 600), (512, 750), (324, 600), (324, 450)]
    draw.polygon(core_coords, fill=(255, 215, 0, 255), outline=(0, 255, 0, 255), width=15)
    
    # Tactical HUD Crosshairs
    draw.line([(512, 100), (512, 350)], fill=(0, 229, 255, 255), width=25)
    draw.line([(512, 750), (512, 950)], fill=(0, 229, 255, 255), width=25)
    draw.line([(174, 450), (324, 450)], fill=(0, 229, 255, 255), width=25)
    draw.line([(700, 450), (850, 450)], fill=(0, 229, 255, 255), width=25)

    # Resize using high-quality anti-aliasing
    try:
        resample_filter = Image.Resampling.LANCZOS
    except AttributeError:
        resample_filter = Image.LANCZOS

    return img.resize((size, size), resample_filter)

import os
base_path = "NhaiApp/android/app/src/main/res"

print("Initiating Sovereign Shield Matrix Generation...")
for density, size in sizes.items():
    folder = f"{base_path}/mipmap-{density}"
    os.makedirs(folder, exist_ok=True)
    
    icon = generate_shield(size)
    icon.save(f"{folder}/ic_launcher.png", format="PNG")
    icon.save(f"{folder}/ic_launcher_round.png", format="PNG")
    print(f" -> Generated {density} ({size}x{size}px)")

print("✅ UI ASSETS OVERWRITTEN. SHIELD LOGO DEPLOYED.")
