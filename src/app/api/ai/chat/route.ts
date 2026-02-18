import { NextResponse } from "next/server";
import { aiChatSchema } from "@/lib/validations";
import { getCurrentUser } from "@/lib/auth";

// Simulated AI responses based on context keywords
const aiResponses: Record<string, string[]> = {
    javascript: [
        "JavaScript es un lenguaje de programación versátil que se ejecuta en el navegador y en el servidor (Node.js). Es fundamental para el desarrollo web moderno.",
        "Los closures en JavaScript permiten que una función acceda a variables de su ámbito externo incluso después de que la función externa haya terminado de ejecutarse.",
        "Las Promises y async/await son patrones esenciales para manejar operaciones asíncronas en JavaScript, como llamadas a APIs o lecturas de archivos.",
    ],
    react: [
        "React utiliza un Virtual DOM para optimizar las actualizaciones del DOM real. Cuando el estado cambia, React calcula la diferencia mínima necesaria para actualizar la interfaz.",
        "Los hooks como useState y useEffect reemplazaron a los componentes de clase, ofreciendo una forma más limpia de manejar estado y efectos secundarios.",
        "El patrón de composición en React favorece la reutilización de componentes. Prefiere la composición sobre la herencia para construir interfaces complejas.",
    ],
    python: [
        "Python es conocido por su sintaxis limpia y legible. Es ideal para data science, machine learning e inteligencia artificial gracias a su ecosistema de librerías.",
        "Las list comprehensions en Python permiten crear listas de forma concisa y eficiente: `[x**2 for x in range(10)]` genera los cuadrados del 0 al 9.",
        "Pandas y NumPy son las librerías fundamentales para manipulación de datos en Python. Pandas trabaja con DataFrames mientras NumPy opera con arrays numéricos.",
    ],
    css: [
        "Flexbox y CSS Grid son los dos modelos de layout principales en CSS moderno. Flexbox es ideal para layouts unidimensionales, mientras Grid maneja layouts bidimensionales.",
        "Las CSS Custom Properties (variables) permiten definir valores reutilizables: `--primary-color: #6366f1;` y usarlos con `var(--primary-color)`.",
        "La especificidad en CSS determina qué estilos se aplican. ID > Clase > Elemento. El selector !important sobrescribe todo, pero su uso excesivo es una mala práctica.",
    ],
    database: [
        "Las bases de datos relacionales (SQL) organizan datos en tablas con relaciones definidas, mientras las NoSQL ofrecen esquemas flexibles para datos no estructurados.",
        "Los índices en bases de datos mejoran drásticamente el rendimiento de las consultas, pero tienen un costo en espacio y en operaciones de escritura.",
        "Las transacciones ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad) garantizan la integridad de los datos en operaciones complejas.",
    ],
    default: [
        "¡Excelente pregunta! Basándome en el contenido de esta lección, te recomiendo practicar con ejercicios incrementales para consolidar los conceptos.",
        "Un enfoque efectivo para aprender es la técnica Feynman: intenta explicar el concepto con tus propias palabras. Si no puedes, identifica las brechas en tu comprensión.",
        "Te sugiero que combines la teoría con la práctica. Intenta crear un pequeño proyecto que aplique los conceptos de esta lección para reforzar tu aprendizaje.",
        "Los conceptos más complejos suelen volverse más claros con ejemplos concretos. Te recomiendo experimentar con el código y modificar variables para ver cómo cambia el resultado.",
        "Recuerda que el aprendizaje es iterativo. No te preocupes si no entiendes todo a la primera. Vuelve a revisar el material y practica regularmente.",
    ],
};

function getAiResponse(message: string, lessonContext?: string): string {
    const combinedText = `${message} ${lessonContext || ""}`.toLowerCase();

    for (const [keyword, responses] of Object.entries(aiResponses)) {
        if (keyword === "default") continue;
        if (combinedText.includes(keyword)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Check for more keywords
    const techKeywords: Record<string, string> = {
        html: "HTML es el lenguaje de marcado que estructura el contenido web. Usa etiquetas semánticas como <header>, <main>, <article> para mejorar la accesibilidad y el SEO.",
        api: "Las APIs (Application Programming Interfaces) permiten la comunicación entre diferentes servicios. REST y GraphQL son los paradigmas más comunes para APIs web.",
        git: "Git es el sistema de control de versiones más usado. Los comandos esenciales son: git add, git commit, git push, git pull y git merge para gestionar tu código.",
        node: "Node.js permite ejecutar JavaScript en el servidor. Con Express.js puedes crear APIs RESTful robustas y escalables.",
        typescript: "TypeScript añade tipos estáticos a JavaScript, mejorando la detección de errores en tiempo de desarrollo y facilitando el mantenimiento de proyectos grandes.",
        testing: "Los tests unitarios verifican funciones individuales, los tests de integración comprueban la interacción entre módulos, y los tests e2e simulan el comportamiento del usuario.",
        security: "La seguridad web incluye protegerse contra XSS, CSRF, SQL Injection y otros ataques. Siempre sanitiza inputs y usa HTTPS.",
        deploy: "El deployment moderno incluye CI/CD pipelines, containerización con Docker, y plataformas como Vercel, AWS o GCP para hosting escalable.",
    };

    for (const [keyword, response] of Object.entries(techKeywords)) {
        if (combinedText.includes(keyword)) {
            return response;
        }
    }

    const defaultResponses = aiResponses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = aiChatSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: "Datos inválidos" },
                { status: 400 }
            );
        }

        const { message, lessonContext } = parsed.data;

        // Simulate AI thinking delay
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 1200));

        const response = getAiResponse(message, lessonContext);

        return NextResponse.json({
            response,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error("[AI_CHAT_ERROR]", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
