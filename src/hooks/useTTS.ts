import { useRequest } from 'ahooks';
import { groupBy, reverse, uniq } from 'lodash-es';

export type Voice = {
  Name: string;
  DisplayName: string;
  LocalName: string;
  ShortName: string;
  Gender: string;
  Locale: string;
  LocaleName: string;
  SampleRateHertz: string;
  VoiceType: string;
  Status: string;
  WordsPerMinute: string;
};

const queryVoicesList = () => {
  return fetch('https://ims-api.dctxf.com/ms/voices/list').then(
    (res) => res.json() as Promise<Voice[]>
  );
};

export const useTTs = () => {
  const { data } = useRequest(queryVoicesList);

  // const voices = sortBy(
  //   filter(data || [], (i) => ['zh-CN', 'en-US'].includes(i.Locale)),
  //   (i) => i.Gender
  // );
  const voices = data || [];

  const voicesGroup = groupBy(voices, (i) => i.Locale);

  const voicesLocale = reverse(uniq(voices.map((i) => i.Locale))).map((i) => ({
    label: i,
    value: i,
  }));
  const voicesGender = uniq(voices.map((i) => i.Gender)).map((i) => ({
    label: i,
    value: i,
  }));

  return {
    voices: data || [],
    voicesGroup,
    voicesLocale,
    voicesGender,
  };
};
