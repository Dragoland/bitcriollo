---
title: "Instalar Linux Mint en una PC vieja, paso a paso"
date: 2026-09-03
tags: [tutorial, linux, instalación]
excerpt: "Del archivo ISO a una PC lenta que vuelve a la vida: cómo verificar la descarga, crear el USB de instalación y dejar el sistema listo."
---

Esa PC con Windows que tarda cinco minutos en arrancar puede tener una segunda vida. **Linux Mint** es de las distribuciones más amables para quien viene de Windows y funciona bien en equipos modestos. Vamos con la guía completa.

## Antes de empezar

- **Respalda tus archivos.** Si vas a borrar el disco, no hay vuelta atrás.
- Necesitas una memoria USB de 8 GB o más (se borrará) y otra PC para prepararla, o la misma PC si todavía arranca.
- Como referencia, Mint pide mínimo 2 GB de RAM (mejor 4 GB) y unos 20 GB de disco.
- Las versiones actuales son solo de **64 bits**. Compruébalo en Linux con `lscpu` (línea *CPU op-mode*), o en Windows en *Información del sistema*.

## 1. Descargar y verificar la ISO

Descarga la edición **Cinnamon** desde la web oficial, linuxmint.com. Descarga también el archivo de sumas `sha256sum.txt` y comprueba que el archivo no se corrompió, algo muy común con conexiones inestables:

```bash
sha256sum linuxmint-*.iso
```

Compara el resultado con el que aparece en `sha256sum.txt`. Si no coincide, la descarga está dañada y hay que repetirla.

## 2. Crear el USB de instalación

### Opción A: dd (Linux)

Identifica tu memoria con `lsblk` y **fíjate bien** en cuál es. Se usa el dispositivo completo (`/dev/sdb`), no la partición (`/dev/sdb1`).

```bash
lsblk
sudo umount /dev/sdb*
sudo dd if=linuxmint-*.iso of=/dev/sdb bs=4M status=progress oflag=sync
```

> ⚠️ `dd` escribe sobre lo que le digas sin preguntar. Si pones el disco equivocado, pierdes todo lo que haya en él.

### Opción B: Ventoy (Windows o Linux)

Instala **Ventoy** en la memoria una sola vez y luego basta con **copiar los ISO** como archivos normales. Es ideal si quieres llevar varios sistemas en el mismo USB.

## 3. Arrancar desde el USB

Reinicia la PC y pulsa la tecla del menú de arranque. Depende de la marca: suele ser **F12**, **F2**, **Esc**, **F10** o **Supr**. Elige tu memoria y entra en **Start Linux Mint**.

Se carga el sistema en modo *live*: puedes probarlo sin instalar nada y comprobar que el WiFi, el sonido y la pantalla funcionan.

## 4. Instalar

1. Abre el icono **Install Linux Mint** en el escritorio.
2. Elige idioma y distribución de teclado.
3. Marca instalar códecs multimedia si tienes internet.
4. Tipo de instalación:
   - **Borrar el disco e instalar Linux Mint**: deja solo Linux (lo más sencillo).
   - **Otra cosa**: para dejar convivir con Windows, solo si ya sabes particionar.
5. Crea tu usuario y contraseña, espera que termine y reinicia sin el USB.

## 5. Después de instalar

```bash
sudo apt update && sudo apt full-upgrade
```

Y tres ajustes que valen la pena:

- **Gestor de controladores** (*Driver Manager*): instala los controladores privativos que tu hardware necesite.
- **Timeshift**: crea una instantánea del sistema recién instalado, para poder volver atrás si algo sale mal.
- Quita del inicio las aplicaciones que no uses para que arranque aún más rápido.

## ¿Y si algo falla?

- **No aparece en el menú de arranque:** revisa que el USB esté bien creado y prueba otro puerto USB.
- **WiFi sin funcionar:** casi siempre se resuelve en el *Driver Manager*.
- **No arranca el instalador:** prueba el modo seguro de gráficos que ofrece el menú del USB.

Si prefieres que yo lo haga, la migración a Linux y el respaldo previo de tus archivos son uno de mis servicios más pedidos.
