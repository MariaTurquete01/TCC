const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
 
async function requisitar(caminho, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_BASE_URL}${caminho}`, {
      ...opcoes,
      headers: {
        "Content-Type": "application/json",
        ...(opcoes.headers || {}),
      },
    });
  } catch {
    // "Failed to fetch" = a requisicao nem chegou a ter resposta:
    // API desligada, porta errada ou CORS bloqueado.
    throw new Error(
      `Não foi possível conectar à API em ${API_BASE_URL}. Verifique se o back-end está rodando.`
    );
  }
 
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
