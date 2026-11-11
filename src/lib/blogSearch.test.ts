import { describe, expect, it } from 'vitest'
import {
  filterPosts, fold, formatMonthKey, getAdjacentPosts, getMonthCounts, getRelatedPosts,
  getTagCounts, highlightSegments, slugify, tokenize,
} from './blogSearch'

const post = (slug: string, date: string, title: string, tags: string[], excerpt = '', content = '') => ({
  slug, date, title, tags, excerpt, content,
})

// De más nueva a más antigua, como las entrega posts.ts
const posts = [
  post('mint', '2026-10-26', 'Instalar Linux Mint', ['linux', 'tutorial'], 'Guía paso a paso', 'Descarga la ISO y crea el USB'),
  post('rescate', '2026-09-03', 'Recuperación de datos', ['hardware', 'tutorial'], 'Rescata tus archivos', 'Usa TestDisk con calma'),
  post('bug', '2026-09-01', 'El primer bug', ['historia', 'curiosidades'], 'Una polilla real', 'Harvard Mark II, 1947'),
  post('ollama', '2026-07-23', 'IA local con Ollama', ['linux', 'ia'], 'Sin nube', 'Instala ollama y descarga un modelo de recuperación'),
]

describe('fold y tokenize', () => {
  it('quita tildes y mayúsculas', () => {
    expect(fold('Recuperación ÁÉÍ')).toBe('recuperacion aei')
  })
  it('separa palabras, quita símbolos y repetidas', () => {
    expect(tokenize('Windows 10!  windows')).toEqual(['windows', '10'])
  })
  it('una búsqueda vacía no tiene palabras', () => {
    expect(tokenize('  ¿?  ')).toHaveLength(0)
  })
})

describe('slugify', () => {
  it('genera ids limpios para los títulos', () => {
    expect(slugify('¿Qué es un firewall?')).toBe('que-es-un-firewall')
    expect(slugify('  1. Instalar Ollama  ')).toBe('1-instalar-ollama')
  })
  it('los títulos solo con emojis quedan vacíos (el índice usa "seccion")', () => {
    expect(slugify('🚀🔥')).toBe('')
  })
})

describe('filterPosts', () => {
  it('sin filtros devuelve todo en el mismo orden', () => {
    expect(filterPosts(posts, {}).map((p) => p.slug)).toEqual(['mint', 'rescate', 'bug', 'ollama'])
  })
  it('busca sin importar tildes', () => {
    expect(filterPosts(posts, { q: 'recuperacion' }).map((p) => p.slug)).toEqual(['rescate', 'ollama'])
  })
  it('el título pesa más que el cuerpo', () => {
    expect(filterPosts(posts, { q: 'recuperacion' })[0].slug).toBe('rescate')
  })
  it('coincide con el inicio de palabra, no con el medio', () => {
    const cambios = [post('c', '2026-01-01', 'Cambios en la BIOS', ['hardware'], '', 'Actualiza la bios con cuidado'), post('d', '2026-01-02', 'Los cambios del año', ['vida'], '', 'cambios y más cambios')]
    expect(filterPosts(cambios, { q: 'bios' }).map((p) => p.slug)).toEqual(['c'])
    expect(filterPosts(cambios, { q: 'cambi' })).toHaveLength(2)
    expect(filterPosts(cambios, { q: 'ambios' })).toHaveLength(0)
  })
  it('exige todas las palabras', () => {
    expect(filterPosts(posts, { q: 'linux usb' }).map((p) => p.slug)).toEqual(['mint'])
    expect(filterPosts(posts, { q: 'linux polilla' })).toHaveLength(0)
  })
  it('filtra por etiqueta y por mes', () => {
    expect(filterPosts(posts, { tag: 'linux' }).map((p) => p.slug)).toEqual(['mint', 'ollama'])
    expect(filterPosts(posts, { month: '2026-09' }).map((p) => p.slug)).toEqual(['rescate', 'bug'])
  })
  it('combina filtros', () => {
    expect(filterPosts(posts, { tag: 'tutorial', month: '2026-09', q: 'archivos' }).map((p) => p.slug)).toEqual(['rescate'])
  })
})

describe('conteos', () => {
  it('cuenta etiquetas de más a menos usada', () => {
    const counts = getTagCounts(posts)
    expect(counts[0]).toEqual(['linux', 2])
    expect(counts[1]).toEqual(['tutorial', 2])
    expect(counts).toHaveLength(6)
  })
  it('agrupa por mes, el más reciente primero', () => {
    expect(getMonthCounts(posts)).toEqual([
      { key: '2026-10', label: 'Octubre 2026', count: 1 },
      { key: '2026-09', label: 'Septiembre 2026', count: 2 },
      { key: '2026-07', label: 'Julio 2026', count: 1 },
    ])
  })
  it('formatMonthKey tolera claves raras', () => {
    expect(formatMonthKey('2026-11')).toBe('Noviembre 2026')
    expect(formatMonthKey('raro')).toBe('raro')
  })
})

describe('relacionados y vecinos', () => {
  it('prioriza etiquetas en común y no incluye el propio post', () => {
    const related = getRelatedPosts(posts, posts[0], 2).map((p) => p.slug)
    expect(related).toEqual(['rescate', 'ollama'])
  })
  it('completa con recientes si faltan coincidencias', () => {
    expect(getRelatedPosts(posts, posts[2], 3).map((p) => p.slug)).toEqual(['mint', 'rescate', 'ollama'])
  })
  it('da la entrada anterior y la siguiente', () => {
    const adj = getAdjacentPosts(posts, 'rescate')
    expect(adj.newer?.slug).toBe('mint')
    expect(adj.older?.slug).toBe('bug')
    expect(getAdjacentPosts(posts, 'mint').newer).toBe(undefined)
    expect(getAdjacentPosts(posts, 'nada')).toEqual({})
  })
})

describe('highlightSegments', () => {
  it('marca coincidencias ignorando tildes', () => {
    expect(highlightSegments('Recuperación de datos', ['recuperacion'])).toEqual([
      { text: 'Recuperación', match: true },
      { text: ' de datos', match: false },
    ])
  })
  it('no marca coincidencias dentro de otra palabra', () => {
    expect(highlightSegments('cambios en la BIOS', ['bios'])).toEqual([
      { text: 'cambios en la ', match: false },
      { text: 'BIOS', match: true },
    ])
  })
  it('sin palabras no marca nada', () => {
    expect(highlightSegments('Hola', [])).toEqual([{ text: 'Hola', match: false }])
  })
  it('marca varias apariciones', () => {
    expect(highlightSegments('uso usb y USB', ['usb']).filter((s) => s.match)).toHaveLength(2)
  })
})
