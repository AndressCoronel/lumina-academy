import { create } from "zustand";

interface VideoState {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    isMuted: boolean;
    playbackRate: number;
    isFullscreen: boolean;
    lessonId: string | null;

    setIsPlaying: (playing: boolean) => void;
    setCurrentTime: (time: number) => void;
    setDuration: (duration: number) => void;
    setVolume: (volume: number) => void;
    toggleMute: () => void;
    setPlaybackRate: (rate: number) => void;
    setIsFullscreen: (fullscreen: boolean) => void;
    setLessonId: (id: string | null) => void;
    reset: () => void;
}

export const useVideoStore = create<VideoState>((set) => ({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.8,
    isMuted: false,
    playbackRate: 1,
    isFullscreen: false,
    lessonId: null,

    setIsPlaying: (playing) => set({ isPlaying: playing }),
    setCurrentTime: (time) => set({ currentTime: time }),
    setDuration: (duration) => set({ duration }),
    setVolume: (volume) => set({ volume }),
    toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),
    setPlaybackRate: (rate) => set({ playbackRate: rate }),
    setIsFullscreen: (fullscreen) => set({ isFullscreen: fullscreen }),
    setLessonId: (id) => set({ lessonId: id }),
    reset: () =>
        set({
            isPlaying: false,
            currentTime: 0,
            duration: 0,
            volume: 0.8,
            isMuted: false,
            playbackRate: 1,
            isFullscreen: false,
            lessonId: null,
        }),
}));
