import { casoIdFromPath } from './casoId'

// Los casos NO se meten en el JavaScript de la web: se importan como archivos (?url) y solo se
// descargan cuando alguien pulsa el botón. Las claves del glob se conocen al compilar, así que
// saber si un caso existe es instantáneo.
const loaders = import.meta.glob('../content/casos/*.md', {
  query: '?url',
  import: 'default',
}) as Record<string, () => Promise<string>>

const available = new Map(Object.entries(loaders).map(([path, load]) => [casoIdFromPath(path), load]))

export const hasCaso = (id: string): boolean => available.has(id)
export const getCasoIds = (): string[] => [...available.keys()]

/** Dirección del archivo del caso, o null si no existe. */
export async function getCasoUrl(id: string): Promise<string | null> {
  const load = available.get(id)
  return load ? load() : null
}
