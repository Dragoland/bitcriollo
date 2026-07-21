import { Link } from 'react-router'

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-8 bg-card">
      <div className="container mx-auto px-4 text-center">
        <div className="font-mono font-bold text-primary text-lg mb-2">
          BitCriollo<span className="text-orange-400">.dev</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Hecho con &gt; y paciencia · Falcón, Placetas, Villa Clara, Cuba
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <a href="https://t.me/diario_del_informatico" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Telegram</a>
          <a href="https://github.com/Dragoland" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <Link to="/blog" className="hover:text-primary transition-colors">Blog DIUA</Link>
        </div>
      </div>
    </footer>
  )
}
