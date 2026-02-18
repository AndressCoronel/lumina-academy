import type { Role, QuestionType } from "@prisma/client";

export type { Role, QuestionType };

export interface SafeUser {
    id: string;
    name: string;
    email: string;
    role: Role;
    avatar: string | null;
    bio: string | null;
    createdAt: Date;
}

export interface CourseWithDetails {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    createdAt: Date;
    category: { id: string; name: string; icon: string | null } | null;
    instructor: { id: string; name: string; avatar: string | null };
    chapters: ChapterWithLessons[];
    _count?: {
        purchases: number;
    };
}

export interface ChapterWithLessons {
    id: string;
    title: string;
    description: string | null;
    position: number;
    isPublished: boolean;
    lessons: LessonWithProgress[];
    quiz: QuizWithQuestions | null;
}

export interface LessonWithProgress {
    id: string;
    title: string;
    content: string | null;
    videoUrl: string | null;
    duration: number | null;
    position: number;
    isFree: boolean;
    isPublished: boolean;
    chapterId: string;
    progress: { isCompleted: boolean; videoProgress: number }[] | null;
}

export interface QuizWithQuestions {
    id: string;
    title: string;
    description: string | null;
    questions: QuestionData[];
}

export interface QuestionData {
    id: string;
    text: string;
    type: QuestionType;
    options: string[] | null;
    answer: string;
    position: number;
}

export interface UserProgressData {
    lessonId: string;
    isCompleted: boolean;
    videoProgress: number;
}

export interface CourseProgress {
    courseId: string;
    totalLessons: number;
    completedLessons: number;
    percentage: number;
}

export interface DashboardStats {
    totalCourses: number;
    completedCourses: number;
    inProgressCourses: number;
    totalLessonsCompleted: number;
    averageProgress: number;
}

export interface InstructorStats {
    totalCourses: number;
    totalStudents: number;
    totalRevenue: number;
    totalLessons: number;
}

export interface QuizResult {
    quizId: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    answers: {
        questionId: string;
        userAnswer: string;
        correctAnswer: string;
        isCorrect: boolean;
    }[];
}

export interface AiMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export interface NavItem {
    title: string;
    href: string;
    icon: string;
    badge?: number;
}
