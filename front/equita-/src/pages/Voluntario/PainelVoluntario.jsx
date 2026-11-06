import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao } from "../../services/sessao";
import {
  TIPOS_MATERIAL,
  carregarCursosDoVoluntario,
  criarAula,
  criarCurso,
  editarCurso,
  removerAula,
} from "../../services/cursos";
import styles from "./voluntario.module.css";

const CURSO_VAZIO = { titulo: "", descricao: "", cargaHoraria: "" };
const AULA_VAZIA = { titulo: "", descricao: "", tipoMaterial: "VIDEO", linkExterno: "" };

// situação do curso do ponto de vista do voluntário
function situacaoCurso(curso) {
  if (curso.statusAprovacao === "REPROVADO") return { texto: "Reprovado", classe: "statusRejected" };
  if (curso.statusAprovacao === "APROVADO" && curso.publicado) return { texto: "Publicado", classe: "statusApproved" };
  if (curso.statusAprovacao === "APROVADO") return { texto: "Aprovado (fora do catálogo)", classe: "statusPending" };
  return { texto: "Em análise", classe: "statusPending" };
}

function situacaoAula(aula) {
  if (aula.statusAprovacao === "REPROVADO") return { texto: "Removida / reprovada", classe: "statusRejected" };
  if (aula.statusAprovacao === "APROVADO" && aula.publicado) return { texto: "Publicada", classe: "statusApproved" };
  if (aula.statusAprovacao === "APROVADO") return { texto: "Aprovada", classe: "statusPending" };
  return { texto: "Em análise", classe: "statusPending" };
}

function linkSeguro(link) {
  try {
    const url = new URL(link);
    return url.protocol === "http:" || url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function PainelVoluntario() {
  const sessao = obterSessao();
  const voluntarioId = sessao?.id;

  const [cursos, setCursos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  const [formCurso, setFormCurso] = useState(CURSO_VAZIO);
  const [cursoEmEdicao, setCursoEmEdicao] = useState(null);
  const [salvandoCurso, setSalvandoCurso] = useState(false);

  const [cursoComFormAula, setCursoComFormAula] = useState(null);
  const [formAula, setFormAula] = useState(AULA_VAZIA);
  const [salvandoAula, setSalvandoAula] = useState(false);

  async function recarregar() {
    setCursos(await carregarCursosDoVoluntario(voluntarioId));
  }

  useEffect(() => {
    if (!voluntarioId) return undefined;
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      try {
        const lista = await carregarCursosDoVoluntario(voluntarioId);
        if (ativo) setCursos(lista);
      } catch (excecao) {
        if (ativo) setErro(excecao.message || "Não foi possível carregar seus cursos.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [voluntarioId]);

  function avisar(texto) {
    setMensagem(texto);
    setErro("");
  }

  function falhar(excecao, padrao) {
    setErro(excecao?.message || padrao);
    setMensagem("");
  }

  // ===================== CURSO =====================

  function alterarCampoCurso(event) {
    const { name, value } = event.target;
    setFormCurso((atual) => ({ ...atual, [name]: value }));
  }

  function iniciarEdicaoCurso(curso) {
    setCursoEmEdicao(curso);
    setFormCurso({
      titulo: curso.titulo || "",
      descricao: curso.descricao || "",
      cargaHoraria: curso.cargaHorariaHoras ?? "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicaoCurso() {
    setCursoEmEdicao(null);
    setFormCurso(CURSO_VAZIO);
  }

  async function salvarCurso(event) {
    event.preventDefault();
    if (cursoEmEdicao?.publicado
      && !window.confirm("Ao editar, o curso sai do catálogo e volta para análise do administrador. Continuar?")) {
      return;
    }

    setSalvandoCurso(true);
    try {
      if (cursoEmEdicao) {
        await editarCurso(cursoEmEdicao, formCurso);
        avisar(`Curso “${formCurso.titulo.trim()}” atualizado e enviado para nova análise.`);
      } else {
        const novo = await criarCurso(voluntarioId, formCurso);
        avisar(`Curso “${novo.titulo}” criado! Agora adicione as aulas e aguarde a aprovação.`);
        setCursoComFormAula(novo.id);
        setFormAula(AULA_VAZIA);
      }
      setCursoEmEdicao(null);
      setFormCurso(CURSO_VAZIO);
      await recarregar();
    } catch (excecao) {
      falhar(excecao, "Não foi possível salvar o curso.");
    } finally {
      setSalvandoCurso(false);
    }
  }

  // ===================== AULAS =====================

  function abrirFormAula(cursoId) {
    setCursoComFormAula((atual) => (atual === cursoId ? null : cursoId));
    setFormAula(AULA_VAZIA);
  }

  function alterarCampoAula(event) {
    const { name, value } = event.target;
    setFormAula((atual) => ({ ...atual, [name]: value }));
  }

  async function salvarAula(event, curso) {
    event.preventDefault();
    if (!linkSeguro(formAula.linkExterno.trim())) {
      falhar(null, "Informe um link válido começando com http:// ou https:// (ex.: link do YouTube ou do Google Drive).");
      return;
    }

    setSalvandoAula(true);
    try {
      await criarAula(voluntarioId, curso.id, formAula);
      avisar(`Aula “${formAula.titulo.trim()}” adicionada em “${curso.titulo}”. Ela aparece para os alunos depois da aprovação.`);
      setFormAula(AULA_VAZIA);
      await recarregar();
    } catch (excecao) {
      falhar(excecao, "Não foi possível adicionar a aula.");
    } finally {
      setSalvandoAula(false);
    }
  }

  async function excluirAula(aula) {
    if (!window.confirm(`Remover a aula “${aula.titulo}”? Ela deixa de aparecer para os alunos.`)) return;
    try {
      await removerAula(aula);
      avisar(`Aula “${aula.titulo}” removida.`);
      await recarregar();
    } catch (excecao) {
      falhar(excecao, "Não foi possível remover a aula.");
    }
  }

  const publicados = cursos.filter((curso) => curso.statusAprovacao === "APROVADO" && curso.publicado).length;
  const emAnalise = cursos.filter((curso) => curso.statusAprovacao === "PENDENTE").length;

  return (
    <>
      <Navbar />

      <main className={styles.page}>
        <section className={styles.header}>
          <span className={styles.badge}>Área do voluntário</span>
          <h1>Olá, {sessao?.nome?.split(" ")[0] || "voluntário"}!</h1>
          <p>
            Crie seus cursos, adicione as aulas e envie para análise. Depois que o
            administrador aprovar, o curso aparece no catálogo e qualquer usuário
            pode se inscrever e assistir pela própria conta.
          </p>

          <ol className={styles.steps}>
            <li><strong>1.</strong> Crie o curso</li>
            <li><strong>2.</strong> Adicione as aulas</li>
            <li><strong>3.</strong> O admin aprova</li>
            <li><strong>4.</strong> Alunos se inscrevem</li>
          </ol>

          <div className={styles.stats}>
            <div><strong>{cursos.length}</strong><span>cursos criados</span></div>
            <div><strong>{publicados}</strong><span>publicados</span></div>
            <div><strong>{emAnalise}</strong><span>em análise</span></div>
          </div>
        </section>

        <div className={styles.content}>
          {(mensagem || erro) && (
            <p className={erro ? styles.alertError : styles.alertSuccess} role={erro ? "alert" : "status"}>
              {erro || mensagem}
            </p>
          )}

          <form className={styles.card} onSubmit={salvarCurso}>
            <h2>{cursoEmEdicao ? `Editar “${cursoEmEdicao.titulo}”` : "Criar novo curso"}</h2>
            <div className={styles.formGrid}>
              <label className={styles.fieldWide}>
                Título do curso
                <input name="titulo" value={formCurso.titulo} onChange={alterarCampoCurso} maxLength="200" required
                  placeholder="Ex.: Conhecendo a Lei Maria da Penha" />
              </label>
              <label className={styles.fieldWide}>
                Descrição
                <textarea name="descricao" value={formCurso.descricao} onChange={alterarCampoCurso} maxLength="1000" rows="4" required
                  placeholder="O que o aluno vai aprender, para quem é o curso..." />
              </label>
              <label>
                Carga horária (horas)
                <input name="cargaHoraria" type="number" min="1" max="500" value={formCurso.cargaHoraria} onChange={alterarCampoCurso} />
              </label>
            </div>
            <div className={styles.actions}>
              <button type="submit" className={styles.primaryBtn} disabled={salvandoCurso}>
                {salvandoCurso ? "Salvando..." : cursoEmEdicao ? "Salvar e enviar para análise" : "Criar curso"}
              </button>
              {cursoEmEdicao && (
                <button type="button" className={styles.secondaryBtn} onClick={cancelarEdicaoCurso}>
                  Cancelar
                </button>
              )}
            </div>
          </form>

          <h2 className={styles.sectionTitle}>Meus cursos</h2>

          {carregando ? (
            <p className={styles.empty}>Carregando seus cursos...</p>
          ) : cursos.length === 0 ? (
            <div className={styles.empty}>
              <h3>Você ainda não criou nenhum curso</h3>
              <p>Use o formulário acima para criar o primeiro.</p>
            </div>
          ) : (
            cursos.map((curso) => {
              const situacao = situacaoCurso(curso);
              const aulasAtivas = curso.aulas.filter((aula) => aula.statusAprovacao !== "REPROVADO");
              return (
                <article className={styles.card} key={curso.id}>
                  <div className={styles.courseHeader}>
                    <div>
                      <span className={`${styles.status} ${styles[situacao.classe]}`}>{situacao.texto}</span>
                      <h3>{curso.titulo}</h3>
                      <p className={styles.muted}>
                        {curso.cargaHoraria} · {aulasAtivas.length} {aulasAtivas.length === 1 ? "aula" : "aulas"}
                      </p>
                    </div>
                    <div className={styles.actions}>
                      {curso.publicado && curso.statusAprovacao === "APROVADO" && (
                        <Link className={styles.secondaryBtn} to={`/cursos/${curso.id}`}>Ver no catálogo</Link>
                      )}
                      <button type="button" className={styles.secondaryBtn} onClick={() => iniciarEdicaoCurso(curso)}>
                        Editar
                      </button>
                      <button type="button" className={styles.primaryBtn} onClick={() => abrirFormAula(curso.id)}>
                        {cursoComFormAula === curso.id ? "Fechar" : "+ Aula"}
                      </button>
                    </div>
                  </div>

                  <p className={styles.description}>{curso.descricao}</p>

                  {curso.statusAprovacao === "REPROVADO" && (
                    <p className={styles.alertError}>
                      Este curso foi reprovado. Ajuste as informações em “Editar” para enviar de novo para análise.
                    </p>
                  )}

                  {cursoComFormAula === curso.id && (
                    <form className={styles.lessonForm} onSubmit={(event) => salvarAula(event, curso)}>
                      <h4>Nova aula</h4>
                      <div className={styles.formGrid}>
                        <label>
                          Título da aula
                          <input name="titulo" value={formAula.titulo} onChange={alterarCampoAula} maxLength="200" required />
                        </label>
                        <label>
                          Tipo
                          <select name="tipoMaterial" value={formAula.tipoMaterial} onChange={alterarCampoAula}>
                            {TIPOS_MATERIAL.map((tipo) => (
                              <option key={tipo.valor} value={tipo.valor}>{tipo.rotulo}</option>
                            ))}
                          </select>
                        </label>
                        <label className={styles.fieldWide}>
                          Link do conteúdo
                          <input name="linkExterno" type="url" value={formAula.linkExterno} onChange={alterarCampoAula} maxLength="500" required
                            placeholder="https://www.youtube.com/... ou link do Google Drive" />
                        </label>
                        <label className={styles.fieldWide}>
                          Descrição (opcional)
                          <textarea name="descricao" value={formAula.descricao} onChange={alterarCampoAula} maxLength="1000" rows="2" />
                        </label>
                      </div>
                      <button type="submit" className={styles.primaryBtn} disabled={salvandoAula}>
                        {salvandoAula ? "Enviando..." : "Adicionar aula"}
                      </button>
                    </form>
                  )}

                  {curso.aulas.length > 0 && (
                    <ul className={styles.lessons}>
                      {curso.aulas.map((aula, indice) => {
                        const situacaoDaAula = situacaoAula(aula);
                        const link = linkSeguro(aula.link);
                        return (
                          <li key={aula.id} className={aula.statusAprovacao === "REPROVADO" ? styles.lessonRemoved : ""}>
                            <div>
                              <strong>Aula {indice + 1}: {aula.titulo}</strong>
                              <span className={styles.muted}>
                                {TIPOS_MATERIAL.find((tipo) => tipo.valor === aula.tipo)?.rotulo || aula.tipo}
                                {link && <> · <a href={link} target="_blank" rel="noopener noreferrer">abrir link</a></>}
                              </span>
                            </div>
                            <div className={styles.lessonRight}>
                              <span className={`${styles.status} ${styles[situacaoDaAula.classe]}`}>{situacaoDaAula.texto}</span>
                              {aula.statusAprovacao !== "REPROVADO" && (
                                <button type="button" className={styles.linkBtn} onClick={() => excluirAula(aula)}>
                                  Remover
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </article>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PainelVoluntario;
