import { GetStaticProps } from "next";
import { api } from "../services/api";

type Episode = {
  id: string,
  title: string,
  members: string,
  publishedAt: string,
  thumbnail: string,
  url: string,
  duration: string,
}

type HomeProps = {
  episodes: Array<Episode>
}

export default function Home(props: HomeProps) {

  return (
    <>
      <h1>Home</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}
// If your page doesn't change too much and you want to have more performance
export const getStaticProps: GetStaticProps = async () => {
  const response = await api('episodes', {
    params: {

    }
  });
  const episodes = response.data;

  return {
    props: {
      episodes
    },
    // One podcast per day
    revalidate: 60 * 60 * 4,
  }
}





// If you need to make a new request for every single clien
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

