import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import styles from "./login.module.css";

function RecuperarSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMensagem("O e-mail foi validado. O envio será ativado quando o serviço de autenticação for integrado.");
  }

  return (
    <>
      <Navbar />

      <main className={styles["login-page"]}>
        <section className={styles["login-form-section"]}>
          <div className={styles["login-card"]}>
            <span className={styles["login-badge"]}>Plataforma Equitá</span>
            <h1>Recuperar senha</h1>
            <p>Informe o e-mail cadastrado para iniciar a recuperação da sua conta.</p>
            <p className={styles.serviceNotice} role="note">
              Este formulário ainda não envia e-mails nem altera senhas.
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles["input-group"]}>
                <label htmlFor="recuperacao-email">E-mail</label>
                <input
                  id="recuperacao-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Digite seu e-mail"
                  required
                />
              </div>

              {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
              <button type="submit" className={styles["login-button"]}>
                Solicitar recuperação
              </button>
              <div className={styles.divider}>
                <span>ou</span>
              </div>
              <Link to="/login" className={styles["register-button"]}>
                Voltar para entrar
              </Link>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default RecuperarSenha;