import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumina Academy | Plataforma de E-Learning Premium",
  description:
    "Aprende las habilidades del futuro con cursos de alta calidad impartidos por expertos de la industria. Desarrollo web, Data Science, UX/UI y más.",
  keywords: [
    "e-learning",
    "cursos online",
    "desarrollo web",
    "data science",
    "programación",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}
