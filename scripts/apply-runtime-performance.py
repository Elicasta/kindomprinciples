from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
RUNTIME = ROOT / "kingdom-v2.js"


def main() -> None:
    runtime = RUNTIME.read_text(encoding="utf-8")
    if "characterData:true" in runtime:
        raise RuntimeError("input-lag observer survived optimize-kingdom-runtime.py")
    if "kpRuntimeOptimized" not in runtime:
        raise RuntimeError("optimized runtime marker is missing")

    source = INDEX.read_text(encoding="utf-8")

    source = source.replace(
        "https://cgliqvizpcctqhsldixn.supabase.co",
        "https://vpppznyhrickcabpfvfx.supabase.co",
    )
    source = source.replace(
        "sb_publishable_C0O6QwRy2nJIJLHCGuXWA_nZfrqTyi",
        "sb_publishable_ZvmCwSVoRGcxU3iBIwAh2Q_wqKiw9co",
    )

    js_tag = '<script src="/kingdom-supabase.js" id="kingdom-supabase-js"></script>'
    source = re.sub(r'\s*<script[^>]+id="kingdom-supabase-js"[^>]*></script>\s*', "\n", source)
    if "</body>" not in source:
        raise RuntimeError("index.html is missing </body>")
    source = source.replace("</body>", f"{js_tag}\n</body>", 1)

    required = [
        "vpppznyhrickcabpfvfx.supabase.co",
        "kingdom-supabase.js",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing Supabase wiring marker: {marker}")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom Supabase wiring applied")


if __name__ == "__main__":
    main()
