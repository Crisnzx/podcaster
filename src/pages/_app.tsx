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

*/