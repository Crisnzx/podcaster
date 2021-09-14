import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import { formatEpisode } from '../../utils/formatEpisodes';
import Image from 'next/image';
import classes from '../../styles/episode.module.scss';
import Link from 'next/link';

type Episode = {
  id: string,
  title: string,
  members: string,
  publishedAt: string,
  thumbnail: string,
  url: string,
  duration: number,
  formattedDuration: string,
  description: string,
}

type EpisodeProps = {
  episode: Episode,
}


export default function Episode({ episode }: EpisodeProps) {

  return (
    <div className={classes.episode}>
      <div className={classes.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image width={1000} height={400} src={episode.thumbnail} objectFit="cover" />
        <button>
          <img src="/play.svg" alt="Ouvir episódio" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.formattedDuration}</span>
      </header>
      <div className={classes.description} dangerouslySetInnerHTML={{ __html: episode.description }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { episodeId } = context.params;
  const { data } = await api.get(`episodes/${episodeId}`);

  const episode = formatEpisode(data);

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
