import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao, salvarSessao } from "../../services/sessao";
import { apiGet, apiPut } from "../../services/api";

import styles from "./perfil.module.css";

function rotuloTipo(nivel) {
  if (nivel === "ADMIN") return "Administrador";
  if (nivel === "VOLUNTARIO") return "Volunt\u00e1rio";
  return "Usu\u00e1rio";
}

function Perfil() {
  const sessao = obterSessao();
  const sessaoId = sessao?.id;
  const [perfil, setPerfil] = useState(null);
  const [formulario, setFormulario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarPerfil() {
      setCarregando(true);
      setErro("");
      try {
        let dados = null;
        if (sessaoId) {
          try {
            dados = await apiGet(`/usuarios/${sessaoId}`);
          } catch {
            dados = { ...obterSessao() };
          }
        }
        if (!dados) {
          dados = {
            nome: "Usu\u00e1rio Equit\u00e1",
            email: "usuario@email.com",
            tipo: "Usu\u00e1rio",
            id: null,
          };
        }
        // a API devolve o e-mail no campo username
        dados = { ...dados, email: dados.username ?? dados.email };
        if (ativo) {
          setPerfil(dados);
          setFormulario({ ...dados });
        }
      } catch {
        if (ativo) setErro("N\u00e3o foi poss\u00edvel carregar os dados do perfil.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregarPerfil();
    return () => { ativo = false; };
    // depende só do id: obterSessao() devolve um objeto novo a cada render
  }, [sessaoId]);

  function atualizarCampo(event) {
    const { name, value } = event.target;
    setFormulario((formularioAtual) => ({ ...formularioAtual, [name]: value }));
  }

  function iniciarEdicao() {
    setFormulario(perfil ? { ...perfil } : { nome: "", email: "" });
    setEditando(true);
    setMensagem("");
    setErro("");
  }

  function cancelarEdicao() {
    setEditando(false);
    setErro("");
    setMensagem("");
  }

  async function salvarPerfil(event) {
    event.preventDefault();
    if (!perfil || !perfil.id) {
      setErro("Usu\u00e1rio n\u00e3o identificado.");
      return;
    }

    setErro("");
    setMensagem("");

    try {
      // PUT /usuarios/{id} só altera nome e username; a senha tem endpoint próprio
      const payload = {
        nome: (formulario.nome || "").trim(),
        username: (formulario.email || "").trim(),
      };

      const atualizado = await apiPut(`/usuarios/${perfil.id}`, payload);

      setPerfil({
        ...atualizado,
        email: atualizado.username,
      });
      setFormulario({ ...atualizado, email: atualizado.username });
      // mantém o nome/e-mail do menu iguais aos do banco
      salvarSessao({ ...obterSessao(), nome: atualizado.nome, username: atualizado.username });
      setEditando(false);
      setMensagem("Perfil atualizado na plataforma.");
    } catch (excecao) {
      setErro(excecao.message || "N\u00e3o foi poss\u00edvel salvar o perfil.");
      setMensagem("");
    }
  }

  if (carregando) {
    return (
      <>
        <Navbar />
        <main className={styles.perfilPage}>
          <section className={styles.perfilHero}>
            <span className={styles.heroBadge}>Minha conta</span>
            <h1>Meu Perfil</h1>
            <p>Carregando dados da API...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className={styles.perfilPage}>

        <section className={styles.perfilHero}>

          <span className={styles.heroBadge}>
            Minha conta
          </span>

          <h1>
            Meu Perfil
          </h1>

          <p>
            Consulte e edite os dados da sua conta na plataforma.
          </p>
          {!sessao && (
            <p className={styles.profileNotice} role="note">
              Voc\u00ea n\u00e3o est\u00e1 logado. Fa\u00e7a login para ver os dados da sua conta.
            </p>
          )}

        </section>

        <section className={styles.perfilContent}>

          <div className={styles.perfilCard}>

            <div className={styles.perfilFoto}>
              👤
            </div>

            <div className={styles.perfilInfo}>

              <h2>
                Meu perfil
              </h2>

              {editando ? (
                <form onSubmit={salvarPerfil}>
                  <div className={styles.infoItem}>
                    <label htmlFor="perfil-nome">Nome</label>
                    <input id="perfil-nome" className={styles.profileInput} name="nome" value={formulario.nome || ""} onChange={atualizarCampo} maxLength="120" required />
                  </div>
                  <div className={styles.infoItem}>
                    <label htmlFor="perfil-email">E-mail</label>
                    <input id="perfil-email" className={styles.profileInput} name="email" type="email" value={formulario.email || ""} onChange={atualizarCampo} maxLength="150" required />
                  </div>
                  <div className={styles.infoItem}>
                    <span>Tipo de conta</span>
                    <strong>{sessao ? rotuloTipo(sessao.nivelAcesso) : "Usu\u00e1rio"}</strong>
                  </div>
                  {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
                  <div className={styles.profileActions}>
                    <button className={styles.profileButton} type="submit">Salvar</button>
                    <button className={styles.cancelButton} type="button" onClick={cancelarEdicao}>Cancelar</button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.infoItem}>
                    <span>Nome</span>
                    <strong>{perfil?.nome}</strong>
                  </div>
                  <div className={styles.infoItem}>
                    <span>E-mail</span>
                    <strong>{perfil?.email}</strong>
                  </div>
                  <div className={styles.infoItem}>
                    <span>Tipo de conta</span>
                    <strong>{sessao ? rotuloTipo(sessao.nivelAcesso) : "Usu\u00e1rio"}</strong>
                  </div>
                  <div className={styles.infoItem}>
                    <span>Status</span>
                    <strong>{perfil?.statusUsuario}</strong>
                  </div>
                  {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
                  <div className={styles.profileActions}>
                    {sessao && (
                      <button className={styles.profileButton} type="button" onClick={iniciarEdicao}>Editar perfil</button>
                    )}
                  </div>
                </>
              )}

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Perfil;
