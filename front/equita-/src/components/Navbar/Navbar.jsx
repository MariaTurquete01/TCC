import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  obterSessao,
  encerrarSessao as encerrarSessaoUsuario,
  painelDoNivel,
  rotuloNivel,
} from "../../services/sessao";

import styles from "./navbar.module.css";

function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [sessao, setSessao] = useState(obterSessao);
  const navigate = useNavigate();

  function encerrarSessao() {
    const confirmado = window.confirm("Deseja sair da sua conta?");
    if (!confirmado) return;

    encerrarSessaoUsuario();
    setSessao(null);
    setMenuAberto(false);
    navigate("/", { replace: true });
  }

  return (
    <header className={styles.navbar}>
      <Link className={styles.logo} to="/" aria-label="Equitá, início">
        <span className={styles.logoMark} aria-hidden="true" />
        <span>Equitá</span>
      </Link>

      <nav className={styles.navigation} aria-label="Navegação principal">
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/denuncias">Denúncias</Link></li>
          <li><Link to="/cursos">Cursos</Link></li>
          <li><Link to="/direitos">Direitos</Link></li>
          <li><Link to="/recursos">Recursos</Link></li>
          <li><Link to="/sobre">Sobre</Link></li>
        </ul>
      </nav>

      <div className={styles.navbarRight}>
        <div className={styles.buttons}>
          {sessao ? (
            <>
              <Link className={styles.registerBtn} to={painelDoNivel(sessao.nivelAcesso)}>
                {sessao.nivelAcesso === "ADMIN"
                  ? "Painel admin"
                  : sessao.nivelAcesso === "VOLUNTARIO"
                    ? "Área do voluntário"
                    : "Meus cursos"}
              </Link>
              <button className={styles.loginBtn} type="button" onClick={encerrarSessao}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link className={styles.loginBtn} to="/login">Entrar</Link>
              <Link className={styles.registerBtn} to="/cadastro">Cadastrar</Link>
            </>
          )}
        </div>

        <div className={styles.profileMenu}>
          <button
            className={styles.menuButton}
            onClick={() => setMenuAberto(!menuAberto)}
            aria-label={menuAberto ? "Fechar menu do perfil" : "Abrir menu do perfil"}
            aria-haspopup="true"
            aria-expanded={menuAberto}
            type="button"
          >
            <span aria-hidden="true">☰</span>
          </button>

          {menuAberto && (
            <div className={styles.profileDropdown} role="menu">
              <div className={styles.profileHeader}>
                <div className={styles.profileIcon} aria-hidden="true">●</div>
                <div>
                  <strong>{sessao ? sessao.nome : "Minha conta"}</strong>
                  <span>{sessao ? rotuloNivel(sessao.nivelAcesso) : "Entre ou crie uma conta"}</span>
                </div>
              </div>

              <div className={styles.dropdownDivider} />

              {sessao && (
                <Link
                  to="/perfil"
                  onClick={() => setMenuAberto(false)}
                  role="menuitem"
                >
                  Perfil
                </Link>
              )}

              {sessao && (
                <Link
                  to="/meus-cursos"
                  onClick={() => setMenuAberto(false)}
                  role="menuitem"
                >
                  Meus cursos
                </Link>
              )}

              {sessao?.nivelAcesso === "VOLUNTARIO" && (
                <Link
                  to="/voluntario/meus-cursos"
                  onClick={() => setMenuAberto(false)}
                  role="menuitem"
                >
                  Área do voluntário
                </Link>
              )}

              {sessao?.nivelAcesso === "ADMIN" && (
                <Link
                  to="/admin"
                  onClick={() => setMenuAberto(false)}
                  role="menuitem"
                >
                  Painel admin
                </Link>
              )}

              <Link
                to="/configuracoes"
                onClick={() => setMenuAberto(false)}
                role="menuitem"
              >
                Configurações
              </Link>

              {sessao ? (
                <button
                  className={styles.logoutButton}
                  onClick={encerrarSessao}
                  role="menuitem"
                  type="button"
                >
                  Sair da conta
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuAberto(false)}
                  role="menuitem"
                >
                  Entrar
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
