import { z } from "zod";

// Auth Schemas
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    role: z.enum(["STUDENT", "INSTRUCTOR"]).default("STUDENT"),
});

// Course Schemas
export const courseSchema = z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    price: z.coerce.number().min(0).optional(),
    categoryId: z.string().optional(),
});

export const chapterSchema = z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    description: z.string().optional(),
});

export const lessonSchema = z.object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    content: z.string().optional(),
    videoUrl: z.string().url().optional().or(z.literal("")),
    duration: z.coerce.number().min(0).optional(),
    isFree: z.boolean().default(false),
});

// Progress Schemas
export const progressSchema = z.object({
    lessonId: z.string(),
    isCompleted: z.boolean().optional(),
    videoProgress: z.coerce.number().min(0).optional(),
});

// Quiz Schemas
export const quizSchema = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    chapterId: z.string(),
});

export const questionSchema = z.object({
    text: z.string().min(5, "La pregunta debe tener al menos 5 caracteres"),
    type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE", "OPEN_ANSWER"]),
    options: z.array(z.string()).optional(),
    answer: z.string().min(1, "La respuesta es requerida"),
});

export const quizSubmitSchema = z.object({
    quizId: z.string(),
    answers: z.array(
        z.object({
            questionId: z.string(),
            answer: z.string(),
        })
    ),
});

// AI Chat Schema
export const aiChatSchema = z.object({
    message: z.string().min(1, "El mensaje no puede estar vacío"),
    lessonContext: z.string().optional(),
});

// Types derived from schemas
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CourseInput = z.infer<typeof courseSchema>;
export type ChapterInput = z.infer<typeof chapterSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
export type ProgressInput = z.infer<typeof progressSchema>;
export type QuizSubmitInput = z.infer<typeof quizSubmitSchema>;
export type AiChatInput = z.infer<typeof aiChatSchema>;
