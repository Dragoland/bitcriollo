// Base mínima de internacionalización: ES (por defecto) y EN bajo el prefijo /en.
// Estrategia: traducir SOLO portada, servicios remotos y contacto (lo que vende fuera).
// El blog y la tienda siguen en español (contenido local).
//
// Uso básico:
//   const { lang, t } = useI18n()
//   <h1>{t.hero.title}</h1>
//   <Link to={lang === 'en' ? '/en/servicios' : '/servicios'}>…</Link>
//
// En App.tsx envuelve las rutas con <I18nProvider> y duplica las 3 rutas traducidas:
//   { path: 'en', element: <Layout/>, children: [ {index:true, element:<Home/>}, … ] }

import { createContext, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'

export type Lang = 'es' | 'en'

const STORAGE_KEY = 'bitcriollo-lang'

const dict = {
  es: {
    hero: {
      badge: 'Villa Clara, Cuba · Remoto',
      title1: 'PCs lentas, virus, celulares locos, cuentas bloqueadas',
      title2: 'y también desarrollo de software, automatización e IA local',
      cta: '¿Proyecto remoto? Cuéntame tu idea →',
    },
    services: {
      eyebrow: 'LO QUE RESUELVO',
      title: 'Los problemas que más me traen',
      remote: 'Desarrollo Remoto',
    },
  },
  en: {
    hero: {
      badge: 'Villa Clara, Cuba · Remote worldwide',
      title1: 'Slow PCs, viruses, misbehaving phones, locked accounts',
      title2: 'and also software development, automation and local AI',
      cta: 'Remote project? Tell me your idea →',
    },
    services: {
      eyebrow: 'WHAT I FIX',
      title: 'The problems people bring me most',
      remote: 'Remote Development',
    },
  },
} as const

export type Dict = (typeof dict)['es']

interface I18nCtx {
  lang: Lang
  t: Dict
  setLang: (l: Lang) => void
}

const Ctx = createContext<I18nCtx>({ lang: 'es', t: dict.es, setLang: () => {} })

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  const fromUrl: Lang = pathname.startsWith('/en') ? 'en' : 'es'
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved === 'en' || saved === 'es' ? saved : fromUrl
    } catch {
      return fromUrl
    }
  })

  useEffect(() => {
    setLang(fromUrl)
    try {
      localStorage.setItem(STORAGE_KEY, fromUrl)
    } catch {
      /* sin almacenamiento: se queda el de la URL */
    }
  }, [fromUrl])

  return <Ctx.Provider value={{ lang, t: dict[lang], setLang }}>{children}</Ctx.Provider>
}

export const useI18n = () => useContext(Ctx)

/** Prefijo de ruta según idioma: withLang('/servicios') → '/en/servicios' en inglés. */
export const withLang = (path: string, lang: Lang) =>
  lang === 'en' ? `/en${path === '/' ? '' : path}` : path
