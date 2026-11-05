
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { apiGet } from "../../services/api";

import styles from "./protocolo.module.css";

// status gravados pela API (CK_Denuncias_Status do banco)
const ETAPAS = [
  { valor: "RECEBIDA", rotulo: "Recebida" },
  { valor: "EM_ANALISE", rotulo: "Em análise" },
  { valor: "ENCAMINHADA", rotulo: "Encaminhada" },
  { valor: "EM_ATENDIMENTO", rotulo: "Em atendimento" },
  { valor: "FINALIZADA", rotulo: "Finalizada" },
];
// a API gera protocolos no formato EQ-<32 caracteres hexadecimais>
const FORMATO_PROTOCOLO = /^EQ-[A-Z0-9]{4,64}$/;

function rotuloStatus(valor) {
  return ETAPAS.find((etapa) => etapa.valor === valor)?.rotulo || valor;
}

function Protocolo() {
  const [searchParams] = useSearchParams();
  const protocoloInicial = searchParams.get("numero") || "";
  const [protocolo, setProtocolo] = useState(protocoloInicial);
  const [denuncia, setDenuncia] = useState(null);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function consultar(numero) {
    if (!FORMATO_PROTOCOLO.test(numero)) {
      setDenuncia(null);
      setErro("Formato inválido. Use o padrão EQ-XXXXXXXX… (como no comprovante).");
      return;
    }

    setCarregando(true);
    setErro("");
    try {
      const encontrada = await apiGet(`/denuncias/protocolo/${encodeURIComponent(numero)}`);
      setDenuncia(encontrada);
    } catch (excecao) {
      setDenuncia(null);
      setErro(
        excecao.status === 0
          ? excecao.message
          : "Protocolo não encontrado. Confira o número informado."
      );
    } finally {
      setCarregando(false);
    }
  }

  // consulta automática quando a página abre com ?numero=...
  useEffect(() => {
    if (protocoloInicial) consultar(protocoloInicial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [protocoloInicial]);

  function handleSubmit(event) {
    event.preventDefault();
    consultar(protocolo.trim().toUpperCase());
  }

  return (
    <>
      <Navbar />

      <main className={styles["protocol-page"]}>

        {/* HERO */}

        <section className={styles["protocol-hero"]}>

          <span className={styles["hero-badge"]}>
            Consulta de Protocolo
          </span>

          <h1>
            Acompanhe sua denúncia
          </h1>

          <p>
            Digite o número do protocolo para acompanhar o andamento da sua denúncia.
          </p>

        </section>

        {/* CONSULTA */}

        <section className={styles["consulta-section"]}>

          <form className={styles["consulta-card"]} onSubmit={handleSubmit}>
            <h2>Consultar Protocolo</h2>
            <div className={styles["input-group"]}>
              <label htmlFor="numero-protocolo">Número do protocolo</label>
              <input
                id="numero-protocolo"
                type="text"
                value={protocolo}
                onChange={(event) => {
                  setProtocolo(event.target.value);
                  setDenuncia(null);
                  setErro("");
                }}
                placeholder="Ex.: EQ-8D39C5C89F334B59815CD963EDF1407F"
                maxLength="40"
                autoCapitalize="characters"
                autoComplete="off"
                aria-invalid={Boolean(erro)}
                aria-describedby={erro ? "protocolo-erro" : undefined}
                required
              />
          </div>
            {erro && <p id="protocolo-erro" className={styles["error-message"]} role="alert">{erro}</p>}
            <button type="submit" className={styles["consultar-button"]} disabled={carregando}>
              {carregando ? "Consultando..." : "Consultar"}
            </button>
          </form>

        </section>

        {/* RESULTADO */}

        {denuncia && (
        <section className={styles["status-section"]} aria-live="polite">
          <div className={styles["status-card"]}>
            {(() => {
              const indiceAtual = Math.max(
                ETAPAS.findIndex((etapa) => etapa.valor === denuncia.status),
                0
              );

              return (
                <>
            <h2>Status da denúncia</h2>
            <p className={styles["current-status"]}>
              Protocolo {denuncia.protocolo}: <strong>{rotuloStatus(denuncia.status)}</strong>
            </p>
            <div className={styles["status-timeline"]}>
              {ETAPAS.map((etapa, indice) => (
                <div
                  className={`${styles["status-item"]} ${indice < indiceAtual ? styles.completed : indice === indiceAtual ? styles.active : ""}`}
                  key={etapa.valor}
                >
                  <div className={styles["status-circle"]} />
                  <div>
                    <h3>{etapa.rotulo}</h3>
                    <p>{indice < indiceAtual ? "Etapa concluída." : indice === indiceAtual ? "Esta é a etapa atual da sua denúncia." : "Etapa ainda não iniciada."}</p>
                  </div>
                </div>
              ))}
            </div>
                </>
              );
            })()}
          </div>
        </section>
        )}

      </main>

      <Footer />
    </>
  );
}

export default Protocolo;

