# Documentación Técnica: Torre Fantasma – ASUS H81M-P Plus y Falso Positivo de USB Overcurrent

**Equipo:** Torre genérica  
**Placa base:** ASUS H81M-P Plus (socket LGA 1150, chipset H81)  
**Procesador:** Intel Core i5 de 5ª generación  
**Memoria:** 8 GB DDR3 (2 × 4 GB)  
**Almacenamiento:** HDD de 1 TB  
**Sistema inicial:** Windows 10 (reinstalación pendiente)  
**Problema inicial:** La torre no daba video. Tras limpiar los contactos de la RAM, arrancó, pero al reiniciar apareció el error `WARNING: USB Overcurrent detected! System will shut down in 15 seconds`. La placa se bloqueaba y no respondía al teclado.  
**Objetivo:** Reparar el falso positivo de sobrecorriente y completar la instalación de Windows 10.  
**Resultado final:** Placa resucitada mediante el puente CLRTC. Windows 10 instalado y funcionando con normalidad.

---

## 1. Herramientas utilizadas

- **Goma de borrar de lápiz** (limpieza de contactos dorados de la RAM).
- **Destornillador de paleta** (para hacer el puente manual en los pines CLRTC).
- **Manual de la placa ASUS H81M-P Plus** (en PDF).
- **USB de instalación de Windows 10**.

---

## 2. Cronología de la reparación

### Fase 1: Primer diagnóstico y falso arreglo
- La torre llegó para una reinstalación de Windows 10. Al encender, los ventiladores y LEDs funcionaban pero no había video.
- Se siguió la regla de oro: limpiar los contactos de la RAM con goma de borrar. La placa dio video y arrancó Windows.
- **Error:** se asumió que el problema estaba resuelto.

### Fase 2: Aparición del error de sobrecorriente
- Al reiniciar para bootear desde el USB, apareció el mensaje de **American Megatrends**: `USB Overcurrent detected! System will shut down in 15 seconds`. La placa no respondía a ninguna tecla.
- Durante una semana se probaron múltiples soluciones: desconectar puertos USB frontales, retirar todos los periféricos, revisar pines, cambiar la fuente de poder y quitar la batería CMOS (que ni siquiera estaba presente). Ninguna funcionó. El problema residía en los puertos USB soldados a la placa, cerca del VGA.

### Fase 3: Descubrimiento del puente CLRTC
- Un **Short de YouTube** mostró un caso similar en una placa ASUS moderna. La solución era hacer un **puente manual en los pines CLRTC** con un destornillador de paleta. Esto no solo resetea la CMOS, sino que **purga los flags de error volátiles** del controlador UEFI.
- Se localizaron los pines CLRTC en el manual (cerca del borde inferior derecho) y se siguió el procedimiento:
  1. Desconectar totalmente la fuente y los conectores ATX/CPU.
  2. Esperar 10 minutos (o presionar el botón de encendido varias veces para descargar capacitores).
  3. Hacer puente con el destornillador en las combinaciones 1-2 y 2-3 durante 15 segundos cada una.
  4. Reconectar y encender.

### Fase 4: Resurrección y instalación de Windows
- La placa mostró el logo de ASUS sin errores. Se entró a la BIOS, se desactivó el Secure Boot y se instaló Windows 10 sin contratiempos.

---

## 3. Procedimiento clave: Puente CLRTC

```text
1. Apagar el equipo y desconectar el cable de alimentación.
2. Desconectar los conectores ATX de 24 pines y el de CPU de 4/8 pines.
3. Presionar el botón de encendido varias veces (descarga de capacitores).
4. Localizar los pines CLRTC (manual de la placa).
5. Con un destornillador de paleta, hacer puente entre los pines 1-2 durante 15 segundos.
6. Repetir el puente entre los pines 2-3 durante 15 segundos.
7. Reconectar todo y encender.
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| Sin video inicial | Contactos de RAM oxidados | Limpieza con goma de borrar |
| `USB Overcurrent detected` persistente | Falso positivo del circuito de protección USB; error grabado en memoria no volátil de la UEFI | Puente manual en pines CLRTC con destornillador |
| La placa no respondía al teclado durante el error | Bloqueo de seguridad de la BIOS | El puente CLRTC purga el flag y devuelve el control |

---

## 5. Lecciones aprendidas

1. **El puente CLRTC es una herramienta subestimada.** En placas UEFI modernas, quitar la batería CMOS no siempre borra los registros de error de bajo nivel. El puente físico fuerza un reinicio más profundo.
2. **El sistema de protección USB de ASUS es muy sensible.** Un pico de voltaje o una lectura errónea puede desencadenar un bloqueo severo aunque no haya un corto real.
3. **YouTube es una fuente técnica válida.** Un video de 60 segundos resolvió una semana de frustración. El ego técnico es el peor enemigo.

---

## 6. Estado final del dispositivo

- **Arranque:** Correcto.
- **Sistema:** Windows 10 instalado y funcional.
- **Puertos USB:** Operativos; el falso positivo fue eliminado.
- **Placa base:** ASUS H81M-P Plus funcionando sin errores.

---

## 7. Recomendaciones para futuros casos similares

- **Ante un `USB Overcurrent` que no cede**, probar el puente CLRTC antes de reemplazar la placa o soldar componentes.
- **Desconectar totalmente la fuente y descargar capacitores** antes de hacer el puente; de lo contrario, se corre riesgo de cortocircuito.
- **Documentar el procedimiento** para que otros técnicos no pasen una semana en el mismo calvario.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Torre Fantasma – ASUS H81M-P Plus / USB Overcurrent  
**Estado:** Resuelto ✅
