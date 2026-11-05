import { apiGet, apiPost, apiPut } from "./api";

export function carregarInstituicoes() {
  return apiGet("/instituicoes/all");
}

export function criarInstituicao(instituicao) {
  return apiPost("/instituicoes/create", instituicao);
}

export function atualizarInstituicao(id, instituicao) {
  return apiPut(`/instituicoes/${id}`, instituicao);
}

export function inativarInstituicao(id) {
  return apiPut(`/instituicoes/${id}/inativar`);
}
