---
title: "⚡ LA TORRE EPILÉPTICA: Una Gráfica Enana, un Pin Faltante y el Ventilador que Resucitó"
date: 2026-10-14
tags: [hardware, intel, asus, ram, cooling, windows10, reparacion, cuba]
excerpt: "Un ventilador ahogado a 340 RPM que freía un i3 en silencio, un módulo DDR3 mutilado por la pérdida de un pin clave y mi primer encuentro cara a cara con una tarjeta gráfica dedicada. Una crónica de diagnóstico, trasplante de piezas y lealtad técnica."
---

# ⚡ LA TORRE EPILÉPTICA: Una Gráfica Enana, un Pin Faltante y el Ventilador que Resucitó
## – O cómo un ventilador moribundo casi estrangula un i3 y un trasplante de piezas le devolvió la dignidad –

---

¡Hola comunidad! 👋 Hoy les traigo una de esas historias que empiezan como un favor de soporte rutinario para una clienta fiel y terminan convirtiéndose en una lección magistral de diagnóstico de hardware en condiciones extremas. Además, abro esta crónica con una confesión que me da un poco de vergüenza admitir como apasionado de la tecnología: **fue la primera vez en mi vida que vi una tarjeta gráfica dedicada en persona**. Sí, ya sé lo que estarán pensando los que leen esto desde otros rincones del mundo, pero recuerden que estamos en Cuba (Lamentablemente TwT). Aquí trabajamos con lo que hay, muchas veces en sistemas con gráficos integrados veteranos, y ver componentes dedicados —por sencillos que sean— no siempre es el pan de cada día.

La historia empieza con una clienta habitual. Con ella siempre he tenido una excelente relación atendiendo detalles sencillos desde el teléfono: instalar la app de DeepSeek, configurarle el correo, explicarle con paciencia cómo funciona su dispositivo... Soporte básico, de ese que no suelo documentar en el blog. Pero esta vez me llamó porque una amiga suya necesitaba ayuda urgente con su torre. Le prometí que la atendería con la misma dedicación que a todos mis clientes. Sin embargo, la realidad eléctrica cubana jugó en mi contra: entre apagones intermitentes, picos e interrupciones prolongadas, estuve casi una semana entera sin poder coordinar la visita.

Hasta que por fin, el **viernes 9 de octubre**, se presentó la oportunidad perfecta. La llamé, cuadré la hora y fui directo a su casa, listo para enfrentarme a lo desconocido.

---

## 📦 EL PRIMER CONTACTO: Una gráfica curiosa y un misterio en la RAM

Al llegar y destapar el case (que ya venía sin la tapa lateral), me encontré con una configuración muy representativa de los equipos que sobreviven en nuestras casas:

- **Procesador**: Intel Core i3 de 4ta generación (LGA 1150).
- **Placa base**: ASUS vintage (circa 2014-2015), un clásico robusto de socket H81/B85.
- **RAM**: 4 GB DDR3 montados en un solo módulo.
- **Gráfica**: Un modelo sumamente curioso. Sin ventilación activa (solo disipador pasivo), diminuta en grosor y con apenas salidas VGA y DVI. Era tan delgada que al principio me cuestioné si era una GPU propiamente dicha, pero ahí estaba, ocupando su ranura PCIe.

La dueña me contó el drama que venía sufriendo: la computadora trabajaba perfecto hasta que, tras un largo periodo de apagones violentos e interrupciones eléctricas usándola, empezó a lanzar **pantallazos azules repentinos apenas se encendía**. Y me dio un dato que me dejó pensando: *"En los momentos más fríos del día o en la madrugada, a veces me deja usarla un ratico, pero colapsa cuando me pongo a copiar archivos pesados de un lugar a otro"*.

Antes de tocar cualquier cable, noté algo en la mesa: **un módulo de memoria RAM DDR3 de 4 GB estaba tirado fuera de la torre**. Miré el interior de la tarjeta madre y vi que le quedaba un slot libre.
—*¿Por qué no estás usando esta otra memoria para tener 8 GB?* —le pregunté.
—*Ni idea* —me respondió—. *Un técnico que le lleve la PC antes la miró y me dijo que simplemente no servía, que esa memoria no le servía a esta placa.*

Sinceramente, no le hallé sentido a esa explicación. El módulo instalado era DDR3, la placa era una ASUS de doble ranura compatible y el módulo suelto era exactamente del mismo estándar. Para no alarmar a la clienta ni dar veredictos apresurados, le propuse llevarme la máquina y la memoria a mi "estación de trabajo" (es decir, la sala de mi casa XD) para hacer pruebas bajo condiciones controladas.

---

## 🔇 EL SILENCIO SOSPECHOSO: El arranque que no sonaba

Decidí encender la PC en su casa una vez antes de recogerla. Presioné el botón de encendido... La máquina arrancó, pero algo andaba muy mal. O mejor dicho, **no sonaba absolutamente nada**. Escuché el soplido de arranque característico de la fuente de poder, pero el ventilador del procesador (el fan del CPU) se quedó completamente inmóvil. Tiesado, apagado.

Forcé un apagado de inmediato dejando presionado el botón. En el segundo intento, el ventilador dio unas vueltas perezosas, como si le pesara la existencia. La BIOS saltó en pantalla automáticamente (un comportamiento raro de primera instancia) y desde allí mandé a bootear el disco duro con Windows 10.

Windows cargó, pero a una velocidad tan lenta que hasta a un caracol le daría vergüenza ajena. Una vez en el escritorio, intenté hacer pruebas básicas de rendimiento. No detecté comportamientos de virus (nada de carpetas duplicadas ni procesos extraños comiéndose la CPU), pero que había algo profundamente mal en el hardware, era innegable.

Instalé mi infaltable **CrystalDiskInfo** para verificar el estado del almacenamiento:
- **Disco**: HDD mecánico de 320 GB.
- **Estado**: **De Riesgo**.
- **Sectores**: 39 sectores dañados reasignados (atributo 05) y 1 sector pendiente (C5).
- **Horas de uso**: **22,500 horas netas de trabajo** (lo que equivale a casi 15 años de existencia cronológica).

El disco estaba tocado, sin duda. Sin embargo, recordando el caso de la *Laptop Guasón* ([https://bitcriollo.pages.dev/blog/2026-09-13-laptop-guason](https://bitcriollo.pages.dev/blog/2026-09-13-laptop-guason)) —que estaba en un estado crítico muchísimo peor y aun así logré hacerla andar—, este HDD no era la causa principal de los pantallazos inmediatos. Quedamos en que el **12 de octubre** pasaría a recoger la torre y la memoria suelta.

---

## 🔍 EL DIAGNÓSTICO: Un pin mutilado y el fantasma de las 340 RPM

El 12 de octubre llegué con la torre a mi sala. Me acomodé y dividí la investigación en dos frentes:

### 1. El misterio de la RAM rechazada 💎
Lo primero que probé fue la memoria DDR3 suelta. La inserté en el segundo slot de la placa base y encendí la PC: **pantalla en negro, la máquina no daba video**.
La extraje, le pasé la clásica goma de borrar de lápiz sobre los contactos dorados para remover cualquier capa de sulfato u oxidación, la volví a colocar bien alineada y encendí de nuevo: **mismo resultado, encendía pero sin señal de video**.

La saqué de nuevo y me dispuse a inspeccionarla con minuciosidad usando una pequeña lupa. Fue entonces cuando descubrí el desastre: **el pin número 3 del frontal (contando de izquierda a derecha) no tenía el baño de oro**. Estaba ausente, algo que en teoria, ningun pin deberia faltarle. Aunque existen pines de tierra o repetitivos en el pinout de las memorias, una investigación rápida me confirmó que ese pin en particular era una línea de señal crítica. Sin él, la memoria simplemente no hace el handshake con el controlador y se convierte en un **pisapapeles bastante caro**. 

Me dio rabia por la clienta, pero al menos le di una explicación técnica real y no la mentira (o mejor dicho, respuesta digna de un incompetente) del técnico anterior.

### 2. El verdadero culpable: estrangulamiento térmico 🛑
Volví a centrarme en la torre y, una vez más, el ventilador del procesador tuvo serias dificultades para empezar a girar. Entré directamente a la BIOS para verificar los rieles de energía. Los ventiladores del chasis y del CPU se alimentan de la línea de 12V que entrega la fuente de poder; comprobé los valores y la fuente estaba entregando los voltajes dentro del margen correcto. La fuente no era el problema.

El fallo estaba en el motor del propio disipador: **¡estaba girando a apenas 340 - 350 RPM!**

![Lectura de RPM peligrosamente baja en la BIOS](rpm-bajo.jpg)

Para que se hagan una idea de la gravedad: un disipador de stock Intel debe girar en reposo entre **1,000 y 1,500 RPM**, y subir hasta **2,500 RPM** cuando el procesador entra en carga. Trabajar a 340 RPM significa que el aire fresco no circula. El i3 se estaba cocinando vivo a los pocos minutos de encenderse. 

Eso explicaba absolutamente todo:
- La lentitud extrema de Windows se debía al *thermal throttling* (el procesador reduciendo drásticamente su frecuencia para no derretirse).
- Los pantallazos azules ocurrían al copiar archivos porque la CPU trabajaba un poco más, alcanzaba los 90–100 °C y el sistema colapsaba por protección.
- En las madrugadas o momentos fríos duraba un poco más antes de colapsar por la temperatura ambiente más baja.

---

## 🛠️ EL TRASPLANTE: Rescatando piezas del servidor caído

Ahí fue donde mi padre me dio una excelente idea: *"¿Por qué no usas el disipador que quedó en la torre/servidor que se te apagó?"*.

Honestamente, una muy buena idea. Fui a buscar la torre guardada de mi proyecto fallido de servidor casero ([https://bitcriollo.pages.dev/blog/2026-10-11-servidor-caido](https://bitcriollo.pages.dev/blog/2026-10-11-servidor-caido)). Desmonté la placa, retiré el ventilador funcional y me dispuse a hacer el intercambio. Era la primera vez en mi trayectoria que realizaba un cambio de componente físico directo para solucionar un fallo grave de hardware.

![Intercambio de ventiladores de CPU](fan-reemplazo.jpg)
*(En mi mano tengo el fan moribundo y en la torre ya se encuentra montado el reemplazo)*

Una vez asegurado el nuevo disipador en los anclajes del socket, conecté el cable de 4 pines a la placa y presioné el botón de encendido.

**¡BAM!** El cambio fue inmediato y glorioso. El tenso y peligroso silencio fue reemplazado por un flujo de aire constante y ruidoso, el sonido más tranquilizante que he escuchado en semanas. Entré a la BIOS a verificar: **+1,000 RPM estables y respondiendo a la temperatura**. El procesador por fin podía respirar.

---

## 🏁 EL RITUAL FINAL Y LA VICTORIA

Con la temperatura bajo control, arranqué Windows 10 para probar el comportamiento. La máquina dejó de lanzar pantallazos azules y ya no colapsaba al transferir archivos. Sin embargo, debido a los apagones pasados y a los cierres abruptos por sobrecalentamiento, el sistema operativo estaba bastante maltrecho y la reinstalación era obligatoria.

Me dispuse a ejecutar el santo ritual:
1. Conectar mi pendrive con **Ventoy**.
2. Seleccionar la ISO de **Windows 10**.
3. Formatear la partición de sistema en el disco de 320 GB.
4. Instalar desde cero (esta vez sin trabas dramáticas de MBR/GPT ni dilemas de UEFI).
5. Configurar controladores, optimizar servicios y cargar el software básico necesario.

¡Y voilà! Caso cerrado. Una PC resucitada, un procesador rescatado del colapso térmico y una clienta sumamente complacida. Además, en un gesto muy bonito de agradecimiento, me regaó la memoria RAM dañada y el ventilador moribundo como recuerdo y para mi banco de pruebas.

---

## 💻 LO QUE APRENDÍ EN ESTA AVENTURA

- **El Thermal Throttling engaña.** Muchas veces asumimos que un sistema lento o unstable está infectado por malware o tiene el Windows corrupto, cuando en realidad el procesador se está ahogando por falta de refrigeración.
- **Inspección visual obligatoria en las memorias.** Un pin faltante o quemado inutiliza un módulo de RAM por completo. No se debe asumir simplemente que "no es compatible" sin mirar los contactos con detalle.
- **El banco de repuestos es oro.** El ventilador que había quedado varado en la torre de mi servidor caído sirvió para devolverle la vida a la computadora de esta clienta. En la informática empírica, nada se tira.

---

## 🔥 MI REFLEXIÓN PERSONAL

Esta "Torre Epiléptica" me demostró que en el trabajo de campo no hay que subestimar los fallos físicos más simples. Un componente tan modesto como un ventilador de $5 USD puede paralizar un equipo entero y hacer pensar al usuario que su computadora ya no sirve.

Ver la satisfacción de la clienta al recuperar su herramienta de trabajo rápida, estable y sin pantallazos hace que cada hora de diagnóstico valga la pena. Seguimos sumando experiencia, batalla a batalla, ganándole la partida al deterioro tecnológico.

---

## ¿Y ustedes? ¿Se han encontrado alguna vez con un módulo de RAM al que le faltara un pin? ¿Alguna vez un ventilador moribundo les volvió locos buscando fallos de software?

**¡Los leo!** 👇 Dejen sus comentarios y anécdotas abajo. La comunidad crece cuando compartimos nuestras experiencias en el taller.

---

~ Dragoland 🐉  
*Técnico empírico, cirujano de hardware y estudiante eterno*

---

## 📲 ¿Te gustan estas crónicas técnicas?

Visita mi sitio web para más contenido, análisis y guías prácticas:  
👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis publicaciones y debates, únete a mi canal de Telegram:  
👉 **https://t.me/diario_del_informatico**

#Hardware #Intel #ASUS #Cooling #RAM #Windows10 #ReparacionPC #BitCriollo #Cuba #Tecnologia
