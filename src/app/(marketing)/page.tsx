"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
    ArrowRight,
    Sparkles,
    Play,
    Brain,
    Code2,
    BarChart3,
    Video,
    Monitor,
    Zap,
    Globe,
    Cpu,
    Layers,
    Bot,
    Terminal,
    BookOpen,
    Star,
    CheckCircle2
} from "lucide-react";

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity1 = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    return (
        <div ref={containerRef} className="relative bg-[#000000] text-slate-200 min-h-screen selection:bg-indigo-500/30 font-sans selection:text-indigo-200 overflow-hidden">

            {/* Dynamic Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-indigo-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] bg-teal-600/10 blur-[150px] rounded-full" />
                {/* Subtle Grain & Grid */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <main className="relative z-10 pt-16">
                {/* HERO SECTION */}
                <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20 px-4">
                    <motion.div
                        style={{ y: y1, opacity: opacity1 }}
                        className="w-full max-w-7xl mx-auto flex flex-col items-center text-center"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={fadeUpVariants} className="mb-10">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] cursor-pointer group hover:scale-105 active:scale-95">
                                <span className="flex h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                <span className="text-sm font-medium tracking-wide text-slate-300 group-hover:text-white transition-colors">
                                    Descubre Lumina AI Core
                                </span>
                                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors group-hover:translate-x-1" />
                            </div>
                        </motion.div>

                        <motion.h1
                            variants={fadeUpVariants}
                            className="text-6xl sm:text-8xl md:text-[10rem] font-extrabold tracking-tighter mb-8 leading-[0.85]"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30">
                                Aprende <br className="hidden sm:block" />
                            </span>
                            <span className="relative inline-block mt-2">
                                <span className="absolute -inset-2 blur-3xl bg-gradient-to-r from-blue-500/40 to-indigo-500/40 opacity-50 z-0" />
                                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/30">
                                    sin límites.
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUpVariants}
                            className="text-lg md:text-2xl text-slate-400 max-w-3xl mb-12 font-light tracking-tight leading-relaxed"
                        >
                            La primera academia diseñada con estándares visuales de élite y tutoría IA integrada. Escribe código, compila en la nube y domina el futuro.
                        </motion.p>

                        <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link href="/register">
                                <Button size="xl" className="w-full sm:w-auto h-14 px-8 rounded-full bg-white text-black hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all text-base font-bold shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                                    Comienza ahora
                                </Button>
                            </Link>
                            <Link href="#platform">
                                <Button variant="outline" size="xl" className="w-full sm:w-auto h-14 px-8 rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 backdrop-blur-md transition-all text-base font-medium shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]">
                                    Explorar plataforma
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Futuristic Dashboard Abstraction */}
                        <motion.div
                            variants={fadeUpVariants}
                            className="mt-28 w-full max-w-5xl rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl p-2 shadow-2xl relative"
                        >
                            <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            <div className="absolute inset-x-20 -bottom-px h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
                            <div className="rounded-2xl bg-[#050505] border border-white/5 h-[400px] md:h-[600px] w-full relative overflow-hidden flex flex-col shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]">
                                {/* Header */}
                                <div className="h-14 border-b border-white/5 flex items-center px-6 gap-4">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-white/20" />
                                        <div className="w-3 h-3 rounded-full bg-white/20" />
                                        <div className="w-3 h-3 rounded-full bg-white/20" />
                                    </div>
                                    <div className="mx-auto flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full text-xs text-slate-400 font-mono ring-1 ring-white/10">
                                        <Monitor className="w-3 h-3 text-blue-400" /> lumina-academy.dev
                                    </div>
                                </div>
                                {/* Body */}
                                <div className="flex-1 p-6 flex gap-6">
                                    {/* Sidebar */}
                                    <div className="hidden md:flex flex-col gap-4 w-56 shrink-0 border-r border-white/5 pr-6">
                                        <div className="h-4 w-24 bg-white/10 rounded" />
                                        <div className="h-4 w-32 bg-white/5 rounded" />
                                        <div className="h-4 w-20 bg-white/5 rounded" />
                                        <div className="mt-8 h-4 w-16 bg-white/10 rounded" />
                                        <div className="h-4 w-28 bg-white/5 rounded" />
                                    </div>
                                    {/* Editor Content */}
                                    <div className="flex-1 flex flex-col gap-4 relative">
                                        {/* Floating AI Helper */}
                                        <div className="absolute -right-10 top-10 flex items-center gap-3 animate-pulse">
                                            <div className="h-[1px] w-12 bg-blue-500/50" />
                                            <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-[10px] text-blue-300 font-mono tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)]">AI Analizando</div>
                                        </div>

                                        <div className="h-8 w-64 bg-white/10 rounded-lg mb-4" />
                                        {/* Code Area */}
                                        <div className="flex-1 bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col font-mono text-sm leading-loose text-slate-400 overflow-hidden relative group">
                                            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent z-10" />
                                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay" />
                                            <div className="relative z-0">
                                                <div className="text-blue-400">import</div> <div className="text-slate-100 inline">{"{ NextLevel }"}</div> <div className="text-blue-400 inline">from</div> <div className="text-emerald-400 inline">"lumina-core"</div>;
                                                <br />
                                                <div className="text-blue-400">export default function</div> <div className="text-yellow-200 inline">Future</div>{"() {"}
                                                <div className="pl-6 border-l border-white/10 ml-2 mt-2">
                                                    <div className="text-indigo-400">const</div> model = <div className="text-indigo-400">await</div> NextLevel.init();
                                                    <br />
                                                    <div className="text-indigo-400">return</div> (
                                                    <div className="pl-6 border-l border-white/10 ml-2">
                                                        {"<"}div className=<div className="text-emerald-400 inline">"absolute inset-0"</div>{">"}
                                                        <div className="pl-6 text-slate-300">{"<"}GenerativeUI model={"{model}"} /{">"}</div>
                                                        {"<"}/div{">"}
                                                    </div>
                                                    );
                                                </div>
                                                {"}"}
                                            </div>

                                            {/* AI Tooltip Overlay */}
                                            <div className="absolute bottom-6 right-6 bg-white/10 border border-white/20 backdrop-blur-xl rounded-2xl p-4 flex gap-4 items-start max-w-sm shadow-2xl z-20 transition-all hover:bg-white/15">
                                                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center shrink-0">
                                                    <Bot className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div className="text-sm text-slate-200 font-sans leading-relaxed">
                                                    <span className="font-semibold text-blue-300 block mb-1">Sugerencia de Arquitectura</span>
                                                    Extrae el modelo fuera del componente para evitar re-renderizados innecesarios.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </section>

                {/* LOGO CLI / MARQUEE SECTION */}
                <section className="py-12 border-y border-white/5 bg-[#050505] overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
                        <p className="text-[10px] text-slate-500 mb-8 uppercase tracking-[0.3em] font-semibold">Tecnologías de clase mundial</p>
                        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_200px,_black_calc(100%-200px),transparent_100%)]">
                            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-12 [&_img]:max-w-none animate-infinite-scroll flex-nowrap text-slate-500 hover:text-slate-300 font-bold text-2xl uppercase tracking-widest transition-colors duration-500">
                                <li className="flex items-center gap-3"><Zap className="w-6 h-6 text-slate-600" /> Vercel</li>
                                <li className="flex items-center gap-3"><Globe className="w-6 h-6 text-slate-600" /> Linear</li>
                                <li className="flex items-center gap-3"><Cpu className="w-6 h-6 text-slate-600" /> Stripe</li>
                                <li className="flex items-center gap-3"><Monitor className="w-6 h-6 text-slate-600" /> Cursor</li>
                                <li className="flex items-center gap-3"><Layers className="w-6 h-6 text-slate-600" /> GitHub</li>
                                {/* Dublicates for infinite scroll smoothness */}
                                <li className="flex items-center gap-3" aria-hidden="true"><Zap className="w-6 h-6 text-slate-600" /> Vercel</li>
                                <li className="flex items-center gap-3" aria-hidden="true"><Globe className="w-6 h-6 text-slate-600" /> Linear</li>
                                <li className="flex items-center gap-3" aria-hidden="true"><Cpu className="w-6 h-6 text-slate-600" /> Stripe</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ULTRA MINIMAL BENTO GRID */}
                <section id="platform" className="py-40 px-4 relative z-10 bg-[#000000]">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUpVariants}
                            className="mb-24 flex flex-col items-center text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-6">
                                Ingeniería impecable. <br /> <span className="text-slate-600">Diseño a otro nivel.</span>
                            </h2>
                            <p className="text-xl text-slate-400 font-light">
                                Hemos reconstruido la experiencia de aprendizaje desde cero. Sin distracciones. Solo tú, el código y un ecosistema diseñado para hacerte brillar.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[300px] md:auto-rows-[380px]">
                            {/* Panel Largo Horizontal Supremo */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                                className="md:col-span-4 row-span-1 rounded-[40px] bg-[#0A0A0A] border border-white/5 p-10 md:p-14 relative overflow-hidden group hover:border-white/10 transition-all shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
                                    <Terminal className="w-48 h-48 text-indigo-500" />
                                </div>

                                <div className="relative z-10 h-full flex flex-col justify-end max-w-md">
                                    <div className="w-14 h-14 rounded-2xl border border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center mb-6">
                                        <Code2 className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <h3 className="text-4xl font-bold mb-3 tracking-tight text-white">Cloud IDE V2</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">Compilación en la nube con latencia cero. El entorno gráfico y de consola más sofisticado jamás integrado en una academia.</p>
                                </div>
                            </motion.div>

                            {/* Panel Cuadrado Secundario */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="md:col-span-2 row-span-1 rounded-[40px] bg-gradient-to-b from-[#111] to-[#050505] border border-white/5 p-10 relative overflow-hidden group hover:border-blue-500/20 transition-all flex flex-col justify-end"
                            >
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="absolute top-10 right-10">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white z-10">Live Analytics</h3>
                                <p className="text-slate-400 z-10 font-light">Insights técnicos en tiempo real sobre tu rendimiento escribiendo sintaxis.</p>
                            </motion.div>

                            {/* Box 3 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="md:col-span-2 row-span-1 rounded-[40px] bg-[#0A0A0A] border border-white/5 p-10 relative overflow-hidden group hover:border-fuchsia-500/20 transition-all"
                            >
                                <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-16 h-16 rounded-3xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                        <Brain className="w-8 h-8 text-fuchsia-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">AI Copilot</h3>
                                    <p className="text-slate-400 text-sm font-light px-4">Tutoría conversacional consciente del contexto de tu código activo.</p>
                                </div>
                            </motion.div>

                            {/* Box 4: Horizontal */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                                className="md:col-span-4 row-span-1 rounded-[40px] bg-[#0A0A0A] border border-white/5 p-10 md:p-14 relative overflow-hidden group hover:border-white/10 transition-all flex flex-col justify-center"
                            >
                                <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_80%_at_80%_50%,#000_10%,transparent_100%)] opacity-50" />

                                <div className="relative z-10 max-w-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                                        <Video className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-4xl font-bold text-white mb-3 tracking-tight">Cinematic 4K Video</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed font-light">Calidad visual inigualable con marcadores interactivos. Saltar a la porción exacta de código ahora es tan fácil como clickear.</p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* LISTA DE CURSOS LINEAR STYLE */}
                <section className="py-24 px-4 border-y border-white/5 relative bg-[#020202]">
                    <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-500/5 blur-[150px] rounded-full" />

                    <div className="max-w-4xl mx-auto relative z-10">
                        <div className="flex flex-col items-center text-center mb-20">
                            <h2 className="text-5xl font-extrabold tracking-tighter mb-4">Cursos Intensivos</h2>
                            <p className="text-slate-500 text-xl font-light">Currículum elaborado por ingenieros Senior The FAANG.</p>
                        </div>

                        <div className="flex flex-col">
                            {[
                                { title: "Frontend Engineering Pro", desc: "Domina React, Next.js, Server Components y Tailwind", price: "$99" },
                                { title: "Backend Architecture", desc: "Golang, Node.js, Microservicios y Bases de datos distribuidas", price: "$129" },
                                { title: "Generative AI Engineering", desc: "Implementación de LLMs, LangChain, embeddings y RAG", price: "$149" },
                                { title: "Advanced DevOps", desc: "Kubernetes, CI/CD, Terraform y observabilidad en AWS", price: "$119" },
                            ].map((course, idx) => (
                                <Link key={idx} href="/courses">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 md:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                                    >
                                        <div className="mb-4 sm:mb-0">
                                            <h3 className="text-2xl font-bold text-slate-300 group-hover:text-white transition-colors mb-2 tracking-tight">{course.title}</h3>
                                            <p className="text-slate-500 text-sm font-light max-w-sm">{course.desc}</p>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="font-mono text-slate-400 group-hover:text-white transition-colors">{course.price}</span>
                                            <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-all transform group-hover:translate-x-2" />
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-16 flex justify-center">
                            <Link href="/courses">
                                <Button variant="ghost" className="text-slate-400 hover:text-white hover:bg-white/5 px-8 rounded-full border border-white/5 hover:border-white/10 transition-all h-12">
                                    Explorar el catálogo entero
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* ULTRA DARK CTA */}
                <section className="py-40 px-4 relative bg-black overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-600/20 blur-[150px] rounded-full" />

                    <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                                <Sparkles className="w-8 h-8 text-blue-400" />
                            </div>
                            <h2 className="text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-[0.9]">
                                Eleva tu nivel. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-600">Hoy mismo.</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-tight">
                                La academia que los desarrolladores estaban esperando. Sin rodeos, práctica pura y tecnología de primer nivel.
                            </p>
                            <Link href="/register">
                                <Button size="xl" className="h-[72px] px-14 rounded-full bg-white text-black hover:bg-slate-200 hover:scale-105 active:scale-95 transition-all text-xl font-bold shadow-[0_0_80px_-15px_rgba(255,255,255,0.4)]">
                                    Comenzar gratuitamente
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>

            <style jsx global>{`
        @keyframes infinite-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
            animation: infinite-scroll 40s linear infinite;
        }
      `}</style>
        </div>
    );
}
