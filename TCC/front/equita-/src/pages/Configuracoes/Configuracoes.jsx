import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao } from "../../services/sessao";
import { apiPost, apiPut } from "../../services/api";

import styles from "./configuracoes.module.css";

const CHAVE_NOTIFICACOES = "equita_notificacoes_ativas";

function carregarPreferenciaNotificacoes() {
  try {
    const preferenciaSalva = window.localStorage.getItem(CHAVE_NOTIFICACOES);
    return preferenciaSalva === null ? true : preferenciaSalva === "true";
  } catch {
    return true;
  }
}

function Configuracoes() {
  const sessao = obterSessao();

  const [notificacoes, setNotificacoes] = useState(carregarPreferenciaNotificacoes);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [mensagemSenha, setMensagemSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [salvandoSenha, setSalvandoSenha] = useState(false);

  async function handleAlterarSenha(event) {
    event.preventDefault();
    // guarda o form antes do await: o React zera event.currentTarget depois do handler
    const formulario = event.currentTarget;
    const dados = new FormData(formulario);
    const senhaAtual = String(dados.get("senhaAtual") || "");
    const novaSenha = String(dados.get("novaSenha") || "");
    const confirmacao = String(dados.get("confirmacaoSenha") || "");

    setMensagemSenha("");
    setErroSenha("");

    if (novaSenha !== confirmacao) {
      setErroSenha("A nova senha e a confirmação não coincidem.");
      return;
    }
    if (novaSenha === senhaAtual) {
      setErroSenha("A nova senha deve ser diferente da atual.");
      return;
    }

    setSalvandoSenha(true);
    try {
      // a API não confere a senha atual → valida pelo próprio login
      try {
        await apiPost("/usuarios/login", { username: sessao.username, password: senhaAtual });
      } catch (excecao) {
        throw excecao.status === 0 ? excecao : new Error("Senha atual incorreta.");
      }

      await apiPut(`/usuarios/${sessao.id}/alterar-senha?newPassword=${encodeURIComponent(novaSenha)}`);
      formulario.reset();
      setMensagemSenha("Senha alterada com sucesso.");
    } catch (excecao) {
      setErroSenha(excecao.message || "Não foi possível alterar a senha.");
    } finally {
      setSalvandoSenha(false);
    }
  }

  const handleSalvar = (event) => {
    event.preventDefault();

    try {
      window.localStorage.setItem(CHAVE_NOTIFICACOES, String(notificacoes));
      setMensagem("Preferência salva nesta sessão.");
      setErro("");
    } catch {
      setMensagem("");
      setErro("Não foi possível salvar a preferência.");
    }
  };

  return (
    <>
      <Navbar />

      <main className={styles.configuracoesPage}>

        <section className={styles.configuracoesHero}>

          <span className={styles.heroBadge}>
            Minha conta
          </span>

          <h1>
            Configurações
          </h1>

          <p>
            Gerencie as configurações da sua conta na plataforma Equitá.
          </p>

        </section>

        <section className={styles.configuracoesContent}>

          <form
            className={`${styles.configuracoesCard} ${styles.passwordCard}`}
            onSubmit={handleAlterarSenha}
          >
            <div className={styles.configSection}>
              <h2>Alterar senha</h2>
              <p>Informe a senha atual e escolha uma nova senha.</p>

              <div className={styles.passwordField}>
                <label htmlFor="senha-atual">Senha atual</label>
                <input id="senha-atual" name="senhaAtual" type="password" autoComplete="current-password" required />
              </div>
              <div className={styles.passwordField}>
                <label htmlFor="nova-senha">Nova senha</label>
                <input id="nova-senha" name="novaSenha" type="password" autoComplete="new-password" required />
              </div>
              <div className={styles.passwordField}>
                <label htmlFor="confirmacao-senha">Confirmar nova senha</label>
                <input id="confirmacao-senha" name="confirmacaoSenha" type="password" autoComplete="new-password" required />
              </div>
            </div>

            <div className={styles.formActions}>
              {mensagemSenha && <p className={styles.feedbackMessage} role="status">{mensagemSenha}</p>}
              {erroSenha && <p className={styles.errorMessage} role="alert">{erroSenha}</p>}
              <button type="submit" className={styles.saveButton} disabled={salvandoSenha}>
                {salvandoSenha ? "Alterando..." : "Alterar senha"}
              </button>
            </div>
          </form>

          <form
            className={styles.configuracoesCard}
            onSubmit={handleSalvar}
          >

            <div className={styles.configSection}>

              <h2>
                Conta
              </h2>

              <p>
                Gerencie as informações básicas da sua conta.
              </p>

              <div className={styles.configItem}>

                <div>
                  <strong>
                    E-mail
                  </strong>
                </div>

                <div>
                  {sessao?.username}
                </div>

                <Link to="/perfil">Editar nome e e-mail no perfil</Link>

              </div>

            </div>

            <div className={styles.configSection}>

              <h2>
                Preferências
              </h2>

              <p>
                Escolha como deseja receber informações da plataforma.
              </p>

              <label className={styles.toggleItem}>

                <div>

                  <strong>
                    Notificações
                  </strong>

                  <span>
                    Receber atualizações e informações importantes da Equitá.
                  </span>

                </div>

                <input
                  type="checkbox"
                  checked={notificacoes}
                  onChange={(event) => {
                    setNotificacoes(event.target.checked);
                    setMensagem("");
                    setErro("");
                  }}
                />

              </label>

            </div>

            <div className={styles.formActions}>

              {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
              {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}

              <button
                type="submit"
                className={styles.saveButton}
              >
                Salvar alterações
              </button>

            </div>

          </form>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Configuracoes;
