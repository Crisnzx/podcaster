import { useContext } from 'react';
import Image from 'next/image';

import { PlayerContext } from '../../contexts/PlayerContext';
import classes from './styles.module.scss';


export function Player() {

  const { episodeList, currentEpisodeIndex } = useContext(PlayerContext);

  const currentEpisode = episodeList[currentEpisodeIndex];

  return (
    <div className={classes.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Player de música" />
        <strong>Tocando agora {currentEpisode?.title}</strong>
      </header>

      {episodeList.length > 0 ? (
        <div className={classes.currentEpisode}>
          <Image width={592} height={592} src={ } />
        </div>
      ) : (
        <div className={classes.emptyPlayer}>
          <p>Selecione um podcast para ouvir</p>
        </div>
      )
      }
      <footer className={classes.empty}>
        <div className={classes.progress}>
          <span>00:00</span>
          <div className={classes.slider}>
            <div className={classes.emptySlider} />
          </div>
          <span>00:00</span>
        </div>
        <div className={classes.buttons}>
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Ouvir Podcast anterior" />
          </button>
          <button type="button" className={classes.playButton}>
            <img src="/play.svg" alt="Ouvir Podcast" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Ouvir próximo Podcast" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repetir Podcast" />
          </button>
        </div>
      </footer>
    </div >
  );
}