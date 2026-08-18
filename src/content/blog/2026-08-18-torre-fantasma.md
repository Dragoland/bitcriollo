---
title: "TORRE FANTASMA: El Misterio USB y el Puente que Resucitó la ASUS H81M-P Plus"
date: 2026-08-18
tags: [windows, asus, motherboard, hardware, cuba]
excerpt: "La vez que me hizo recordar que YouTube no es solo entretenimiento, es tambien para aprendizaje. Estos son el tipo de casos que ni Fernanda hubiera resuelto."
---

# 🐧 TORRE FANTASMA: El Misterio USB y el Puente que Resucitó la ASUS H81M-P Plus
## – O cómo un Short de YouTube me salvó de devolver una PC "muerta" –

---

¡Hola comunidad! ¿Alguna vez han tenido una computadora que les haga pasar una semana entera de pesadilla técnica, solo para descubrir que la solución era ridículamente simple y encima la encontraron en un video de 60 segundos mientras se tomaban un café? Pues déjenme contarles la odisea de una torre que llegó a mis manos para "solo instalar Windows 10" y terminó convirtiéndose en mi mayor desafío de hardware hasta la fecha, con un final que parece sacado de una película de suspense tecnológico. 🛠️

---

## 📦 EL PROBLEMA: Cuando la Torre Llegó con Mala Actitud (y sin video)

Recibo una torre para una reinstalación completa de Windows 10. Nada del otro mundo, algo que he hecho cientos de veces. Las especificaciones técnicas eran modestas pero funcionales: **placa base ASUS H81M-P Plus** (un clásico de 2015), un procesador **Intel Core i5 de 5ta generación**, **8 GB de RAM DDR3** distribuidos en dos módulos de 4 GB cada uno, y un **disco duro HDD de 1 TB** que ha estado guardada por el usuario sin uso desde hace un buen tiempo. Todo apuntaba a un trabajo de rutina de una tarde.

Pero cuando conecté la corriente y presioné el botón de encendido… **silencio absoluto en el monitor**. Los ventiladores giraban, los LED de la placa se encendían, pero la pantalla permanecía en un negro profundo e inmutable. Ni siquiera el logo de ASUS aparecía. Mi primer pensamiento fue: "Vaya, hoy va a ser uno de esos días". 😅

### 🔍 Primer Diagnóstico y Solución Rápida (la calma antes de la tormenta)

Después de un breve momento de pánico existencial, respiré hondo y recordé la regla de oro del técnico: **siempre sospechar de la RAM primero**. Los módulos DDR3 son especialmente sensibles a la oxidación en sus conectores dorados, sobre todo en equipos que han estado apagados mucho tiempo en quien sabe que lugares.

Con mucho cuidado, extraje ambas tarjetas de sus ranuras, tomé una goma de borrar suave (de esas de lápiz, que son perfectas para limpiar contactos) y froté suavemente cada una de las líneas doradas hasta que brillaron como el primer día. Las volví a colocar, asegurándome de que hicieran "click" en ambos lados, y presioné el botón de encendido de nuevo.

¡Voilà! La pantalla cobró vida. El logo de ASUS apareció, el sistema comenzó a cargar Windows y todo parecía funcionar a la perfección. El primer arranque fue impecable. El cliente quedaría satisfecho, el trabajo estaría terminado en un par de horas y yo podría dedicarme a mis proyectos personales.

**Error número 1:** Confiar ciegamente en que todo estaría bien a partir de ese momento. El universo técnico siempre tiene una segunda vuelta de tuerca preparada.

---

## 💀 EL TERROR: American Megatrends y los 15 Segundos Fatídicos

Me dispongo a reiniciar el equipo para bootear desde el USB de instalación de Windows 10. Antes de eso, entro a la BIOS para desactivar el Secure Boot (ese bendito mecanismo de seguridad que a veces nos complica la vida) y ajustar el orden de arranque. Todo normal, todo tranquilo.

![BIOS de la ASUS H81M-P Plus mostrando la configuración de Secure Boot](https://bitcriollo.pages.dev/images/bios_torre.jpg)

Guardo los cambios, la PC se reinicia, y en lugar del alegre logo de Windows o el menú de arranque, me encuentro con una pantalla negra y un cartel que me heló la sangre. Era el típico fondo rojo/negro de **American Megatrends (AMI)** , pero con un mensaje que jamás había visto en mis años de experiencia:

```
WARNING: USB Overcurrent detected!
System will shut down in 15 seconds...
```

La cuenta regresiva comenzó. 15… 14… 13… Y lo peor: en ese estado, **la PC no respondía a ningún comando**. Ni siquiera podía presionar F2, DEL o F10 para entrar a la BIOS. El teclado parecía muerto. El ratón, también. Era como si la placa base hubiera decidido bloquear toda interacción humana y autodestruirse en un acto de rebeldía digital. 😱

### ⏳ Una Semana de Frustración y Experimentos Fracasados

Así comenzó mi calvario. Durante los siguientes siete días, intenté absolutamente todo lo que mi conocimiento técnico y mi intuición me dictaban. Cada dia, después de un poco de trabajo tipico, me sentaba frente a esa torre maldita con una mezcla de determinación y desesperación.

La lista de intentos fallidos fue larga y dolorosa:

• **Desconectar todos los puertos USB frontales** (los del panel del case) → Nada. El error persistía. El problema no estaba en el cableado frontal.

• **Desconectar absolutamente todos los periféricos** (ratón, teclado, etc) → Nada. La placa seguía gritando "overcurrent" como si tuviera un corto interno.

• **Revisar minuciosamente los pines de los puertos USB** en busca de oxidación, dobleces o suciedad → Todo estaba en perfecto estado. Los puertos se veían impecables.

• **Probar con otra fuente de poder** (por si el problema venía de la alimentación) → Nada. La fuente no era la culpable.

• **Quitar la batería CMOS** para forzar un reseteo de la BIOS → Para mi sorpresa, la placa ¡ni siquiera tenía la batería CMOS! Había sido removida en algún momento del pasado y nunca reemplazada. Eso descartaba esa vía de solución.

El problema era más profundo: residía en los **puertos USB que están soldados directamente a la placa base**, específicamente los que se ubican cerca del puerto VGA en el panel trasero de E/S. Esos puertos no se pueden desconectar simplemente tirando de un cable; requieren conocimientos de electrónica y soldadura para ser removidos, y yo no estaba dispuesto a arriesgarme a dañar permanentemente la placa con un cautín si no estaba 100% seguro de que ese era el fallo (y mas que nunca he manejado eso en mi vida).

Cada vez que encendía la PC, el mismo mensaje, la misma cuenta regresiva, la misma impotencia. La torre se había convertido en un ladrillo carísimo con ventiladores ruidosos. Mi orgullo de técnico estaba por los suelos. 🤡

---

## 🧠 EL DESCUBRIMIENTO: Un Short de YouTube que lo Cambió Todo

Era un domingo por la tarde despues de una feria dominical de Placetas. Derrotado, con la torre a medio armar sobre mi escritorio, decidí tomarme un descanso y desconectar un rato. Me tire a la cama de mi cuarto, agarré mi teléfono y comencé a hacer scroll en YouTube, como hace cualquiera que busca procrastinar después de una semana de fracasos.

Fue entonces cuando el algoritmo, en su infinita sabiduría, me sugirió un **Short de apenas 60 segundos**. El título era algo así como: "ASUS no da video - SOLUCIÓN DEFINITIVA". El técnico del video mostraba una placa ASUS más moderna, una de las serie B o Z de generaciones recientes, que tenía la particularidad de no dar video despues de varios arreglos y medidas: arrancaba pero sin dar nada de video. Había probado de todo, exactamente igual que yo, y nada había funcionado.

Hasta que realizó un procedimiento que nunca había considerado: **el puente forzado en los pines CLRTC con un destornillador de paleta**. En el video, el tipo explicaba que este método no es un simple reseteo de la CMOS (que ya había pensado, aunque al no haber batería, no se podia hacer), sino que fuerza un reinicio completo y profundo del controlador de la BIOS, limpiando todos los registros de error volátiles que se quedan atascados incluso cuando se retira la alimentación.

Ver ese video fue como si una bombilla se encendiera en mi cabeza. 💡 

Recordé haber leído sobre los pines CLRTC en los manuales de ASUS, pero siempre los asociaba con el reseteo de la contraseña de la BIOS o con la restauración de los valores de fábrica en casos de overclock extremo. Nunca se me había ocurrido usarlos para limpiar un posible falso positivo de sobrecorriente en los puertos USB.

### ⚡ LA SOLUCIÓN: El Puente Milagroso y la Resurrección

Inspirado por ese Short de 60 segundos, me levanté de la cama con una energía renovada. Volví a la torre, saqué el manual de la placa base (que encontré en PDF en mi teléfono por medios 100% no piratas XD) y localicé los pines **CLRTC**. En el modelo ASUS H81M-P Plus, estaban marcados claramente cerca del borde inferior derecho de la placa.

**El procedimiento paso a paso que me salvó la vida técnica:**

1. **Desconexión total de la fuente de alimentación.** No bastaba con apagar la PC. Tuve que desconectar el cable de corriente de la fuente y también retirar los conectores de 24 pines (ATX) y de 4/8 pines (CPU) de la placa. Quería asegurarme de que no quedara absolutamente ningún vestigio de electricidad en el sistema.

2. **Espera y descarga de capacitores.** Dejé la placa "reposando" durante unos 10 minutos. Este paso es crucial, ya que los capacitores de la placa pueden retener carga incluso después de desconectar la corriente. Esa carga residual puede interferir con el reseteo forzado o, peor aún, causar un corto si trabajamos sin cuidado (TRUCO: Oprime el boton de encendido varias veces para descargar mas rapido la energia si no quieres esperar los 10 minutos).

3. **Identificación de los pines CLRTC.** En mi placa, el jumper no estaba puesto en la posición estándar de 2 pines, sino que eran 3 pines consecutivos ocupando una posicion que no sabia cuales eran. Normalmente, los pines 1 y 2 se usan para el funcionamiento normal, y los pines 2 y 3 para el reseteo. Pero como no sabia la posicion que ocupaba el jumper físico, necesitaba hacer el puente manualmente.

4. **Puente manual con destornillador de paleta.** Tomé un destornillador de punta plana (de paleta) y, con mucho cuidado, toqué simultáneamente dos de los tres pines. Mantuve el contacto durante aproximadamente 15 segundos. Como no estaba seguro de cuál era la combinación correcta (1-2 o 2-3), lo hice dos veces: primero con los pines 1-2 y luego con los pines 2-3. Esto no causa daños, porque básicamente estamos cerrando el circuito de reseteo en ambas configuraciones. El truco consiste en mantener el contacto firme y estable durante el tiempo suficiente para que el controlador de la BIOS registre la señal.

5. **Reconexión y prueba de fuego.** Volví a conectar los cables de alimentación, aseguré todos los periféricos, y presioné el botón de encendido. Mi corazón latía tan fuerte que podía escucharlo por encima del ruido de los ventiladores.

Y entonces, ocurrió el milagro. **La pantalla mostró el logo de ASUS**. No hubo mensaje de error. No hubo cuenta regresiva. La PC arrancó con normalidad, como si nunca hubiera pasado nada. Entré a la BIOS sin problemas, desactivé el Secure Boot, configuré el arranque desde el USB y Windows 10 comenzó a instalarse sin una sola queja.

![Windows 10 instalado y funcionando en la torre resucitada](https://bitcriollo.pages.dev/images/trabajo_listo.jpg)

El problema, tal como sospechaba, era un **falso positivo**. El circuito de protección de los puertos USB se había activado erróneamente debido a algún pico de voltaje o a una lectura incorrecta de los sensores de la placa. La BIOS había registrado ese error en su memoria no volátil y se negaba a funcionar hasta que un reseteo profundo la obligara a "olvidarlo". El puente CLRTC no solo restablece los valores de fábrica, sino que purga todos los flags de error internos del chip UEFI.

---

## 💻 LO QUE APRENDÍ SOBRE LAS ASUS H81M-P PLUS Y LOS FALSOS POSITIVOS

Después de esta experiencia, investigué un poco más sobre el comportamiento de estas placas base y llegué a varias conclusiones técnicas que quiero compartir:

• **El sistema de protección USB de ASUS es extremadamente sensible.** Es una bendición y una maldición. Por un lado, protege los puertos y la placa de cortos reales que podrían dañar los componentes. Por otro lado, cualquier fluctuación mínima en el voltaje o una lectura errónea del controlador puede desencadenar un bloqueo severo como el que experimenté.

• **El puente CLRTC es una herramienta subestimada.** Muchos técnicos (yo incluido) recurrimos inmediatamente a quitar la batería CMOS, asumiendo que eso es suficiente para resetear la BIOS. Pero en placas modernas con UEFI, el reseteo de la CMOS no siempre borra ciertos registros de error de bajo nivel. El puente manual en los pines CLRTC fuerza un reinicio a nivel de hardware que es mucho más profundo y efectivo.

• **La paciencia y la investigación son más valiosas que la fuerza bruta.** Podría haber intentado reemplazar la placa base o soldar los puertos USB, pero eso habría sido costoso, riesgoso y probablemente innecesario. Tomarme el tiempo para entender el problema desde la raíz me ahorró dinero y me dio una lección que no olvidaré.

• **YouTube no es solo entretenimiento; es una herramienta de aprendizaje poderosa.** A veces, las soluciones más ingeniosas están a solo un clic de distancia, compartidas por otros técnicos que han pasado por la misma pesadilla. Este Short en particular me demostró que la comunidad técnica sigue viva y dispuesta a ayudar.

---

## 🔥 MI REFLEXIÓN PERSONAL: Técnico, Paciencia y el Ego en Juego

Esta experiencia me enseñó varias cosas valiosas que trascienden lo puramente técnico:

1. **El ego técnico es el peor enemigo.** Durante los primeros días, me negaba a buscar ayuda en línea porque "yo soy un técnico con experiencia, esto debería resolverlo yo solo". Admitir que no sabía algo me costó días de frustración innecesaria. Cuando finalmente acepté que necesitaba ayuda externa (aunque fuera un video de YouTube), la solución llegó en cuestión de minutos.

2. **Los clásicos nunca mueren.** La placa ASUS H81M-P Plus tiene ya casi una década de antigüedad, pero sigue siendo una pieza de hardware sólida, funcional y digna de respeto. No hay que subestimar las placas antiguas; muchas veces su construcción es más robusta que la de los modelos modernos cargados de componentes miniaturizados.

3. **La importancia de desconectar y descargar.** En mi afán por encontrar una solución rápida, al principio intenté hacer el puente CLRTC sin desconectar la fuente de alimentación (por pura pereza). Menos mal que no lo hice, porque un corto en ese estado podría haber dañado irreversiblemente la placa. La electricidad residual es real y hay que tratarla con respeto.

4. **El valor de compartir las historias.** Si yo hubiera leído un artículo como este hace dos semanas, me habría ahorrado siete días de sufrimiento. Por eso estoy escribiendo esto ahora: para que quien tenga una placa ASUS con el mismo error de "USB Overcurrent" sepa que no todo está perdido, que existe una luz al final del túnel y que esa luz tiene forma de destornillador de paleta.

---

## ¿Y ustedes? ¿Han tenido experiencias similares con placas base "poseídas"?

Quiero saber sus historias. ¿Alguna vez un falso positivo de BIOS les hizo perder días de trabajo? ¿Han tenido que usar el puente CLRTC en alguna ocasión, y en qué contexto? ¿Conocen algún otro truco para resucitar placas base que parecen completamente muertas y sin posibilidad de acceso a la BIOS?

A veces, los problemas más difíciles tienen las soluciones más simples, y conocerlas puede convertir una semana de pesadilla en una anécdota divertida para compartir con la comunidad.

**¡Los leo!** 👇 Estaré atento a sus comentarios y experiencias. La comunidad técnica crece cuando compartimos nuestros fracasos y nuestros triunfos.

---

~ Dragoland 🐉
*Técnico empírico, resucitador de placas base y estudiante eterno de la UCI*

---

## 📲 ¿Te gustan estas historias de batallas técnicas?

Visita mi sitio web para más contenido, análisis y guías prácticas:
👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis publicaciones y artículos, únete a mi canal de Telegram:
👉 **https://t.me/diario_del_informatico**

#ASUS #PlacaBase #H81M #USBOvercurrent #CMOS #CLRTC #ReparaciónPC #Hardware #Técnico #ResurrecciónTécnica #Tecnología #BitCriollo #Linux #Windows10 #UCI #Cuba #DIY
