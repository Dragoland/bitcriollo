---
title: "10 atajos de la terminal que te ahorran horas (y dedos)"
date: 2026-10-26
tags: [tutorial, bash, linux, productividad]
excerpt: "Pequeños trucos de Bash que se aprenden en cinco minutos y se usan toda la vida: buscar comandos, repetir el último, moverte rápido por la línea."
---

La terminal intimida menos cuando dejas de escribir todo a mano. Estos atajos funcionan en Bash, que es la terminal por defecto de casi todas las distribuciones.

## Moverte y editar la línea

| Atajo | Qué hace |
| --- | --- |
| `Ctrl + A` | Ir al principio de la línea |
| `Ctrl + E` | Ir al final de la línea |
| `Ctrl + W` | Borrar la palabra anterior |
| `Ctrl + U` | Borrar desde el cursor hasta el principio |
| `Ctrl + L` | Limpiar la pantalla |

## El historial es tu mejor amigo

### 1. Buscar un comando anterior: `Ctrl + R`

Pulsa `Ctrl + R` y empieza a escribir una parte del comando. Bash te muestra el último que coincide. Pulsa `Ctrl + R` otra vez para ir a coincidencias más antiguas y `Enter` para ejecutar.

### 2. Repetir el último comando: `!!`

¿Olvidaste el `sudo`? Pasa continuamente:

```bash
apt update
# Permission denied...
sudo !!
```

`!!` se reemplaza por el comando anterior completo.

### 3. Reutilizar el último argumento: `!$` o `Alt + .`

```bash
mkdir proyectos-nuevos
cd !$
```

`!$` es lo último que escribiste en el comando anterior, aquí `proyectos-nuevos`. Con `Alt + .` haces lo mismo pero viendo el resultado antes de pulsar Enter.

### 4. Buscar en el historial con `grep`

```bash
history | grep rsync
```

## Moverte entre carpetas

### 5. Volver a la carpeta anterior

```bash
cd -
```

Es como el botón "atrás". Útil cuando saltas entre dos rutas largas.

## Crear tus propios atajos: alias

Añade estas líneas al final de `~/.bashrc`:

```bash
alias ll='ls -lah'
alias actualizar='sudo apt update && sudo apt full-upgrade'
alias ..='cd ..'
```

Después, recarga la configuración (o abre una terminal nueva):

```bash
source ~/.bashrc
```

En Arch Linux, tu alias de actualización sería `sudo pacman -Syu`.

## Aplicar un comando a muchos archivos

```bash
# Contar líneas de todos los .txt de una carpeta
ls *.txt | xargs wc -l

# Buscar y borrar archivos temporales (revisa primero con -print)
find . -name "*.tmp" -print
find . -name "*.tmp" -delete
```

Siempre prueba con `-print` antes de `-delete`; el borrado no pregunta.

## Una costumbre que paga

Cada vez que escribas algo largo dos veces, pregúntate si merece un alias o un script. La mayoría de la automatización empieza así: no con un gran proyecto, sino con ganas de no repetirte.

*¿Tienes un atajo que no aparece aquí? Escríbeme por Telegram y lo añado.*
