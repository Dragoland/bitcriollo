---
title: "Un script de Python para renombrar cientos de fotos en segundos"
date: 2026-06-27
tags: [tutorial, python, automatización]
excerpt: "Fotos llamadas IMG_4832.jpg o WhatsApp Image… ordenadas por fecha en un solo comando, con modo de prueba para no romper nada."
---

Cualquiera que haya pasado fotos de varios celulares conoce el caos: `IMG_4832.jpg`, `WhatsApp Image 2026-05-01 at 10.31.jpg`, `PXL_2026...`. Hacerlo a mano es un castigo. Vamos a automatizarlo con unas 30 líneas de Python y **sin instalar nada extra**.

## Qué hace

Renombra las fotos y videos de una carpeta a `AAAA-MM-DD_001.jpg`, `AAAA-MM-DD_002.jpg`, etc., usando la fecha de modificación de cada archivo. Por defecto **solo muestra** lo que haría; para renombrar de verdad hay que añadir `--aplicar`.

## El script

Guárdalo como `renombrar.py`:

```python
#!/usr/bin/env python3
"""Renombra fotos y videos como 2026-07-09_001.jpg usando su fecha de modificación."""
import argparse
from datetime import datetime
from pathlib import Path

EXTENSIONES = {".jpg", ".jpeg", ".png", ".mp4", ".mov"}


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("carpeta", type=Path, help="carpeta con los archivos")
    parser.add_argument("--aplicar", action="store_true",
                        help="renombrar de verdad (por defecto solo muestra los cambios)")
    args = parser.parse_args()

    archivos = sorted(
        (p for p in args.carpeta.iterdir()
         if p.is_file() and p.suffix.lower() in EXTENSIONES),
        key=lambda p: p.stat().st_mtime,
    )

    contador: dict[str, int] = {}
    for archivo in archivos:
        fecha = datetime.fromtimestamp(archivo.stat().st_mtime).strftime("%Y-%m-%d")
        contador[fecha] = contador.get(fecha, 0) + 1
        nuevo = archivo.with_name(f"{fecha}_{contador[fecha]:03d}{archivo.suffix.lower()}")

        if nuevo != archivo and nuevo.exists():
            print(f"SALTADO (ya existe): {nuevo.name}")
            continue

        print(f"{archivo.name}  ->  {nuevo.name}")
        if args.aplicar:
            archivo.rename(nuevo)

    if not args.aplicar:
        print("\nModo prueba: no se cambió nada. Añade --aplicar para renombrar.")


if __name__ == "__main__":
    main()
```

## Cómo usarlo

```bash
# 1) Mira qué haría, sin tocar nada
python3 renombrar.py ~/Fotos/viaje

# 2) Si te gusta el resultado, aplícalo
python3 renombrar.py ~/Fotos/viaje --aplicar
```

## Cómo funciona

- `pathlib.Path` maneja rutas igual en Linux y Windows.
- `sorted(..., key=st_mtime)` ordena por fecha, así la numeración sigue el orden en que se tomaron.
- Un diccionario cuenta cuántos archivos hay de cada día para numerarlos `001`, `002`…
- Si el nombre nuevo ya existe, lo salta en vez de pisarlo.

## Ideas para mejorarlo

- Leer la fecha real de la foto (datos EXIF) con la librería `Pillow`, porque la fecha de modificación cambia si copias los archivos.
- Añadir más extensiones al conjunto `EXTENSIONES`.
- Procesar subcarpetas cambiando `iterdir()` por `rglob("*")`.

Siempre prueba primero en una copia de la carpeta. Un script que renombra sin preguntar es muy útil… y muy rápido haciendo desastres.
