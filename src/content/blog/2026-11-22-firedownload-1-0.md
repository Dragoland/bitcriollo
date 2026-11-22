## title: "🔥 FIREDOWNLOAD 1.0.0: Rescatando un Proyecto Abandonado con Python, PySide6 y Azul Arch"
date: 2026-11-22
tags: \[python, pyside6, ytdlp, software, linux, archlinux, opensource, desarrollo, cuba\]
excerpt: "Había dejado este gestor de descargas cogiendo polvo en el disco. Hoy lo rescato con una interfaz fluida en PySide6, manejo real de colas, soporte para el nuevo runtime de YouTube y estética Arch Linux."

# 🔥 FIREDOWNLOAD 1.0.0: Rescatando un Proyecto Abandonado con Python, PySide6 y Azul Arch

## – O cómo darle a yt-dlp la interfaz gráfica fluida y sin dolores de cabeza que siempre mereció –

¡Hola comunidad! 👋 Hoy hacemos una pequeña pausa en las reparaciones de placas base, los rescates de discos moribundos y las cirugías de teléfonos en modo BROM para traerles algo nacido directamente desde mi teclado y mi terminal: **el lanzamiento oficial de FireDownload 1.0.0**.

Si me siguen desde hace tiempo, sabrán que en Cuba descargar contenido de internet no es simplemente darle clic a un botón y esperar dos segundos. Aquí, donde cada megabyte cuenta y las conexiones tienen sus propios caprichos, herramientas de consola como **`yt-dlp`** son prácticamente religión. Sin embargo, no todo el mundo quiere —ni tiene por qué— memorizar banderas infinitas en una terminal para bajar un video con subtítulos o extraer una pista de audio.

Hace un tiempo había empezado a programar una interfaz para resolver esto, pero, como pasa con muchos proyectos personales cuando la vida y las reparaciones se atraviesan, **lo dejé abandonado**. La primera versión cumplía a duras penas, pero se sentía tosca, le faltaba fluidez y podía arruinar la experiencia de usuario si le pedías demasiado.

Así que decidí retomarlo desde sus cimientos, refactorizar la arquitectura entera y darle el frontend y el backend que realmente merecía. Hoy, por fin, está listo y publicado en GitHub.

🔗 **Repositorio oficial:** [github.com/Dragoland/firedownload](https://github.com/Dragoland/firedownload)

## 💻 LA ARQUITECTURA: Python, PySide6 y Estética Arch

Para que el proyecto fuera multiplataforma (funciona en **Linux, Windows y macOS**) y no se sintiera como un wrapper lento hecho a las prisas, aposté por una combinación sólida:

* **Backend en Python 3.10+**: Modularizado limpiamente (`core/worker`, `core/manager`, `core/queue_store`), separando la lógica de ejecución de la interfaz para que la ventana jamás se congele mientras descarga o procesa archivos.

* **Frontend en PySide6 (Qt)**: Una interfaz nativa, reactiva y rápida, diseñada con un **tema oscuro y acentos en azul Arch** (porque el fanatismo también se lleva en la paleta de colores 😎).

* **Motor `yt-dlp` + `FFmpeg`**: Toda la potencia de extracción multimedia bajo el capó, pero controlada de forma visual.

## 🚀 ¿QUÉ TRAE FIREDOWNLOAD 1.0.0? (Las armas de la bestia)

No quería hacer simplemente "una cajita donde pegas un link y das Enter". Quería una herramienta de verdad, pensada para el uso diario y para los imprevistos:

1. **Control real sobre la cola de descargas:** Concurrencia configurable, importación masiva desde archivos `.txt`, arrastrar y soltar URLs, vigilancia opcional del portapapeles y **pausa/reanudación real del proceso**. Además, la cola es persistente: si cierras la app o se va la corriente (un clásico cubanísimo), al volver a abrirla tus descargas siguen ahí esperando.

2. **Buscador integrado y visor de metadatos:** Puedes buscar directamente en **YouTube y SoundCloud** con miniaturas sin salir de la app. Antes de descargar, puedes inspeccionar calidades, capítulos, peso estimado y hasta reproducir una **vista previa** dentro de la misma ventana.

3. **Gestión avanzada de audio, subtítulos y playlists:** ¿Necesitas varias pistas de audio? Las empaqueta automáticamente en un `.mkv`. ¿Subtítulos manuales o automáticos en `.srt` o incrustados? Listo. ¿Pegaste una playlist de 50 videos por error? La app te avisa y te deja elegir exactamente cuáles quieres bajar.

4. **Adaptado al YouTube moderno (Deno / Node 20+):** Desde finales de 2025, `yt-dlp` exige un runtime de JavaScript (`yt-dlp-ejs`) para resolver los formatos de YouTube sin errores de disponibilidad. FireDownload detecta automáticamente si tienes **Deno** o **Node 20+** instalado y te avisa en la barra de estado si falta algo.

5. **Diagnóstico integrado:** Incluye una herramienta de *"Comprobar instalación"* que audita tu entorno, verifica `FFmpeg` y realiza una prueba real, además de un visor de registros (`logs`) y botones para copiar errores detallados.

## 🛠️ INSTALACIÓN RÁPIDA

Si quieres probarlo ahora mismo en tu máquina (especialmente si vienes de Linux o ya tienes Python configurado), levantar el entorno es cuestión de cuatro líneas en la terminal:

```
git clone https://github.com/Dragoland/firedownload.git
cd firedownload
python -m venv .venv
source .venv/bin/activate        # En Windows: .venv\Scripts\activate
pip install -r requirements.txt
python main.py

```

*(Nota: Si quieres tener todas las funciones de unión de video/audio en alta calidad y conversión de subtítulos, asegúrate de tener `FFmpeg` en tu PATH).*

## 🔥 MI REFLEXIÓN PERSONAL: El valor de no dejar las cosas a medias

Retomar código viejo siempre da un poco de vértigo. Al principio ves lo que escribiste meses atrás y piensas: *"¿En qué estaba pensando cuando programé esto?"*. Pero reescribir FireDownload desde cero —añadiendo incluso pruebas automatizadas con `pytest` y Qt en modo offscreen— me recordó por qué amo el desarrollo de software tanto como el hardware.

Cuando reparo una torre o revivo un teléfono bloqueado, le devuelvo la utilidad a un objeto físico. Cuando programo una herramienta libre y la subo a GitHub, estoy creando algo que cualquiera puede descargar, usar, auditar y mejorar sin pagar licencias ni tragarse anuncios invasivos.

## ¿Y ustedes? ¿Qué herramientas usan para descargar contenido multimedia? ¿Se animan a probar FireDownload y romperlo para reportar bugs?

**¡Los leo!** 👇 Si lo prueban en Windows, macOS o en sus distros de Linux favoritas, cuéntenme cómo les va. Las estrellas en el repositorio de GitHub, las sugerencias y los *issues* son más que bienvenidos.

\~ Dragoland 🐉

*Desarrollador empírico, amante de Python y usuario orgulloso de Arch Linux*

## 📲 ¿Te gustan estos proyectos y crónicas técnicas?

Visita mi sitio web para más contenido, software y guías prácticas:

👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis lanzamientos y debates técnicos, únete a mi canal de Telegram:

👉 **https://t.me/diario_del_informatico**

#Python #PySide6 #FireDownload #YtDlp #OpenSource #Linux #ArchLinux #SoftwareLibre #BitCriollo #Cuba #Desarrollo