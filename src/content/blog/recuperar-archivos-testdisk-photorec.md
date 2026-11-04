---
title: "Recupera archivos borrados en Linux con TestDisk y PhotoRec"
date: 2026-06-12
tags: [tutorial, linux, recuperación-de-datos]
excerpt: "Borraste fotos o una carpeta entera sin querer. Con dos herramientas libres y algo de calma, muchas veces se pueden recuperar."
---

Pasa más de lo que se admite: formateas la memoria equivocada, vacías la papelera con prisa o una partición "desaparece". La buena noticia es que borrar un archivo casi nunca lo borra de verdad: solo marca ese espacio como libre. Mientras nadie lo sobrescriba, hay esperanza.

## Regla de oro

**Deja de usar el disco o la memoria afectada ya.** Cada archivo nuevo que guardes puede pisar justo lo que quieres recuperar.

## 1. Instalar las herramientas

```bash
# Arch Linux
sudo pacman -S testdisk

# Debian, Ubuntu, Linux Mint
sudo apt install testdisk
```

El paquete trae dos programas: **TestDisk** (para particiones perdidas) y **PhotoRec** (para archivos sueltos).

## 2. Identificar el disco

```bash
lsblk -f
```

Busca tu memoria o disco por tamaño y sistema de archivos (por ejemplo `/dev/sdb1`). Equivocarte de dispositivo aquí es el error más caro, así que míralo dos veces.

## 3. Recuperar archivos con PhotoRec

Crea una carpeta de destino **en otro disco** distinto al que estás recuperando:

```bash
mkdir ~/recuperados
sudo photorec /d ~/recuperados/ /dev/sdb
```

En el menú interactivo:

1. Elige el disco y pulsa Enter en `[Proceed]`.
2. Elige la partición.
3. En `[File Opt]` puedes marcar solo los tipos que buscas (jpg, pdf, docx…). Ahorra muchísimo tiempo.
4. Tipo de sistema de archivos: `ext2/ext3` sirve también para ext4; para FAT, NTFS o exFAT elige `Other`.
5. Elige `Free` para buscar solo en el espacio libre (lo normal tras borrar) o `Whole` para todo.
6. Confirma la carpeta de destino y espera.

PhotoRec no conserva los nombres originales: los archivos salen como `f123456.jpg`, repartidos en carpetas `recup_dir.1`, `recup_dir.2`… Toca revisarlos, pero las fotos vuelven.

## 4. Si lo que desapareció fue una partición

```bash
sudo testdisk
```

Elige `Create` para crear el registro, selecciona el disco, el tipo de tabla de particiones (`Intel` para MBR, `EFI GPT` para GPT), luego `Analyse` y `Quick Search`. Si aparece tu partición, puedes revisar sus archivos con `P` y escribir la tabla con `Write`.

## Si el disco hace ruidos raros

Un disco que falla físicamente empeora con cada intento. Primero haz una copia con `ddrescue` y trabaja sobre la copia:

```bash
sudo ddrescue -n /dev/sdb imagen.img mapa.log
sudo photorec /d ~/recuperados/ imagen.img
```

## Límites honestos

- En **SSD** con TRIM activo, lo borrado suele desaparecer de verdad y la recuperación es mucho más difícil.
- Archivos sobrescritos o cifrados no se recuperan.
- Si los datos son muy importantes y el disco está dañado, no lo sigas probando tú: apágalo y busca ayuda.

Si no te sientes seguro haciéndolo, escríbeme antes de tocar nada. Diagnosticar es gratis y no empeora la situación.
