"""Rewrite all '/images/og-image.jpg' references to '/opengraph-image.png?v=2'.

The ?v=2 query string is a cache buster for WhatsApp/iMessage/X share cards.
We touch only the app/ tree; nothing else references this asset for OG.
"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OLD = "/images/og-image.jpg"
NEW = "/opengraph-image.png?v=2"

modified = []
total_subs = 0
for p in (ROOT / "app").rglob("*.tsx"):
    text = p.read_text(encoding="utf-8")
    if OLD not in text:
        continue
    count = text.count(OLD)
    new_text = text.replace(OLD, NEW)
    p.write_text(new_text, encoding="utf-8")
    modified.append((p.relative_to(ROOT), count))
    total_subs += count

for path, n in modified:
    print(f"  [{n}x] {path}")
print(f"\nTotal files modified: {len(modified)}")
print(f"Total substitutions:  {total_subs}")
