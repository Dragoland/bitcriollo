# Documentación Técnica: Rescate de Dell Chromebook 3310 – De ChromeOS a Linux Mint

**Equipo:** Dell Chromebook 3310  
**Procesador:** Intel Celeron (modelo no especificado)  
**Memoria:** 4 GB de RAM  
**Almacenamiento:** eMMC de 32 GB  
**Sistema inicial:** ChromeOS  
**Problema inicial:** ChromeOS exige cuenta de Google funcional y conexión estable a internet. En Cuba, la ausencia de ambas hace que el equipo sea inutilizable para las tareas básicas de la dueña (documentos, PDFs, navegación offline).  
**Objetivo:** Instalar un sistema operativo ligero que funcione sin dependencia de la nube, conservando la funcionalidad del hardware.  
**Resultado final:** Laptop funcionando con Linux Mint Cinnamon. Audio y trackpad corregidos. Sistema autónomo y utilizable offline.

---

## 1. Herramientas utilizadas

- **Linux Mint Cinnamon** (ISO en USB).
- **MrChromebox** (script de flasheo de firmware para habilitar arranque USB).
- **Ventoy** (para gestionar ISOs de arranque).
- **alsa-sof-firmware** y ajustes de PulseAudio (para el audio en Chromebooks).
- **Goma de borrar** (limpieza de contactos, aunque no fue el problema principal).

---

## 2. Cronología de la reparación

### Fase 1: Diagnóstico y decisión del sistema operativo
- Se confirmó que ChromeOS dependía completamente de internet y de una cuenta Google funcional. La dueña no podía siquiera abrir documentos locales sin pasar por la verificación en línea.
- Se descartó Arch Linux por la limitación de 4 GB de RAM y eMMC lento. Se eligió **Linux Mint Cinnamon** por su equilibrio entre ligereza, soporte de drivers y familiaridad para la usuaria final.

### Fase 2: Habilitar el arranque alternativo (Developer Mode y firmware)
- Se activó el **Modo Desarrollador** (Power + Esc + Refresh), lo que borra el almacenamiento y obliga a presionar `Ctrl+D` en cada arranque para evitar la pantalla de verificación.
- Se descargó y ejecutó el script de **MrChromebox** desde la terminal de ChromeOS (`Ctrl+Alt+T`, luego `shell`). El firmware se flasheó para permitir el arranque desde USB. La descarga fue extremadamente lenta por la conexión de 256 kb/s.

### Fase 3: Instalación de Linux Mint y problemas de hardware
- El primer obstáculo fue el **reconocimiento del pendrive de arranque**: la Chromebook 3310 ignoró varios USB 3.0 hasta que se probó uno compatible.
- Linux Mint se instaló sin problemas, pero **el audio no funcionaba**. Las Chromebooks usan un layout de audio basado en SOF/DSP que no es detectado por defecto. Se instaló `alsa-sof-firmware` y se ajustó la configuración de PulseAudio.
- El **trackpad** resultó excesivamente sensible; se ajustaron los parámetros de la libinput para normalizar su comportamiento.

### Fase 4: Verificación final
- El sistema arrancó correctamente, LibreOffice abrió en 5 segundos y la laptop pudo trabajar sin conexión a internet. La dueña quedó satisfecha con la autonomía recuperada.

---

## 3. Comandos y procedimientos clave

### Activar Modo Desarrollador
```text
Power + Esc + Refresh (al encender)
Ctrl + D para arrancar sin verificación
```

### Acceder a la terminal de ChromeOS
```bash
Ctrl + Alt + T
shell
```

### Instalar firmware MrChromebox
```bash
cd ~
curl -L -O https://mrchromebox.tech/firmware-util.sh
sudo bash firmware-util.sh
```

### Corregir audio en Linux Mint
```bash
sudo apt update
sudo apt install alsa-sof-firmware
sudo alsa force-reload
```

### Ajustar sensibilidad del trackpad
```bash
# Identificar el dispositivo
xinput list

# Ajustar velocidad (ejemplo)
xinput set-prop "Elan Touchpad" "libinput Accel Speed" -0.3
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| El pendrive no era reconocido | Incompatibilidad del firmware flasheado con ciertos USB 3.0 | Probar varios pendrives hasta encontrar uno compatible |
| Audio silencioso | Chromebooks usan SOF/DSP en lugar del códec estándar | Instalar `alsa-sof-firmware` y reconfigurar PulseAudio |
| Trackpad “poseído” | Sensibilidad por defecto demasiado alta | Ajustar parámetros de libinput |

---

## 5. Lecciones aprendidas

1. **ChromeOS es inservible sin internet.** En entornos con conectividad intermitente, un sistema operativo offline-first (como Linux Mint) devuelve la utilidad al hardware.
2. **El firmware de las Chromebooks es el principal escollo.** Sin MrChromebox, el arranque USB es prácticamente imposible.
3. **El audio en Chromebooks requiere firmware específico.** No basta con instalar un sistema operativo genérico; hay que añadir los paquetes SOF/DSP.

---

## 6. Estado final del dispositivo

- **Arranque:** Correcto, con Linux Mint Cinnamon.
- **Funciones:** Documentos, PDFs, navegación offline y reproducción de audio operativos.
- **Autonomía:** Total independencia de cuentas Google y de conexión permanente a internet.
- **Sistema:** Linux Mint (versión no especificada).

---

## 7. Recomendaciones para futuros casos similares

- **Antes de flashear el firmware**, verificar la compatibilidad del modelo con el script de MrChromebox.
- **Tener a mano varios pendrives** de distintas marcas y capacidades; las Chromebooks son quisquillosas.
- **Documentar los ajustes de audio y trackpad**, ya que son los fallos post-instalación más comunes en estos equipos.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Rescate de Dell Chromebook 3310 con Linux Mint  
**Estado:** Resuelto ✅
