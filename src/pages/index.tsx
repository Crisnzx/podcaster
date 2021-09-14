import { GetStaticProps } from "next";
import { api } from "../services/api";
import { formatEpisodes } from "../utils/formatEpisodes";
import Image from 'next/image';
import classes from '../styles/home.module.scss';
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
}

type HomeProps = {
  latestEpisodes: Array<Episode>,
  allEpisodes: Array<Episode>,
}

export default function Home(props: HomeProps) {
  const { latestEpisodes, allEpisodes } = props;
  return (
    <div className={classes.homePage}>
      <section className={classes.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((latestEpisode) => {
            return (
              <li key={latestEpisode.id}>
                <Image objectFit="cover" width={192} height={192} src={latestEpisode.thumbnail} alt={latestEpisode.title} />
                <div className={classes.episodeDetails}>
                  <Link href={`episodes/${latestEpisode.id}`}>
                    <a>{latestEpisode.title}</a>
                  </Link>
                  <p>{latestEpisode.members}</p>
                  <span>{latestEpisode.publishedAt}</span>
                  <span>{latestEpisode.formattedDuration}</span>
                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Ouvir Podcast" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={classes.allEpisodes}>
        <h2>Mais episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 72 }}>
                    <Image width={120} height={120} src={episode.thumbnail} alt={episode.title} objectFit="cover" />
                  </td>
                  <td>
                    <Link href={`episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAt}</td>
                  <td>{episode.formattedDuration}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Ouvir Podcast" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}
// If your page doesn't change too much and you want to have more performance
export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    }
  });

  // format the data right after the request to avoid unnecessary javascript process
  const episodes = formatEpisodes(response.data);

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 4, // One podcast per day
  }
}





// If you need to make a new request for every single client
/*
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const podcasters = await response.json();
  return {
    props: {
      podcasters
    }
  }
}
 */

/*
  Features that can be implemented
  Infinity scroll - all data is being loaded when the user accesses the page, it can be a issue.
*/