const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function requisitar(caminho, opcoes = {}) {
  const resposta = await fetch(`${API_BASE_URL}${caminho}`, {
    ...opcoes,
    headers: {
      "Content-Type": "application/json",
      ...(opcoes.headers || {}),
    },
  });

  const texto = await resposta.text();
  let dados = null;
  if (texto) {
    try {
      dados = JSON.parse(texto);
    } catch {
      dados = texto;
    }
  }

  if (!resposta.ok) {
    throw new Error(dados?.mensagem || dados?.message || "Não foi possível concluir a operação.");
  }
  return dados;
}

export function apiGet(caminho) {
  return requisitar(caminho);
}

export function apiPost(caminho, corpo) {
  return requisitar(caminho, { method: "POST", body: JSON.stringify(corpo ?? {}) });
}

export function apiPut(caminho, corpo) {
  return requisitar(caminho, { method: "PUT", body: JSON.stringify(corpo ?? {}) });
}
