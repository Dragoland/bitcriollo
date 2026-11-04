import Reveal from './Reveal'

interface SectionHeaderProps {
  eyebrow: string
  title: string
  description?: string
  /** h1 para el título principal de una página, h2 para secciones internas */
  as?: 'h1' | 'h2'
  align?: 'center' | 'left'
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = 'h2',
  align = 'center',
}: SectionHeaderProps) {
  const center = align === 'center'
  return (
    <Reveal className={`mb-12 lg:mb-16 ${center ? 'text-center' : ''}`}>
      <div
        className={`mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground ${
          center ? 'justify-center' : ''
        }`}
      >
        <span className="text-primary">//</span> {eyebrow}
      </div>
      <Heading className="mb-4 font-mono text-3xl font-extrabold tracking-tight text-foreground lg:text-[42px]">
        {title}
      </Heading>
      {description && (
        <p className={`font-body text-base text-muted-foreground ${center ? 'mx-auto max-w-[600px]' : 'max-w-[600px]'}`}>
          {description}
        </p>
      )}
    </Reveal>
  )
}
