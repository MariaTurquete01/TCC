import { apiGet, apiPost, apiPut } from "./api";

// O banco guarda só o id da categoria (categoriaInstituicaoId).
// Aqui buscamos também as categorias e acrescentamos o nome dela em "categoria"
// (ex.: "DELEGACIA"), que é o que a página Recursos usa para filtrar e exibir.
export async function carregarInstituicoes() {
  const [instituicoes, categorias] = await Promise.all([
    apiGet("/instituicoes/all"),
    apiGet("/categorias-instituicao/all"),
  ]);

  return (instituicoes || []).map((instituicao) => ({
    ...instituicao,
    categoria:
      (categorias || []).find((categoria) => categoria.id === instituicao.categoriaInstituicaoId)?.nome || null,
  }));
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
