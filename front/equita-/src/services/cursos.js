import { apiGet, apiPost, apiPut } from "./api";

// ============================================================
// Conversões: a API devolve os campos do banco; as telas de
// curso usam nomes mais simples (aulas, professor, progresso...).
// ============================================================

export function rotuloStatusCurso(status) {
  const rotulos = {
    PENDENTE: "Pendente",
    APROVADO: "Aprovado",
    REPROVADO: "Reprovado",
  };
  return rotulos[status] || status || "Sem status";
}

export const TIPOS_MATERIAL = [
  { valor: "VIDEO", rotulo: "Vídeo" },
  { valor: "PDF", rotulo: "PDF" },
  { valor: "SLIDES", rotulo: "Slides" },
  { valor: "LINK", rotulo: "Link / site" },
];

function formatarCargaHoraria(horas) {
  const numero = Number(horas);
  if (!numero) return "Não informada";
  return numero === 1 ? "1 hora" : `${numero} horas`;
}

// Material (tabela Materiais) → aula usada nas telas
function paraAula(material) {
  return {
    id: material.id,
    titulo: material.titulo,
    descricao: material.descricao,
    tipo: material.tipoMaterial,
    link: material.linkExterno || material.caminhoArquivo || "",
    statusAprovacao: material.statusAprovacao,
    publicado: Boolean(material.publicado),
    origem: material,
  };
}

function aulaVisivelAoAluno(material) {
  return Boolean(material.publicado) && material.statusAprovacao === "APROVADO";
}

// Curso (tabela Cursos) → curso usado nas telas
function paraCurso(curso, aulas = [], professor = "") {
  return {
    id: curso.id,
    titulo: curso.titulo,
    descricao: curso.descricao,
    // o banco não tem categoria/nível de curso: valores padrão
    categoria: "Outros",
    nivel: "Livre",
    cargaHorariaHoras: curso.cargaHoraria,
    cargaHoraria: formatarCargaHoraria(curso.cargaHoraria),
    professor: professor || "Voluntário Equitá",
    certificado: false,
    aulas,
    statusAprovacao: curso.statusAprovacao,
    publicado: Boolean(curso.publicado),
    origem: curso,
  };
}

// Inscrição (tabela Inscricoes) → inscrição usada nas telas
function paraInscricao(inscricao) {
  return {
    id: inscricao.id,
    usuarioId: inscricao.usuarioId,
    cursoId: inscricao.cursoId,
    progresso: Number(inscricao.percentualProgresso) || 0,
    concluido: Boolean(inscricao.concluido),
    origem: inscricao,
  };
}

// busca o nome de cada voluntário só uma vez
async function carregarNomesProfessores(cursos) {
  const ids = [...new Set(cursos.map((curso) => curso.voluntarioId).filter(Boolean))];
  const nomes = {};
  await Promise.all(
    ids.map(async (id) => {
      try {
        const usuario = await apiGet(`/usuarios/${id}`);
        nomes[id] = usuario?.nome || "";
      } catch {
        nomes[id] = "";
      }
    })
  );
  return nomes;
}

async function carregarMateriais(cursoId) {
  try {
    return (await apiGet(`/materiais/curso/${cursoId}`)) || [];
  } catch {
    return [];
  }
}

// ============================================================
// Aluno: catálogo, detalhe, inscrições e progresso
// ============================================================

export async function carregarCursosPublicados() {
  const cursos = (await apiGet("/cursos/publicados")) || [];
  const nomes = await carregarNomesProfessores(cursos);

  return Promise.all(
    cursos.map(async (curso) => {
      const materiais = await carregarMateriais(curso.id);
      const aulas = materiais.filter(aulaVisivelAoAluno).map(paraAula);
      return paraCurso(curso, aulas, nomes[curso.voluntarioId]);
    })
  );
}

export async function carregarCurso(id) {
  const curso = await apiGet(`/cursos/${id}`);
  const [nomes, materiais] = await Promise.all([
    carregarNomesProfessores([curso]),
    carregarMateriais(curso.id),
  ]);
  const aulas = materiais.filter(aulaVisivelAoAluno).map(paraAula);
  return paraCurso(curso, aulas, nomes[curso.voluntarioId]);
}

// só as aulas aprovadas e publicadas (o que o aluno pode ver)
export async function carregarAulasDoCurso(cursoId) {
  const materiais = await carregarMateriais(cursoId);
  return materiais.filter(aulaVisivelAoAluno).map(paraAula);
}

// só inscrições ativas (cancelar = inativar)
export async function carregarInscricoesDoUsuario(usuarioId) {
  const inscricoes = (await apiGet(`/inscricoes/usuario/${usuarioId}`)) || [];
  return inscricoes.filter((inscricao) => inscricao.ativo !== false).map(paraInscricao);
}

export async function inscrever(usuarioId, cursoId) {
  return apiPost("/inscricoes/create", {
    usuarioId,
    cursoId,
    percentualProgresso: 0,
    concluido: false,
    ativo: true,
  });
}

export async function cancelarInscricao(inscricaoId) {
  return apiPut(`/inscricoes/${inscricaoId}/inativar`);
}

// aceita a inscrição (objeto) ou só o id
export async function atualizarProgresso(inscricaoOuId, percentual) {
  const id = typeof inscricaoOuId === "object" ? inscricaoOuId.id : inscricaoOuId;
  const atual = await apiGet(`/inscricoes/${id}`);
  const progresso = Math.max(0, Math.min(100, Math.round(Number(percentual) || 0)));

  return apiPut(`/inscricoes/${id}`, {
    ...atual,
    percentualProgresso: progresso,
    // o back exige: concluído somente com 100%
    concluido: progresso === 100,
    dataConclusao: progresso === 100 ? atual.dataConclusao : null,
  });
}

// ============================================================
// Voluntário: criar cursos e aulas (vão para aprovação do admin)
// ============================================================

// todos os cursos do voluntário, com todas as aulas (inclusive pendentes)
export async function carregarCursosDoVoluntario(voluntarioId) {
  const cursos = (await apiGet(`/cursos/voluntario/${voluntarioId}`)) || [];
  const comAulas = await Promise.all(
    cursos.map(async (curso) => {
      const materiais = await carregarMateriais(curso.id);
      return paraCurso(curso, materiais.map(paraAula));
    })
  );
  // mais recentes primeiro
  return comAulas.sort((a, b) => b.id - a.id);
}

export function criarCurso(voluntarioId, { titulo, descricao, cargaHoraria }) {
  return apiPost("/cursos/create", {
    voluntarioId,
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    cargaHoraria: cargaHoraria ? Number(cargaHoraria) : null,
  });
}

// editar volta o curso para análise do administrador (sai do catálogo até ser aprovado de novo)
export function editarCurso(curso, { titulo, descricao, cargaHoraria }) {
  return apiPut(`/cursos/${curso.id}`, {
    voluntarioId: curso.origem.voluntarioId,
    titulo: titulo.trim(),
    descricao: descricao.trim(),
    cargaHoraria: cargaHoraria ? Number(cargaHoraria) : null,
    statusAprovacao: "PENDENTE",
  });
}

export function criarAula(voluntarioId, cursoId, { titulo, descricao, tipoMaterial, linkExterno }) {
  return apiPost("/materiais/create", {
    cursoId,
    voluntarioId,
    titulo: titulo.trim(),
    descricao: descricao.trim() || null,
    tipoMaterial,
    linkExterno: linkExterno.trim() || null,
  });
}

// remover = marcar como reprovada, o que já tira a aula do catálogo
// (o admin também pula aulas REPROVADO ao aprovar o curso)
export function removerAula(aula) {
  return apiPut(`/materiais/${aula.id}`, { ...aula.origem, statusAprovacao: "REPROVADO" });
}
