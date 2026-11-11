# Documentación Técnica: Servidor Caído – Homelab con Arch Linux y ASUS H110M Pro-VH Plus

**Equipo:** PC de escritorio (proyecto de homelab)  
**Placa base:** ASUS H110M Pro-VH Plus (socket LGA 1151, chipset H110)  
**Procesador:** Intel Pentium de 6ª generación (dual core a 3.30 GHz)  
**Memoria:** 4 GB DDR4  
**Almacenamiento:** HDD de 2.5" de 700 GB (rescatado de una laptop)  
**Sistema inicial:** Arch Linux (recién instalado, kernel LTS, headless)  
**Problema inicial:** La PC se apagó sola a las 7 de la noche, minutos después de completar la instalación de Arch Linux. Nunca volvió a encender. El EZ-Debug-LED de la placa ASUS se queda encendido en **CPU**. La PC solo enciende si se mantiene presionado el botón trasero de la fuente; al soltarlo, se apaga. No da video.  
**Objetivo:** Diagnosticar y reparar el servidor para continuar con el proyecto de homelab (Git privado, NAS, IA local, streaming).  
**Resultado final:** **No resuelto.** El proyecto quedó en pausa. Se solicita ayuda a la comunidad para identificar si el fallo es de placa base, CPU, VRM o BIOS.

---

## 1. Herramientas utilizadas

- **Arch Linux** (instalado con `archinstall`, kernel LTS, sin entorno gráfico).
- **EZ-Debug-LED** de la placa ASUS (indicador de diagnóstico durante el POST).
- **Otra fuente de poder** (para descartar fallo de la fuente original).
- **Inspección visual** del socket y los pines del CPU con lupa.
- **Pruebas de aislamiento:** un solo módulo de RAM, sin disco, sin periféricos.

---

## 2. Cronología de la reparación

### Fase 1: Instalación de Arch Linux
- Se instaló Arch Linux con `archinstall`, kernel LTS, sin entorno gráfico, controlado por SSH. La instalación tomó horas por la lentitud de la conexión, pero se completó a las 7 de la noche.

### Fase 2: Apagado repentino
- Minutos después de la instalación, la PC se apagó sola. Al presionar el botón de encendido, no hubo respuesta. Solo encendía si se mantenía presionado el botón trasero de la fuente, y se apagaba al soltarlo. No daba video.

### Fase 3: Diagnóstico con EZ-Debug-LED
- Se identificó que el LED encendido era el de **CPU**. Esto indica que la placa detecta un fallo en el procesador durante el POST.
- Se desmontó el CPU, se inspeccionaron los pines con lupa (sin daños visibles), se revisó la pasta térmica (en buen estado), se probó con otra fuente, con un solo módulo de RAM y sin disco. El resultado fue siempre el mismo: LED de CPU encendido, sin video, y el comportamiento anómalo del botón trasero de la fuente.

### Fase 4: Abandono temporal y llamado a la comunidad
- Tras múltiples pruebas, se decidió pausar el proyecto. Las hipótesis abiertas son: fallo del VRM de la placa, CPU muerto, daño causado por un pico de corriente, BIOS corrupta o un pin doblado internamente en el socket.

---

## 3. Comandos y procedimientos clave

### Instalación de Arch Linux headless
```bash
archinstall
# Seleccionar: kernel linux-lts, sin escritorio, OpenSSH habilitado
```

### Diagnóstico con EZ-Debug-LED
```text
Encender la placa y observar el LED encendido:
- CPU  → fallo en el procesador o en la secuencia de encendido
- DRAM → fallo en la memoria
- VGA  → fallo en la gráfica
- BOOT → fallo en el dispositivo de arranque
```

### Pruebas de aislamiento
```text
1. Probar con otra fuente de poder.
2. Probar con un solo módulo de RAM.
3. Desconectar disco y periféricos.
4. Inspeccionar pines del socket con lupa.
5. Probar el CPU en otra placa compatible (si está disponible).
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa probable | Solución (pendiente) |
| :--- | :--- | :--- |
| La PC no enciende; solo con botón trasero presionado | Posible fallo del VRM o de la secuencia de encendido de la placa | Diagnóstico con instrumental avanzado (no disponible) |
| EZ-Debug-LED encendido en CPU | La placa cree que el CPU está fallando | Probar el CPU en otra placa compatible (no disponible) |
| Sin video | Bloqueo del POST por el fallo detectado | Revisar BIOS, VRM o reemplazar componentes |
| No se puede flashear la BIOS | La placa no da video | Se requiere programador externo o placa donante |

---

## 5. Lecciones aprendidas

1. **El hardware es frágil e impredecible.** Una PC que funcionaba perfectamente puede morir en una tarde sin causa aparente.
2. **El EZ-Debug-LED es una guía, pero no una sentencia.** Puede señalar el CPU cuando el problema real es el VRM o la BIOS.
3. **La comunidad es el mejor recurso.** Sin foros, canales de Telegram y blogs, el diagnóstico sería aún más difícil.

---

## 6. Estado final del dispositivo

- **Arranque:** Fallido. La placa no completa el POST.
- **Diagnóstico:** EZ-Debug-LED en CPU. Se requieren pruebas con hardware compatible para aislar el componente defectuoso.
- **Proyecto:** En pausa. Se solicita ayuda a la comunidad para continuar el diagnóstico.

---

## 7. Recomendaciones para futuros casos similares

- **Ante un EZ-Debug-LED encendido en CPU**, probar el procesador en otra placa compatible y otro procesador en la placa afectada. Si no se dispone de repuestos, el diagnóstico se vuelve especulativo.
- **Revisar el VRM y la secuencia de encendido** antes de declarar el CPU como muerto.
- **Documentar y pedir ayuda** en comunidades técnicas; a veces la solución está en la experiencia de otros.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Servidor Caído – Homelab con Arch Linux / ASUS H110M  
**Estado:** No resuelto (en pausa) ❌
