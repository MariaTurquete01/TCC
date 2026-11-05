import "./FAQ.module.css";
 
import styles from "./FAQ.module.css";

function FAQ() {
  return (
    <section className={styles.faq}>
      <div className={styles["faq-header"]}>
        <span className={styles["faq-badge"]}>
          Perguntas Frequentes
        </span>

        <h2>
          Dúvidas comuns sobre o Equitá
        </h2>
      </div>

      <div className={styles["faq-list"]}>
        <div className={styles["faq-item"]}>
          <h3>A denúncia é anônima?</h3>
          <p>
            Sim. O usuário pode escolher entre
            denúncia anônima ou identificada.
          </p>
        </div>

        <div className={styles["faq-item"]}>
          <h3>Como encontro ajuda próxima?</h3>
          <p>
            O sistema utiliza sua localização para
            exibir recursos e instituições próximas.
          </p>
        </div>

        <div className={styles["faq-item"]}>
          <h3>Os cursos são gratuitos?</h3>
          <p>
            Sim. Todos os cursos disponibilizados
            na plataforma são gratuitos.
          </p>
        </div>

        <div className={styles["faq-item"]}>
          <h3>Como me tornar voluntário?</h3>
          <p>
            Basta realizar o cadastro como
            educador e enviar sua proposta.
          </p>
        </div>

        <div className={styles["faq-item"]}>
          <h3>Posso acompanhar minha denúncia?</h3>
          <p>
            Sim. O sistema gera um protocolo para
            acompanhamento.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
