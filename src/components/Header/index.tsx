import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import classes from './styles.module.scss';

export function Header() {

  const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
    locale: ptBR,
  });


  return (
    <header className={classes.header}>
      <img className={classes.logo} src="/logo.svg" alt="Logo Podcastr" />
      <p>O melhor para você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}