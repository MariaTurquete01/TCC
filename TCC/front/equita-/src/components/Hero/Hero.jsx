import { Link } from "react-router-dom";

import styles from "./hero.module.css";

function Hero() {
  return (
    <section className={styles.hero}>

      <div className={styles.heroContent}>
        <span className={styles.brand}>Equitá</span>
        <span className={styles.badge}>Plataforma de Cidadania e Inclusão Social</span>
        <h1>
          Uma plataforma moderna, segura e acessível para fortalecer a cidadania,
          proteger direitos e aproximar quem precisa de quem pode ajudar.
        </h1>
        <p>
          O Equitá conecta cidadãos, instituições e educadores em um ambiente
          seguro para orientação, aprendizado e promoção da igualdade.
        </p>
        <div className={styles.heroButtons}>
          <Link to="/denuncias" className={styles.primaryBtn}>Fazer Denúncia</Link>
          <Link to="/recursos" className={styles.secondaryBtn}>Recursos de Apoio</Link>
          <Link to="/direitos" className={styles.secondaryBtn}>Guia de Direitos</Link>
          <Link to="/cursos" className={styles.secondaryBtn}>Cursos</Link>
        </div>
      </div>

    </section>
  );
}

export default Hero;