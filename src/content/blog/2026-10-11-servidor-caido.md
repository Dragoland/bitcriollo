---
title: "💀 EL SERVIDOR QUE MURIÓ EN UNA TARDE: Mi Homelab, Arch Linux y un Proyecto Abandonado"
date: 2026-10-11
tags: [homelab, archlinux, servidor, hardware, asus, intel, cuba, ayuda]
excerpt: "Soñé con un homelab: Git propio, NAS, IA local, streaming pirata. Instalé Arch Linux, todo iba bien... y a las 7 de la noche la PC se apagó y nunca volvió a encender. Un mes después, sigo sin saber qué pasó. ¿Alguien puede ayudarme?"
---

# 💀 EL SERVIDOR QUE MURIÓ EN UNA TARDE: Mi Homelab, Arch Linux y un Proyecto Abandonado
## – O cómo pasé de la ilusión total al silencio de una CPU que ya no responde –

---

¡Hola comunidad! 👋 Hoy no traigo una victoria técnica ni una anécdota divertida de un cliente satisfecho. Hoy traigo una derrota. Una de esas que te dejan con un nudo en el estómago, con la sensación de que hiciste todo bien y aun así el universo te dio la espalda. Hace un mes y unos cuantos días, un 2 de septiembre a mediodía, anuncié con toda la ilusión del mundo que iba a empezar mi propio **servidor casero**, mi primer **homelab** de verdad. Iba a ser el centro de mi ecosistema digital personal. Iba a tener mi propio Git privado, un agente de IA local, un servidor de streaming con mis series y películas (argghh, ya saben, la piratería bien entendida) y, por supuesto, un NAS para guardar cosas de vital importancia y liberar de carga mis equipos principales, esos que uso para trabajar y que ya no dan para más.

Un mes después, esa PC está desarmada sobre una mesa, con el procesador fuera del socket, y yo sigo sin saber qué demonios pasó. Así que hoy les cuento la historia completa, no para lucirme, sino para desahogarme y, quizás, para que alguien con más experiencia me dé una pista. Porque este proyecto no está muerto; está en pausa, esperando que alguien, con una idea, un consejo o un golpe de suerte, me diga por dónde seguir.

---

## 🌱 EL SUEÑO: Un homelab para gobernarlos a todos

La idea llevaba tiempo rondándome la cabeza. Tenía una placa **ASUS H110M Pro-VH Plus** (sí, primera vez que hablo de DDR4 en una publicación, ya era hora) con un procesador **Intel Pentium de 6ta generación, dual core a 3.30 GHz**, y **4 GB de RAM DDR4**. Poca RAM, lo sé, pero para un servidor básico y headless, podía ser suficiente si escogía bien los servicios. Además, hacía poco había rescatado un **disco duro de 2.5 pulgadas de 700 GB** de una laptop vieja. No era una bestia de almacenamiento, pero para fotos, videos, documentos y repositorios de código, me alcanzaba de sobra.

Mi plan era ambicioso pero realista:

- **Git privado** para versionar mis proyectos personales (Arch-Chan, Cuba Learn, SaikaOS, y todo lo que se me ocurriera).
- **NAS** para centralizar archivos que hoy tengo desperdigados en discos externos, memorias USB y carpetas de escritorio que dan miedo.
- **Agente de IA local** (nada de depender de APIs externas ni de internet caro).
- **Servidor de streaming** con mis series y películas, accesible desde la TV del salón, la laptop y el teléfono.
- Y, por supuesto, **SSH** para controlarlo todo de forma remota sin necesidad de un monitor ni teclado.

Tenía la placa, tenía el procesador, tenía la RAM, tenía el disco. Solo faltaba el sistema operativo.

---

## 🐧 LA DECISIÓN: Arch Linux, porque el fanatismo también es estrategia

Muchos pensarán que para un servidor lo sensato era irse por **Debian**, **Ubuntu Server** o incluso **Red Hat**. Y tenían razón. Pero en mi fanatismo (ojito, con estrategia), me decanté por **Arch Linux**. ¿Por qué? Porque quería aprender, porque quería control absoluto sobre cada paquete, porque quería un sistema minimalista donde yo decidiera qué se instala y qué no. Y porque, seamos honestos, ya tengo bastante experiencia con Arch en mi laptop y quería llevar ese conocimiento a un terreno nuevo.

Mi estrategia era simple pero bien pensada:

- **Kernel LTS**: para tener estabilidad a largo plazo, con actualizaciones que llegan meses después, cuando ya están probadas y no rompen librerías.
- **Sin entorno de escritorio**: un servidor headless, controlado 100% por SSH. Cero consumo de recursos en gráficos.
- **Paquetes mínimos**: nada de software innecesario, nada de servicios que arrancan solos y consumen RAM.
- **archinstall**: porque no soy tan masoquista como para hacer la instalación manual completa. Archinstall hace un trabajo excelente y me ahorra horas.

Con todo esto claro, me lancé a la aventura.

---

## ⚡ LA INSTALACIÓN: Horas de descarga, ETECSA de fondo y una oración silenciosa

Descargar la ISO de Arch Linux fue, como siempre, una odisea. Gracias, ETECSA, por tu servicio incomparable (nótese la ironía). Pero bueno, después de mucho esfuerzo, logré tener la ISO lista en un USB con Ventoy. Arranqué la PC, entré al instalador, y comencé el proceso.

La instalación fue **extremadamente lenta**. Cada paquete tenía que descargarse desde internet, y ya saben lo que eso significa en Cuba. Horas y horas frente a la pantalla, viendo cómo los porcentajes subían con una calma desesperante. Rezando, además, porque no se fuera la corriente. Porque un apagón en medio de una instalación de Arch es el equivalente técnico de un balazo en el pie.

Pero la suerte estuvo de mi lado. A las **7 de la noche** de ese fatídico día, **Arch Linux quedó instalado en mi servidor**. La emoción fue enorme. Había logrado montar la base de mi homelab. Configuré SSH, verifiqué que todo funcionara, y dejé la PC encendida mientras iba a la cocina a prepararme algo de comer y, sobre todo, un buen café. Me lo merecía.

---

## 💀 EL DESASTRE: La PC se apagó sola y nunca volvió a encender

Estaba en la cocina, con el café recién colado y el olor llenando la casa, cuando escuché algo raro. Silencio. El ventilador del servidor, que hasta ese momento zumbaba de fondo, se había detenido. Fui corriendo a la sala. La PC estaba apagada. Sin previo aviso, sin pantallazo, sin error. Simplemente se apagó.

Me dije: "Bueno, quizás se sobrecalentó, o fue un pico de corriente, o algo puntual". Presioné el botón de encendido. **Nada**. Volví a presionar. **Nada**. La PC no encendía. Mi corazón empezó a latir más rápido.

Mis padres, que estaban en la casa, escucharon mis quejidos y vinieron a ver qué pasaba. Al ver la PC desarmada y a mí con cara de pánico, su conclusión fue inmediata: "Rompiste la computadora porque le metiste algo raro". Porque, claro, en su mundo, todo lo que no sea Windows es sospechoso. Y más en pleno 2026, con ellos acostumbrados a puro Windows 7 desde hace más de una década. No los culpo, pero en ese momento la presión emocional se sumó a la técnica.

---

## 🔍 EL DIAGNÓSTICO: EZ-Debug-LED, CPU encendida y un misterio sin resolver

Me puse a mecanear. Desarmé la PC por completo. Y descubrí algo curioso: la PC solo encendía si mantenía presionado el botón trasero de la fuente de alimentación. Al soltarlo, se apagaba. Y encima, **no daba video**. Era como si la placa estuviera en un estado de protección extremo, negándose a arrancar de forma normal.

Revisé la placa y me encontré con el **EZ-Debug-LED**. Esa lucecita que, en las placas ASUS, te dice qué componente está fallando durante el POST. Y la luz que estaba encendida era la del **CPU**. Eso me heló la sangre.

Desmonté todo. Revisé cada cable, cada conector, cada componente del circuito que alimenta corriente al procesador. No veía nada raro. Saqué el procesador del socket y lo inspeccioné con lupa. Los pines se veían perfectos. La pasta térmica estaba en excelente estado (aclaro: no puedo reemplazarla porque no tengo, así que tuve que conservarla tal cual). El socket tampoco mostraba daños visibles. Todo parecía estar en orden, y sin embargo, la placa insistía en que el CPU era el problema.

Probé con otra fuente de poder (por si acaso). Probé con un solo módulo de RAM. Probé sin disco, sin periféricos, sin nada. El resultado era siempre el mismo: la luz del CPU encendida, la PC sin dar video, y ese comportamiento extraño de solo encender con el botón trasero presionado.

Después de miles de pruebas, observaciones y noches sin dormir pensando en qué podría ser, tomé una decisión dolorosa: **abandonar el proyecto**. Al menos por ahora.

---

## 😔 EL ABANDONO: Un mes después, sigo sin saber qué hacer

Han pasado un mes y unos cuantos días desde aquel 2 de septiembre. La PC sigue desarmada sobre una mesa, con el procesador fuera del socket, esperando una respuesta que no llega. He leído foros, he visto videos, he consultado a amigos técnicos, y nadie me ha dado una solución clara. Las hipótesis que manejo son varias:

- **La placa base murió**: podría ser que el VRM (el módulo regulador de voltaje) haya fallado, y por eso la placa cree que el CPU está mal.
- **El procesador murió**: poco probable, porque no estaba bajo carga extrema, pero no lo descarto.
- **La fuente de poder dañó algo**: aunque probé con otra fuente, el daño ya podría estar hecho.
- **Un pico de corriente durante el apagón**: aunque no hubo apagón ese día, quizás hubo una fluctuación que la fuente no filtró bien.
- **La BIOS se corrompió**: poco probable, pero posible. No he podido probar porque la placa no da video.
- **Algo en el socket**: aunque visualmente se ve bien, podría haber un pin doblado internamente que no se aprecia a simple vista.

Y aquí estoy, un mes después, con un proyecto abandonado, una PC desarmada, y la sensación de que todo el esfuerzo (las horas de descarga, la instalación lenta, la ilusión) se fue por el desagüe en una sola tarde.

---

## 🙏 UN LLAMADO A LA COMUNIDAD: ¿Alguien puede ayudarme?

Por eso escribo esta publicación. No es una historia de éxito, es una petición de ayuda. Si alguien que lea esto tiene experiencia con placas ASUS, con el EZ-Debug-LED, con problemas de CPU que no arranca, o simplemente con ganas de ayudar, **no dude en contactarme**. Cualquier idea, cualquier consejo, cualquier pista, por pequeña que sea, puede ser la diferencia entre resucitar este proyecto o enterrarlo para siempre.

Las preguntas concretas que tengo son:

1. ¿Es normal que una placa ASUS encienda solo con el botón trasero de la fuente presionado y se apague al soltarlo?
2. ¿Qué significa exactamente que el EZ-Debug-LED se quede encendido en CPU y la placa no dé video?
3. ¿Puede un problema en el VRM simular un fallo de CPU?
4. ¿Hay alguna forma de diagnosticar sin otro procesador compatible ni otra placa?
5. ¿Vale la pena intentar revivir esta placa o es mejor buscar un reemplazo?

No pido milagros. Pido ideas. Pido experiencia. Pido esa solidaridad técnica que tantas veces he visto en la comunidad de software libre y que hoy necesito más que nunca.

---

## 💻 LO QUE APRENDÍ (AUNQUE propina DUELA)

A pesar del fracaso, hay lecciones que me llevo:

- **No existe un proyecto a prueba de balas**. Puedes planificar todo, escoger bien el hardware, investigar el software, y aun así el universo te da una bofetada.
- **La familia no siempre entiende**. Mis padres creyeron que rompí la PC por meterle Linux. No es su culpa, pero es un recordatorio de que vivimos en un entorno donde lo diferente genera sospecha.
- **El hardware es frágil y a veces impredecible**. Una PC que funcionaba perfectamente puede morir en una tarde sin previo aviso, sin causa aparente.
- **La comunidad es el mejor recurso**. Sin ustedes, sin los foros, sin los canales de Telegram, sin los blogs, yo no sabría ni por dónde empezar. Por eso escribo esto, porque creo en el poder de compartir.

---

## 🔥 MI REFLEXIÓN PERSONAL

Este proyecto fallido me ha enseñado más que muchos éxitos. Me ha recordado que la tecnología no es solo código y hardware; es también paciencia, resiliencia y humildad. Me ha hecho valorar más los pequeños logros, porque sé lo frágiles que son. Y me ha confirmado que, aunque a veces el resultado no sea el esperado, el proceso vale la pena.

No sé si este servidor volverá a la vida. No sé si el problema es la placa, el CPU o el universo conspirando contra mí. Pero sé que no me rindo. Sé que seguiré investigando, probando, preguntando. Y sé que, cuando lo resuelva (porque lo resolveré), esta historia tendrá una segunda parte, y esa segunda parte será de victoria.

Mientras tanto, dejo esto aquí. Como una botella lanzada al mar digital, esperando que alguien la recoja y me devuelva una respuesta.

---

## ¿Y ustedes? ¿Han tenido proyectos que murieron sin explicación? ¿Han lidiado con el EZ-Debug-LED o con placas que se niegan a arrancar?

¿Alguna vez una PC les falló de forma inexplicable y nunca supieron por qué? ¿Han logrado revivir un hardware que parecía muerto? ¿Qué herramientas usan para diagnosticar fallos de CPU o placa base?

**¡Los leo!** 👇 Y si alguien tiene una pista, un consejo, o incluso un repuesto compatible, no dude en escribirme. Este proyecto no está muerto; está esperando su resurrección.

---

~ Dragoland 🐉
*Técnico empírico, soñador de homelabs y creyente en el poder de la comunidad*

---

## 📲 ¿Te gustan estas crónicas técnicas?

Visita mi sitio web para más contenido, análisis y guías prácticas:
👉 **https://bitcriollo.pages.dev**

Y si quieres estar al día con mis publicaciones y debates, únete a mi canal de Telegram:
👉 **https://t.me/diario_del_informatico**

#Homelab #ArchLinux #Servidor #Hardware #ASUS #Intel #EZDebugLED #ReparaciónPC #BitCriollo #Cuba #Tecnología #Ayuda #Comunidad
