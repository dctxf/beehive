import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const BASE_URL = 'https://ims-api.dctxf.com';
// const BASE_URL = 'http://localhost:3000';

export type TTSQuery = {
  text: string;
  gender?: string;
  lang?: string;
  name?: string;
  style?: string;
};

export type AudioPlayerProps = {
  //
  onPlay?: () => void;
  onEnd?: () => void;
};
export type AudioPlayerRef = {
  play: (query: TTSQuery) => void;
};

export const AudioPlayer = forwardRef<AudioPlayerRef, AudioPlayerProps>(
  ({ onPlay = () => {}, onEnd = () => {} }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(new Audio());

    useEffect(() => {
      const ref = audioRef.current;
      if (ref) {
        ref.addEventListener('play', onPlay);
        ref.addEventListener('ended', onEnd);
        ref.addEventListener('error', onEnd);
      }
      return () => {
        if (ref) {
          ref.removeEventListener('play', onPlay);
          ref.removeEventListener('ended', onEnd);
          ref.removeEventListener('error', onEnd);
        }
      };
    }, [onEnd, onPlay]);

    useImperativeHandle(
      ref,
      () => {
        return {
          play(query) {
            const audio = audioRef.current;
            audio.src = `${BASE_URL}/ms/tts?${new URLSearchParams(query)}`;
            audio.play();
          },
        };
      },
      []
    );
    return null;
  }
);
