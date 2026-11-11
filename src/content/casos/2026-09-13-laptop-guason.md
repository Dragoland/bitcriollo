# Documentación Técnica: Laptop Guasón – Dell Inspiron N5110, Disco Moribundo y CachyOS al Rescate

**Equipo:** Dell Inspiron N5110  
**Procesador:** Intel Core i5 de 2ª generación  
**Memoria:** 6 GB DDR3  
**Almacenamiento:** HDD de 1 TB (mecánico, con 8088 horas de uso y errores críticos)  
**Sistema inicial:** Windows 10 (arranque fallido)  
**Problema inicial:** La laptop no arranca Windows; cuando lo hace, tarda 5 minutos y lanza pantallazos azules a los pocos minutos. El disco tiene errores críticos (error 2000-0151 de la BIOS Dell) y no permite manipular particiones ni con `diskpart`.  
**Objetivo:** Instalar Windows 10 para dejar la laptop funcional, a pesar del estado del disco.  
**Resultado final:** Windows 10 instalado tras usar CachyOS live + KDE Partition Manager para reparar las particiones. Se advirtió al cliente que el disco es una “bomba de relojería” y debe ser reemplazado.

---

## 1. Herramientas utilizadas

- **CachyOS** (distribución Linux basada en Arch, en modo live).
- **KDE Partition Manager** (herramienta gráfica de particionado).
- **Ventoy** (para gestionar ISOs de arranque).
- **CrystalDiskInfo** (diagnóstico del estado del disco).
- **USB de instalación de Windows 10**.
- **`diskpart`** (intento fallido).

---

## 2. Cronología de la reparación

### Fase 1: Diagnóstico inicial y sospecha de virus
- La laptop arrancaba muy lentamente y lanzaba pantallazos azules. Se sospechó una infección viral que saturaba la RAM, pero el cliente prefirió reinstalar Windows.

### Fase 2: Particiones rebeldes y fallo de `diskpart`
- Al intentar instalar Windows 10, las particiones no se dejaban formatear, borrar ni crear. Se abrió `diskpart` con `Shift + F10`, pero **`diskpart` falló** al intentar limpiar el disco. Esto indicaba un problema físico o de firmware.

### Fase 3: Diagnóstico de la BIOS y error 2000-0151
- Se ejecutó el diagnóstico de la BIOS Dell (F12). El test del disco duro arrojó **error 2000-0151: fallo crítico del disco**. La placa emitió pitidos. El veredicto fue claro: el HDD está dañado físicamente.

### Fase 4: CachyOS y KDE Partition Manager
- Se arrancó CachyOS en modo live. La laptop, que apenas podía con Windows, movió CachyOS con soltura.
- Con **KDE Partition Manager** se borraron las particiones rebeldes y se creó una nueva partición de 50 GB en NTFS. La operación funcionó donde `diskpart` había fallado.

### Fase 5: Instalación de Windows y apagón
- Windows 10 se instaló, pero la instalación se corrompió varias veces. En uno de los intentos, un **apagón** interrumpió el proceso. Tras varios reintentos, la instalación finalizó correctamente.

### Fase 6: CrystalDiskInfo y advertencia al cliente
- Se instaló CrystalDiskInfo. El disco reportó:
  - Temperatura base: 54 °C.
  - Estado: **De Riesgo**.
  - Horas de uso: **8088 horas** (equivalente a más de 9 años de uso continuo).
- Se advirtió al cliente que el disco puede fallar en cualquier momento y que debe respaldar datos y buscar un reemplazo.

---

## 3. Comandos y procedimientos clave

### Diagnóstico de disco en BIOS Dell
```text
F12 al encender → Diagnostics → Hard Drive Test
```

### Particionado con KDE Partition Manager (CachyOS live)
```text
1. Arrancar CachyOS en modo live.
2. Abrir KDE Partition Manager.
3. Seleccionar el disco dañado.
4. Eliminar todas las particiones existentes.
5. Crear nueva tabla de particiones (msdos/MBR).
6. Crear partición NTFS de 50 GB.
7. Aplicar cambios.
```

### Diagnóstico de salud del disco
```text
Instalar CrystalDiskInfo en Windows.
Revisar: estado, temperatura, horas de uso, sectores reasignados.
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| Particiones no manipulables | Disco con daño físico/firmware; `diskpart` falla | Usar CachyOS live + KDE Partition Manager |
| Instalación de Windows corrupta | Estado del disco y apagón durante el proceso | Reintentar la instalación tras reparar particiones |
| Disco “de riesgo” con 8088 horas | Desgaste extremo del HDD | Advertir al cliente; respaldar datos y planificar reemplazo |

---

## 5. Lecciones aprendidas

1. **Linux es un salvavidas incluso en hardware moribundo.** Cuando Windows y `diskpart` fallan, una distro live con KDE Partition Manager puede hacer magia.
2. **El diagnóstico temprano es clave.** El error 2000-0151 de la BIOS Dell confirmó el fallo crítico del disco y evitó seguir intentando soluciones inútiles.
3. **Los discos duros mienten sobre su salud.** CrystalDiskInfo es indispensable. Un disco puede instalar un sistema operativo y aun así estar al borde del colapso.

---

## 6. Estado final del dispositivo

- **Sistema:** Windows 10 instalado y funcional.
- **Almacenamiento:** HDD de 1 TB en estado “De Riesgo”; se recomienda reemplazo urgente.
- **Funciones:** Básicas operativas, pero con riesgo de fallo repentino.
- **Advertencia:** El cliente fue informado de la naturaleza crítica del disco.

---

## 7. Recomendaciones para futuros casos similares

- **Ante un disco que no permite ni `diskpart`**, probar una distro Linux live con herramientas gráficas de particionado antes de declararlo muerto.
- **Siempre ejecutar CrystalDiskInfo** tras una instalación en un equipo antiguo; las horas de uso y los sectores reasignados revelan la verdadera salud del disco.
- **Ser honesto con el cliente:** un disco “de riesgo” no es una reparación definitiva, es una solución temporal.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Laptop Guasón – Dell Inspiron N5110 / Disco moribundo  
**Estado:** Resuelto parcialmente (disco en estado crítico) ⚠️
