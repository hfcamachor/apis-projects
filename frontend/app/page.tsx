import styles from './page.module.css'
import PokemonSearch from './components/Pokemon'

export default function Home() {
  return (
    <main className={styles.main}>
      <PokemonSearch />
    </main>
  )
}
