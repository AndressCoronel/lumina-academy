"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { useCourseStore } from "@/store/use-course-store";
import {
    Play,
    Pause,
    CheckCircle2,
    Circle,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    Clock,
    Brain,
    MessageSquare,
    Send,
    X,
    Award,
    Loader2,
    ArrowLeft,
} from "lucide-react";
import { formatDuration } from "@/lib/utils";

const ReactPlayer = dynamic(() => import("react-player"), {
    ssr: false,
    loading: () => (
        <div className="aspect-video bg-surface rounded-xl flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
    ),
});

interface ChapterNav {
    id: string;
    title: string;
    position: number;
    lessons: {
        id: string;
        title: string;
        duration: number | null;
        position: number;
        isFree: boolean;
    }[];
}

interface QuizData {
    id: string;
    title: string;
    description: string | null;
    questions: {
        id: string;
        text: string;
        type: string;
        options: string[] | null;
        answer: string;
        position: number;
    }[];
}

interface Props {
    lesson: {
        id: string;
        title: string;
        content: string | null;
        videoUrl: string | null;
        duration: number | null;
        chapter: {
            id: string;
            title: string;
            course: { id: string; title: string };
        };
    };
    courseId: string;
    courseTitle: string;
    chapters: ChapterNav[];
    progressMap: Record<string, { isCompleted: boolean; videoProgress: number }>;
    nextLesson: { id: string; title: string } | null;
    prevLesson: { id: string; title: string } | null;
    quiz: QuizData | null;
    initialVideoProgress: number;
    initialCompleted: boolean;
}

export function LessonPlayerClient({
    lesson,
    courseId,
    courseTitle,
    chapters,
    progressMap,
    nextLesson,
    prevLesson,
    quiz,
    initialVideoProgress,
    initialCompleted,
}: Props) {
    const router = useRouter();
    const [isCompleted, setIsCompleted] = useState(initialCompleted);
    const [showSidebar, setShowSidebar] = useState(true);
    const [showAiChat, setShowAiChat] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [aiInput, setAiInput] = useState("");
    const { aiMessages, isAiLoading, addAiMessage, setAiLoading, clearAiMessages } = useCourseStore();
    const chatEndRef = useRef<HTMLDivElement>(null);

    // Quiz State
    const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [quizScore, setQuizScore] = useState(0);

    const allLessons = chapters.flatMap((ch) => ch.lessons);
    const totalLessons = allLessons.length;
    const completedCount =
        Object.values(progressMap).filter((p) => p.isCompleted).length +
        (isCompleted && !progressMap[lesson.id]?.isCompleted ? 1 : 0);
    const courseProgress = Math.round((completedCount / totalLessons) * 100);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [aiMessages]);

    const updateProgress = useCallback(
        async (completed: boolean, videoSec?: number) => {
            try {
                await fetch("/api/progress", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        lessonId: lesson.id,
                        isCompleted: completed,
                        videoProgress: videoSec !== undefined ? Math.floor(videoSec) : undefined,
                    }),
                });
            } catch (err) {
                console.error("Progress update failed:", err);
            }
        },
        [lesson.id]
    );

    const handleVideoProgress = useCallback(
        (state: { playedSeconds: number }) => {
            // Save progress every 10 seconds
            if (Math.floor(state.playedSeconds) % 10 === 0) {
                updateProgress(isCompleted, state.playedSeconds);
            }
        },
        [isCompleted, updateProgress]
    );

    const handleVideoEnd = useCallback(() => {
        setIsCompleted(true);
        updateProgress(true);
    }, [updateProgress]);

    const toggleComplete = async () => {
        const newState = !isCompleted;
        setIsCompleted(newState);
        await updateProgress(newState);
        router.refresh();
    };

    const handleAiSend = async () => {
        if (!aiInput.trim() || isAiLoading) return;

        const userMsg = {
            id: Date.now().toString(),
            role: "user" as const,
            content: aiInput,
            timestamp: new Date(),
        };
        addAiMessage(userMsg);
        setAiInput("");
        setAiLoading(true);

        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: aiInput,
                    lessonContext: lesson.content || lesson.title,
                }),
            });
            const data = await res.json();
            addAiMessage({
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: data.response,
                timestamp: new Date(),
            });
        } catch {
            addAiMessage({
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "Lo siento, hubo un error. Intenta de nuevo.",
                timestamp: new Date(),
            });
        } finally {
            setAiLoading(false);
        }
    };

    const handleQuizSubmit = () => {
        if (!quiz) return;
        let correct = 0;
        quiz.questions.forEach((q) => {
            if (quizAnswers[q.id]?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
                correct++;
            }
        });
        setQuizScore(Math.round((correct / quiz.questions.length) * 100));
        setQuizSubmitted(true);
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Bar */}
                <div className="flex items-center justify-between p-4 border-b border-border glass-strong">
                    <div className="flex items-center gap-3">
                        <Link href={`/courses/${courseId}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <p className="text-xs text-muted">{courseTitle}</p>
                            <p className="text-sm font-medium">{lesson.title}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant={showAiChat ? "default" : "outline"}
                            size="sm"
                            onClick={() => { setShowAiChat(!showAiChat); setShowQuiz(false); }}
                            className="gap-1"
                        >
                            <Brain className="h-4 w-4" />
                            <span className="hidden sm:inline">AI Buddy</span>
                        </Button>
                        {quiz && (
                            <Button
                                variant={showQuiz ? "default" : "outline"}
                                size="sm"
                                onClick={() => { setShowQuiz(!showQuiz); setShowAiChat(false); }}
                                className="gap-1"
                            >
                                <Award className="h-4 w-4" />
                                <span className="hidden sm:inline">Quiz</span>
                            </Button>
                        )}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowSidebar(!showSidebar)}
                            className="lg:hidden"
                        >
                            <BookOpen className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Video Player */}
                <div className="relative">
                    {lesson.videoUrl ? (
                        <div className="aspect-video bg-black">
                            {/* @ts-expect-error react-player types incompatible with React 19 */}
                            <ReactPlayer
                                url={lesson.videoUrl}
                                width="100%"
                                height="100%"
                                controls
                                playing={false}
                                onProgress={handleVideoProgress}
                                onEnded={handleVideoEnd}
                                config={{
                                    youtube: { playerVars: { start: initialVideoProgress } },
                                }}
                            />
                        </div>
                    ) : (
                        <div className="aspect-video bg-surface flex items-center justify-center">
                            <div className="text-center">
                                <BookOpen className="h-16 w-16 text-muted mx-auto mb-4" />
                                <p className="text-muted">Esta lección es solo texto</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Lesson Content & Controls */}
                <div className="flex-1 p-6 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{lesson.title}</h2>
                        <Button
                            variant={isCompleted ? "success" : "outline"}
                            size="sm"
                            onClick={toggleComplete}
                            className="gap-1.5"
                        >
                            {isCompleted ? (
                                <CheckCircle2 className="h-4 w-4" />
                            ) : (
                                <Circle className="h-4 w-4" />
                            )}
                            {isCompleted ? "Completada" : "Marcar completada"}
                        </Button>
                    </div>

                    {/* Lesson Text Content */}
                    {lesson.content && (
                        <div className="prose prose-invert max-w-none text-sm leading-relaxed text-muted">
                            {lesson.content.split("\n").map((paragraph, i) => (
                                <p key={i} className="mb-3">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-border">
                        {prevLesson ? (
                            <Link href={`/courses/${courseId}/learn/${prevLesson.id}`}>
                                <Button variant="outline" className="gap-2">
                                    <ChevronLeft className="h-4 w-4" />
                                    Anterior
                                </Button>
                            </Link>
                        ) : (
                            <div />
                        )}
                        {nextLesson ? (
                            <Link href={`/courses/${courseId}/learn/${nextLesson.id}`}>
                                <Button variant="gradient" className="gap-2">
                                    Siguiente
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        ) : (
                            <Link href={`/courses/${courseId}`}>
                                <Button variant="gradient" className="gap-2">
                                    <Award className="h-4 w-4" />
                                    Finalizar Curso
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Right Panel - AI Chat / Quiz / Sidebar */}
            <AnimatePresence mode="wait">
                {/* AI Chat Panel */}
                {showAiChat && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 380, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-border bg-card flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                                    <Brain className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">AI Study Buddy</p>
                                    <p className="text-xs text-muted">Preguntame sobre la lección</p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setShowAiChat(false)}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {aiMessages.length === 0 && (
                                <div className="text-center py-8">
                                    <Brain className="h-12 w-12 text-muted mx-auto mb-3" />
                                    <p className="text-sm text-muted">
                                        ¡Hola! Soy tu asistente de estudio. Preguntame cualquier duda sobre esta lección.
                                    </p>
                                </div>
                            )}
                            {aiMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.role === "user"
                                            ? "gradient-primary text-white rounded-br-md"
                                            : "bg-surface text-foreground rounded-bl-md"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isAiLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-surface rounded-2xl rounded-bl-md px-4 py-3">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-muted animate-bounce" />
                                            <div className="w-2 h-2 rounded-full bg-muted animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-2 h-2 rounded-full bg-muted animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="p-4 border-t border-border">
                            <div className="flex gap-2">
                                <input
                                    value={aiInput}
                                    onChange={(e) => setAiInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAiSend()}
                                    placeholder="Escribe tu duda..."
                                    className="flex-1 h-10 rounded-lg border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <Button
                                    variant="gradient"
                                    size="icon"
                                    onClick={handleAiSend}
                                    disabled={isAiLoading || !aiInput.trim()}
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Quiz Panel */}
                {showQuiz && quiz && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 420, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="border-l border-border bg-card flex flex-col overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-border">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Award className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{quiz.title}</p>
                                    <p className="text-xs text-muted">{quiz.questions.length} preguntas</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowQuiz(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {quizSubmitted ? (
                                <div className="text-center py-8">
                                    <div
                                        className={`h-20 w-20 rounded-full mx-auto mb-4 flex items-center justify-center ${quizScore >= 70 ? "bg-success/10" : "bg-destructive/10"
                                            }`}
                                    >
                                        <span className={`text-2xl font-bold ${quizScore >= 70 ? "text-success" : "text-destructive"}`}>
                                            {quizScore}%
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {quizScore >= 70 ? "¡Excelente! 🎉" : "Sigue practicando 💪"}
                                    </h3>
                                    <p className="text-sm text-muted mb-4">
                                        Respondiste correctamente{" "}
                                        {Math.round((quizScore / 100) * quiz.questions.length)} de{" "}
                                        {quiz.questions.length} preguntas
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setQuizSubmitted(false);
                                            setQuizAnswers({});
                                            setQuizScore(0);
                                        }}
                                    >
                                        Intentar de nuevo
                                    </Button>
                                </div>
                            ) : (
                                <>
                                    {quiz.questions.map((q, i) => (
                                        <div key={q.id} className="space-y-3">
                                            <p className="text-sm font-medium">
                                                <span className="text-primary mr-2">{i + 1}.</span>
                                                {q.text}
                                            </p>

                                            {q.type === "MULTIPLE_CHOICE" && q.options && (
                                                <div className="space-y-2">
                                                    {(q.options as string[]).map((opt, j) => (
                                                        <button
                                                            key={j}
                                                            onClick={() =>
                                                                setQuizAnswers((prev) => ({
                                                                    ...prev,
                                                                    [q.id]: opt,
                                                                }))
                                                            }
                                                            className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${quizAnswers[q.id] === opt
                                                                ? "border-primary bg-primary/10 text-primary"
                                                                : "border-border hover:border-border-hover hover:bg-surface"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {q.type === "TRUE_FALSE" && (
                                                <div className="flex gap-2">
                                                    {["Verdadero", "Falso"].map((opt) => (
                                                        <button
                                                            key={opt}
                                                            onClick={() =>
                                                                setQuizAnswers((prev) => ({
                                                                    ...prev,
                                                                    [q.id]: opt,
                                                                }))
                                                            }
                                                            className={`flex-1 p-3 rounded-lg border text-sm font-medium transition-all ${quizAnswers[q.id] === opt
                                                                ? "border-primary bg-primary/10 text-primary"
                                                                : "border-border hover:border-border-hover"
                                                                }`}
                                                        >
                                                            {opt}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {q.type === "OPEN_ANSWER" && (
                                                <input
                                                    value={quizAnswers[q.id] || ""}
                                                    onChange={(e) =>
                                                        setQuizAnswers((prev) => ({
                                                            ...prev,
                                                            [q.id]: e.target.value,
                                                        }))
                                                    }
                                                    placeholder="Escribe tu respuesta..."
                                                    className="w-full h-10 rounded-lg border border-border bg-surface px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            )}
                                        </div>
                                    ))}

                                    <Button
                                        variant="gradient"
                                        className="w-full"
                                        onClick={handleQuizSubmit}
                                        disabled={Object.keys(quizAnswers).length < quiz.questions.length}
                                    >
                                        Enviar Respuestas
                                    </Button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Lesson Sidebar */}
                {showSidebar && !showAiChat && !showQuiz && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 320, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="hidden lg:flex border-l border-border bg-card flex-col overflow-hidden"
                    >
                        <div className="p-4 border-b border-border">
                            <p className="text-sm font-semibold">{courseTitle}</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Progress value={courseProgress} className="h-1.5" />
                                <span className="text-xs text-muted whitespace-nowrap">
                                    {courseProgress}%
                                </span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {chapters.map((chapter) => (
                                <div key={chapter.id}>
                                    <div className="px-4 py-3 bg-surface/50 border-b border-border">
                                        <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                                            Capítulo {chapter.position}
                                        </p>
                                        <p className="text-sm font-medium mt-0.5">
                                            {chapter.title}
                                        </p>
                                    </div>
                                    {chapter.lessons.map((l) => {
                                        const isActive = l.id === lesson.id;
                                        const isLessonCompleted =
                                            progressMap[l.id]?.isCompleted ||
                                            (l.id === lesson.id && isCompleted);

                                        return (
                                            <Link
                                                key={l.id}
                                                href={`/courses/${courseId}/learn/${l.id}`}
                                                className={`flex items-center gap-3 px-4 py-3 text-sm transition-all border-l-2 ${isActive
                                                    ? "bg-primary/10 border-primary text-primary"
                                                    : "border-transparent hover:bg-surface"
                                                    }`}
                                            >
                                                {isLessonCompleted ? (
                                                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                                                ) : isActive ? (
                                                    <Play className="h-4 w-4 text-primary shrink-0" />
                                                ) : (
                                                    <Circle className="h-4 w-4 text-muted shrink-0" />
                                                )}
                                                <span className="flex-1 truncate">
                                                    {l.title}
                                                </span>
                                                {l.duration && (
                                                    <span className="text-xs text-muted">
                                                        {formatDuration(l.duration)}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
