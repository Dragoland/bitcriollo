---
title: "🦠 LA TORRE ZOMBI: Virus, MBR vs GPT, y un Disco Moribundo de 4GB"
date: 2026-09-05
tags: [windows, virus, mbr, gpt, diskpart, hardware, reparación, cuba]
excerpt: "Un muchacho viaja desde lejos con una PC que se duplica a sí misma. Virus que ni Kaspersky pudo matar, un disco fantasma de 1TB pero solo muestra 4GB, y una lección sobre UEFI que casi me vuelve loco."
---

# 🦠 LA TORRE ZOMBI: Virus, MBR vs GPT, y un Disco Fantasma de 4GB
## – O cómo un viajero inesperado me interrumpió el homelab para enseñarme una lección de BIOS que no olvidaré –

---

¡Hola comunidad! 👋 Iba yo con toda la ilusión, preparando una taza de café, listo para empezar a trabajar en mi propio homelab. Tenía la torre personal abierta, los discos listos, el esquema de servicios mentales (NAS, streaming, nube privada, Git, y un largo etcétera) ya dibujado en un papel. Era una mañana temprano, de esas en las que el silencio y la luz filtrada prometen horas de productividad. Y entonces, llaman a la puerta.

No era el punto de venta de mi casa, ni el vecino. Era un muchacho que había viajado desde bastante lejos, preguntando de casa en casa, de lugareño en lugareño, hasta dar conmigo. “Oí que usted arregla computadoras”, me dijo, con una mezcla de cansancio y urgencia en los ojos. Traía una torre en el cajon de su bici, y una historia que, como verán, merecía ser contada.

---

## 📦 Llegada inesperada: una torre con historia (y mucho que ocultar)

El muchacho no sabía casi nada de su propia PC. Solo sabía que tenía dos módulos de 4GB de RAM (8GB en total), no las analice bien pero creo que eran DDR3. Del procesador, de la placa base, de los discos, ni idea. Y no lo juzgo, no todos somos informáticos o minimo conocedores de tecnologia. Lo que sí sabía es que la computadora se comportaba de una forma muy extraña.

Yo, al abrir el case, me encontré con una placa que me resultó familiar: **una ASUS H81M-P Plus**. La misma que ya había aparecido en mi publicación anterior sobre la "Torre Fantasma" ([https://bitcriollo.pages.dev/blog/2026-08-18-torre-fantasma](https://bitcriollo.pages.dev/blog/2026-08-18-torre-fantasma)). Un clásico de 2015, con su socket LGA 1150, su chipset H81, y ese diseño que ya conozco de memoria. El procesador era un **Intel Core i5 de cuarta generación**, y llevaba dos discos duros **HDD de 1TB cada uno** (aunque, como veremos, uno de ellos no estaba en su mejor momento).

El problema que traía era, para ser suaves, **una infección viral de libro de terror** (**Project Zomboid**, quien te conoce? XD).

---

## 👾 El baile de los virus: carpetas que se clonan y se esconden

Al encender la PC, todo parecía normal. Pero al abrir el Explorador de Archivos, empezaba el show. En la raíz de las unidades, aparecían **carpetas con nombres idénticos a las carpetas del sistema o a las personales**, pero con un comportamiento anómalo. Al hacer clic en una de esas copias, se abría **una nueva ventana** (en lugar de navegar dentro de la misma ventana, como es normal), y la carpeta que se abría era la original, pero en otra pestaña. Además, las carpetas originales estaban ocultas, y Windows clasificaba estas copias como "aplicaciones", salgo que no encajaba en su taxonomía.

Claramente, estábamos ante varios **troyanos y virus de tipo file infector** que se dedicaban a:
- Crear copias de sí mismos con nombres de carpetas que existen.
- Ocultar los directorios legítimos.
- Redirigir los clics a ventanas nuevas (probablemente para ejecutar código malicioso en segundo plano y pasar desapersividos).
- Intentar robar información o inyectar más malware.

No era un virus simple; era un ecosistema de bichos que se retroalimentaban. Intenté con **Kaspersky**, un antivirus de los considerados "pesados" y efectivos. Escaneó, encontró varias amenazas, las puso en cuarentena, y yo respiré aliviado. Reinicié la PC... y **los virus volvieron a aparecer**, como si nada hubiera pasado. Como si la PC tuviera un sistema de persistencia a nivel de firmware, o como si el virus se hubiera instalado en el sector de arranque, tareas programadas o algo asi, el punto es que eran practicamente inmortales hasta mi conocimiento. Cada reinicio restauraba el estado base de la infección, y Kaspersky no podía eliminarlo por completo.

Probé con otros antivirus portables, con herramientas de remoción específica, con análisis en modo seguro. Nada funcionaba. El virus era más terco que un cubano en día de apagón echando maldiciones a diestra y siniestra.

---

## ⚔️ La decisión: reinstalar (pero no sin antes asegurar los datos)

El muchacho, para mi alivio, ya había considerado la reinstalación como opción principal. De hecho, me dijo: "Si no se puede salvar, la formateamos". Sin embargo, por orgullo profesional y porque quería intentarlo todo antes de rendirme, insistí en explorar todas las vías de limpieza. Al final, después de dos 2~3 horas de pruebas infructuosas, tomé la decisión: **reinstalación completa de Windows 10**.

Pero había una buena noticia: el disco duro estaba particionado en dos. Una partición de sistema (de unos 100 GB) y otra partición de datos personales (el resto del espacio). La partición de datos estaba intacta y no había señales de infección allí (en lo que software se refiere, obviamente el virus tambien se manifestaba ahi). Así que podíamos formatear la partición de sistema sin miedo a perder los archivos del usuario.

---

## 💥 El primer escollo: UEFI vs Legacy, GPT vs MBR (la confusión clásica)

Con el USB de instalación de Windows 10 listo, arranqué la PC. Todo normal: la BIOS de ASUS, el menú de arranque, el USB reconocido. Inicio la instalación, llego a la pantalla de selección de particiones, y veo las dos particiones: la del sistema (100GB) y la de datos. Selecciono la del sistema, pulso "Formatear"... Y no formatea... "No importa", dije, elimine la particion y creare una nueva particion, trato de crear nueva particion y... **un error crítico**, no me acuerdo que error exactamente era pero creanme, ni ustedes ni yo entendemos un error mostrado en lenguaje maquina, quedense de que algo estaba pasando.

Pense, el clásico. Estaba intentando instalar en modo **UEFI** (que es lo que Windows 10 prefiere por defecto) pero el disco estaba particionado en **MBR** (el formato antiguo). Y yo, en mi afán, no me había percatado. El muchacho, cuando usaba la PC, probablemente arrancaba en modo **Legacy** (BIOS tradicional), por eso el sistema funcionaba aunque el disco fuera MBR.

Bueno, pensé, es fácil. Solo cambio en la BIOS a modo Legacy, o convierto el disco a GPT. Como no quería perder los datos de la partición de datos, y convertir MBR a GPT sin pérdida de información requiere herramientas específicas (y no siempre funciona bien), decidí que lo más limpio era **forzar la instalación en modo Legacy**. Es decir, arrancar el USB en modo Legacy (no UEFI) y entonces Windows permitiría instalar en el disco MBR.

Pero aquí vino lo complicado: mi USB de instalación estaba configurado para arrancar en UEFI, y la BIOS de esta ASUS a veces es caprichosa. Además, no me daba cuenta de que el problema era el modo de arranque; seguía intentando instalar desde UEFI y obteniendo el mismo error. Perdí un buen rato en esto.

---

## 🕵️‍♂️ El disco fantasma de 4GB (y el misterio del HDD desaparecido)

Mientras trasteaba en la selección de particiones, noté algo extraño. Aparecía un disco de **aproximadamente 4GB** en la lista de unidades. Pero la PC tenía dos discos de 1TB, ¿de dónde salía ese disco de 4GB? Rápidamente identifiqué que era uno de los HDD de 1TB, el que el muchacho desconocía que existía (porque en el sistema nunca se veía, se encontraba como "No Incializado"). Al parecer, ese disco estaba tan dañado que el controlador solo reconocía un fragmento de su capacidad total: apenas 4GB. Era como si la electrónica del disco hubiera fallado, o la tabla de particiones estuviera corrupta de forma irreversible (Realmente, no estoy seguro que tenia, ya lo veremos en un futuro).

Decidí **desconectar ese disco de la placa base** para evitar que interfiriera en la instalación. Lo dejé a un lado, etiquetado, y anoté en mi libreta: "Revisar en profundidad si el cliente lo autoriza". En un futuro, quizá pueda rescatar algo, o al menos determinar si tiene arreglo. Pero por ahora, no era prioridad.

---

## 🧰 Diskpart al rescate: cuando la terminal es tu mejor amiga

Con solo el disco bueno de 1TB conectado (el que tenía la partición de sistema y la de datos), volví a la instalación. Me habia quedado en que borre la particion de 100GB del sistema y quedo como espacio sin asignar. Luego intenté crear una nueva partición desde el instalador, pero **no me dejaba**. El botón "Nuevo" estaba gris, o al hacer clic, daba error. Otra vez el UEFI/MBR, pero esta vez con el agravante de que Windows no quería crear una partición en un disco MBR si el sistema estaba arrancado en UEFI.

Fue entonces cuando recordé la vieja confiable: **la terminal de comandos del instalador de Windows**. Con **Shift + F10**, se abre una ventana de CMD. Desde allí, ejecuté `diskpart` y empecé a trabajar a nivel de bajo nivel sobre el hardware.

Los pasos fueron:
- `list disk` para identificar el disco correcto ya que tambien se visualiza mi dispositivo USB (era el disco 0).
- `select disk 0` para que los proximos comandos se ejecuten exclusivamente a este disco.
- `create partition primary` para crear la particion que se negaba a crear que era la del sistema. 
- `format fs=ntfs quick` para formatear la particion y darle un formato.
- `assign letter=C` para asegurarme de que sea mas facil de reconocer para la PC la particion.
- `activate` para declarar que esa particion es de sistema y no una particion principal.
- Luego, `exit` y cerré la terminal.

Volví al instalador, hice clic en "Actualizar" y la partición C: apareció. La seleccioné y pense que por fin podria tocar "Siguiente" y entonces, **otro error**: "No se puede instalar Windows en esta partición porque el sistema está configurado para arrancar en modo UEFI". Sí, el instalador seguía en UEFI, a pesar de que el disco era MBR.

En ese momento, me quedé mirando la pantalla, con la mano en la barbilla, y me di cuenta de la tontería: **todo el tiempo había estado arrancando el USB en modo UEFI**. La BIOS de la ASUS permite seleccionar el dispositivo de arranque con una tecla (generalmente F8), y hay dos opciones para el USB: una que dice "UEFI: USB" y otra que dice simplemente "USB" (que es el modo Legacy). Yo, por inercia, siempre elegía el que decía "UEFI". Y el disco era MBR.

Así que reinicié, entré en la BIOS, fui a la sección de arranque y cambié la prioridad para que el USB en modo Legacy fuera el primero. Guardé y reinicié. Esta vez, al entrar al instalador, ya no apareció el error de MBR. La partición que había creado con diskpart (en MBR) era aceptada sin problemas. Seguí los pasos de instalación y, por fin, **Windows 10 comenzó a instalarse correctamente**.

---

## 🎉 Resultado final: sistema limpio, ligero y funcional

La instalación terminó sin más sobresaltos. Configuré el sistema básico: controladores, actualizaciones, el software mínimo que el muchacho necesitaba (navegador, suite de oficina, reproductor multimedia, etc.). La PC arrancaba mucho más rápido que antes, sin esos procesos extraños que consumían recursos. Los virus habían desaparecido por completo; no había rastro de ellos en el disco, en el registro o en los archivos de inicio.

El muchacho, aunque aun a fecha de esta publicacion aun no ha ido a recogerla, se sorprendió de la velocidad tanto del sistema como mia por como arregle su PC y de que todo funcionara sin "esos duplicados raros". Le expliqué lo del disco fantasma y que podría intentar recuperarlo si él lo deseaba. Por ahora, esta contento, con su PC como nueva, y yo con una historia más para el blog.

---

## 💻 LO QUE APRENDÍ EN ESTA AVENTURA (más allá de los virus)

Esta experiencia, aunque menos épica que la "Torre Fantasma", me dejó varias lecciones valiosas:

- **La persistencia de los virus modernos es aterradora.** Ya no basta con un antivirus; algunos bichos se esconden en el sector de arranque, en el registro, o se replican a través de tareas programadas. A veces, la reinstalación es la única vía, y no hay que verlo como una derrota, sino como una solución eficiente.

- **Siempre verificar el modo de arranque (UEFI vs Legacy) antes de instalar.** Es una de las confusiones más comunes y una pérdida de tiempo monumental. Antes de tocar diskpart, hay que asegurarse de que el USB esté arrancando en el modo adecuado para el tipo de tabla de particiones del disco (Me siento como un estupido al equivocarme con estas cosas de novato TwT).

- **Diskpart es un aliado poderosísimo**, pero hay que usarlo con cuidado. Un `clean` (comando para dejar virgen el disco completo) mal aplicado puede borrar todos los datos, incluyendo los del usuario. En este caso, no habia necesidad de usarlo y ademas estaba el riesgo de borrar la informacion del usuario.

- **Los discos duros "moribundos" pueden dar señales extrañas,** como aparecer con una capacidad reducida. Eso suele indicar fallos en el firmware o en los cabezales, y lo mejor es aislarlos hasta que se pueda hacer un diagnóstico más profundo.

- **La paciencia y la metodología son clave.** En lugar de tirar la toalla, fui probando una cosa a la vez, cambiando una variable en cada intento, hasta que di con la combinación correcta. Es frustrante, pero al final funciona.

---

## 🔥 MI REFLEXIÓN PERSONAL

Esta mañana, que empezó con mi proyecto de homelab interrumpido, terminó con una PC resucitada, un cliente contento y una nueva entrada para el blog. No me quejo. Al contrario, cada uno de estos casos me recuerda por qué elegí este camino. No solo por el conocimiento técnico, sino por la oportunidad de ayudar a otros, de conectar con historias como la de este muchacho que viajó lejos buscando una solución.

También me hace reflexionar sobre la brecha digital en Cuba. La gente tiene PCs, pero muchas veces no saben ni qué tienen ni cómo mantenerlas. El acceso a información, a tutoriales, a comunidades en cualquier app de mensajeria como WhatsApp o Telegram, es limitado y encima, no tienen los medios para hacerse conocer. Y ahí es donde nosotros, los que sabemos, tenemos una responsabilidad. Compartir lo que aprendemos, escribir artículos, grabar tutoriales, ayudar al vecino... cada pequeño aporte cierra esa brecha un poco más.

El disco fantasma de 4GB me tiene intrigado. En un futuro, cuando el muchacho me dé permiso, lo conectaré nuevamente a la PC para ver si puedo recuperar algo o al menos diagnosticarlo a fondo. Quién sabe, quizá haya un edit despues de publicar esta historia. Pero por ahora, me quedo con la satisfacción del trabajo bien hecho.

---

## ¿Y ustedes? ¿Han tenido experiencias similares con virus que no se van, o con discos que se hacen los locos?

¿Alguna vez les ha pasado que un simple error de UEFI/Legacy les haga perder horas de instalación? ¿Conocen algún truco para limpiar virus persistentes sin reinstalar? ¿O han tenido algún disco que aparezca con una capacidad ridículamente pequeña?

**¡Los leo!** 👇 Compartan sus anécdotas, sus frustraciones y sus soluciones. La comunidad crece cuando nos contamos estas pequeñas batallas cotidianas.

---

~ Dragoland 🐉
*Técnico empírico, amante del homelab y resucitador de torres infectadas*

---

## 📲 ¿Te gustan estas crónicas técnicas?

Visita mi sitio web para más contenido, análisis y guías prácticas:
👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis publicaciones y debates, únete a mi canal de Telegram:
👉 **https://t.me/diario_del_informatico**

#Windows #Virus #MBR #GPT #UEFI #Legacy #Diskpart #ReparaciónPC #Hardware #ASUS #H81M #BitCriollo #Cuba #Tecnología
