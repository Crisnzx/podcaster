import ptBR from 'date-fns/locale/pt-BR';
import { format, parseISO } from 'date-fns';

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
};

type FormatEpisodesParams = Array<Episode>;

function formatVideoLength(duration: number): string {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedVideoLength = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':');

  return formattedVideoLength;
}

export function formatEpisodes(data: FormatEpisodesParams) {
  const parsedEpisodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      thumbnail: episode.thumbnail,
      url: episode.file.url,
      duration: episode.file.duration,
      formattedDuration: formatVideoLength(Number(episode.file.duration)),
    };
  });

  return parsedEpisodes;
}

export function formatEpisode(episode: Episode) {
  return {
    id: episode.id,
    title: episode.title,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
      locale: ptBR,
    }),
    thumbnail: episode.thumbnail,
    description: episode.description,
    url: episode.file.url,
    duration: episode.file.duration,
    formattedDuration: formatVideoLength(Number(episode.file.duration)),
  };
}
