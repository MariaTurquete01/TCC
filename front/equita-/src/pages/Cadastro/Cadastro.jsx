import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";
import { useState } from "react";

import { apiPost } from "../../services/api";

import styles from "./cadastro.module.css";

function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [perfil, setPerfil] = useState("");
  const [documentos, setDocumentos] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    // guarda o form antes do await: o React zera event.currentTarget depois do handler
    const formulario = event.currentTarget;
    const dados = new FormData(formulario);

    setErro("");
    setMensagem("");

    if (dados.get("senha") !== dados.get("confirmacao")) {
      setErro("As senhas informadas não coincidem.");
      return;
    }

    const nome = String(dados.get("nome") || "").trim();
    const email = String(dados.get("email") || "").trim();
    const senha = String(dados.get("senha") || "");
    const ehVoluntario = dados.get("perfil") === "voluntario";

    setCarregando(true);
    try {
      // POST /usuarios/create — e-mail vira username (coluna username da tabela Usuario)
      const usuario = await apiPost("/usuarios/create", {
        nome,
        username: email,
        password: senha,
        nivelAcesso: "USER",
      });

      if (ehVoluntario) {
        const apresentacao = String(dados.get("apresentacao") || "").trim();
        const proposta = String(dados.get("propostaConteudo") || "").trim();
        const cpf = String(dados.get("cpf") || "").trim();
        const telefone = String(dados.get("telefone") || "").trim();
        const nomesDocumentos = dados.getAll("documentos")
          .filter((documento) => documento instanceof File && documento.size > 0)
          .map((documento) => documento.name);

        // a tabela SolicitacoesVoluntario guarda o texto em justificativa (máx. 1000)
        const justificativa = [
          `Apresentação: ${apresentacao || "não informada"}`,
          `Proposta de conteúdo: ${proposta || "não informada"}`,
          cpf ? `CPF: ${cpf}` : "",
          telefone ? `Telefone: ${telefone}` : "",
          nomesDocumentos.length
            ? `Documentos (somente os nomes, arquivos não são enviados): ${nomesDocumentos.join(", ")}`
            : "",
        ].filter(Boolean).join("\n").slice(0, 1000);

        await apiPost("/solicitacoes-voluntario/create", {
          usuarioId: usuario.id,
          status: "PENDENTE",
          justificativa,
        });

        setMensagem(
          "Conta criada e solicitação de voluntariado enviada para análise. Faça login para acompanhar."
        );
      } else {
        setMensagem("Conta criada com sucesso! Faça login para continuar.");
      }

      formulario.reset();
      setPerfil("");
      setDocumentos([]);
    } catch (excecao) {
      setErro(excecao.message || "Não foi possível concluir o cadastro. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className={styles.registerPage}>
        <section className={styles.registerFormSection}>
          <div className={styles.registerCard}>
            <span className={styles.registerBadge}>Plataforma Equitá</span>
            <h1>Criar conta</h1>
            <p>Preencha os dados abaixo para criar sua conta.</p>
            <p className={styles.serviceNotice} role="note">
              {perfil === "voluntario"
                ? "Sua conta será criada e a solicitação de voluntariado seguirá para análise. CPF, telefone e os nomes dos documentos são anexados à solicitação; os arquivos em si não são enviados."
                : "Seus dados (nome, e-mail e senha) serão criados na plataforma Equitá."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-nome">Nome completo</label>
                <input id="cadastro-nome" name="nome" type="text" autoComplete="name" placeholder="Digite seu nome completo" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-cpf">CPF (opcional)</label>
                <input id="cadastro-cpf" name="cpf" type="text" autoComplete="off" placeholder="000.000.000-00" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-email">E-mail</label>
                <input id="cadastro-email" name="email" type="email" autoComplete="email" placeholder="Digite seu e-mail" required />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-telefone">Telefone</label>
                <input id="cadastro-telefone" name="telefone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-perfil">Perfil</label>
                <select id="cadastro-perfil" name="perfil" value={perfil} onChange={(event) => setPerfil(event.target.value)} required>
                  <option value="">Selecione um perfil</option>
                  <option value="usuario">Usuário</option>
                  <option value="voluntario">Voluntário</option>
                </select>
              </div>

              {perfil === "voluntario" && (
                <>
                  <p className={styles.volunteerNotice}>
                    O acesso às ferramentas de voluntário depende da análise e aprovação da solicitação.
                  </p>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-apresentacao">Apresentação e experiência</label>
                    <textarea
                      id="cadastro-apresentacao"
                      name="apresentacao"
                      rows="4"
                      maxLength="1200"
                      placeholder="Conte sobre sua experiência e área de atuação."
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-proposta">Proposta de conteúdo</label>
                    <textarea
                      id="cadastro-proposta"
                      name="propostaConteudo"
                      rows="4"
                      maxLength="1600"
                      placeholder="Descreva o conteúdo educativo que pretende oferecer."
                      required
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <label htmlFor="cadastro-documentos">Documentos para análise</label>
                    <input
                      id="cadastro-documentos"
                      name="documentos"
                      type="file"
                      multiple
                      required
                      onChange={(event) => setDocumentos(Array.from(event.target.files || []))}
                    />
                    {documentos.length > 0 && (
                      <ul className={styles.documentList} aria-label="Documentos selecionados" aria-live="polite">
                        {documentos.map((documento) => <li key={`${documento.name}-${documento.lastModified}`}>{documento.name}</li>)}
                      </ul>
                    )}
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-senha">Senha</label>
                <div className={styles.passwordInput}>
                  <input id="cadastro-senha" name="senha" type={mostrarSenha ? "text" : "password"} autoComplete="new-password" placeholder="Digite sua senha" required />
                  <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}>
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="cadastro-confirmacao">Confirmar senha</label>
                <div className={styles.passwordInput}>
                  <input id="cadastro-confirmacao" name="confirmacao" type={mostrarConfirmacao ? "text" : "password"} autoComplete="new-password" placeholder="Confirme sua senha" required />
                  <button type="button" onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)} aria-label={mostrarConfirmacao ? "Ocultar confirmação de senha" : "Mostrar confirmação de senha"}>
                    {mostrarConfirmacao ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </div>

              {erro && <p className={styles.errorMessage} role="alert">{erro}</p>}
              {mensagem && <p className={styles.feedbackMessage} role="status">{mensagem}</p>}
              <button type="submit" className={styles.registerButton} disabled={carregando}>
                {carregando
                  ? "Enviando..."
                  : perfil === "voluntario" ? "Enviar solicitação" : "Criar conta"}
              </button>

              <div className={styles.divider}>
                <span>Já possui uma conta?</span>
              </div>

              <Link to="/login" className={styles.loginLink}>Entrar</Link>
            </form>
          </div>
        </section>
      </main>

      <Footer />

    </>
  );
}

export default Cadastro;

 