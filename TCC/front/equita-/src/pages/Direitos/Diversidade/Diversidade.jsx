import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./diversidade.module.css";

function Diversidade() {
  return (
    <>
      <Navbar />

      <section className={styles["diversidade-page"]}>

        <div className={styles["diversidade-hero"]}>

          <span className={styles.badge}>
            Diversidade e Inclusão
          </span>

          <h1>
            Respeito às diferenças e igualdade de direitos
          </h1>

          <p>
            Conheça direitos relacionados à diversidade,
            inclusão social e combate à discriminação.
          </p>

        </div>

        <section className={styles["content-card"]}>

          <h2>📖 O que é diversidade?</h2>

          <p>
            Diversidade é o reconhecimento, a valorização e o respeito às diferenças
            existentes entre as pessoas. Essas diferenças podem envolver aspectos como
            raça, etnia, gênero, orientação sexual, identidade de gênero, idade,
            religião, deficiência, cultura, nacionalidade e condições sociais.
          </p>

          <p>
            Uma sociedade diversa reconhece que cada indivíduo possui características,
            experiências e perspectivas únicas. Garantir o respeito às diferenças
            contribui para ambientes mais inclusivos, seguros e igualitários, onde
            todas as pessoas tenham oportunidades de participar plenamente da vida em
            sociedade.
          </p>

          <p>
            A legislação brasileira protege todas as pessoas contra qualquer forma de
            discriminação e promove políticas públicas voltadas à inclusão, igualdade
            de oportunidades e respeito à dignidade humana.
          </p>

          <blockquote>
            "Todas as pessoas devem ser tratadas com igualdade, respeito e dignidade,
            independentemente de suas diferenças."
          </blockquote>

        </section>

        <section className={styles["content-card"]}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A Constituição Federal assegura que todas as pessoas são iguais perante a lei.
            Isso significa que ninguém pode sofrer discriminação ou ter seus direitos
            negados em razão de suas características pessoais.
          </p>

          <ul>
            <li><strong>Direito à igualdade:</strong> tratamento igual perante a lei.</li>
            <li><strong>Proteção contra discriminação:</strong> combate ao preconceito e à exclusão.</li>
            <li><strong>Direito à educação:</strong> acesso à educação inclusiva e de qualidade.</li>
            <li><strong>Direito ao trabalho:</strong> oportunidades iguais e ambientes respeitosos.</li>
            <li><strong>Direito à acessibilidade:</strong> inclusão de pessoas com deficiência.</li>
            <li><strong>Direito à dignidade:</strong> respeito às diferenças e à identidade de cada pessoa.</li>
          </ul>

        </section>

        <section className={styles["content-card"]}>

          <h2>🤝 Inclusão na Prática</h2>

          <div className={styles.grid}>

            <div className={styles.item}>
              <h3>Educação</h3>

              <p>
                Escolas inclusivas promovem respeito às diferenças, acessibilidade e igualdade
                de oportunidades para todos os estudantes.
              </p>

            </div>

            <div className={styles.item}>
              <h3>Trabalho</h3>

              <p>
                Ambientes profissionais inclusivos valorizam talentos, combatem a discriminação
                e garantem oportunidades iguais.
              </p>

            </div>

            <div className={styles.item}>
              <h3>Sociedade</h3>

              <p>
                Todas as pessoas devem participar da vida social, cultural e política sem
                barreiras ou preconceitos.
              </p>

            </div>

            <div className={styles.item}>
              <h3>Respeito</h3>

              <p>
                Respeitar diferenças fortalece a convivência, reduz conflitos e promove uma
                sociedade mais justa.
              </p>

            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>🚫 Formas de Discriminação</h2>

          <div className={styles.grid}>

            <div className={styles.item}>
              <h3>Racismo</h3>

              <p>
                Discriminação baseada na raça, cor ou origem étnica, sendo crime previsto na
                legislação brasileira.
              </p>

            </div>

            <div className={styles.item}>
              <h3>LGBTQIA+</h3>

              <p>
                Toda pessoa tem direito ao respeito à sua orientação sexual e identidade de
                gênero, sem sofrer preconceito ou violência.
              </p>

            </div>

            <div className={styles.item}>
              <h3>Pessoas com Deficiência</h3>

              <p>
                A inclusão depende da eliminação de barreiras físicas, sociais e de atitude,
                garantindo acessibilidade e autonomia.
              </p>

            </div>

            <div className={styles.item}>
              <h3>Intolerância Religiosa</h3>

              <p>
                Cada pessoa tem o direito de professar sua religião ou não seguir nenhuma,
                sem sofrer discriminação.
              </p>

            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>🛟 O que fazer diante da discriminação?</h2>

          <p>
            Situações de preconceito ou discriminação não devem ser ignoradas. Sempre que
            possível, procure apoio e utilize os canais oficiais para orientação e
            denúncia.
          </p>

          <ol>
            <li>Priorize sua segurança.</li>
            <li>Registre provas, como mensagens, fotos ou testemunhas.</li>
            <li>Busque apoio de familiares, amigos ou instituições.</li>
            <li>Comunique a situação aos órgãos competentes.</li>
            <li>Realize a denúncia pelos canais oficiais.</li>
          </ol>

        </section>

        <section className={styles["content-card"]}>

          <h2>📞 Telefones Úteis</h2>

          <div className={styles.phones}>

            <div className={styles.phone}>
              <h3>100</h3>
              <p>Disque Direitos Humanos</p>
            </div>

            <div className={styles.phone}>
              <h3>190</h3>
              <p>Polícia Militar</p>
            </div>

            <div className={styles.phone}>
              <h3>192</h3>
              <p>SAMU</p>
            </div>

            <div className={styles.phone}>
              <h3>188</h3>
              <p>Centro de Valorização da Vida (CVV)</p>
            </div>

          </div>

        </section>

        <section className={`${styles["content-card"]} ${styles.references}`}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            Este conteúdo foi elaborado com base na legislação brasileira e em materiais
            oficiais sobre direitos humanos, igualdade e inclusão social.
          </p>

          <h3>Legislação</h3>

          <p><strong>Constituição Federal de 1988</strong></p>

          <p>
            Garante igualdade de direitos, dignidade da pessoa humana e proibição de
            qualquer forma de discriminação.
          </p>

          <a
            href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar Constituição →
          </a>

          <br /><br />

          <p><strong>Lei Brasileira de Inclusão – Lei nº 13.146/2015</strong></p>

          <p>
            Estabelece direitos e garantias das pessoas com deficiência.
          </p>

          <a
            href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Acessar legislação →
          </a>

          <br /><br />

          <h3>Órgãos Oficiais</h3>

          <p><strong>Ministério dos Direitos Humanos e da Cidadania</strong></p>

          <p>
            Campanhas, informações e canais oficiais sobre direitos humanos e inclusão.
          </p>

          <a
            href="https://www.gov.br/mdh"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.gov.br/mdh
          </a>

          <div className={styles["info-box"]}>

            <h3>📌 Importante</h3>

            <p>
              Este conteúdo possui finalidade educativa e informativa. O objetivo é
              promover conhecimento sobre direitos humanos, inclusão e respeito à
              diversidade, contribuindo para uma sociedade mais justa e consciente.
            </p>

            <p>
              As informações apresentadas não substituem orientação jurídica,
              psicológica ou atendimento profissional especializado. Em situações de
              violação de direitos, procure os órgãos competentes e canais oficiais de
              apoio.
            </p>

          </div>

        </section>

        <section className={styles["actions-section"]}>

          <h2>O que deseja fazer agora?</h2>

          <div className={styles["actions-grid"]}>

            <Link to="/direitos" className={styles["action-card"]}>
              ⚖️ Voltar para Direitos
            </Link>

            <Link to="/recursos" className={styles["action-card"]}>
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link to="/cursos" className={styles["action-card"]}>
              🎓 Cursos Relacionados
            </Link>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
}

export default Diversidade;
