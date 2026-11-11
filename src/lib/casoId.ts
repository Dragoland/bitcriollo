// Utilidades puras para enlazar un post con su "caso" descargable (archivo .md de documentación).
// Convención: el caso de un post es src/content/casos/<slug-del-post>.md.
// Si el archivo se llama distinto, el post lo indica con `caso: nombre-del-archivo` en el frontmatter.

/** "../content/casos/mi-caso.md" → "mi-caso" */
export const casoIdFromPath = (path: string): string => (path.split('/').pop() ?? '').replace(/\.md$/, '')

/** El `caso:` del frontmatter manda; si no hay, se usa el slug del post. */
export const resolveCasoId = (frontmatterValue: string, slug: string): string => frontmatterValue.trim() || slug

/** Nombre del archivo descargado: "2026-09-13-laptop-guason" → "caso-laptop-guason.md" */
export const casoFileName = (id: string): string => `caso-${id.replace(/^\d{4}-\d{2}-\d{2}-/, '')}.md`
