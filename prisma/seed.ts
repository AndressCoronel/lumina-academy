import { PrismaClient, QuestionType } from "@prisma/client";

const prisma = new PrismaClient();

function simpleHash(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
        const char = password.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash;
    }
    return "hash_" + Math.abs(hash).toString(36) + "_" + password.length;
}

async function main() {
    console.log("🌱 Seeding database...\n");

    // Clean database
    await prisma.quizAttempt.deleteMany();
    await prisma.userProgress.deleteMany();
    await prisma.purchase.deleteMany();
    await prisma.question.deleteMany();
    await prisma.quiz.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.chapter.deleteMany();
    await prisma.course.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log("🧹 Database cleaned\n");

    // --- Categories ---
    const categories = await Promise.all([
        prisma.category.create({ data: { name: "Desarrollo Web", icon: "🚀" } }),
        prisma.category.create({ data: { name: "Data Science", icon: "📊" } }),
        prisma.category.create({ data: { name: "Diseño", icon: "🎨" } }),
        prisma.category.create({ data: { name: "IA & ML", icon: "🤖" } }),
        prisma.category.create({ data: { name: "DevOps", icon: "☁️" } }),
        prisma.category.create({ data: { name: "Ciberseguridad", icon: "🔒" } }),
    ]);
    console.log(`✅ ${categories.length} categories created`);

    // --- Users ---
    const demoStudent = await prisma.user.create({
        data: {
            name: "Carlos Demo",
            email: "demo@lumina.com",
            password: simpleHash("demo1234"),
            role: "STUDENT",
            bio: "Estudiante de desarrollo web apasionado por la tecnología.",
        },
    });

    const demoStudent2 = await prisma.user.create({
        data: {
            name: "Ana García",
            email: "ana@lumina.com",
            password: simpleHash("demo1234"),
            role: "STUDENT",
            bio: "Diseñadora gráfica aprendiendo desarrollo frontend.",
        },
    });

    const demoStudent3 = await prisma.user.create({
        data: {
            name: "Luis Martínez",
            email: "luis@lumina.com",
            password: simpleHash("demo1234"),
            role: "STUDENT",
            bio: "Ingeniero de sistemas explorando data science.",
        },
    });

    const instructor1 = await prisma.user.create({
        data: {
            name: "María Rodriguez",
            email: "maria@lumina.com",
            password: simpleHash("instructor1234"),
            role: "INSTRUCTOR",
            bio: "Senior Full-Stack Developer con +10 años de experiencia. Apasionada por la enseñanza y el desarrollo web moderno.",
        },
    });

    const instructor2 = await prisma.user.create({
        data: {
            name: "David Chen",
            email: "david@lumina.com",
            password: simpleHash("instructor1234"),
            role: "INSTRUCTOR",
            bio: "Data Scientist y profesor universitario. Especialista en Python, ML y Big Data.",
        },
    });

    console.log("✅ 5 users created (3 students, 2 instructors)");

    // --- Course 1: React Full-Stack ---
    const course1 = await prisma.course.create({
        data: {
            title: "React & Next.js: Desarrollo Full-Stack Moderno",
            description:
                "Domina React y Next.js desde cero hasta producción. Aprende Server Components, App Router, autenticación, bases de datos con Prisma, y despliegue en Vercel. Construye proyectos reales con las mejores prácticas.",
            price: 49.99,
            isPublished: true,
            instructorId: instructor1.id,
            categoryId: categories[0].id,
        },
    });

    // Course 1 - Chapters & Lessons
    const c1ch1 = await prisma.chapter.create({
        data: {
            title: "Fundamentos de React",
            description: "Los conceptos base que necesitas para dominar React.",
            position: 1,
            isPublished: true,
            courseId: course1.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "¿Qué es React y por qué aprenderlo?",
                content:
                    "React es una biblioteca de JavaScript creada por Facebook (Meta) para construir interfaces de usuario. Es la librería más popular del ecosistema frontend con millones de descargas semanales.\n\nReact utiliza un enfoque declarativo donde describes cómo debería verse tu UI y React se encarga de actualizar el DOM eficientemente.\n\nVentajas clave:\n- Virtual DOM para rendimiento optimizado\n- Componentes reutilizables\n- Gran ecosistema y comunidad\n- Soporte de grandes empresas",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 720,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c1ch1.id,
            },
            {
                title: "JSX: Sintaxis y buenas prácticas",
                content:
                    "JSX es una extensión de JavaScript que permite escribir HTML dentro de código JS. Parece HTML, pero se transforma en llamadas a React.createElement().\n\nReglas importantes de JSX:\n- Siempre devolver un elemento padre\n- Usar className en vez de class\n- Cerrar todas las etiquetas\n- Expresiones JS entre llaves {}",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 900,
                position: 2,
                isFree: true,
                isPublished: true,
                chapterId: c1ch1.id,
            },
            {
                title: "Componentes funcionales y Props",
                content:
                    "Los componentes son bloques de construcción en React. Las props permiten pasar datos de un componente padre a un hijo.\n\nEjemplo:\nfunction Greeting({ name }) {\n  return <h1>Hola, {name}!</h1>;\n}\n\nLas props son de solo lectura y fluyen de arriba hacia abajo (unidirectional data flow).",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1200,
                position: 3,
                isPublished: true,
                chapterId: c1ch1.id,
            },
            {
                title: "useState: Gestionando estado local",
                content:
                    "El hook useState permite agregar estado a componentes funcionales. Retorna un array con el valor actual y una función para actualizarlo.\n\nconst [count, setCount] = useState(0);\n\nReglas de los hooks:\n- Solo llamar en el nivel superior\n- Solo llamar en funciones de React",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 4,
                isPublished: true,
                chapterId: c1ch1.id,
            },
            {
                title: "useEffect: Efectos secundarios",
                content:
                    "useEffect permite ejecutar código después del renderizado. Es ideal para llamadas a APIs, suscripciones, y manipulación del DOM.\n\nuseEffect(() => {\n  // Código del efecto\n  return () => { /* cleanup */ };\n}, [dependencies]);",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 5,
                isPublished: true,
                chapterId: c1ch1.id,
            },
        ],
    });

    // Quiz for Chapter 1
    const quiz1 = await prisma.quiz.create({
        data: {
            title: "Quiz: Fundamentos de React",
            description: "Comprueba tu comprensión de los conceptos básicos.",
            chapterId: c1ch1.id,
        },
    });

    await prisma.question.createMany({
        data: [
            {
                text: "¿Quién creó React?",
                type: "MULTIPLE_CHOICE" as QuestionType,
                options: ["Google", "Facebook (Meta)", "Microsoft", "Amazon"],
                answer: "Facebook (Meta)",
                position: 1,
                quizId: quiz1.id,
            },
            {
                text: "JSX se transforma en llamadas a React.createElement()",
                type: "TRUE_FALSE" as QuestionType,
                answer: "Verdadero",
                position: 2,
                quizId: quiz1.id,
            },
            {
                text: "¿Qué hook se usa para gestionar estado local?",
                type: "MULTIPLE_CHOICE" as QuestionType,
                options: ["useEffect", "useState", "useContext", "useRef"],
                answer: "useState",
                position: 3,
                quizId: quiz1.id,
            },
        ],
    });

    const c1ch2 = await prisma.chapter.create({
        data: {
            title: "Next.js y App Router",
            description: "Construye aplicaciones full-stack con Next.js 14+.",
            position: 2,
            isPublished: true,
            courseId: course1.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Introducción a Next.js y sus ventajas",
                content:
                    "Next.js es un framework de React que proporciona Server-Side Rendering, Static Site Generation, enrutamiento basado en archivos, y más. Es el framework recomendado por el equipo de React.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 840,
                position: 1,
                isPublished: true,
                chapterId: c1ch2.id,
            },
            {
                title: "App Router vs Pages Router",
                content:
                    "El App Router es la nueva arquitectura de Next.js 13+. Usa React Server Components por defecto, ofrece layouts anidados, y una mejor experiencia de desarrollo.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 900,
                position: 2,
                isPublished: true,
                chapterId: c1ch2.id,
            },
            {
                title: "Server Components vs Client Components",
                content:
                    "Los Server Components se renderizan en el servidor, son más ligeros y pueden acceder directamente a la base de datos. Los Client Components se necesitan para interactividad (useState, onClick, etc.).",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 3,
                isPublished: true,
                chapterId: c1ch2.id,
            },
            {
                title: "Rutas dinámicas y parámetros",
                content:
                    "Next.js permite crear rutas dinámicas usando corchetes: [id], [slug]. Los parámetros se reciben como props en la página.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 720,
                position: 4,
                isPublished: true,
                chapterId: c1ch2.id,
            },
            {
                title: "API Routes y Server Actions",
                content:
                    "Next.js permite crear endpoints de API dentro de tu proyecto. Los Server Actions simplifican las mutaciones de datos eliminando la necesidad de APIs separadas.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 5,
                isPublished: true,
                chapterId: c1ch2.id,
            },
        ],
    });

    const c1ch3 = await prisma.chapter.create({
        data: {
            title: "Base de datos con Prisma",
            description: "ORM moderno para TypeScript y Node.js.",
            position: 3,
            isPublished: true,
            courseId: course1.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Configuración de Prisma y PostgreSQL",
                content:
                    "Prisma es un ORM moderno que proporciona type-safety completo. Instalación: npm install prisma @prisma/client. Después: npx prisma init.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 780,
                position: 1,
                isPublished: true,
                chapterId: c1ch3.id,
            },
            {
                title: "Definiendo el schema y modelos",
                content:
                    "El schema de Prisma define tus modelos de datos, relaciones, y tipos. Soporta relaciones 1:1, 1:N, y N:N de forma intuitiva.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 900,
                position: 2,
                isPublished: true,
                chapterId: c1ch3.id,
            },
            {
                title: "CRUD operations con Prisma Client",
                content:
                    "Prisma Client genera métodos tipados para create, findMany, findUnique, update, delete, y más operaciones de base de datos.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1020,
                position: 3,
                isPublished: true,
                chapterId: c1ch3.id,
            },
        ],
    });

    console.log(`✅ Course 1 created: "${course1.title}" (13 lessons)`);

    // --- Course 2: Python Data Science ---
    const course2 = await prisma.course.create({
        data: {
            title: "Python para Data Science: De Cero a Profesional",
            description:
                "Aprende Python aplicado a ciencia de datos. Domina Pandas, NumPy, Matplotlib, Seaborn, y Scikit-learn. Proyectos reales con datasets del mundo real.",
            price: 39.99,
            isPublished: true,
            instructorId: instructor2.id,
            categoryId: categories[1].id,
        },
    });

    const c2ch1 = await prisma.chapter.create({
        data: {
            title: "Python Esencial",
            description: "Los fundamentos de Python que necesitas para data science.",
            position: 1,
            isPublished: true,
            courseId: course2.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Instalación y entorno de desarrollo",
                content: "Configuraremos Anaconda, Jupyter Notebooks, y VS Code para un workflow óptimo en data science.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 600,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c2ch1.id,
            },
            {
                title: "Variables, tipos y estructuras de datos",
                content: "Strings, listas, diccionarios, sets, tuplas y sus operaciones esenciales para manipulación de datos.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1200,
                position: 2,
                isPublished: true,
                chapterId: c2ch1.id,
            },
            {
                title: "Funciones, clases y módulos",
                content: "Programación modular en Python: funciones con *args y **kwargs, clases con herencia, y organización de código.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 3,
                isPublished: true,
                chapterId: c2ch1.id,
            },
        ],
    });

    const c2ch2 = await prisma.chapter.create({
        data: {
            title: "NumPy y Pandas",
            description: "Las herramientas fundamentales para manipular datos.",
            position: 2,
            isPublished: true,
            courseId: course2.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "NumPy: Arrays y operaciones vectorizadas",
                content: "Arrays N-dimensionales, broadcasting, indexación avanzada, y operaciones matemáticas vectorizadas.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1200,
                position: 1,
                isPublished: true,
                chapterId: c2ch2.id,
            },
            {
                title: "Pandas: Series y DataFrames",
                content: "Creación, selección, filtrado, groupby, merge, y transformaciones de DataFrames para análisis de datos.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1500,
                position: 2,
                isPublished: true,
                chapterId: c2ch2.id,
            },
            {
                title: "Limpieza y preparación de datos",
                content: "Manejo de valores nulos, duplicados, tipos de datos, encoding, y normalización de datasets reales.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 3,
                isPublished: true,
                chapterId: c2ch2.id,
            },
        ],
    });

    const c2ch3 = await prisma.chapter.create({
        data: {
            title: "Visualización de Datos",
            description: "Crea gráficas profesionales para comunicar insights.",
            position: 3,
            isPublished: true,
            courseId: course2.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Matplotlib: Fundamentos de gráficas",
                content: "Líneas, barras, scatter plots, histogramas, subplots, y personalización de estilos.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 900,
                position: 1,
                isPublished: true,
                chapterId: c2ch3.id,
            },
            {
                title: "Seaborn: Visualización estadística",
                content: "Heatmaps, violin plots, pair plots, y gráficas estadísticas avanzadas con Seaborn.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 840,
                position: 2,
                isPublished: true,
                chapterId: c2ch3.id,
            },
        ],
    });

    const quiz2 = await prisma.quiz.create({
        data: {
            title: "Quiz: Pandas y NumPy",
            description: "Evalúa tus conocimientos de Pandas y NumPy.",
            chapterId: c2ch2.id,
        },
    });

    await prisma.question.createMany({
        data: [
            {
                text: "¿Qué estructura de datos principal usa Pandas?",
                type: "MULTIPLE_CHOICE" as QuestionType,
                options: ["Array", "DataFrame", "Tensor", "Matrix"],
                answer: "DataFrame",
                position: 1,
                quizId: quiz2.id,
            },
            {
                text: "NumPy es más lento que listas nativas de Python para operaciones numéricas",
                type: "TRUE_FALSE" as QuestionType,
                answer: "Falso",
                position: 2,
                quizId: quiz2.id,
            },
        ],
    });

    console.log(`✅ Course 2 created: "${course2.title}" (8 lessons)`);

    // --- Course 3: UX/UI Design ---
    const course3 = await prisma.course.create({
        data: {
            title: "Diseño UX/UI: Interfaces que Enamoran",
            description:
                "Aprende los principios de diseño UX/UI, wireframing, prototipado, sistemas de diseño, y herramientas como Figma. Crea interfaces memorables.",
            price: 34.99,
            isPublished: true,
            instructorId: instructor1.id,
            categoryId: categories[2].id,
        },
    });

    const c3ch1 = await prisma.chapter.create({
        data: {
            title: "Fundamentos de UX",
            description: "Principios de experiencia de usuario.",
            position: 1,
            isPublished: true,
            courseId: course3.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "¿Qué es UX y por qué importa?",
                content: "La experiencia de usuario (UX) abarca todos los aspectos de la interacción del usuario con un producto digital. Un buen UX aumenta la retención, satisfacción y conversiones.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 660,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c3ch1.id,
            },
            {
                title: "Investigación de usuarios y personas",
                content: "Métodos de research: entrevistas, encuestas, card sorting, testing de usabilidad. Creación de user personas.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 900,
                position: 2,
                isPublished: true,
                chapterId: c3ch1.id,
            },
            {
                title: "Arquitectura de información",
                content: "Organización del contenido, navegación, mapas de sitio, y flujos de usuario para interfaces intuitivas.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 780,
                position: 3,
                isPublished: true,
                chapterId: c3ch1.id,
            },
        ],
    });

    const c3ch2 = await prisma.chapter.create({
        data: {
            title: "Diseño Visual con Figma",
            description: "Domina Figma para crear interfaces profesionales.",
            position: 2,
            isPublished: true,
            courseId: course3.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Figma desde cero: Interfaz y herramientas",
                content: "Navegación en Figma: frames, auto layout, componentes, estilos, y plugins esenciales.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 1,
                isPublished: true,
                chapterId: c3ch2.id,
            },
            {
                title: "Tipografía, color y espaciado",
                content: "Selección tipográfica, paletas de color accesibles, sistemas de espaciado (4pt grid), y jerarquía visual.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 2,
                isPublished: true,
                chapterId: c3ch2.id,
            },
            {
                title: "Sistemas de diseño y componentes",
                content: "Creación de Design Systems escalables: tokens, componentes atómicos, variantes, y documentación.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1200,
                position: 3,
                isPublished: true,
                chapterId: c3ch2.id,
            },
        ],
    });

    console.log(`✅ Course 3 created: "${course3.title}" (6 lessons)`);

    // --- Course 4: Machine Learning ---
    const course4 = await prisma.course.create({
        data: {
            title: "Machine Learning: Algoritmos y Aplicaciones Prácticas",
            description:
                "Domina los algoritmos de ML: regresión, clasificación, clustering, y redes neuronales. Proyectos con Scikit-learn y TensorFlow.",
            price: 59.99,
            isPublished: true,
            instructorId: instructor2.id,
            categoryId: categories[3].id,
        },
    });

    const c4ch1 = await prisma.chapter.create({
        data: {
            title: "Introducción al Machine Learning",
            position: 1,
            isPublished: true,
            courseId: course4.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "¿Qué es Machine Learning?",
                content: "Machine Learning es una rama de la IA que permite a los sistemas aprender de datos sin ser programados explícitamente. Tipos: supervisado, no supervisado, y por refuerzo.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 720,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c4ch1.id,
            },
            {
                title: "Tipos de problemas de ML",
                content: "Clasificación, regresión, clustering, reducción de dimensionalidad. Cómo elegir el enfoque correcto para cada problema.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 840,
                position: 2,
                isPublished: true,
                chapterId: c4ch1.id,
            },
            {
                title: "Pipeline de datos para ML",
                content: "Recolección, limpieza, feature engineering, split train/test, validación cruzada, y métricas de evaluación.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 3,
                isPublished: true,
                chapterId: c4ch1.id,
            },
        ],
    });

    const c4ch2 = await prisma.chapter.create({
        data: {
            title: "Algoritmos Supervisados",
            position: 2,
            isPublished: true,
            courseId: course4.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Regresión Lineal y Logística",
                content: "Regresión lineal simple y múltiple, regresión logística para clasificación binaria. Interpretación de coeficientes.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1200,
                position: 1,
                isPublished: true,
                chapterId: c4ch2.id,
            },
            {
                title: "Árboles de Decisión y Random Forest",
                content: "Árboles de decisión, criterios de split, pruning, ensemble methods: bagging y boosting, Random Forest.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 2,
                isPublished: true,
                chapterId: c4ch2.id,
            },
            {
                title: "Support Vector Machines",
                content: "Hiperplanos, kernels, margen máximo. SVM para clasificación y regresión. Cuándo usar SVM vs otros algoritmos.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 3,
                isPublished: true,
                chapterId: c4ch2.id,
            },
        ],
    });

    console.log(`✅ Course 4 created: "${course4.title}" (6 lessons)`);

    // --- Course 5: DevOps ---
    const course5 = await prisma.course.create({
        data: {
            title: "DevOps: Docker, CI/CD y Cloud Deployment",
            description:
                "Automatiza tu workflow de desarrollo. Docker, GitHub Actions, Kubernetes, AWS/GCP. Deploy y monitorización de aplicaciones en producción.",
            price: 44.99,
            isPublished: true,
            instructorId: instructor1.id,
            categoryId: categories[4].id,
        },
    });

    const c5ch1 = await prisma.chapter.create({
        data: {
            title: "Docker Fundamentos",
            position: 1,
            isPublished: true,
            courseId: course5.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Contenedores y Docker: Conceptos clave",
                content: "Diferencias entre VMs y contenedores. Imágenes, contenedores, registros. Instalación de Docker.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 840,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c5ch1.id,
            },
            {
                title: "Dockerfile: Construyendo imágenes",
                content: "Instrucciones FROM, COPY, RUN, EXPOSE, CMD. Multi-stage builds. Optimización de capas y tamaño de imagen.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 2,
                isPublished: true,
                chapterId: c5ch1.id,
            },
            {
                title: "Docker Compose: Multi-container apps",
                content: "Orquestación con docker-compose.yml. Redes, volúmenes, dependencias entre servicios. Stacks de desarrollo local.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 3,
                isPublished: true,
                chapterId: c5ch1.id,
            },
        ],
    });

    const c5ch2 = await prisma.chapter.create({
        data: {
            title: "CI/CD con GitHub Actions",
            position: 2,
            isPublished: true,
            courseId: course5.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Introducción a CI/CD",
                content: "Integración Continua y Despliegue Continuo. Beneficios, herramientas, y flujo de trabajo automatizado.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 720,
                position: 1,
                isPublished: true,
                chapterId: c5ch2.id,
            },
            {
                title: "GitHub Actions: Workflows y Jobs",
                content: "YAML workflows, triggers, jobs, steps, actions del marketplace. Secretos y variables de entorno.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 1080,
                position: 2,
                isPublished: true,
                chapterId: c5ch2.id,
            },
        ],
    });

    console.log(`✅ Course 5 created: "${course5.title}" (5 lessons)`);

    // --- Course 6: Cybersecurity (Free) ---
    const course6 = await prisma.course.create({
        data: {
            title: "Introducción a la Ciberseguridad",
            description:
                "Fundamentos de seguridad informática, amenazas comunes, y mejores prácticas para proteger sistemas y datos. Curso gratuito.",
            price: 0,
            isPublished: true,
            instructorId: instructor2.id,
            categoryId: categories[5].id,
        },
    });

    const c6ch1 = await prisma.chapter.create({
        data: {
            title: "Fundamentos de Seguridad",
            position: 1,
            isPublished: true,
            courseId: course6.id,
        },
    });

    await prisma.lesson.createMany({
        data: [
            {
                title: "Panorama actual de amenazas",
                content: "Malware, phishing, ransomware, ataques DDoS, ingeniería social. Estadísticas y tendencias actuales.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 720,
                position: 1,
                isFree: true,
                isPublished: true,
                chapterId: c6ch1.id,
            },
            {
                title: "OWASP Top 10: Vulnerabilidades web",
                content: "Las 10 vulnerabilidades web más críticas: SQL Injection, XSS, CSRF, broken authentication, y más.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 960,
                position: 2,
                isFree: true,
                isPublished: true,
                chapterId: c6ch1.id,
            },
            {
                title: "Criptografía básica",
                content: "Cifrado simétrico vs asimétrico, hashing, certificados SSL/TLS, firma digital. Aplicaciones prácticas.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 840,
                position: 3,
                isFree: true,
                isPublished: true,
                chapterId: c6ch1.id,
            },
            {
                title: "Mejores prácticas de seguridad",
                content: "Contraseñas seguras, 2FA, actualizaciones, principio de mínimo privilegio, respaldos, y plan de respuesta a incidentes.",
                videoUrl: "https://www.youtube.com/watch?v=SqcY0GlETPk",
                duration: 780,
                position: 4,
                isFree: true,
                isPublished: true,
                chapterId: c6ch1.id,
            },
        ],
    });

    console.log(`✅ Course 6 created: "${course6.title}" (4 lessons, FREE)`);

    // --- Purchases (demo student enrolled in 3 courses) ---
    await prisma.purchase.createMany({
        data: [
            { userId: demoStudent.id, courseId: course1.id, price: 49.99 },
            { userId: demoStudent.id, courseId: course2.id, price: 39.99 },
            { userId: demoStudent.id, courseId: course6.id, price: 0 },
            { userId: demoStudent2.id, courseId: course1.id, price: 49.99 },
            { userId: demoStudent2.id, courseId: course3.id, price: 34.99 },
            { userId: demoStudent3.id, courseId: course2.id, price: 39.99 },
            { userId: demoStudent3.id, courseId: course4.id, price: 59.99 },
            { userId: demoStudent3.id, courseId: course5.id, price: 44.99 },
        ],
    });

    console.log("✅ 8 purchases created");

    // --- User Progress (demo student has some progress in Course 1) ---
    const c1Lessons = await prisma.lesson.findMany({
        where: { chapter: { courseId: course1.id } },
        orderBy: [{ chapter: { position: "asc" } }, { position: "asc" }],
    });

    if (c1Lessons.length >= 5) {
        await prisma.userProgress.createMany({
            data: [
                { userId: demoStudent.id, lessonId: c1Lessons[0].id, isCompleted: true, videoProgress: 720 },
                { userId: demoStudent.id, lessonId: c1Lessons[1].id, isCompleted: true, videoProgress: 900 },
                { userId: demoStudent.id, lessonId: c1Lessons[2].id, isCompleted: true, videoProgress: 1200 },
                { userId: demoStudent.id, lessonId: c1Lessons[3].id, isCompleted: false, videoProgress: 350 },
            ],
        });
    }

    console.log("✅ User progress created for demo student");

    console.log("\n🎉 Seed completed successfully!");
    console.log("\n📋 Demo Accounts:");
    console.log("  Student:    demo@lumina.com / demo1234");
    console.log("  Instructor: maria@lumina.com / instructor1234");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
