import { Leaf } from "lucide-react";

export default function LaVallita() {
  return (
    <section className="bg-gradient-warm">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[6vw] py-20 lg:py-28">
        <div className="max-w-[700px] mx-auto text-center animate-fade-up">
          {/* Plant icon */}
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-7 h-7 text-emerald-500" />
          </div>

          <h2 className="font-mono font-bold text-2xl lg:text-[28px] text-emerald-500 mb-5">
            Te gusta la naturaleza?
          </h2>

          <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
            Mientras arreglo tu tecnologia, mi familia cuida la tierra.{" "}
            <strong className="text-foreground">La Vallita</strong> es nuestra
            finca agroecologica en Falcon, Placetas. Plantas frutales, tradicion
            y recuperacion. Quizas despues de arreglar tu PC te lleves un mamey
            para el patio.
          </p>

          <a
            href="https://wa.me/5355406632?text=Hola%20Dragoland%2C%20vi%20el%20sitio%20de%20BitCriollo%20y%20me%20interesan%20sus%20plantas"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white font-semibold text-sm px-7 py-3.5 rounded-md hover:brightness-110 hover:-translate-y-0.5 transition-all duration-200"
          >
            Visitar La Vallita
          </a>
        </div>
      </div>
    </section>
  );
}
