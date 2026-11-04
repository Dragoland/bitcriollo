import { describe, expect, it } from 'vitest'
import { asList, asString, parseFrontmatter } from './frontmatter'

describe('parseFrontmatter', () => {
  it('parsea clave: valor y recorta comillas', () => {
    const { data, content } = parseFrontmatter('---\ntitle: "Hola"\ndate: 2026-11-03\n---\n# Cuerpo')
    expect(data.title).toBe('Hola')
    expect(data.date).toBe('2026-11-03')
    expect(content.trim()).toBe('# Cuerpo')
  })

  it('parsea listas en una línea', () => {
    const { data } = parseFrontmatter('---\ntags: [linux, arch, bash]\n---\n')
    expect(data.tags).toEqual(['linux', 'arch', 'bash'])
  })

  it('parsea listas con guiones y las mezcla con comillas', () => {
    const src = '---\nimages:\n  - "/images/a.jpg"\n  - \'/images/b.jpg\'\n---\n'
    const { data } = parseFrontmatter(src)
    expect(data.images).toEqual(['/images/a.jpg', '/images/b.jpg'])
  })

  it('convierte true/false a booleanos', () => {
    const { data } = parseFrontmatter('---\ndraft: true\nfeatured: false\n---\n')
    expect(data.draft).toBe(true)
    expect(data.featured).toBe(false)
  })

  it('sin frontmatter devuelve data vacía y el texto íntegro', () => {
    const { data, content } = parseFrontmatter('# Solo markdown')
    expect(data).toEqual({})
    expect(content).toBe('# Solo markdown')
  })

  it('ignora comentarios y líneas vacías', () => {
    const { data } = parseFrontmatter('---\n# comentario\ntitle: X\n\n---\n')
    expect(data).toEqual({ title: 'X' })
  })

  it('soporta CRLF', () => {
    const { data, content } = parseFrontmatter('---\r\ntitle: Y\r\n---\r\nbody')
    expect(data.title).toBe('Y')
    expect(content).toBe('body')
  })
})

describe('helpers', () => {
  it('asString solo acepta strings', () => {
    expect(asString('ok')).toBe('ok')
    expect(asString(['no'])).toBe('')
    expect(asString(undefined, 'fb')).toBe('fb')
  })
  it('asList normaliza string suelto a lista', () => {
    expect(asList('a')).toEqual(['a'])
    expect(asList(['a', 'b'])).toEqual(['a', 'b'])
    expect(asList(undefined)).toEqual([])
  })
})
