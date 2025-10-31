import AnimatedScene from "@/components/AnimatedScene";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(104,117,245,0.25)_0%,_rgba(10,11,26,0.8)_45%,_rgba(5,6,18,1)_100%)]" />
      <div className="pointer-events-none absolute -top-56 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[180px]" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center gap-16 px-6 py-24 sm:px-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium uppercase tracking-[0.2em] text-cyan-200/90 backdrop-blur">
            Curta-metragem Motion
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Homem negro de dreads saboreando um café no aconchego do sofá de couro.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            Um looping cinematográfico criado em canvas que captura o momento íntimo de tranquilidade:
            um homem negro com dreads e barba, conforto no couro macio, vapor esvoaçante e atmosfera
            acolhedora. Ideal para moodboards, vitrines digitais e storytelling visual.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 text-sm font-medium text-slate-200 sm:flex-row sm:justify-start">
            <a
              href="#video"
              className="flex items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-500/20 px-6 py-3 transition hover:border-cyan-200 hover:bg-cyan-400/30"
            >
              Assistir cena animada
            </a>
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
              12 segundos · loop contínuo · canvas 2D
            </span>
          </div>
        </div>
        <div id="video" className="flex w-full max-w-3xl flex-col items-center gap-4">
          <AnimatedScene />
          <p className="text-sm text-slate-400">
            Renderizado em tempo real direto no navegador · reproduz automaticamente
          </p>
        </div>
      </section>
    </main>
  );
}
