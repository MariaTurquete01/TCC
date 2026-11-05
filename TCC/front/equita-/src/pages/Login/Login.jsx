
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { entrar, painelDoNivel } from "../../services/sessao";

import styles from "./login.module.css";

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const dados = new FormData(event.currentTarget);

    setErro("");
    setMensagem("");
    setCarregando(true);

    try {
      const usuario = await entrar(
        String(dados.get("email") || "").trim(),
        String(dados.get("password") || "")
      );

      setMensagem(`Bem-vindo(a), ${usuario.nome}!`);
      navigate(painelDoNivel(usuario.nivelAcesso), { replace: true });
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível entrar. Verifique seus dados.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className={styles["login-page"]}>
        <section className={styles["login-form-section"]}>
          <div className={styles["login-card"]}>
            <span className={styles["login-badge"]}>Plataforma Equitá</span>
            <h1>Entrar</h1>
            <p>Informe seus dados para acessar sua conta.</p>
            <p className={styles.serviceNotice}>
              Use o e-mail cadastrado e sua senha. Os dados são validados pela plataforma Equitá.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles["input-group"]}>
                <label htmlFor="login-email">E-mail</label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>

              <div className={styles["input-group"]}>
                <label htmlFor="login-password">Senha</label>
                <div className={styles["password-input"]}>
                  <input
                    id="login-password"
                    name="password"
                    type={mostrarSenha ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Digite sua senha"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

            <div className={styles["login-options"]}>
              <Link to="/recuperar-senha">Esqueci minha senha</Link>
            </div>

            {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
            {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
            <button type="submit" className={styles["login-button"]} disabled={carregando}>
              {carregando ? "Entrando..." : "Entrar"}
            </button>
            <div className={styles["divider"]}>
              <span>ou</span>
            </div>
            <Link
              to="/cadastro"
              className={styles["register-button"]}
            >
              Criar conta
            </Link>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Login;

