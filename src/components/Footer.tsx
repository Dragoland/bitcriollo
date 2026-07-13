import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="border-t border-border py-8 mt-8">
      <div className="container mx-auto px-4 text-center">
        <div className="font-mono font-bold text-accent-blue text-lg mb-2">
          BitCriollo<span className="text-accent-orange">.dev</span>
        </div>
        <p className="text-sm text-text-dim">
          Hecho con &gt; y paciencia · Falcón, Placetas, Villa Clara, Cuba
        </p>
        <div className="flex justify-center gap-4 mt-4 text-sm text-text-dim">
          <a href="https://t.me/diario_del_informatico" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">Telegram</a>
          <a href="https://github.com/Dragoland" target="_blank" rel="noopener noreferrer" className="hover:text-accent-blue transition-colors">GitHub</a>
          <Link to="/blog" className="hover:text-accent-blue transition-colors">Blog DIUA</Link>
        </div>
      </div>
    </footer>
  )
}
