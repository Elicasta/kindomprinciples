from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
RUNTIME = ROOT / "kingdom-v2.js"
DATA_CLIENT = ROOT / "kingdom-supabase.js"

LEGACY_ANON_JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwcHB6bnlocmlja2NhYnBmdmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwNDIwNjYsImV4cCI6MjEwMTYxODA2Nn0.G8W6ERO4jWvCjSPEKiz46325Rog4d4QT_G2VCv0hI6k"


def main() -> None:
    runtime = RUNTIME.read_text(encoding="utf-8")
    if "characterData:true" in runtime:
        raise RuntimeError("input-lag observer survived optimize-kingdom-runtime.py")
    if "kpRuntimeOptimized" not in runtime:
        raise RuntimeError("optimized runtime marker is missing")

    # Keep the data client focused on persistence. Presentation sync already has
    # its own Realtime/REST transport, so a second sync_state subscription only
    # adds sockets and failure noise.
    data_client = DATA_CLIENT.read_text(encoding="utf-8")
    data_client = data_client.replace("    subscribeToState();\n", "    window.kingdomDataReady = true;\n", 1)
    if "window.kingdomDataReady = true;" not in data_client:
        raise RuntimeError("could not disable duplicate data-client realtime subscription")
    DATA_CLIENT.write_text(data_client, encoding="utf-8")

    source = INDEX.read_text(encoding="utf-8")

    source = source.replace(
        "https://cgliqvizpcctqhsldixn.supabase.co",
        "https://vpppznyhrickcabpfvfx.supabase.co",
    )
    source = source.replace(
        "sb_publishable_C0O6QwRy2nJIJLJHCGuXWA_nZfrqTyi",
        LEGACY_ANON_JWT,
    )
    source = source.replace(
        "sb_publishable_ZvmCwSVoRGcxU3iBIwAh2Q_wqKiw9co",
        LEGACY_ANON_JWT,
        1,
    )

    js_tag = '<script src="/kingdom-supabase.js" id="kingdom-supabase-js"></script>'
    source = re.sub(r'\s*<script[^>]+id="kingdom-supabase-js"[^>]*></script>\s*', "\n", source)
    if "</body>" not in source:
        raise RuntimeError("index.html is missing </body>")
    source = source.replace("</body>", f"{js_tag}\n</body>", 1)

    required = [
        "vpppznyhrickcabpfvfx.supabase.co",
        LEGACY_ANON_JWT,
        "kingdom-supabase.js",
    ]
    for marker in required:
        if marker not in source:
            raise RuntimeError(f"missing Supabase wiring marker: {marker[:32]}")

    INDEX.write_text(source, encoding="utf-8")
    print("Kingdom Supabase persistence wiring applied without duplicate presentation realtime")


if __name__ == "__main__":
    main()
