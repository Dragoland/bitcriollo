import { Github, Star, ExternalLink } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { PROJECTS } from '../data/projects'
import { githubUrl } from '../lib/site'

export default function ProjectsPage() {
  return (
    <section className="py-20 lg:py-28">
      <div className="site-container">
        <SectionHeader
          as="h1"
          eyebrow="PROYECTOS"
          title="Código abierto"
          description="Lo que construyo cuando nadie me lo pide. Todo con repositorio público; los destacados tienen demo."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {PROJECTS.map((p) => (
            <article
              key={p.repo}
              className={`flex flex-col rounded-xl border border-border bg-card transition-colors hover:border-muted-foreground/40 ${
                p.featured ? 'sm:col-span-2' : ''
              }`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={`Captura de ${p.name}`}
                  loading="lazy"
                  className="aspect-[2/1] w-full rounded-t-xl border-b border-border object-cover"
                />
              )}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2 className="font-mono text-lg font-bold text-foreground">{p.name}</h2>
                  {p.featured && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
                      destacado
                    </span>
                  )}
                </div>
                <p className="mb-4 flex-1 font-body text-sm text-muted-foreground">{p.description}</p>
                {p.tech.length > 0 && (
                  <ul className="mb-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-foreground/5 px-2 py-0.5 font-code text-xs text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-3">
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-muted-foreground/40"
                  >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Código
                  </a>
                  {p.demo && p.demo !== '#' && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-mono text-sm font-semibold text-primary-foreground transition-all hover:brightness-110"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center font-body text-sm text-muted-foreground">
          ¿Quieres algo así para tu negocio?{' '}
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
            Mira todo mi GitHub <Star className="inline h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
  )
}
