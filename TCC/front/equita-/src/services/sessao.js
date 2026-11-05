import { apiPost } from "./api";

const CHAVE_SESSAO = "equita_sessao";

export function obterSessao() {
  try {
    const valor = localStorage.getItem(CHAVE_SESSAO);
    return valor ? JSON.parse(valor) : null;
  } catch {
    return null;
  }
}

export function salvarSessao(usuario) {
  localStorage.setItem(CHAVE_SESSAO, JSON.stringify(usuario));
  return usuario;
}

export function encerrarSessao() {
  localStorage.removeItem(CHAVE_SESSAO);
}

export async function entrar(username, password) {
  const usuario = await apiPost("/usuarios/login", { username, password });
  return salvarSessao(usuario);
}

export function painelDoNivel(nivelAcesso) {
  if (nivelAcesso === "ADMIN") return "/admin";
  if (nivelAcesso === "VOLUNTARIO") return "/voluntario/meus-cursos";
  return "/meus-cursos";
}

export function rotuloNivel(nivelAcesso) {
  if (nivelAcesso === "ADMIN") return "Administrador";
  if (nivelAcesso === "VOLUNTARIO") return "Voluntário";
  return "Usuário";
}
