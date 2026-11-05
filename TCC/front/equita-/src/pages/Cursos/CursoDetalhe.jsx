import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { obterSessao } from "../../services/sessao";
import {
  atualizarProgresso,
  carregarAulasDoCurso,
  carregarCurso,
  carregarInscricoesDoUsuario,
  inscrever as inscreverNaApi,
} from "../../services/cursos";

import styles from "./detalhe.module.css";

// quais aulas foram concluídas fica no navegador (a API guarda o % de progresso)
const CHAVE_AULAS_CONCLUIDAS = "equita_aulas_concluidas";

function lerAulasConcluidas(cursoId) {
  try {
    const tudo = JSON.parse(window.localStorage.getItem(CHAVE_AULAS_CONCLUIDAS) || "{}");
    const lista = tudo[cursoId];
    return Array.isArray(lista) ? lista : [];
  } catch {
    return [];
  }
}

function gravarAulasConcluidas(cursoId, aulas) {
  try {
    const tudo = JSON.parse(window.localStorage.getItem(CHAVE_AULAS_CONCLUIDAS) || "{}");
    tudo[cursoId] = aulas;
    window.localStorage.setItem(CHAVE_AULAS_CONCLUIDAS, JSON.stringify(tudo));
    return true;
  } catch {
    return false;
  }
}

function obterLinkHttpSeguro(link) {
  if (typeof link !== "string" || !link.trim()) return null;

  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function CursoDetalhe() {
  const { id } = useParams();

  const [curso, setCurso] = useState(null);
  const [aulas, setAulas] = useState([]);
  const [inscricao, setInscricao] = useState(null);
  const [aulasConcluidas, setAulasConcluidas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState("");
  const [erroInscricao, setErroInscricao] = useState("");
  const [falhaProgresso, setFalhaProgresso] = useState("");

  // curso + conteúdos + inscrição (do usuário logado) vêm da API
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErroCarregamento("");
      try {
        const cursoCarregado = await carregarCurso(id);
        if (!ativo) return;

        // só cursos publicados aparecem na plataforma
        if (!cursoCarregado.origem?.publicado) {
          setCurso(null);
          setErroCarregamento("Curso não encontrado.");
          return;
        }

        setCurso(cursoCarregado);
        setAulasConcluidas(lerAulasConcluidas(String(cursoCarregado.id)));

        const aulasDoCurso = await carregarAulasDoCurso(cursoCarregado.id);
        if (!ativo) return;
        setAulas(aulasDoCurso);

        const sessao = obterSessao();
        if (sessao) {
          try {
            const inscricoes = await carregarInscricoesDoUsuario(sessao.id);
            if (!ativo) return;
            setInscricao(inscricoes.find((item) => item.cursoId === cursoCarregado.id) || null);
          } catch {
            // falha ao buscar inscrições não impede a leitura do curso
          }
        }
      } catch (excecao) {
        if (ativo) {
          setCurso(null);
          setErroCarregamento(excecao.message || "Curso não encontrado.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [id]);

  const progresso = inscricao ? Math.round(Number(inscricao.progresso) || 0) : 0;
  const erroProgresso = falhaProgresso;
  const aulasVisiveis = inscricao ? aulas : aulas.slice(0, 1);

  async function inscreverNoCurso() {
    const sessao = obterSessao();
    if (!sessao) {
      setErroInscricao("Faça login para se inscrever neste curso.");
      return;
    }

    setErroInscricao("");
    try {
      const novaInscricao = await inscreverNaApi(sessao.id, curso.id);
      setInscricao({
        id: novaInscricao.id,
        usuarioId: novaInscricao.usuarioId,
        cursoId: novaInscricao.cursoId,
        progresso: Number(novaInscricao.percentualProgresso) || 0,
        concluido: Boolean(novaInscricao.concluido),
        origem: novaInscricao,
      });
    } catch (excecao) {
      // se já estava inscrito, apenas carrega a inscrição existente
      try {
        const inscricoes = await carregarInscricoesDoUsuario(sessao.id);
        const existente = inscricoes.find((item) => item.cursoId === curso.id);
        if (existente) {
          setInscricao(existente);
          return;
        }
      } catch {
        // ignora a segunda falha e mostra o erro original
      }
      setErroInscricao(excecao.message || "Não foi possível concluir a inscrição.");
    }
  }

  async function alternarConclusaoAula(idAula) {
    if (!inscricao) return;

    const novasConcluidas = aulasConcluidas.includes(idAula)
      ? aulasConcluidas.filter((aula) => aula !== idAula)
      : [...aulasConcluidas, idAula];

    const concluidasNoCurso = novasConcluidas.filter((aulaConcluida) =>
      aulas.some((aula) => aula.id === aulaConcluida)
    ).length;
    const percentual = aulas.length
      ? Math.round((concluidasNoCurso / aulas.length) * 100)
      : 0;

    setAulasConcluidas(novasConcluidas);
    if (!gravarAulasConcluidas(String(curso.id), novasConcluidas)) {
      setFalhaProgresso("Não foi possível salvar seu progresso neste navegador.");
      return;
    }

    setFalhaProgresso("");
    try {
      const inscricaoAtualizada = await atualizarProgresso(inscricao, percentual);
      setInscricao({
        ...inscricao,
        progresso: Number(inscricaoAtualizada.percentualProgresso) || percentual,
        concluido: Boolean(inscricaoAtualizada.concluido),
        origem: inscricaoAtualizada,
      });
    } catch {
      setFalhaProgresso("Não foi possível registrar seu progresso na plataforma. Tente novamente.");
    }
  }

  if (carregando) {
    return (
      <>
        <Navbar />
        <main className={styles.courseNotFound}>
          <h1>Carregando curso...</h1>
          <Link to="/cursos">Voltar para Cursos</Link>
        </main>
        <Footer />
      </>
    );
  }

  if (!curso) {
    return (
      <>
        <Navbar />
        <main className={styles.courseNotFound}>
          <h1>{erroCarregamento || "Curso não encontrado."}</h1>
          <Link to="/cursos">Voltar para Cursos</Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.coursePage}>
        <section className={styles.courseHero}>
          <div className={styles.courseHeroContent}>
            <span className={styles.courseCategory}>{curso.categoria}</span>
            <h1>{curso.titulo}</h1>
            <p>{curso.descricao}</p>
            <div className={styles.courseMeta}>
              <span>Professor: {curso.professor}</span>
              <span>Duração: {curso.cargaHoraria}</span>
              <span>Nível: {curso.nivel}</span>
            </div>
          </div>
        </section>

        {/* PROGRESSO */}
        <section className={styles.progressSection}>
          <h2>
            Seu progresso
          </h2>

          {inscricao ? (
            <>
              <div
                className={styles.progressBar}
                role="progressbar"
                aria-label="Progresso do curso"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={progresso}
              >
                <div
                  className={styles.progressFill}
                  style={{ width: `${progresso}%` }}
                />
              </div>
              <p>{progresso}% concluído</p>
            </>
          ) : (
            <div className={styles.enrollmentPrompt}>
              <p>Você está vendo uma prévia. Inscreva-se para acessar todas as aulas e acompanhar seu progresso.</p>
              {erroInscricao && <p role="alert">{erroInscricao}</p>}
              <button className={styles.enrollButton} type="button" onClick={inscreverNoCurso}>
                Inscrever-se
              </button>
              <small>A inscrição fica registrada na sua conta na plataforma Equitá.</small>
            </div>
          )}
        </section>

        {/* AULAS */}
        <section className={styles.lessonsSection}>
          <h2>
            Conteúdo do Curso
          </h2>

          <div className={styles.moduleCard}>
            {aulas.length === 0 ? (
              <p>Este curso ainda não possui aulas cadastradas.</p>
            ) : (
              <>
                {!inscricao && (
                  <p className={styles.lessonNotice}>Prévia do curso. Inscreva-se para acessar o conteúdo completo.</p>
                )}
                {aulasVisiveis.map((aula, indice) => {
                  const idAula = aula.id ?? indice + 1;
                  const concluida = aulasConcluidas.includes(idAula);
                  const linkMaterial = obterLinkHttpSeguro(aula.link);

                  return (
                    <article className={`${styles.lessonCard} ${concluida ? styles.lessonCompleted : ""}`} key={idAula}>
                      <div className={styles.lessonContent}>
                        <strong>{aula.titulo || `Aula ${indice + 1}`}</strong>
                        {aula.descricao && <p>{aula.descricao}</p>}
                        {inscricao && linkMaterial && (
                          <a href={linkMaterial} target="_blank" rel="noopener noreferrer">
                            Acessar material da aula
                          </a>
                        )}
                      </div>
                      {inscricao ? (
                        <button
                          type="button"
                          aria-pressed={concluida}
                          onClick={() => alternarConclusaoAula(idAula)}
                        >
                          {concluida ? "Desmarcar conclusão" : "Marcar como concluída"}
                        </button>
                      ) : (
                        <span>Prévia</span>
                      )}
                    </article>
                  );
                })}
              </>
            )}
            {erroProgresso && <p role="alert">{erroProgresso}</p>}
          </div>
        </section>

        {/* APOSTILAS */}
        <section className={styles.materialsSection}>
          <h2>
            Apostilas e Materiais
          </h2>

          {!inscricao ? (
            <p>Inscreva-se para liberar os materiais do curso.</p>
          ) : aulas.length === 0 ? (
            <p>Os materiais deste curso ainda não foram cadastrados.</p>
          ) : (
            aulas.map((aula) => {
              const linkMaterial = obterLinkHttpSeguro(aula.link);
              return linkMaterial ? (
                <a
                  className={styles.materialCard}
                  key={aula.id}
                  href={linkMaterial}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 {aula.titulo}
                </a>
              ) : (
                <div className={styles.materialCard} key={aula.id}>📄 {aula.titulo}</div>
              );
            })
          )}
        </section>

        {/* QUESTIONÁRIOS */}
        <section className={styles.quizSection}>
          <h2>
            Questionários
          </h2>

          <p>O questionário ainda não está disponível para este curso.</p>
        </section>

        {/* CERTIFICADO */}
        <section id="certificado" className={styles.certificateSection}>
          <h2>
            Certificado
          </h2>

          {!curso.certificado ? (
            <p>O certificado ainda não está disponível para este curso.</p>
          ) : !inscricao ? (
            <p>Inscreva-se no curso para liberar o certificado.</p>
          ) : progresso < 100 ? (
            <p>Conclua todas as aulas para liberar o certificado demonstrativo.</p>
          ) : (
            <>
              <div className={styles.certificateDocument}>
                <span>Equitá</span>
                <h3>Certificado de conclusão</h3>
                <p>Declaramos que o participante concluiu o curso:</p>
                <strong>{curso.titulo}</strong>
                <p>Emitido em {new Date().toLocaleDateString("pt-BR")}</p>
                <small>Documento demonstrativo gerado no navegador, sem validação institucional.</small>
              </div>
              <button className={`${styles.certificateButton} ${styles.printButton}`} type="button" onClick={() => window.print()}>
                Imprimir ou salvar como PDF
              </button>
            </>
          )}
        </section>

        {/* AÇÕES */}
        <section className={styles.courseActions}>
          <Link
            to="/cursos"
            className={styles.backButton}
          >
            ← Voltar para Cursos
          </Link>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default CursoDetalhe;
