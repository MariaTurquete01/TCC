import { apiGet, apiPost, apiPut } from "./api";

export function rotuloStatusCurso(status) {
  const rotulos = {
    PENDENTE: "Pendente",
    APROVADO: "Aprovado",
    REPROVADO: "Reprovado",
  };
  return rotulos[status] || status || "Sem status";
}

export function carregarCursos() {
  return apiGet("/cursos/all");
}

export function carregarCursosPublicados() {
  return apiGet("/cursos/publicados");
}

export function carregarCurso(id) {
  return apiGet(`/cursos/${id}`);
}

export function carregarAulasDoCurso(cursoId) {
  return apiGet(`/materiais/curso/${cursoId}`);
}

export function carregarInscricoesDoUsuario(usuarioId) {
  return apiGet(`/inscricoes/usuario/${usuarioId}`);
}

export async function inscrever(usuarioId, cursoId) {
  return apiPost("/inscricoes/create", {
    usuarioId,
    cursoId,
    progressoPercentual: 0,
    ativo: true,
  });
}

export async function cancelarInscricao(inscricaoId) {
  return apiPut(`/inscricoes/${inscricaoId}/inativar`);
}

export async function atualizarProgresso(inscricaoId, progressoPercentual) {
  const inscricao = await apiGet(`/inscricoes/${inscricaoId}`);
  return apiPut(`/inscricoes/${inscricaoId}`, {
    ...inscricao,
    progressoPercentual,
  });
}
