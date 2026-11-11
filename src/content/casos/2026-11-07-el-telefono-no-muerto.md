# Documentación Técnica: Recuperación de Redmi A2 (water) – Caso FRP y Bucle BROM

**Dispositivo:** Xiaomi Redmi A2 (codename `water`)  
**Chipset:** MediaTek MT6765 (Helio G36)  
**Memoria:** 64 GB eMMC  
**Sistema inicial:** MIUI 14 / Android 13 (V14.0.44.0.TGOMIXM)  
**Problema inicial:** Bloqueo FRP (cuenta de Google) tras formateo de fábrica. El teléfono no pasaba de la solicitud de la cuenta original.  
**Objetivo:** Dejar el teléfono funcional sin la cuenta de Google, conservando IMEI y funciones básicas.  
**Resultado final:** Teléfono reparado, arranca correctamente, FRP eliminado, IMEI verificado y funcional.

---

## 1. Herramientas utilizadas

- **Arch Linux** (sistema operativo del técnico).
- **mtkclient** (versión compilada, con preloader parcheado `preloader_fixed.bin`).
- **Fastboot / ADB** (`android-tools`).
- **SP Flash Tool v5 y v6** (intentadas; v5 con error de Qt, v6 requería `flash.xml`/`flash.xsd`).
- **Backup completo** (`backup_completo.img`) realizado con `mtk rf` antes de cualquier modificación (58 GB, solo área EMMC_USER).
- **Firmware oficial** `water_global_images_V14.0.44.0.TGOMIXM_13.0` (formato Fastboot `.tgz`).
- **Preloader con cabecera `EMMC_BOOT`** (obtenido de un Full Dump/Engineering ROM, no del firmware oficial).
- **Script `flash_all.sh`** del firmware oficial (utilizado al final para flashear el sistema completo).

---

## 2. Cronología de la reparación

### Fase 1: Diagnóstico inicial y backup
- El teléfono presentaba bloqueo FRP. Fastboot estaba bloqueado, el modo MiAssistant no disponible y el recovery solo mostraba opciones básicas.
- Se realizó un **backup completo** con `mtkclient`:
  ```bash
  python mtk.py rf backup_completo.img --preloader preloader_fixed.bin
  ```
- **Limitación importante:** `mtk rf` solo vuelca el área **EMMC_USER**. No incluye las particiones de arranque `boot1`/`boot2` (región `EMMC_BOOT1_BOOT2`), donde reside el preloader con su cabecera `EMMC_BOOT`.

### Fase 2: Primeros flasheos con mtkclient
- Se accedió al modo BROM con `preloader_fixed.bin` (preloader parcheado para saltar protecciones SBC/SLA/DAA y configurar DRAM).
- Se flashearon particiones con `wl` y `w`, pero inicialmente se omitieron las particiones A/B por nombres incorrectos (`boot` en lugar de `boot_a`/`boot_b`).
- Se corrigió usando los nombres exactos de la GPT (`boot_a`, `boot_b`, `vbmeta_a`, etc.) y apuntando a la carpeta `images/`.
- **Error crítico:** Al escribir `preloader_water.bin` (240 KB) directamente en `boot1` con el comando `w`, se **sobrescribió la cabecera `EMMC_BOOT`**. El teléfono quedó en un bucle BROM: el chip no reconocía el preloader y no arrancaba.

### Fase 3: Recuperación de la cabecera `EMMC_BOOT`
- Se confirmó con `xxd` que `boot1` y `boot2` empezaban directamente con `FILE_INFO` (sin `EMMC_BOOT`). La cabecera estaba destruida.
- Se descartó extraerla del backup (`grep`/`strings` no encontraron `EMMC_BOOT`; el backup no contenía `boot1`/`boot2`).
- Se intentaron múltiples vías: `payload`, `redirect_to.py`, `meta`, SP Flash Tool (v5 con error de Qt, v6 requería `flash.xml`/`flash.xsd`).
- **Solución:** Se obtuvo un **preloader completo con cabecera `EMMC_BOOT`** (de un Full Dump/Engineering ROM para `water`). Se flasheó en `boot1` y `boot2`:
  ```bash
  python mtk.py w preloader preloader_con_cabecera.bin --parttype=boot1 --preloader preloader_fixed.bin
  ```
- El teléfono comenzó a encender y a mostrar Fastboot/Recovery. Se recuperó el acceso al bootloader.

### Fase 4: Desbloqueo del bootloader y RPMB
- Se verificó `rpmblock_support: yes`. El bootloader seguía bloqueado a pesar de `seccfg unlock` debido a la "magia RPMB".
- Se identificó el sector RPMB correcto para este modelo: **16352**.
- Se ejecutó el borrado de la magia y el desbloqueo:
  ```bash
  python mtk.py da rpmb e --sector 16352 --sectors 4 --preloader preloader_fixed.bin
  python mtk.py da seccfg unlock --preloader preloader_fixed.bin
  ```
- Se logró `unlocked: yes` y `secure: no` en Fastboot.

### Fase 5: dm-verity y slot failures
- Apareció el aviso de `dm-verity` corrupto. Se intentó `fastboot oem cdms fix` (funcionó temporalmente), `mtkclient da vbmeta 3`, y flasheo de `vbmeta` vacío (falló por `AVB_MAGIC`).
- El teléfono seguía yendo a Fastboot. El log mostraba `slot-successful:a: no` y `slot-retry-count:a` decrementando.
- Se flashearon `boot`, `lk`, `dtbo`, `tee`, `vbmeta_system`, `vbmeta_vendor` desde el firmware V14.0.44.0, pero el slot seguía fallando.
- Se descubrió que `super.img` era **sparse** (`Android sparse image`), y `mtkclient` no puede flashearla correctamente. Esto dejaba la partición `super` incompleta.

### Fase 6: Solución final – `flash_all.sh`
- Se utilizó el script oficial `flash_all.sh` del firmware `V14.0.44.0.TGOMIXM`, que sabe manejar imágenes sparse y flashea todas las particiones desde Fastboot.
- El script reescribió `super`, `boot`, `vbmeta` y el resto de particiones, dejando el sistema completo y coherente.
- **Resultado:** El teléfono arrancó correctamente, sin FRP, con el sistema operativo funcional.

### Fase 7: Verificación final
- **IMEI:** Se verificó con `*#06#` y `fastboot getvar imei`. Aparece un número de 15 dígitos (aspecto aleatorio, normal). Coincide con la caja/etiqueta. Válido.
- **Funciones básicas:** Wi-Fi, datos móviles, llamadas, cámara y sensores funcionan correctamente.
- **Bootloader:** Desbloqueado (`unlocked: yes`). Se puede volver a bloquear con `fastboot oem lock` si el cliente lo desea, pero solo tras confirmar que el sistema arranca perfectamente.

---

## 3. Comandos clave utilizados

### Backup y lectura
```bash
python mtk.py rf backup_completo.img --preloader preloader_fixed.bin
python mtk.py r boot_a,boot_b boot_a.img,boot_b.img --preloader preloader_fixed.bin
```

### Flasheo de particiones (ejemplos)
```bash
# Preloader con cabecera (crítico)
python mtk.py w preloader preloader_con_cabecera.bin --parttype=boot1 --preloader preloader_fixed.bin
python mtk.py w preloader preloader_con_cabecera.bin --parttype=boot2 --preloader preloader_fixed.bin

# Particiones A/B
python mtk.py w boot_a,boot_b boot.img,boot.img --preloader preloader_fixed.bin
python mtk.py w vbmeta_a,vbmeta_b vbmeta.img,vbmeta.img --preloader preloader_fixed.bin

# Borrado de flags
python mtk.py e misc --preloader preloader_fixed.bin
python mtk.py e boot_para,para --preloader preloader_fixed.bin
```

### Desbloqueo de bootloader (RPMB)
```bash
python mtk.py da rpmb e --sector 16352 --sectors 4 --preloader preloader_fixed.bin
python mtk.py da seccfg unlock --preloader preloader_fixed.bin
```

### Fastboot
```bash
fastboot oem cdms fix
fastboot --disable-verity --disable-verification flash vbmeta_a vbmeta.img
fastboot set_active a
fastboot reboot
```

### Flasheo completo final
```bash
./flash_all.sh
```

---

## 4. Problemas encontrados y soluciones

| Problema | Causa | Solución |
| :--- | :--- | :--- |
| Bucle BROM tras flashear preloader | Se sobrescribió la cabecera `EMMC_BOOT` en `boot1` | Obtener un preloader completo con cabecera y flashearlo en `boot1`/`boot2` |
| `DRAM setup failed` | Falta de configuración de DRAM | Usar `preloader_fixed.bin` con sintaxis correcta: `--preloader` después del comando |
| `No such file or directory` al flashear `vbmeta` en Fastboot | Estaba en `fastbootd` (`is-userspace: yes`) | Reiniciar al bootloader real (`fastboot reboot bootloader`) |
| `Failed to find AVB_MAGIC` | Fastboot no puede parchear `vbmeta` al vuelo | Parchear con `mtkclient da vbmeta 3` o flashear `vbmeta` original sin flags |
| `slot-successful:a: no` persistente | `super.img` sparse no se flashea correctamente con `mtkclient` | Usar `flash_all.sh` (maneja sparse) o convertir a raw con `simg2img` |
| `dm-verity` corrupto | Verificación de integridad fallida | `fastboot oem cdms fix` o `mtkclient da vbmeta 3` |
| Bootloader bloqueado a pesar de `seccfg unlock` | RPMB "magia" activa (`rpmblock_support: yes`) | Borrar sector RPMB 16352 y luego `seccfg unlock` |

---

## 5. Lecciones aprendidas

1. **El backup con `mtk rf` solo cubre `EMMC_USER`.** No incluye `boot1`/`boot2`, por lo que no sirve para recuperar el preloader. Para eso se necesita un Full Dump o una Engineering ROM.
2. **La cabecera `EMMC_BOOT` es obligatoria.** El preloader del firmware oficial (240 KB) no la incluye; al escribirlo directamente en `boot1` se destruye la cabecera y el chip entra en bucle BROM.
3. **`mtkclient` no flashea imágenes sparse.** Para `super.img` hay que convertir a raw con `simg2img` o usar `flash_all.sh`.
4. **El sector RPMB para el MT6765 del Redmi A2 es 16352.** Borrarlo es necesario para que `seccfg unlock` persista.
5. **La sintaxis de `--preloader` importa.** Debe ir después del subcomando (`w`, `printgpt`, etc.) y con ruta absoluta.
6. **`fastbootd` vs bootloader real.** En `fastbootd` (`is-userspace: yes`) no se pueden flashear particiones físicas como `vbmeta_a`/`vbmeta_b`; hay que reiniciar al bootloader real.
7. **Los flags de slot (`slot-successful`, `slot-retry-count`) son sensibles.** Un `super` incompleto impide que el slot se marque como exitoso, aunque `boot` y `vbmeta` estén bien.

---

## 6. Estado final del dispositivo

- **Arranque:** Correcto. Llega al asistente de configuración sin pedir la cuenta de Google anterior (FRP eliminado).
- **IMEI:** Válido (15 dígitos, verificado con `*#06#` y comparado con la caja).
- **Funciones:** Wi-Fi, datos móviles, llamadas, cámara y sensores operativos.
- **Bootloader:** Desbloqueado (`unlocked: yes`). Se puede volver a bloquear si el cliente lo solicita, tras confirmar estabilidad.
- **Sistema:** MIUI 14 / Android 13 (V14.0.44.0.TGOMIXM), flasheado con `flash_all.sh`.

---

## 7. Recomendaciones para futuros casos similares

- **Antes de flashear el preloader**, verificar siempre que la imagen incluya la cabecera `EMMC_BOOT` (`xxd -l 16`). Si no la incluye, no escribirla en `boot1` con `w`.
- **Para `super.img` sparse**, usar `flash_all.sh` o `simg2img` + `mtk w super`.
- **Documentar los offsets del scatter** para extraer particiones del backup si es necesario.
- **No compartir el IMEI completo** en foros o documentación pública.
- **Guardar una copia del preloader con cabecera** para futuras reparaciones de este modelo.

---

**Documento generado el:** 2026-11-06  
**Técnico:** Dragoland  
**Caso:** Recuperación de Redmi A2 (water) – FRP + Bucle BROM  
**Estado:** Resuelto ✅
