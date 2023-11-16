import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useRequest } from 'ahooks';
import { zhCN } from 'date-fns/locale';
import dayjs from 'dayjs';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AudioPlayer, AudioPlayerRef } from './poetry';
export const queryCiba = (title: string) => {
  return fetch(`https://ims-api.dctxf.com/ciba?title=${title}`).then((res) =>
    res.json()
  );
};

export default () => {
  const { run, data } = useRequest(queryCiba, { manual: true });
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    if (date) run(dayjs(date).format('YYYY-MM-DD'));
  }, [date, run]);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const playerRef = useRef<AudioPlayerRef>(null);
  const [playing, setPlaying] = useState(false);

  const play = (src?: string) => {
    if (!src) return;
    const audio = audioRef.current;
    audio.src = src;
    audio.play();
  };

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <AudioPlayer
        ref={playerRef}
        onPlay={() => setPlaying(true)}
        onEnd={() => setPlaying(false)}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
              'mb-2'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? dayjs(date).format('YYYY-MM-DD') : <span>选择日期</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0'>
          <Calendar
            mode='single'
            locale={zhCN}
            selected={date}
            onSelect={(day) => {
              setDate(day);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Card>
        <CardHeader>
          <CardTitle>{data?.content}</CardTitle>
          <CardDescription>{data?.note}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className='mr-2' onClick={() => play(data?.tts)}>
            原声朗读
          </Button>
          <Button
            className='mr-2'
            disabled={playing}
            onClick={() => {
              playerRef.current?.play(data?.content);
            }}
          >
            {playing ? '正在朗读' : '朗读英文'}
          </Button>
          <Button
            className=''
            disabled={playing}
            onClick={() => {
              playerRef.current?.play(data?.note);
            }}
          >
            {playing ? '正在朗读' : '朗读中文'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
