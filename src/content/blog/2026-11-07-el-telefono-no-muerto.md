---
title: "📱 EL TELÉFONO NO-MUERTO: El Redmi A2, el Desbloqueo FRP y el Terror del Bucle BROM"
date: 2026-11-07
tags: [xiaomi, redmi, mtkclient, frp, bootloader, brom, linux, arch, reparacion, cuba]
excerpt: "Un Redmi A2 regalado que quedó bloqueado por FRP, un formateo ingenuo, un bache de Arch Linux roto, mtkclient al límite, una cabecera de preloader destruida y el rescate técnico más intenso y satisfactorio de mi vida. Un digno teléfono para el descabezado de Dead Cells."
---

# 📱 EL TELÉFONO NO-MUERTO: El Redmi A2, el Desbloqueo FRP y el Terror del Bucle BROM
## – O cómo resucité un Xiaomi bloqueado por Google después de transformar mi PC en un quirófano de bajo nivel –

---

¡Hola comunidad! 👋 Hoy les traigo la que es, sin lugar a dudas, la historia de reparación más compleja, tensa y al mismo tiempo **más satisfactoria** que he tenido en mis manos hasta la fecha. Si mis casos anteriores con laptops condenadas, torres con falsos positivos de corriente o discos moribundos ya me habían hecho sudar la gota gorda, lo que van a leer a continuación supera cualquier límite técnico al que me haya enfrentado antes. Este dispositivo sobrevivió a tantas "muertes" en el taller que bien podría ser el teléfono oficial del descabezado de *Dead Cells*.

Todo comenzó hace unas dos semanas, cerca de las 2 de la tarde. Un conocido al que le guardo un tremendo cariño se apareció en la casa con una sonrisa y un "hierro" nuevo en las manos: un **Xiaomi Redmi A2** (codename `water`, impulsado por un chipset MediaTek MT6765 Helio G36 y 64 GB de memoria eMMC). Se lo había regalado un primo que ya se había comprado otro teléfono y, para no dejarlo cogiendo polvo, decidió pasárselo. 

El problema era que el dispositivo venía con trampa. Al encenderlo tras un reinicio de fábrica, exigía obligatoriamente el correo electrónico y la contraseña de la cuenta de Google vinculada anteriormente (el famoso bloqueo **FRP** - *Factory Reset Protection*), datos que nadie conocía. 

— *"No será muy complejo, entro a modo recovery y aplico un wipe factory"* — pensé, pecando de una inocencia colosal. 

Hice mi tarea, investigué cómo entrar y logré formatear el teléfono desde el recovery. ¿El resultado? Absolutamente nada. Seguía pidiendo la dichosa cuenta. Entré en modo fastboot e intenté buscar alguna salida rápida, descubriendo que el bootloader estaba completamente bloqueado. Como el teléfono era un ladrillo elegante e inservible en esas condiciones, mi amigo me lo dejó en la mesa para ver si "milagrosamente" lograba hacer algo con él.

*(Dato curioso de color local: para empeorar las cosas, en medio de este panorama, mi sistema operativo principal —Arch Linux— decidió romperse por una actualización parcial de paquetes al actualizar `curl` sin el resto del entorno, dejando mi interfaz gráfica de Hyprland y mi gestor `pacman` patas arriba. ¡Tenía mi propia PC en cirugías paralelas mientras lidiaba con el teléfono!)*

Pasé aproximadamente dos semanas estudiando, leyendo foros de XDA y empapándome de un mundo que no es mi especialidad principal (yo desarrollo y reparo PCs, no móviles), hasta que el viernes 6 de noviembre logré el objetivo. Pónganse cómodos, porque lo que van a leer a continuación es una autopsia técnica en toda regla.

---

## 🛠️ Fase 1: Entrando al quirófano con mtkclient y el miedo a flor de piel

Como el culpable del bloqueo era el FRP —una partición de seguridad diseñada para evitar el uso tras robos—, investigué a fondo cuál era la herramienta ideal para este procesador MediaTek. Encontré un proyecto de código abierto maravilloso llamado **mtkclient** (https://github.com/bkerler/mtkclient). 

Lo primero que tuve que hacer fue aprender a conectar el teléfono en **modo BROM** (un estado de bajo nivel directo en el silicio del procesador). Reconozco que al principio me dio un miedo tremendo; en estos niveles, un paso en falso puede convertir un teléfono en un pisapapeles permanente. 

Una vez dentro y con mtkclient respondiendo en mi terminal de Arch Linux, lo primero que hice por pura prudencia fue un **backup completo de todo el sistema** (unos 58.2 GB):
```bash
python mtk.py rf backup_completo.img --preloader preloader_fixed.bin
```
*(Nota técnica importante que entenderíamos después: este comando con `mtk rf` solo respalda el área **EMMC_USER** de datos de usuario, dejando fuera las particiones críticas de arranque `boot1`/`boot2` donde vive el preloader con su cabecera física).*

Armado de valor, ejecuté el comando para borrar la partición FRP. Pensé que el trabajo estaba hecho, pero al encender el teléfono, el sistema me saludó con un mensaje aterrador: **"El sistema está destruido"**. Entré en pánico absoluto. No me quedaba otra que flashear el firmware oficial completo (unas 3 GB descargadas desde XDA para el codename `water`) usando únicamente herramientas de software desde la PC.

---

## 💀 Fase 2: El error crítico y el viaje directo al bucle BROM

Empecé a flashear partición por partición de forma manual, pero el sistema insistía en arrojarme de regreso al modo fastboot de manera cíclica. En un momento de confusión, intenté manipular directamente los sectores de arranque escribiendo un archivo `preloader` de 240 KB (`preloader_water.bin`) en la partición `boot1` usando el comando de escritura genérica `w`.

**¡Pum! Error crítico de novato.** Al hacer eso, **sobrescribí y destruí por completo la cabecera física `EMMC_BOOT`** que contenía la información de arranque del chip. 

El teléfono dejó de encender por completo y entró en un bucle BROM infinito: la placa ya no reconocía ningún comando y el procesador se negaba a arrancar. Había logrado dejar el Redmi A2 todavía más inservible que cuando me lo entregaron.

Durante horas, analicé con herramientas hexadecimales (`xxd`) los volcados que tenía. Confirmé que las regiones `boot1` y `boot2` empezaban directamente con datos genéricos y carecían de la cabecera `EMMC_BOOT`. Intenté extraerla de mi backup anterior, pero como `mtk rf` no toca las regiones de boot, la cabecera simplemente no estaba allí. 

Tras probar múltiples alternativas fallidas (incluyendo SP Flash Tool v5 que arrojaba errores de Qt y v6 que exigía archivos XML ausentes), la solución apareció: conseguí un **preloader completo con su cabecera `EMMC_BOOT` intacta** proveniente de un volcado de ingeniería para el modelo `water`. Lo flasheé cuidadosamente en las regiones `boot1` y `boot2` usando el script parcheado:
```bash
python mtk.py w preloader preloader_con_cabecera.bin --parttype=boot1 --preloader preloader_fixed.bin
python mtk.py w preloader preloader_con_cabecera.bin --parttype=boot2 --preloader preloader_fixed.bin
```
¡Y el milagro ocurrió! El teléfono por fin volvió a mostrar vida, encendiendo hacia el menú Fastboot y Recovery.

---

## 🔓 Fase 3: Rompiendo las cadenas del RPMB y el demonio del dm-verity

Con el bootloader accesible, quedaba el siguiente muro: el estado de seguridad de Xiaomi. A pesar de intentar comandos como `seccfg unlock`, el sistema seguía bloqueado debido a la "magia" del **RPMB** (*Replay Protected Memory Block*), una zona de almacenamiento ultrasegura en las memorias eMMC.

Investigando los registros del dispositivo, localicé el sector RPMB exacto para este modelo específico con MT6765: el **sector 16352**. Tuve que purgar ese sector y forzar el cambio de bandera de seguridad mediante mtkclient:
```bash
python mtk.py da rpmb e --sector 16352 --sectors 4 --preloader preloader_fixed.bin
python mtk.py da seccfg unlock --preloader preloader_fixed.bin
```
¡Victoria parcial! El comando devolvió lo esperado: `unlocked: yes` y `secure: no` en el gestor de arranque. 

Sin embargo, el camino no estaba libre. El sistema seguía arrojando un aviso de integridad corrupta (`dm-verity`) y se negaba a arrancar del slot activo, decrementando los contadores de reintento (`slot-retry-count`) y atrapándome en un bucle de bucles. El motivo principal era que la partición masiva `super.img` es una imagen de tipo *sparse* (comprimida lógicamente), y `mtkclient` no sabe cómo escribirla correctamente de golpe a bajo nivel.

---

## ⚡ Fase 4: La salvación final y el script milagroso

Viendo que los comandos manuales individuales a través de mtkclient dejaban inconsistencias en las particiones virtuales A/B, decidí cambiar de estrategia y recurrir al método nativo del fabricante adaptado a Linux. 

Utilicé el script oficial de flasheo masivo **`flash_all.sh`** incluido dentro del paquete de firmware original `V14.0.44.0.TGOMIXM`. Este script sí sabe interpretar y descomprimir correctamente las imágenes *sparse* como `super.img`, además de flashear de manera coherente todas las particiones del sistema de una sola pasada:
```bash
./flash_all.sh
```

Contuve la respiración mientras la terminal escupía líneas y líneas de código ejecutándose. El script reescribió `super`, `boot`, `vbmeta` y el resto de los componentes del sistema operativo de manera limpia. Tras unos minutos interminables, el teléfono se reinició automáticamente...

Y entonces sucedió. Apareció el logotipo de carga de Xiaomi, seguido de la interfaz limpia de MIUI 14. **El teléfono arrancó perfectamente, directo al asistente de configuración inicial, ¡sin rastro alguno del molesto bloqueo FRP!**

---

## 🔍 Fase 5: Verificación de rigor en el taller

Una vez con el sistema operativo levantado, procedí a realizar las comprobaciones técnicas indispensables para certificar que el equipo no tuviera efectos secundarios:

- **IMEI:** Verifiqué mediante el código `*#06#` y por comandos de fastboot (`fastboot getvar imei`). El número de 15 dígitos aparecía intacto y coincidía perfectamente con la etiqueta de la caja original del teléfono.
- **Conectividad y Hardware:** Probé llamadas, datos móviles, redes Wi-Fi, la cámara principal y los sensores internos. Todo operaba con absoluta normalidad.
- **Estado del Bootloader:** Se quedó en `unlocked: yes`, listo y funcional.

---

## 💻 LO QUE APRENDÍ EN ESTA MONUMENTAL AVENTURA

Esta reparación superó con creces cualquier desafío previo que hubiera enfrentado en mi corta trayectoria como técnico:

1. **Los respaldos parciales tienen letras pequeñas:** Un backup de datos de usuario (`mtk rf`) no incluye las áreas críticas de arranque como `boot1`/`boot2`. Tocar esas particiones a ciegas destruye la cabecera `EMMC_BOOT` y te manda directo al infierno del bucle BROM.
2. **Herramientas de bajo nivel exigen precisión quirúrgica:** Conocer comandos de terminal, sintaxis de scripts en Python, uso de editores hexadecimales y el manejo de particiones A/B en MediaTek dejó de ser teoría y se convirtió en práctica obligatoria.
3. **La paciencia vence al pánico:** Estar dos semanas lidiando con un teléfono "muerto" mientras mi propio Arch Linux se rompía por una actualización de paquetes estuvo a punto de hacerme tirar la toalla. Pero la constancia, la lectura de foros especializados y el análisis lógico dieron frutos.

---

## 🔥 MI REFLEXIÓN PERSONAL

Devolverle la vida a este Redmi A2 ha sido, sin discusión, la victoria técnica más gratificante de mi vida. Ver la cara de alegría de mi amigo cuando vino a buscar su teléfono funcionando al 100%, libre de cuentas ajenas y totalmente operativo, hizo que valiera la pena cada hora de frustración frente a la pantalla de mi terminal. 

No estudié telefonía móvil formalmente, mi fuerte siempre han sido las computadoras. Pero esto demuestra que con curiosidad, ganas de aprender, disciplina y una comunidad global dispuesta a compartir código abierto (como los creadores de mtkclient), no hay hierro imposible de rescatar. 

---

## ¿Y ustedes? ¿Se han metido alguna vez en un lío tan grande con un teléfono bloqueado por FRP? ¿Alguna vez han estado al borde de romper un dispositivo por tocar lo que no debían a bajo nivel?

**¡Los leo!** 👇 Dejen sus experiencias y comentarios abajo en la caja de debate. ¡Nos vemos en la próxima aventura técnica!

---

~ Dragoland 🐉  
*Técnico empírico, explorador de sistemas embebidos y apasionado del software libre*

---

## 📲 ¿Te gustan estas crónicas técnicas?

Visita mi sitio web para más contenido, análisis y guías prácticas:  
👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis publicaciones y debates, únete a mi canal de Telegram:  
👉 **https://t.me/diario_del_informatico**

#Xiaomi #RedmiA2 #FRP #Mtkclient #Bootloader #BROM #Linux #ArchLinux #ReparacionMovil #Hardware #BitCriollo #Cuba #Tecnologia