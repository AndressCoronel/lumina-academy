import { create } from "zustand";
import type { AiMessage } from "@/types";

interface CourseState {
    // Completion tracking
    completedLessons: Record<string, boolean>;
    videoProgress: Record<string, number>;

    // AI Chat
    aiMessages: AiMessage[];
    isAiLoading: boolean;

    // Actions
    markLessonComplete: (lessonId: string) => void;
    markLessonIncomplete: (lessonId: string) => void;
    setVideoProgress: (lessonId: string, seconds: number) => void;
    initProgress: (progress: Record<string, boolean>) => void;
    initVideoProgress: (progress: Record<string, number>) => void;

    // AI Actions
    addAiMessage: (message: AiMessage) => void;
    setAiLoading: (loading: boolean) => void;
    clearAiMessages: () => void;
}

export const useCourseStore = create<CourseState>((set) => ({
    completedLessons: {},
    videoProgress: {},
    aiMessages: [],
    isAiLoading: false,

    markLessonComplete: (lessonId) =>
        set((s) => ({
            completedLessons: { ...s.completedLessons, [lessonId]: true },
        })),

    markLessonIncomplete: (lessonId) =>
        set((s) => ({
            completedLessons: { ...s.completedLessons, [lessonId]: false },
        })),

    setVideoProgress: (lessonId, seconds) =>
        set((s) => ({
            videoProgress: { ...s.videoProgress, [lessonId]: seconds },
        })),

    initProgress: (progress) => set({ completedLessons: progress }),

    initVideoProgress: (progress) => set({ videoProgress: progress }),

    addAiMessage: (message) =>
        set((s) => ({
            aiMessages: [...s.aiMessages, message],
        })),

    setAiLoading: (loading) => set({ isAiLoading: loading }),

    clearAiMessages: () => set({ aiMessages: [] }),
}));
