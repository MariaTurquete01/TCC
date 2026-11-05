import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao } from "../../services/sessao";
import {
  cancelarInscricao,
  carregarCursosPublicados,
  carregarInscricoesDoUsuario,
} from "../../services/cursos";
import styles from "./meusCursos.module.css";

function contarAulas(curso) {
  return Array.isArray(curso.aulas) ? curso.aulas.length : Number(curso.aulas) || 0;
}

function MeusCursos() {
  const sessao = obterSessao();
  const sessaoId = sessao?.id;
  const [cursosInscritos, setCursosInscritos] = useState([]);
  const [carregando, setCarregando] = useState(Boolean(sessaoId));
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  // inscrições ativas do usuário + catálogo público para exibir os dados do curso
  // depende só do id: obterSessao() devolve um objeto novo a cada render
  useEffect(() => {
    if (!sessaoId) return undefined;

    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        const [inscricoes, cursosPublicados] = await Promise.all([
          carregarInscricoesDoUsuario(sessaoId),
          carregarCursosPublicados(),
        ]);
        if (!ativo) return;

        const lista = inscricoes
          .map((inscricao) => ({
            inscricao,
            curso: cursosPublicados.find((curso) => curso.id === inscricao.cursoId),
          }))
          .filter(({ curso }) => curso);

        setCursosInscritos(lista);
      } catch (excecao) {
        if (ativo) setErro(excecao.message || "Não foi possível carregar suas inscrições.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [sessaoId]);

  async function cancelarInscricaoDoCurso(item) {
    const confirmado = window.confirm(
      `Cancelar a inscrição em “${item.curso.titulo}”? Seu progresso nesta plataforma também será desativado.`
    );
    if (!confirmado) return;

    try {
      await cancelarInscricao(item.inscricao.id);
      setCursosInscritos((atual) =>
        atual.filter((outro) => outro.inscricao.id !== item.inscricao.id)
      );
      setMensagem(`Inscrição em “${item.curso.titulo}” cancelada.`);
      setErro("");
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível cancelar a inscrição.");
      setMensagem("");
    }
  }

  if (!sessao) {
    return (
      <>
        <Navbar />
        <main className={styles.page}>
          <header className={styles.header}>
            <span className={styles.eyebrow}>Área do aluno</span>
            <h1>Meus Cursos</h1>
            <p>Acompanhe suas inscrições e retome seus estudos.</p>
          </header>
          <section className={styles.content} aria-live="polite">
            <div className={styles.emptyState}>
              <h2>Entre na sua conta para ver seus cursos</h2>
              <p>Suas inscrições ficam associadas ao seu usuário na plataforma Equitá.</p>
              <Link className={styles.primaryLink} to="/login">Entrar</Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>Área do aluno</span>
          <h1>Meus Cursos</h1>
          <p>Acompanhe suas inscrições e retome seus estudos.</p>
        </header>

        <section className={styles.content} aria-live="polite">
          {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
          {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
          {carregando ? (
            <div className={styles.emptyState}>
              <h2>Carregando seus cursos...</h2>
            </div>
          ) : cursosInscritos.length === 0 ? (
            <div className={styles.emptyState}>
              <h2>Você ainda não está inscrito em cursos</h2>
              <p>Explore o catálogo para encontrar um curso para começar.</p>
              <Link className={styles.primaryLink} to="/cursos">Explorar cursos</Link>
            </div>
          ) : (
            <div className={styles.courseGrid}>
              {cursosInscritos.map((item) => {
                const { curso, inscricao } = item;
                const progresso = inscricao.progresso;

                return (
                  <article className={styles.courseCard} key={inscricao.id}>
                    <span className={styles.category}>{curso.categoria}</span>
                    <h2>{curso.titulo}</h2>
                    <p>{curso.descricao}</p>
                    <div className={styles.progressHeader}>
                      <span>Progresso</span>
                      <strong>{progresso}%</strong>
                    </div>
                    <div
                      className={styles.progressTrack}
                      role="progressbar"
                      aria-label={`Progresso em ${curso.titulo}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow={Math.min(100, Math.max(0, progresso))}
                    >
                      <span style={{ width: `${Math.min(100, Math.max(0, progresso))}%` }} />
                    </div>
                    <div className={styles.courseMeta}>
                      <span>{curso.cargaHoraria}</span>
                      <span>{contarAulas(curso) ? `${contarAulas(curso)} aulas` : "Conteúdo em breve"}</span>
                    </div>
                    <div className={styles.actions}>
                      <Link className={styles.primaryLink} to={`/curso/${curso.id}`}>
                        Continuar curso
                      </Link>
                      {progresso >= 100 && curso.certificado && (
                        <Link className={styles.secondaryLink} to={`/curso/${curso.id}#certificado`}>
                          Certificado
                        </Link>
                      )}
                      <button className={styles.removeButton} type="button" onClick={() => cancelarInscricaoDoCurso(item)}>
                        Cancelar inscrição
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
          <p className={styles.storageNote}>
            As inscrições ficam registradas na sua conta e o progresso é salvo na plataforma Equitá.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MeusCursos;