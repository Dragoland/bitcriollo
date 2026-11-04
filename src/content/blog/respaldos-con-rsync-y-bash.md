---
title: "Respaldos automáticos con rsync: copias por fecha que casi no ocupan espacio"
date: 2026-08-05
tags: [tutorial, bash, linux, respaldos]
excerpt: "Un script de Bash que guarda una carpeta por cada respaldo, pero los archivos que no cambian no se duplican. Se programa una vez y se olvida."
---

El mejor respaldo es el que se hace solo. Con `rsync` y un script corto puedes tener una carpeta por cada día (o semana), todas con aspecto de copia completa, pero **sin duplicar los archivos que no cambiaron**.

## La idea

`rsync` tiene una opción, `--link-dest`, que compara con el respaldo anterior. Lo que no cambió se enlaza (con *hard links*) y no ocupa espacio nuevo. Solo se copia lo nuevo o modificado.

Resultado: cada carpeta se ve completa y puedes restaurar cualquier fecha, pero el disco crece muy poco.

## El script

Guárdalo como `~/bin/respaldo.sh` y ajusta las dos primeras rutas:

```bash
#!/usr/bin/env bash
set -euo pipefail

ORIGEN="$HOME/Documentos/"
DESTINO="/media/$USER/DISCO_BACKUP/respaldos"
AHORA="$(date +%F_%H-%M)"

mkdir -p "$DESTINO"

# Último respaldo completo (ignora los que quedaron a medias, que terminan en .tmp)
ULTIMO="$(ls -1d "$DESTINO"/20??-??-??_??-?? 2>/dev/null | tail -n 1 || true)"
OPCION_LINK=()
if [ -n "$ULTIMO" ]; then
  OPCION_LINK=(--link-dest="$ULTIMO")
fi

# Se copia a una carpeta temporal y solo al terminar se le pone el nombre final
rsync -a --delete "${OPCION_LINK[@]}" "$ORIGEN" "$DESTINO/$AHORA.tmp/"
mv "$DESTINO/$AHORA.tmp" "$DESTINO/$AHORA"

echo "Respaldo listo: $DESTINO/$AHORA"
```

Dale permiso de ejecución y pruébalo:

```bash
chmod +x ~/bin/respaldo.sh
~/bin/respaldo.sh
```

Haz una segunda ejecución después de cambiar un archivo y compara con `du -sh`: verás que el segundo respaldo casi no suma tamaño.

## Qué significa cada parte

- `set -euo pipefail`: el script se detiene ante cualquier error en vez de seguir como si nada.
- `-a`: conserva permisos, fechas y enlaces.
- `--delete`: si borraste algo en el origen, desaparece **de esa copia nueva** (las copias antiguas no se tocan).
- La carpeta `.tmp`: si se corta la luz a mitad de respaldo, nunca queda una copia "completa" falsa.

## Programarlo con cron

```bash
crontab -e
```

Y añade esta línea para que corra todos los viernes a las 8:00 p. m. (cambia `usuario`):

```
0 20 * * 5 /home/usuario/bin/respaldo.sh >> /home/usuario/respaldo.log 2>&1
```

## Para restaurar

Es tan simple como copiar la carpeta de la fecha que quieras:

```bash
cp -a /media/$USER/DISCO_BACKUP/respaldos/2026-08-05_20-00/. ~/Documentos-restaurado/
```

## Advertencias

- El disco de destino debe usar un sistema de archivos que admita *hard links*, como ext4, btrfs o NTFS en Linux. **FAT32 y exFAT no los admiten.**
- El disco tiene que estar conectado y montado a la hora programada, o el script fallará.
- Un respaldo en el mismo disco no es un respaldo. Guarda una copia en un disco aparte, y de vez en cuando prueba a restaurar.

Si quieres que te lo deje montado y probado en tu equipo, ese es uno de mis servicios de configuración.
