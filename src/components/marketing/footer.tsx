import Link from "next/link";
import { GraduationCap, Github, Linkedin, Twitter } from "lucide-react";

export function MarketingFooter() {
    return (
        <footer className="border-t border-border bg-card/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                                <GraduationCap className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold">
                                <span className="gradient-text">Lumina</span> Academy
                            </span>
                        </Link>
                        <p className="text-sm text-muted leading-relaxed">
                            La plataforma de aprendizaje que transforma tu carrera profesional
                            con cursos de alta calidad.
                        </p>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="text-muted hover:text-primary transition-colors">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted hover:text-primary transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-muted hover:text-primary transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">
                            Plataforma
                        </h4>
                        <ul className="space-y-2.5">
                            {["Explorar Cursos", "Categorías", "Instructores", "Precios"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-sm text-muted hover:text-foreground transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">
                            Recursos
                        </h4>
                        <ul className="space-y-2.5">
                            {["Blog", "Documentación", "Comunidad", "Soporte"].map(
                                (item) => (
                                    <li key={item}>
                                        <Link
                                            href="#"
                                            className="text-sm text-muted hover:text-foreground transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-4">
                            Legal
                        </h4>
                        <ul className="space-y-2.5">
                            {[
                                "Términos de Servicio",
                                "Privacidad",
                                "Cookies",
                                "Licencias",
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm text-muted hover:text-foreground transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground">
                        © 2026 Lumina Academy. Todos los derechos reservados.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Hecho con ❤️ para demostrar excelencia en desarrollo web.
                    </p>
                </div>
            </div>
        </footer>
    );
}
