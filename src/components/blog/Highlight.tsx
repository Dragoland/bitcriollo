import { highlightSegments } from '../../lib/blogSearch'

/** Resalta con <mark> las palabras buscadas (sin importar tildes ni mayúsculas). */
export default function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0) return <>{text}</>
  return (
    <>
      {highlightSegments(text, tokens).map((segment, i) =>
        segment.match ? (
          <mark key={i} className="rounded bg-primary/20 px-0.5 text-foreground">
            {segment.text}
          </mark>
        ) : (
          <span key={i}>{segment.text}</span>
        )
      )}
    </>
  )
}
