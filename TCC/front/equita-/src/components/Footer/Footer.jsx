import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brand}>
          <Link className={styles.logo} to="/">
            <span className={styles.logoMark} aria-hidden="true" />
            Equitá
          </Link>
          <p>Uma plataforma para fortalecer a cidadania, proteger direitos e aproximar pessoas de quem pode ajudar.</p>
        </div>

        <nav className={styles.linkColumn} aria-label="Funcionalidades">
          <h2>Funcionalidades</h2>
          <Link to="/denuncias">Denúncias</Link>
          <Link to="/cursos">Cursos</Link>
          <Link to="/direitos">Guia de Direitos</Link>
          <Link to="/recursos">Recursos de Apoio</Link>
        </nav>

        <nav className={styles.linkColumn} aria-label="Conta">
          <h2>Conta</h2>
          <Link to="/perfil">Perfil</Link>
          <Link to="/login">Login</Link>
          <Link to="/cadastro">Cadastro</Link>
          <Link to="/configuracoes">Configurações</Link>
        </nav>

        <nav className={styles.linkColumn} aria-label="Sobre a plataforma">
          <h2>Informações</h2>
          <Link to="/sobre">Sobre</Link>
        </nav>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 Equitá. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;