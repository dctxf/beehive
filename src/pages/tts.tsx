import {
  AudioPlayer,
  AudioPlayerRef,
  TTSQuery,
} from '@/components/AudioPlayer';
import { CommandPopover } from '@/components/CommandPopover';
import { FormRadioGroup } from '@/components/FormRadioGroup';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useTTs } from '@/hooks/useTTS';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRequest } from 'ahooks';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const voiceStyles = [
  {
    style: 'advertisement_upbeat',
    desc: '用兴奋和精力充沛的语气推广产品或服务。',
  },
  {
    style: 'affectionate',
    desc: '以较高的音调和音量表达温暖而亲切的语气。 说话者处于吸引听众注意力的状态。 说话者的个性往往是讨喜的。',
  },
  { style: 'angry', desc: '表达生气和厌恶的语气。' },
  { style: 'assistant', desc: '数字助理用的是热情而轻松的语气。' },
  {
    style: 'calm',
    desc: '以沉着冷静的态度说话。 语气、音调和韵律与其他语音类型相比要统一得多。',
  },
  { style: 'chat', desc: '表达轻松随意的语气。' },
  { style: 'cheerful', desc: '表达积极愉快的语气。' },
  { style: 'customerservice', desc: '以友好热情的语气为客户提供支持。' },
  { style: 'depressed', desc: '调低音调和音量来表达忧郁、沮丧的语气。' },
  {
    style: 'disgruntled',
    desc: '表达轻蔑和抱怨的语气。 这种情绪的语音表现出不悦和蔑视。',
  },
  {
    style: 'documentary-narration',
    desc: '	用一种轻松、感兴趣和信息丰富的风格讲述纪录片，适合配音纪录片、专家评论和类似内容。',
  },
  {
    style: 'embarrassed',
    desc: '在说话者感到不舒适时表达不确定、犹豫的语气。',
  },
  { style: 'empathetic', desc: '表达关心和理解。' },
  { style: 'envious', desc: '当你渴望别人拥有的东西时，表达一种钦佩的语气。' },
  {
    style: 'excited',
    desc: '表达乐观和充满希望的语气。 似乎发生了一些美好的事情，说话人对此满意。',
  },
  {
    style: 'fearful',
    desc: '以较高的音调、较高的音量和较快的语速来表达恐惧、紧张的语气。 说话人处于紧张和不安的状态。',
  },
  {
    style: 'friendly',
    desc: '表达一种愉快、怡人且温暖的语气。 听起来很真诚且满怀关切。',
  },
  { style: 'gentle', desc: '以较低的音调和音量表达温和、礼貌和愉快的语气。' },
  {
    style: 'hopeful',
    desc: '表达一种温暖且渴望的语气。 听起来像是会有好事发生在说话人身上。',
  },
  { style: 'lyrical', desc: '以优美又带感伤的方式表达情感。' },
  { style: 'narration-professional', desc: '以专业、客观的语气朗读内容。' },
  { style: 'narration-relaxed', desc: '	为内容阅读表达一种舒缓而悦耳的语气。' },
  { style: 'newscast', desc: '以正式专业的语气叙述新闻。' },
  { style: 'newscast-casual', desc: '	以通用、随意的语气发布一般新闻。' },
  { style: 'newscast-formal', desc: '	以正式、自信和权威的语气发布新闻。' },
  { style: 'poetry-reading', desc: '	在读诗时表达出带情感和节奏的语气。' },
  { style: 'sad', desc: '表达悲伤语气。' },
  {
    style: 'serious',
    desc: '表达严肃和命令的语气。 说话者的声音通常比较僵硬，节奏也不那么轻松。',
  },
  {
    style: 'shouting',
    desc: '表达一种听起来好像声音在远处或在另一个地方的语气，努力让别人听清楚。',
  },
  {
    style: 'sports_commentary',
    desc: '表达一种既轻松又感兴趣的语气，用于播报体育赛事。',
  },
  {
    style: 'sports_commentary_excited',
    desc: '用快速且充满活力的语气播报体育赛事精彩瞬间。',
  },
  {
    style: 'whispering',
    desc: '表达一种柔和的语气，试图发出安静而柔和的声音。',
  },
  {
    style: 'terrified',
    desc: '表达一种害怕的语气，语速快且声音颤抖。 听起来说话人处于不稳定的疯狂状态。',
  },
  { style: 'unfriendly', desc: '表达一种冷淡无情的语气。' },
];

const formSchema = z.object({
  text: z.string(),
  gender: z.string(),
  lang: z.string(),
  name: z.string(),
  style: z.string(),
});

export const queryVoice = ({ text, gender, lang, name, style }: TTSQuery) => {
  return fetch(
    `https://ims-api.dctxf.com/ms/tts?text=${text}&gender=${gender}&lang=${lang}&name=${name}&style=${style}`
  ).then((res) => res.json());
};

export default () => {
  const { run } = useRequest(queryVoice, { manual: true });

  const { voices, voicesLocale, voicesGender } = useTTs();

  const playerRef = useRef<AudioPlayerRef>(null);
  const [playing, setPlaying] = useState(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      style: 'friendly',
      lang: 'zh-CN',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    run({ ...values });
  }

  return (
    <div className='p-4 max-w-lg mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
          <FormField
            control={form.control}
            name='lang'
            render={({ field }) => (
              <FormItem>
                <FormLabel>语言</FormLabel>
                <FormControl>
                  <CommandPopover
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.reset({
                        ...form.getValues(),
                        lang: value,
                        name: '',
                        gender: '',
                      });
                    }}
                    options={voicesLocale}
                  ></CommandPopover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='gender'
            render={({ field }) => (
              <FormItem>
                <FormLabel>性别</FormLabel>
                <FormControl>
                  <FormRadioGroup
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      form.reset({
                        ...form.getValues(),
                        gender: value,
                        name: '',
                      });
                    }}
                    options={voicesGender}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => {
              const { gender, lang } = form.getValues();

              const voiceList = voices.filter((i) => {
                return i.Locale === lang && i.Gender === gender;
              });

              return (
                <FormItem>
                  <FormLabel>声音</FormLabel>
                  <FormControl>
                    <CommandPopover
                      value={field.value}
                      onChange={field.onChange}
                      options={voiceList.map((i) => ({
                        label: i.ShortName,
                        value: i.ShortName,
                      }))}
                    ></CommandPopover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='style'
            render={({ field }) => (
              <FormItem>
                <FormLabel>语调</FormLabel>
                <FormControl>
                  <CommandPopover
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                    }}
                    options={voiceStyles.map((i) => ({
                      label: i.desc,
                      value: i.style,
                    }))}
                  ></CommandPopover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='text'
            render={({ field }) => (
              <FormItem>
                <FormLabel>文本内容</FormLabel>
                <FormControl>
                  <Textarea placeholder='请输入你要生成的内容' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AudioPlayer
            ref={playerRef}
            onPlay={() => setPlaying(true)}
            onEnd={() => setPlaying(false)}
          />
          <Button
            className='w-full'
            disabled={playing}
            onClick={() => {
              const values = {
                ...form.getValues(),
              };
              playerRef.current?.play(values);
            }}
          >
            播放
          </Button>
        </form>
      </Form>
    </div>
  );
};
