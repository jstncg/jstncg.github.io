import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react';

interface AudioContextType {
  playingFile: string | null;
  isPaused: boolean;
  handlePlay: (audioFile: string, startTime?: number) => void;
  togglePlayPause: () => void;
  isPlaying: (audioFile: string) => boolean;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [playingFile, setPlayingFile] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentFileRef = useRef<string | null>(null);

  const handlePlay = useCallback((audioFile: string, startTime = 0) => {
    // Toggle pause if same file is playing
    if (playingFile === audioFile && !isPaused) {
      audioRef.current?.pause();
      setIsPaused(true);
      return;
    }

    // Resume if same file was paused
    if (currentFileRef.current === audioFile && isPaused && audioRef.current) {
      audioRef.current.play();
      setPlayingFile(audioFile);
      setIsPaused(false);
      return;
    }

    // Stop current audio
    audioRef.current?.pause();

    // Play new audio
    const audio = new Audio(encodeURI(audioFile));
    audio.currentTime = startTime;
    audio.onended = () => {
      setPlayingFile(null);
      setIsPaused(false);
      currentFileRef.current = null;
    };
    audio.play().catch(console.error);

    audioRef.current = audio;
    currentFileRef.current = audioFile;
    setPlayingFile(audioFile);
    setIsPaused(false);
  }, [playingFile, isPaused]);

  const togglePlayPause = useCallback(() => {
    if (!audioRef.current || !currentFileRef.current) return;
    
    if (isPaused) {
      audioRef.current.play();
      setPlayingFile(currentFileRef.current);
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, [isPaused]);

  const isPlaying = useCallback(
    (audioFile: string) => playingFile === audioFile && !isPaused,
    [playingFile, isPaused]
  );

  return (
    <AudioContext.Provider value={{ playingFile, isPaused, handlePlay, togglePlayPause, isPlaying }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) throw new Error('useAudio must be used within an AudioProvider');
  return context;
}
