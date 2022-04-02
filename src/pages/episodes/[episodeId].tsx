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

  const { data } = await api.get('episodes', {
    params: {
      _limit: 2,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  const paths = data.map((episode) => {
    return {
      params: {
        episodeId: episode.id,
      }
    }
  })

  return {
    paths,
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


// getStaticPaths
/*
We have to tell next what dinamic pages should be pre-rendered
We can provide an array of paths that will be generated in the build process
We can provide the most popular pages, and don't provide all pages, to prevent too much delay
when the build is generated

Fallback - defines how our app should behave when a page that wasn't generated before is accessed

fallback: false - returns 404 not found

fallback: true - fetch the data from the back-end on the client-side
(bad SEO, the source code is almost empty)

fallback: blocking - fetch the data from the back-end on the next-server-side
(good SEO, only renders the components when the data is available)
*/