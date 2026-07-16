---
title: "De ChromeOS a Mint: Rescatando una Laptop Condenada en Cuba"
date: 2026-07-16
tags: [linux, chromebook, mint, hardware, cuba]
excerpt: "Me llegó una Dell Chromebook 3310. En teoría, una laptop para estudiantes. En Cuba, un pisapapeles con WiFi. Esta es la historia de cómo Linux Mint le devolvió la dignidad."
---

🐧 DE CHROMEOS A MINT: Rescatando una Laptop Condenada en Cuba
– Cuando una Dell 3310 conoce a Linux y olvida que alguna vez dependió de Google –

¡Hola comunidad! 👋

Hoy les traigo una historia de rescate tecnológico. Me llegó una **Dell Chromebook 3310** —ese tipo de laptop que las escuelas de otros países donan o venden masivamente, con ChromeOS, 4GB de RAM, eMMC de 32GB y un procesador Celeron que apenas respira. En teoría, es una máquina para estudiantes. En la práctica cubana, es un pisapapeles con WiFi.

💻 **EL PROBLEMA: ChromeOS en Cuba es una broma cruel**

La encendí. ChromeOS pidió cuenta de Google. Luego pidió conexión estable. Luego pidió actualizar. Luego pidió verificar la cuenta. En cada paso, la realidad cubana le decía que no.

• **Sin cuenta de Google funcional**: Los servicios de Google en Cuba son... complicados. No todos tienen correo Gmail activo, y menos uno que quieran vincular a una máquina.
• **Sin conexión estable**: ChromeOS sin internet es como un carro sin gasolina. No abre documentos, no guarda nada local, no hace nada útil.
• **32GB de almacenamiento**: ChromeOS se come 10GB solo por existir. Quedan 22GB para "todo". En Cuba, donde descargas ISOs, películas, y documentos de la UCI, eso es risible.
• **4GB de RAM compartidos con el sistema**: Abrir 3 pestañas del navegador es un acto de fe.

La dueña me la trajo con cara de derrota. *"Es que no sirve para nada"*, me dijo. Y tenía razón. Con ChromeOS, no servía.

🔧 **LA DECISIÓN: Linux Mint, porque la dignidad se impone**

No iba a instalar Arch. No en una máquina de 4GB y eMMC lento. La dueña no quiere aprender a compilar kernels. Quiere escribir sus tesis, ver PDFs, navegar cuando hay internet, y que la laptop no se trabe al abrir LibreOffice.

**Linux Mint Cinnamon** fue la elección obvia:

• **Ligero pero completo**: Cinnamon corre bien en 4GB. No es KDE, pero tampoco es un entorno de 1995.
• **Software Manager integrado**: Instalar apps sin tocar la terminal. Crítico para usuarios que vienen de Windows o de la nada.
• **Driver support sólido**: Las Chromebooks tienen hardware raro (trackpads Elan, audio por DSP, WiFi Broadcom en algunos modelos). Mint suele manejarlo mejor que distros más exóticas.
• **Familiaridad**: Se parece a Windows. La barra de tareas abajo, el menú de inicio, los iconos. Reduce el shock de migración.

⚡ **EL PROCESO: Más drama del que esperaba**

Las Chromebooks no son laptops normales. Tienen **firmware propietario**, arranque verificado (Verified Boot), y una arquitectura de seguridad que asume que Google es tu dueño.

Para instalar Linux hay que:

1. **Activar Developer Mode**: Power + Esc + Refresh, esperar 20 minutos mientras borra todo, y luego presionar Ctrl+D en cada arranque para evitar la pantalla de "OS verification is OFF". Eso último es una tortura para usuarios normales.
2. **Actualizar el firmware con MrChromebox**: Desde ChromeOS, abrir terminal (Ctrl+Alt+T, luego `shell`), descargar el script de firmware, y flashear el BIOS para que acepte arranque USB. Suena fácil. En una conexión de 256 kb/s, descargar el script es un viaje espiritual.
3. **Bootear Linux Mint desde USB**: Aquí apareció el primer problema. La Chromebook 3310 tiene puertos USB 3.0, pero el firmware flasheado a veces no reconoce ciertos pendrives. Tuve que probar 3 hasta que uno funcionó.
4. **Instalación y drivers**: Mint instaló sin problemas. Pero el audio no funcionaba. Ni siquiera el pitido de error. Resulta que las Chromebooks usan un layout de audio diferente (SOF / DSP). Tocó instalar `alsa-sof-firmware` y tocar configuraciones de PulseAudio. El trackpad también necesitó ajustes —era demasiado sensible, como si estuviera poseído.

Todo esto tomó una tarde completa. Entre descargas lentas, reinicios, y maldiciones en voz baja.

📸 **EL RESULTADO**

*Imagenes proximamente*

Ver esa máquina —que hacía 24 horas era un ladrillo glorificado— corriendo Mint, abriendo documentos, navegando, reproduciendo música... fue satisfactorio. No es rápida. No es potente. Pero ahora **es útil**.

🔥 **MI REFLEXIÓN:**

ChromeOS no es malo. En un país con internet estable, cuentas Google funcionales, y una cultura de trabajo en la nube, tiene sentido. Pero en Cuba, donde el offline es la norma y la nube es un lujo intermitente, ChromeOS es una sentencia de obsolescencia.

Linux Mint le dio a esa laptop algo que ChromeOS le negaba: **autonomía**. Ahora puede trabajar sin internet. Puede guardar archivos localmente. Puede instalar software sin pedirle permiso a Google. Puede ser una herramienta real en lugar de un terminal para servicios que no funcionan.

Y lo más importante: la dueña sonrió cuando vio LibreOffice abrirse en 5 segundos. Esa sonrisa vale más que cualquier benchmark.

¿Y ustedes? ¿Han rescatado hardware "condenado" con Linux? ¿Tienen una Chromebook abandonada por culpa de ChromeOS? ¿Qué distro le pondrían a una máquina de 4GB en 2026?

¡Los leo! 👇

~ Dragoland 🐉  
*Usuario de Arch Linux, pero pragmático cuando toca*

📲 ¿Te interesan estas historias de rescate técnico? Únete aquí:  
👉 https://t.me/diario_del_informatico

#Chromebook #LinuxMint #Cuba #RescateTecnologico #ChromeOS #Linux #UCI #HardwareLibre #Mint #OpenSource

**PD:** Escribí este post en mi Arch Linux con Hyprland, mientras la Dell 3310 terminaba una actualización de Mint al lado. La ironía de usar Arch para escribir sobre Mint no se me escapa. Pero bueno, cada máquina tiene la distro que necesita. 🔥
