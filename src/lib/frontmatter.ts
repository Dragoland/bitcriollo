// Parser mínimo de frontmatter (sin Buffer, funciona en el navegador).
// Soporta: `clave: valor`, `clave: [a, b]` y listas YAML con guiones.
export type FrontmatterValue = string | boolean | string[]
export type FrontmatterData = Record<string, FrontmatterValue>

const unquote = (v: string) => v.trim().replace(/^["']|["']$/g, '')

export function parseFrontmatter(source: string): { data: FrontmatterData; content: string } {
  const raw = source.replace(/\r\n/g, '\n')
  const match = raw.match(/^---[^\S\n]*\n([\s\S]*?)\n---[^\S\n]*(?:\n([\s\S]*))?$/)
  if (!match) return { data: {}, content: raw }

  const data: FrontmatterData = {}
  let currentKey: string | null = null

  for (const line of match[1].split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    // Elemento de lista YAML: - "valor"
    if (trimmed.startsWith('-') && currentKey) {
      const existing = data[currentKey]
      const list = Array.isArray(existing) ? existing : []
      list.push(unquote(trimmed.slice(1)))
      data[currentKey] = list
      continue
    }

    // Lista en una línea: tags: [a, b]
    const inline = trimmed.match(/^(\w+):\s*\[(.*)\]$/)
    if (inline) {
      currentKey = inline[1]
      data[currentKey] = inline[2].split(',').map(unquote).filter(Boolean)
      continue
    }

    // clave: valor  (o `clave:` que abre una lista)
    const kv = trimmed.match(/^(\w+):\s*(.*)$/)
    if (kv) {
      currentKey = kv[1]
      const value = unquote(kv[2])
      if (value === '') continue
      data[currentKey] = value === 'true' ? true : value === 'false' ? false : value
    }
  }

  return { data, content: match[2] ?? '' }
}

export const asString = (v: FrontmatterValue | undefined, fallback = ''): string =>
  typeof v === 'string' ? v : fallback

export const asList = (v: FrontmatterValue | undefined): string[] =>
  Array.isArray(v) ? v : typeof v === 'string' && v ? [v] : []
