# Documentación Técnica: Torre Zombi – Virus Persistentes, MBR/GPT y Disco Fantasma de 4 GB

**Equipo:** Torre genérica  
**Placa base:** ASUS H81M-P Plus (socket LGA 1150, chipset H81)  
**Procesador:** Intel Core i5 de 4ª generación  
**Memoria:** 8 GB DDR3 (2 × 4 GB)  
**Almacenamiento:** Dos HDD de 1 TB (uno de ellos severamente dañado, mostrado como disco de 4 GB)  
**Sistema inicial:** Windows 10 (infectado)  
**Problema inicial:** Infección viral persistente que clonaba carpetas, ocultaba directorios originales y redirigía clics. Kaspersky eliminaba las amenazas pero al reiniciar volvían a aparecer. Además, un disco de 1 TB aparecía como una unidad de 4 GB (“disco fantasma”). La instalación de Windows 10 fallaba por conflicto entre UEFI y MBR.  
**Objetivo:** Reinstalar Windows 10 limpio, conservando la partición de datos del usuario.  
**Resultado final:** Windows 10 instalado correctamente en modo Legacy. El disco dañado fue desconectado y reservado para diagnóstico futuro. Virus eliminados por completo.

---

## 1. Herramientas utilizadas

- **Kaspersky** (intento fallido de limpieza).
- **USB de instalación de Windows 10** (creado con Rufus o similar).
- **`diskpart`** (herramienta de línea de comandos del instalador de Windows, accesible con `Shift + F10`).
- **Ventoy** (para gestionar ISOs, aunque no se detalla su uso explícito).

---

## 2. Cronología de la reparación

### Fase 1: Diagnóstico de la infección viral
- La PC mostraba carpetas duplicadas en la raíz de las unidades. Al hacer clic en una copia, se abría una nueva ventana y se ejecutaba código malicioso en segundo plano. Las carpetas originales estaban ocultas y clasificadas como “aplicaciones”.
- Kaspersky encontró y puso en cuarentena varias amenazas, pero tras reiniciar, los virus reaparecían. Se descartó la limpieza y se optó por la reinstalación, ya que la partición de datos estaba intacta.

### Fase 2: El conflicto UEFI vs. MBR y el disco de 4 GB
- Al intentar instalar Windows 10, la partición del sistema no se dejaba formatear ni eliminar. El botón “Nuevo” estaba en gris. El error indicaba que el disco estaba en **MBR** pero el USB de instalación arrancaba en **UEFI**.
- Además, apareció un disco de ~4 GB en la lista. Se identificó como uno de los HDD de 1 TB que estaba tan dañado que el controlador solo reconocía un fragmento de su capacidad. Se desconectó físicamente para evitar interferencias.

### Fase 3: `diskpart` al rescate
- Se abrió la terminal del instalador con `Shift + F10` y se ejecutó `diskpart` para crear manualmente la partición del sistema en el disco bueno (MBR):
  - `list disk` → identificar el disco 0 (el HDD bueno; el USB era otro número).
  - `select disk 0`
  - `create partition primary`
  - `format fs=ntfs quick`
  - `assign letter=C`
  - `activate`
- La partición se creó, pero el instalador seguía dando error porque el USB había arrancado en modo UEFI. Se reinició, se entró a la BIOS y se seleccionó explícitamente el **arranque Legacy** (opción “USB” sin el prefijo “UEFI”). Esta vez la instalación procedió sin problemas.

### Fase 4: Instalación final y verificación
- Windows 10 se instaló correctamente. Se configuraron drivers y software básico. El sistema arrancó rápido y sin rastros de virus.

---

## 3. Comandos clave

### Abrir `diskpart` desde el instalador de Windows
```text
Shift + F10
```

### Crear partición manualmente en MBR
```cmd
diskpart
list disk
select disk 0
create partition primary
format fs=ntfs quick
assign letter=C
activate
exit
```

### Forzar arranque Legacy en la BIOS
```text
Entrar a BIOS (Del/F2) → Boot → Seleccionar "USB" sin prefijo "UEFI"
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| Virus que reaparecían tras el escaneo | Persistencia en sector de arranque, tareas programadas o registro | Reinstalación completa del sistema |
| Partición del sistema no manipulable | Disco en MBR y USB de instalación en UEFI | Arrancar el USB en modo Legacy (BIOS) |
| Disco de 1 TB reconocido como 4 GB | Falla grave de firmware o electrónica del HDD | Desconectar el disco dañado y continuar con el disco bueno |
| Botón “Nuevo” en gris en el instalador | Conflicto UEFI/MBR | Crear la partición manualmente con `diskpart` y luego arrancar en Legacy |

---

## 5. Lecciones aprendidas

1. **Siempre verificar el modo de arranque (UEFI vs. Legacy) antes de instalar.** Es una de las causas más comunes de errores aparentemente inexplicables.
2. **`diskpart` es poderoso pero peligroso.** Un `clean` mal aplicado puede borrar todos los datos. En este caso se evitó y se creó la partición manualmente.
3. **Los discos “moribundos” pueden mostrar capacidades ridículas.** Un HDD que reporta 4 GB en lugar de 1 TB está al borde de la muerte; hay que aislarlo de inmediato.

---

## 6. Estado final del dispositivo

- **Sistema:** Windows 10 limpio y funcional.
- **Almacenamiento:** HDD de 1 TB operativo; disco dañado de 4 GB reservado para diagnóstico futuro.
- **Virus:** Eliminados por completo tras la reinstalación.
- **Arranque:** Correcto en modo Legacy (MBR).

---

## 7. Recomendaciones para futuros casos similares

- **Ante virus persistentes**, no perder horas con antivirus si la reinstalación es viable. La reinstalación no es una derrota, es una solución eficiente.
- **Antes de instalar Windows**, comprobar en la BIOS si el USB debe arrancar en UEFI o Legacy según la tabla de particiones del disco.
- **Etiquetar y aislar discos dañados** para no comprometer la instalación ni los datos del usuario.

---

**Documento generado el:** 2026-11-10  
**Técnico:** Dragoland  
**Caso:** Torre Zombi – Virus, MBR/GPT y disco fantasma  
**Estado:** Resuelto ✅
