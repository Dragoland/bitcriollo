# Documentación Técnica: Torre Epiléptica – Ventilador a 340 RPM y RAM con Pin Faltante

**Equipo:** Torre genérica  
**Placa base:** ASUS de socket H81/B85 (circa 2014-2015)  
**Procesador:** Intel Core i3 de 4ª generación (LGA 1150)  
**Memoria:** 4 GB DDR3 (un solo módulo; había un segundo módulo de 4 GB “rechazado”)  
**Almacenamiento:** HDD de 320 GB (con 39 sectores reasignados y 1 pendiente)  
**Gráfica:** Tarjeta dedicada pasiva (sin ventilador), con salidas VGA y DVI  
**Sistema inicial:** Windows 10 (inestable, pantallazos azules)  
**Problema inicial:** Pantallazos azules repentinos al encender y al copiar archivos. Lentitud extrema. El ventilador del CPU gira a 340 RPM (muy por debajo de lo normal), causando sobrecalentamiento y *thermal throttling*. Además, un módulo de RAM adicional no era reconocido.  
**Objetivo:** Reparar el sobrecalentamiento, diagnosticar la RAM y reinstalar Windows 10.  
**Resultado final:** Ventilador del CPU reemplazado por uno funcional (del servidor caído). RAM defectuosa identificada (pin 3 faltante) y descartada. Windows 10 reinstalado. Equipo estable y funcional.

---

## 1. Herramientas utilizadas

- **CrystalDiskInfo** (diagnóstico del HDD).
- **BIOS de la placa** (para leer las RPM del ventilador).
- **Goma de borrar** (limpieza de contactos de la RAM).
- **Lupa** (inspección del pin faltante en la RAM).
- **Ventilador de CPU de repuesto** (extraído de la torre del “Servidor Caído”).
- **USB de instalación de Windows 10** (con Ventoy).

---

## 2. Cronología de la reparación

### Fase 1: Diagnóstico inicial y descubrimiento del ventilador lento
- La torre arrancaba pero el ventilador del CPU no giraba o lo hacía a 340 RPM. Windows cargaba extremadamente lento y lanzaba pantallazos azules.
- Se verificó la línea de 12V de la fuente (correcta). El problema estaba en el motor del disipador. Un ventilador de stock Intel debe girar entre 1,000 y 1,500 RPM en reposo; 340 RPM indica que el CPU se está cocinando.

### Fase 2: El misterio de la RAM rechazada
- Había un módulo DDR3 de 4 GB fuera de la torre. Al insertarlo, la PC no daba video.
- Se limpiaron los contactos con goma de borrar; el problema persistió. Con una lupa se descubrió que **al pin número 3 del frontal le faltaba el baño de oro**. Era una línea de señal crítica, por lo que la memoria era inservible.

### Fase 3: Trasplante de ventilador
- Se extrajo el ventilador funcional de la torre del “Servidor Caído” (proyecto abandonado) y se instaló en el socket del CPU.
- Al encender, el ventilador giró a más de 1,000 RPM estables. El *thermal throttling* desapareció y los pantallazos azules cesaron.

### Fase 4: Reinstalación de Windows
- Con la temperatura bajo control, se reinstaló Windows 10 desde cero. La instalación transcurrió sin las trabas de MBR/GPT de otros casos. Se configuraron drivers y software básico.

---

## 3. Comandos y procedimientos clave

### Verificar RPM del ventilador en BIOS
```text
Entrar a BIOS (Del/F2) → Monitor / Hardware Monitor → CPU Fan Speed
Valor normal en reposo: 1,000 – 1,500 RPM
Valor anómalo: < 500 RPM (riesgo de sobrecalentamiento)
```

### Inspección de contactos de RAM
```text
1. Retirar el módulo de RAM.
2. Limpiar contactos dorados con goma de borrar.
3. Inspeccionar con lupa los pines del conector.
4. Verificar que todos los contactos tengan baño de oro.
```

### Diagnóstico del HDD
```text
Instalar CrystalDiskInfo.
Revisar: estado, horas de uso, sectores reasignados.
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| Pantallazos azules y lentitud extrema | Ventilador del CPU a 340 RPM → sobrecalentamiento → *thermal throttling* | Reemplazo del ventilador por uno funcional |
| Módulo de RAM no reconocido | Pin 3 faltante (sin baño de oro) en el conector | Descartar el módulo; usar solo el que funciona |
| HDD con sectores dañados | Desgaste (22,500 horas de uso) | Se mantuvo, pero se advirtió que está “De Riesgo” |

---

## 5. Lecciones aprendidas

1. **El *thermal throttling* engaña.** Un sistema lento y con pantallazos azules puede parecer un problema de software (virus, Windows corrupto) cuando en realidad el CPU se está ahogando por falta de refrigeración.
2. **Inspección visual obligatoria en las memorias.** Un pin faltante o quemado inutiliza el módulo por completo. No asumir “incompatibilidad” sin revisar los contactos.
3. **El banco de repuestos es oro.** Un ventilador de una torre abandonada devolvió la vida a este equipo. En la informática empírica, nada se tira.

---

## 6. Estado final del dispositivo

- **Arranque:** Correcto.
- **Refrigeración:** Ventilador del CPU a más de 1,000 RPM; temperaturas estables.
- **RAM:** 4 GB funcionales (el módulo dañado fue descartado).
- **Almacenamiento:** HDD de 320 GB en estado “De Riesgo”; se recomienda respaldo.
- **Sistema:** Windows 10 reinstalado y funcional.

---

## 7. Recomendaciones para futuros casos similares

- **Ante lentitud extrema y pantallazos azules**, revisar las RPM del ventilador del CPU en la BIOS antes de sospechar de virus o del sistema operativo.
- **Inspeccionar visualmente los módulos de RAM** con lupa; un pin dañado es fácil de pasar por alto.
- **Mantener un banco de repuestos** (ventiladores, fuentes, RAM) para pruebas y reemplazos de emergencia.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Torre Epiléptica – Ventilador a 340 RPM y RAM con pin faltante  
**Estado:** Resuelto ✅
