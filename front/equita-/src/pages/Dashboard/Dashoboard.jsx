import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { obterSessao } from "../../services/sessao";
import { apiGet, apiPut } from "../../services/api";
import {
  atualizarInstituicao,
  carregarInstituicoes,
  criarInstituicao,
  inativarInstituicao,
} from "../../services/instituicoes";
import { rotuloStatusCurso } from "../../services/cursos";
import styles from "./dashboard.module.css";

// status possíveis (CK_Denuncias_Status do banco)
const STATUS_DENUNCIA = [
  { valor: "RECEBIDA", rotulo: "Recebida" },
  { valor: "EM_ANALISE", rotulo: "Em análise" },
  { valor: "ENCAMINHADA", rotulo: "Encaminhada" },
  { valor: "EM_ATENDIMENTO", rotulo: "Em atendimento" },
  { valor: "FINALIZADA", rotulo: "Finalizada" },
];
const STATUS_SOLICITACAO = {
  PENDENTE: "Pendente",
  APROVADA: "Aprovada",
  REPROVADA: "Reprovada",
};
// valores gravados em tipoDenuncia pelo formulário de /denuncias
const TIPOS_DENUNCIA = {
  "violencia-mulher": "Violência contra a mulher",
  "violencia-criancas": "Violência contra crianças",
  "violencia-idosos": "Violência contra idosos",
  racismo: "Racismo",
  bullying: "Bullying",
  assedio: "Assédio",
  discriminacao: "Discriminação",
  outro: "Outro",
};
const ABAS = ["Voluntários", "Conteúdos", "Instituições", "Denúncias", "Usuários", "Direitos"];

// dataOcorrencia vem como "AAAA-MM-DD" → formata sem conversão de fuso
function formatarDataOcorrencia(data) {
  if (!data) return "Não informada";
  const [ano, mes, dia] = String(data).slice(0, 10).split("-");
  return dia && mes && ano ? `${dia}/${mes}/${ano}` : String(data);
}
const FORMULARIO_INSTITUICAO_VAZIO = {
  categoriaInstituicaoId: "",
  nome: "",
  descricao: "",
  endereco: "",
  cidade: "",
  estado: "",
  cep: "",
  telefone: "",
  email: "",
  horarioFuncionamento: "",
  latitude: "",
  longitude: "",
  ativa: true,
};

// "ASSISTENCIA_SOCIAL" → "Assistencia social"
function nomeCategoria(nome) {
  if (!nome) return "Sem categoria";
  const texto = nome.replaceAll("_", " ").toLowerCase();
  return texto.charAt(0).toUpperCase() + texto.slice(1);
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

function Dashboard() {
  const sessao = obterSessao();
  const [abaAtiva, setAbaAtiva] = useState("Voluntários");
  const [solicitacoesVoluntario, setSolicitacoesVoluntario] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);
  const [categoriasInstituicao, setCategoriasInstituicao] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [direitos, setDireitos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [instituicaoEmEdicao, setInstituicaoEmEdicao] = useState(null);
  const [formularioInstituicao, setFormularioInstituicao] = useState(FORMULARIO_INSTITUICAO_VAZIO);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  async function recarregarSolicitacoes() {
    const solicitacoes = await apiGet("/solicitacoes-voluntario/all");

    // junta nome e e-mail do solicitante (tabela Usuario)
    const enriquecidas = await Promise.all(
      solicitacoes.map(async (solicitacao) => {
        try {
          const usuario = await apiGet(`/usuarios/${solicitacao.usuarioId}`);
          return { ...solicitacao, nome: usuario.nome, email: usuario.username };
        } catch {
          return { ...solicitacao, nome: `Usuário #${solicitacao.usuarioId}`, email: "" };
        }
      })
    );

    setSolicitacoesVoluntario(enriquecidas);
    return enriquecidas;
  }

  async function recarregarCursos() {
    const todosCursos = await apiGet("/cursos/all");

    // anexa as aulas (materiais) de cada proposta para a aba Conteúdos
    const comAulas = await Promise.all(
      todosCursos.map(async (curso) => {
        try {
          const materiais = await apiGet(`/materiais/curso/${curso.id}`);
          return {
            ...curso,
            aulas: materiais.map((material) => ({
              id: material.id,
              titulo: material.titulo,
              descricao: material.descricao,
              link: material.linkExterno || material.caminhoArquivo || "",
              statusAprovacao: material.statusAprovacao,
              publicado: Boolean(material.publicado),
              origem: material, // objeto cru da API, reenviado no PUT
            })),
          };
        } catch {
          return { ...curso, aulas: [] };
        }
      })
    );

    setCursos(comAulas);
    return comAulas;
  }

  async function recarregarTudo() {
    const [, , listaInstituicoes, listaCategorias, listaDenuncias, listaUsuarios, listaDireitos] = await Promise.all([
      recarregarSolicitacoes(),
      recarregarCursos(),
      carregarInstituicoes(),
      apiGet("/categorias-instituicao/all"),
      apiGet("/denuncias/all"),
      apiGet("/usuarios/all"),
      apiGet("/direitos/all"),
    ]);

    setInstituicoes(listaInstituicoes);
    setCategoriasInstituicao(listaCategorias || []);
    setDenuncias(listaDenuncias);
    setUsuarios(listaUsuarios);
    setDireitos(listaDireitos);
  }

  // tudo é carregado da API na abertura do painel
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro("");
      try {
        await recarregarTudo();
      } catch (excecao) {
        if (ativo) {
          setErro(excecao.message || "Não foi possível carregar os dados da API.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function atualizarStatusVoluntario(solicitacao, status) {
    setMensagem("");
    setErro("");
    try {
      await apiPut(`/solicitacoes-voluntario/${solicitacao.id}`, {
        usuarioId: solicitacao.usuarioId,
        status,
        justificativa: solicitacao.justificativa ?? null,
        dataAnalise: new Date().toISOString().slice(0, 19),
        administradorId: sessao?.nivelAcesso === "ADMIN" ? sessao.id : null,
        observacaoAdministrador: solicitacao.observacaoAdministrador ?? null,
      });

      await recarregarSolicitacoes();
      setMensagem(
        status === "APROVADA"
          ? "Solicitação aprovada — usuário promovido a voluntário."
          : "Solicitação reprovada."
      );
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar a solicitação.");
    }
  }

  async function atualizarStatus(curso, statusAprovacao) {
    setMensagem("");
    setErro("");
    try {
      await apiPut(`/cursos/${curso.id}`, {
        voluntarioId: curso.voluntarioId,
        titulo: curso.titulo,
        descricao: curso.descricao,
        cargaHoraria: curso.cargaHoraria,
        statusAprovacao,
      });

      if (statusAprovacao === "APROVADO") {
        // aprovar = publicar o curso e seus conteúdos no catálogo
        await apiPut(`/cursos/${curso.id}/ativar`);
        try {
          const materiais = await apiGet(`/materiais/curso/${curso.id}`);
          for (const material of materiais) {
            // material rejeitado individualmente (ou aula removida pelo voluntário) fica fora
            if (material.statusAprovacao === "REPROVADO") continue;
            if (material.statusAprovacao !== "APROVADO") {
              await apiPut(`/materiais/${material.id}`, {
                ...material,
                statusAprovacao: "APROVADO",
              });
            }
            if (!material.publicado) {
              await apiPut(`/materiais/${material.id}/ativar`);
            }
          }
        } catch {
          // curso sem materiais continua sendo aprovado normalmente
        }
        setMensagem(`Curso “${curso.titulo}” aprovado e publicado no catálogo.`);
      } else {
        // reprovar = retirar do catálogo (inativação lógica)
        await apiPut(`/cursos/${curso.id}/inativar`);
        setMensagem(`Curso “${curso.titulo}” reprovado e fora do catálogo.`);
      }

      await recarregarCursos();
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar o status do curso.");
    }
  }

  // aprova ou rejeita uma aula (material) sem mexer no restante do curso
  async function atualizarStatusMaterial(curso, aula, statusAprovacao) {
    setMensagem("");
    setErro("");
    try {
      // REPROVADO já tira o material do catálogo (publicado = 0) no back
      await apiPut(`/materiais/${aula.id}`, { ...aula.origem, statusAprovacao });

      // aprovado só aparece no catálogo se o curso também estiver aprovado e publicado;
      // senão é publicado quando o curso for aprovado
      if (statusAprovacao === "APROVADO" && curso.statusAprovacao === "APROVADO" && curso.publicado) {
        await apiPut(`/materiais/${aula.id}/ativar`);
      }

      await recarregarCursos();
      setMensagem(`Aula “${aula.titulo}” ${statusAprovacao === "APROVADO" ? "aprovada" : "rejeitada"}.`);
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar a aula.");
    }
  }

  async function atualizarStatusDenuncia(denuncia, status) {
    setMensagem("");
    setErro("");
    try {
      // o PUT exige o corpo completo da denúncia (o service não ignora campos)
      await apiPut(`/denuncias/${denuncia.id}`, {
        usuarioId: denuncia.usuarioId,
        instituicaoResponsavelId: denuncia.instituicaoResponsavelId,
        tipoDenuncia: denuncia.tipoDenuncia,
        descricao: denuncia.descricao,
        dataOcorrencia: denuncia.dataOcorrencia,
        localOcorrencia: denuncia.localOcorrencia,
        cidadeOcorrencia: denuncia.cidadeOcorrencia,
        estadoOcorrencia: denuncia.estadoOcorrencia,
        denunciaAnonima: denuncia.denunciaAnonima,
        status,
      });

      const listaAtualizada = await apiGet("/denuncias/all");
      setDenuncias(listaAtualizada);
      setMensagem(`Status do protocolo ${denuncia.protocolo} atualizado.`);
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar o status da denúncia.");
    }
  }

  function atualizarFormularioInstituicao(event) {
    const { name, value, type, checked } = event.target;
    setFormularioInstituicao((formularioAtual) => ({
      ...formularioAtual,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function salvarFormularioInstituicao(event) {
    event.preventDefault();

    const possuiLatitude = formularioInstituicao.latitude !== "";
    const possuiLongitude = formularioInstituicao.longitude !== "";
    if (possuiLatitude !== possuiLongitude) {
      setErro("Preencha latitude e longitude juntas ou deixe as duas vazias.");
      setMensagem("");
      return;
    }

    const dados = {
      ...formularioInstituicao,
      nome: formularioInstituicao.nome.trim(),
      endereco: formularioInstituicao.endereco.trim(),
      cidade: formularioInstituicao.cidade.trim(),
      estado: formularioInstituicao.estado.trim().toUpperCase(),
      // a API espera o id da categoria (tabela CategoriasInstituicao)
      categoriaInstituicaoId: Number(formularioInstituicao.categoriaInstituicaoId),
      // campo vazio vira null (o banco aceita coordenadas nulas)
      latitude: possuiLatitude ? Number(formularioInstituicao.latitude) : null,
      longitude: possuiLongitude ? Number(formularioInstituicao.longitude) : null,
    };

    setErro("");
    setMensagem("");
    try {
      if (instituicaoEmEdicao) {
        await atualizarInstituicao(instituicaoEmEdicao, dados);
        setMensagem("Instituição atualizada na plataforma.");
      } else {
        await criarInstituicao(dados);
        setMensagem("Instituição cadastrada na plataforma.");
      }

      setInstituicoes(await carregarInstituicoes());
      setInstituicaoEmEdicao(null);
      setFormularioInstituicao(FORMULARIO_INSTITUICAO_VAZIO);
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível salvar a instituição.");
    }
  }

  function editarInstituicao(instituicao) {
    setInstituicaoEmEdicao(instituicao.id);
    setFormularioInstituicao({
      ...FORMULARIO_INSTITUICAO_VAZIO,
      ...instituicao,
      categoriaInstituicaoId: instituicao.categoriaInstituicaoId ?? "",
      descricao: instituicao.descricao ?? "",
      cep: instituicao.cep ?? "",
      telefone: instituicao.telefone ?? "",
      email: instituicao.email ?? "",
      horarioFuncionamento: instituicao.horarioFuncionamento ?? "",
      latitude: instituicao.latitude ?? "",
      longitude: instituicao.longitude ?? "",
    });
    setMensagem("");
    setErro("");
  }

  function cancelarEdicaoInstituicao() {
    setInstituicaoEmEdicao(null);
    setFormularioInstituicao(FORMULARIO_INSTITUICAO_VAZIO);
    setErro("");
    setMensagem("");
  }

  async function removerInstituicao(instituicao) {
    if (!window.confirm(`Inativar a instituição “${instituicao.nome}”? Ela deixará de aparecer no localizador público.`)) return;

    try {
      // não existe delete na API → inativação lógica (ativa = 0)
      await inativarInstituicao(instituicao.id);
      setInstituicoes(await carregarInstituicoes());
      if (instituicaoEmEdicao === instituicao.id) cancelarEdicaoInstituicao();
      setMensagem("Instituição inativada — fora do localizador público.");
      setErro("");
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível inativar a instituição.");
      setMensagem("");
    }
  }

  async function alterarStatusUsuario(usuario, ativar) {
    try {
      await apiPut(`/usuarios/${usuario.id}/${ativar ? "ativar" : "inativar"}`);
      setUsuarios(await apiGet("/usuarios/all"));
      setMensagem(`Usuário ${ativar ? "ativado" : "inativado"} com sucesso.`);
      setErro("");
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar o usuário.");
      setMensagem("");
    }
  }

  async function alterarNivelUsuario(usuario, nivelAcesso) {
    try {
      await apiPut(`/usuarios/${usuario.id}/nivel-acesso/${nivelAcesso}`);
      setUsuarios(await apiGet("/usuarios/all"));
      setMensagem(`Nível de acesso de ${usuario.nome} atualizado.`);
      setErro("");
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar o nível de acesso.");
      setMensagem("");
    }
  }

  async function editarDireito(direito) {
    const titulo = window.prompt("Título do direito", direito.titulo)?.trim();
    if (!titulo) return;
    const conteudo = window.prompt("Conteúdo do Guia de Direitos", direito.conteudo)?.trim();
    if (!conteudo) return;
    const referenciaOrgao = window.prompt("Referência ou órgão responsável", direito.referenciaOrgao || "")?.trim() || null;

    try {
      await apiPut(`/direitos/${direito.id}`, {
        categoriaDireitoId: direito.categoriaDireitoId,
        titulo,
        conteudo,
        referenciaOrgao,
        ativo: direito.ativo,
      });
      setDireitos(await apiGet("/direitos/all"));
      setMensagem(`Direito “${titulo}” atualizado.`);
      setErro("");
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível atualizar o direito.");
      setMensagem("");
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles["dashboard-page"]}>
        <header className={styles["admin-header"]}>
          <span className={styles["dashboard-badge"]}>Administração</span>
          <h1>Painel do Administrador</h1>
          <p>Acompanhe solicitações e propostas pendentes de análise.</p>
        </header>

        <section className={styles["admin-content"]}>
          <div className={styles["admin-tabs"]} role="tablist" aria-label="Seções administrativas">
            {ABAS.map((aba) => (
              <button
                type="button"
                role="tab"
                id={`admin-tab-${aba.toLowerCase()}`}
                aria-selected={abaAtiva === aba}
                aria-controls="admin-panel"
                className={abaAtiva === aba ? styles["admin-tab-active"] : ""}
                key={aba}
                onClick={() => {
                  setAbaAtiva(aba);
                  setMensagem("");
                  setErro("");
                }}
              >
                {aba}
              </button>
            ))}
          </div>

          <section
            className={styles["admin-panel"]}
            id="admin-panel"
            role="tabpanel"
            aria-labelledby={`admin-tab-${abaAtiva.toLowerCase()}`}
          >
            {mensagem && <p className={styles["admin-feedback"]} role="status">{mensagem}</p>}
            {erro && <p className={styles["admin-error"]} role="alert">{erro}</p>}
            {carregando && <p role="status">Carregando dados da API...</p>}

            {abaAtiva === "Voluntários" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Solicitações de voluntariado</h2>
                    <p>Analise a apresentação, a proposta e os documentos informados.</p>
                  </div>
                  <span>{solicitacoesVoluntario.filter((item) => item.status === "PENDENTE").length} pendentes</span>
                </div>
                {solicitacoesVoluntario.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma solicitação de voluntariado</h3>
                    <p>As solicitações preenchidas no cadastro desta sessão aparecerão aqui.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {solicitacoesVoluntario.map((solicitacao) => (
                      <article className={styles["request-item"]} key={solicitacao.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>Status: {STATUS_SOLICITACAO[solicitacao.status] || solicitacao.status}</span>
                          <h3>{solicitacao.nome}</h3>
                          <p><strong>E-mail:</strong> {solicitacao.email}</p>
                          <p><strong>Solicitação:</strong></p>
                          {(solicitacao.justificativa || "Não informada").split("\n").map((linha, indice) => (
                            <p key={`${solicitacao.id}-linha-${indice}`}>{linha}</p>
                          ))}
                          <small>Solicitada em {new Date(solicitacao.dataSolicitacao).toLocaleString("pt-BR")}</small>
                        </div>
                        {solicitacao.status === "PENDENTE" && (
                          <div className={styles["request-actions"]}>
                            <button
                              type="button"
                              className={styles["approve-button"]}
                              onClick={() => atualizarStatusVoluntario(solicitacao, "APROVADA")}
                            >
                              Aprovar
                            </button>
                            <button
                              type="button"
                              className={styles["reject-button"]}
                              onClick={() => atualizarStatusVoluntario(solicitacao, "REPROVADA")}
                            >
                              Reprovar
                            </button>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>
                  Documentos são registrados somente pelo nome na solicitação; os arquivos não são enviados nem armazenados.
                </p>
              </>
            ) : abaAtiva === "Conteúdos" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Propostas de cursos</h2>
                    <p>As propostas aprovadas ficam disponíveis no catálogo público.</p>
                  </div>
                  <span>{cursos.length} propostas</span>
                </div>
                {cursos.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma proposta de conteúdo</h3>
                    <p>Propostas enviadas pelos voluntários aparecerão aqui para análise.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {cursos.map((curso) => (
                      <article className={styles["request-item"]} key={curso.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{rotuloStatusCurso(curso.statusAprovacao)}{!curso.publicado ? " · fora do catálogo" : ""}</span>
                          <h3>{curso.titulo}</h3>
                          <p>{curso.descricao}</p>
                          <small>{curso.cargaHoraria ? `${curso.cargaHoraria} horas` : "Carga horária não informada"} · Status: {rotuloStatusCurso(curso.statusAprovacao)}</small>
                          {Array.isArray(curso.aulas) && curso.aulas.length > 0 && (
                            <ol className={styles["lesson-review-list"]}>
                              {curso.aulas.map((aula, indice) => {
                                const linkMaterial = obterLinkHttpSeguro(aula.link);

                                return (
                                  <li key={aula.id || `${curso.id}-aula-${indice}`}>
                                    <strong>{aula.titulo || `Aula ${indice + 1}`}</strong>
                                    {" "}
                                    <small>
                                      · {rotuloStatusCurso(aula.statusAprovacao)}
                                      {aula.statusAprovacao === "APROVADO" && !aula.publicado ? " · fora do catálogo" : ""}
                                    </small>
                                    {aula.descricao && <p>{aula.descricao}</p>}
                                    {linkMaterial && (
                                      <a href={linkMaterial} target="_blank" rel="noopener noreferrer">
                                        Abrir material da aula
                                      </a>
                                    )}
                                    <div className={styles["request-actions"]}>
                                      <button
                                        type="button"
                                        className={styles["approve-button"]}
                                        disabled={aula.statusAprovacao === "APROVADO"}
                                        onClick={() => atualizarStatusMaterial(curso, aula, "APROVADO")}
                                      >
                                        Aprovar aula
                                      </button>
                                      <button
                                        type="button"
                                        className={styles["reject-button"]}
                                        disabled={aula.statusAprovacao === "REPROVADO"}
                                        onClick={() => atualizarStatusMaterial(curso, aula, "REPROVADO")}
                                      >
                                        Rejeitar aula
                                      </button>
                                    </div>
                                  </li>
                                );
                              })}
                            </ol>
                          )}
                        </div>
                        <div className={styles["request-actions"]}>
                          <button
                            type="button"
                            className={styles["approve-button"]}
                            disabled={curso.statusAprovacao === "APROVADO"}
                            onClick={() => atualizarStatus(curso, "APROVADO")}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            className={styles["reject-button"]}
                            disabled={curso.statusAprovacao === "REPROVADO"}
                            onClick={() => atualizarStatus(curso, "REPROVADO")}
                          >
                            Rejeitar
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : abaAtiva === "Instituições" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Gerenciar instituições</h2>
                    <p>Cadastre e mantenha os serviços de apoio da plataforma.</p>
                  </div>
                  <span>{instituicoes.length} instituições</span>
                </div>

                <form className={styles["institution-form"]} onSubmit={salvarFormularioInstituicao}>
                  <h3>{instituicaoEmEdicao ? "Editar instituição" : "Nova instituição"}</h3>
                  <div className={styles["institution-form-grid"]}>
                    <label className={styles["institution-field"]} htmlFor="instituicao-categoria">
                      Categoria
                      <select id="instituicao-categoria" name="categoriaInstituicaoId" value={formularioInstituicao.categoriaInstituicaoId} onChange={atualizarFormularioInstituicao} required>
                        <option value="">Selecione uma categoria</option>
                        {categoriasInstituicao
                          .filter((categoria) => categoria.ativo !== false)
                          .map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                              {nomeCategoria(categoria.nome)}
                            </option>
                          ))}
                      </select>
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-nome">
                      Nome
                      <input id="instituicao-nome" name="nome" value={formularioInstituicao.nome} onChange={atualizarFormularioInstituicao} maxLength="150" required />
                    </label>
                    <label className={`${styles["institution-field"]} ${styles["institution-field-wide"]}`} htmlFor="instituicao-descricao">
                      Descrição
                      <textarea id="instituicao-descricao" name="descricao" value={formularioInstituicao.descricao} onChange={atualizarFormularioInstituicao} maxLength="500" rows="3" />
                    </label>
                    <label className={`${styles["institution-field"]} ${styles["institution-field-wide"]}`} htmlFor="instituicao-endereco">
                      Endereço
                      <input id="instituicao-endereco" name="endereco" value={formularioInstituicao.endereco} onChange={atualizarFormularioInstituicao} maxLength="250" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-cidade">
                      Cidade
                      <input id="instituicao-cidade" name="cidade" value={formularioInstituicao.cidade} onChange={atualizarFormularioInstituicao} maxLength="100" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-estado">
                      Estado (UF)
                      <input id="instituicao-estado" name="estado" value={formularioInstituicao.estado} onChange={atualizarFormularioInstituicao} maxLength="2" minLength="2" pattern="[A-Za-z]{2}" required />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-cep">
                      CEP
                      <input id="instituicao-cep" name="cep" value={formularioInstituicao.cep} onChange={atualizarFormularioInstituicao} maxLength="10" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-telefone">
                      Telefone
                      <input id="instituicao-telefone" name="telefone" type="tel" value={formularioInstituicao.telefone} onChange={atualizarFormularioInstituicao} maxLength="30" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-email">
                      E-mail
                      <input id="instituicao-email" name="email" type="email" value={formularioInstituicao.email} onChange={atualizarFormularioInstituicao} maxLength="150" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-horario">
                      Horário de funcionamento
                      <input id="instituicao-horario" name="horarioFuncionamento" value={formularioInstituicao.horarioFuncionamento} onChange={atualizarFormularioInstituicao} maxLength="200" />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-latitude">
                      Latitude
                      <input id="instituicao-latitude" name="latitude" type="number" min="-90" max="90" step="any" value={formularioInstituicao.latitude} onChange={atualizarFormularioInstituicao} />
                    </label>
                    <label className={styles["institution-field"]} htmlFor="instituicao-longitude">
                      Longitude
                      <input id="instituicao-longitude" name="longitude" type="number" min="-180" max="180" step="any" value={formularioInstituicao.longitude} onChange={atualizarFormularioInstituicao} />
                    </label>
                    <label className={styles["institution-active"]} htmlFor="instituicao-ativa">
                      <input id="instituicao-ativa" name="ativa" type="checkbox" checked={formularioInstituicao.ativa} onChange={atualizarFormularioInstituicao} />
                      Instituição ativa
                    </label>
                  </div>
                  <div className={styles["institution-form-actions"]}>
                    <button type="submit" className={styles["approve-button"]}>
                      {instituicaoEmEdicao ? "Salvar alterações" : "Cadastrar instituição"}
                    </button>
                    {instituicaoEmEdicao && (
                      <button type="button" className={styles["cancel-button"]} onClick={cancelarEdicaoInstituicao}>
                        Cancelar edição
                      </button>
                    )}
                  </div>
                </form>

                {instituicoes.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma instituição cadastrada</h3>
                    <p>As instituições adicionadas aparecerão nesta lista.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {instituicoes.map((instituicao) => (
                      <article className={styles["request-item"]} key={instituicao.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{nomeCategoria(categoriasInstituicao.find((categoria) => categoria.id === instituicao.categoriaInstituicaoId)?.nome)}</span>
                          <h3>{instituicao.nome}</h3>
                          <p>{instituicao.endereco}, {instituicao.cidade} - {instituicao.estado}</p>
                          <small>{instituicao.ativa ? "Ativa" : "Inativa"}{instituicao.telefone ? ` · ${instituicao.telefone}` : ""}</small>
                        </div>
                        <div className={styles["request-actions"]}>
                          <button type="button" onClick={() => editarInstituicao(instituicao)}>Editar</button>
                          <button type="button" className={styles["reject-button"]} onClick={() => removerInstituicao(instituicao)}>Excluir</button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>Instituições cadastradas via API e disponíveis no localizador público.</p>
              </>
            ) : abaAtiva === "Denúncias" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Andamento de denúncias</h2>
                    <p>Veja os dados de cada denúncia e atualize o status exibido na consulta por protocolo.</p>
                  </div>
                  <span>{denuncias.length} denúncias</span>
                </div>
                {denuncias.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhuma denúncia registrada</h3>
                    <p>As denúncias enviadas pela plataforma aparecerão aqui.</p>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {denuncias.map((denuncia) => (
                      <article className={styles["request-item"]} key={denuncia.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>
                            {TIPOS_DENUNCIA[denuncia.tipoDenuncia] || denuncia.tipoDenuncia || "Tipo não informado"}
                            {denuncia.denunciaAnonima ? " · Anônima" : " · Identificada"}
                          </span>
                          <h3>{denuncia.protocolo}</h3>
                          {(denuncia.descricao || "Sem descrição").split("\n").map((linha, indice) => (
                            <p key={`${denuncia.id}-linha-${indice}`}>{linha}</p>
                          ))}
                          <p>
                            <strong>Local:</strong>{" "}
                            {[denuncia.localOcorrencia, denuncia.cidadeOcorrencia, denuncia.estadoOcorrencia].filter(Boolean).join(" - ") || "Não informado"}
                          </p>
                          <p><strong>Data da ocorrência:</strong> {formatarDataOcorrencia(denuncia.dataOcorrencia)}</p>
                          <small>
                            Registrada em {denuncia.dataRegistro ? new Date(denuncia.dataRegistro).toLocaleString("pt-BR") : "data não informada"}
                          </small>
                        </div>
                        <label className={styles["report-status-field"]} htmlFor={`status-${denuncia.protocolo}`}>
                          Status
                          <select
                            id={`status-${denuncia.protocolo}`}
                            value={STATUS_DENUNCIA.find((s) => s.valor === denuncia.status)?.valor ?? STATUS_DENUNCIA[0].valor}
                            onChange={(event) => atualizarStatusDenuncia(denuncia, event.target.value)}
                          >
                            {STATUS_DENUNCIA.map((status) => (
                              <option key={status.valor} value={status.valor}>
                                {status.rotulo}
                              </option>
                            ))}
                          </select>
                        </label>
                      </article>
                    ))}
                  </div>
                )}
                <p className={styles["storage-note"]}>Denúncias registradas via API e atualizadas no painel de administração.</p>
              </>
            ) : abaAtiva === "Usuários" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Gerenciamento de usuários</h2>
                    <p>Ative, inative e altere o perfil de acesso dos usuários.</p>
                  </div>
                  <span>{usuarios.length} usuários</span>
                </div>
                {usuarios.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhum usuário encontrado</h3>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {usuarios.map((usuario) => (
                      <article className={styles["request-item"]} key={usuario.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{usuario.statusUsuario}</span>
                          <h3>{usuario.nome}</h3>
                          <p>{usuario.username}</p>
                        </div>
                        <div className={styles["request-actions"]}>
                          <select
                            aria-label={`Nível de acesso de ${usuario.nome}`}
                            value={usuario.nivelAcesso || "USER"}
                            onChange={(event) => alterarNivelUsuario(usuario, event.target.value)}
                          >
                            <option value="USER">Usuário</option>
                            <option value="VOLUNTARIO">Voluntário</option>
                            <option value="ADMIN">Administrador</option>
                          </select>
                          <button
                            type="button"
                            className={usuario.statusUsuario === "ATIVO" ? styles["reject-button"] : styles["approve-button"]}
                            onClick={() => alterarStatusUsuario(usuario, usuario.statusUsuario !== "ATIVO")}
                          >
                            {usuario.statusUsuario === "ATIVO" ? "Inativar" : "Ativar"}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : abaAtiva === "Direitos" ? (
              <>
                <div className={styles["panel-heading"]}>
                  <div>
                    <h2>Guia de Direitos</h2>
                    <p>Edite os conteúdos publicados na plataforma.</p>
                  </div>
                  <span>{direitos.length} conteúdos</span>
                </div>
                {direitos.length === 0 ? (
                  <div className={styles["admin-empty"]}>
                    <h3>Nenhum direito cadastrado</h3>
                  </div>
                ) : (
                  <div className={styles["request-list"]}>
                    {direitos.map((direito) => (
                      <article className={styles["request-item"]} key={direito.id}>
                        <div className={styles["request-details"]}>
                          <span className={styles["request-category"]}>{direito.ativo ? "Publicado" : "Inativo"}</span>
                          <h3>{direito.titulo}</h3>
                          <p>{direito.conteudo}</p>
                          {direito.referenciaOrgao && <small>Referência: {direito.referenciaOrgao}</small>}
                        </div>
                        <div className={styles["request-actions"]}>
                          <button type="button" onClick={() => editarDireito(direito)}>Editar</button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={styles["admin-empty"]}>
                <h2>{abaAtiva}</h2>
                <p>Nenhuma solicitação cadastrada nesta seção.</p>
              </div>
            )}
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Dashboard;

 