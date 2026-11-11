import { describe, expect, it } from 'vitest'
import { casoFileName, casoIdFromPath, resolveCasoId } from './casoId'

describe('casoId', () => {
  it('saca el id desde la ruta del archivo', () => {
    expect(casoIdFromPath('../content/casos/2026-09-13-laptop-guason.md')).toBe('2026-09-13-laptop-guason')
    expect(casoIdFromPath('telefono-en-cirugia.md')).toBe('telefono-en-cirugia')
  })
  it('por defecto el caso se llama igual que el post', () => {
    expect(resolveCasoId('', '2026-10-14-torre-epileptica')).toBe('2026-10-14-torre-epileptica')
    expect(resolveCasoId('   ', 'mi-post')).toBe('mi-post')
  })
  it('el frontmatter puede apuntar a otro archivo', () => {
    expect(resolveCasoId('telefono-en-cirugia', '2026-11-12-redmi-a2')).toBe('telefono-en-cirugia')
  })
  it('el archivo descargado no lleva la fecha', () => {
    expect(casoFileName('2026-09-13-laptop-guason')).toBe('caso-laptop-guason.md')
    expect(casoFileName('telefono-en-cirugia')).toBe('caso-telefono-en-cirugia.md')
  })
})
