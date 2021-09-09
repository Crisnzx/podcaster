import { Header } from '../components/Header';
import { Player } from '../components/Player';
import '../styles/global.scss';
import classes from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div className={classes.layout}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  )
}

export default MyApp


/*
COMMENTS AND NOTES ABOUT THE LEARNING PROCESS WHEN BUILDING THIS APPLICATION

the pages folder must exists inside of src folder or in the project root.

SPA - Single Page Application
Requisição dos dados quando o cliente acessar a página pelo lado do cliente. Ruim SEO

SSR - Server Side Rendering
Requisição dos dados quando o cliente acessar a página pelo lado do servidor. HTML pronto retornado e a página vem
com todo o seu conteúdo para uma boa indexação

SSG - Static Site Generation
Requisição dos dados ao back-end feita de tempos em tempos. Geração estática de uma página HTML no servidor do Next que
será exibida para todos os usuários que acessarem a página, evitando múltiplas requisições ao back-end sem
necessidade, pois o conteúdo a ser retornado é o mesmo.

*/