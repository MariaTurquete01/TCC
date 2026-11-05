import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./idosos.module.css";

function Idosos() {
  return (
    <>
      <Navbar />

      <section className={styles["elderly-page"]}>

        <div className={styles["elderly-hero"]}>

          <span className={styles.badge}>
            Direitos dos Idosos
          </span>

          <h1>
            Respeito, proteção e qualidade de vida
          </h1>

          <p>
            Conheça os direitos garantidos pelo Estatuto da Pessoa Idosa e saiba
            como buscar proteção quando esses direitos forem desrespeitados.
          </p>

        </div>

        <section className={styles["content-card"]}>

          <h2>📖 O que são os Direitos da Pessoa Idosa?</h2>

          <p>
            As pessoas com 60 anos ou mais possuem direitos garantidos pela
            Constituição Federal e pelo Estatuto da Pessoa Idosa. Essas normas
            asseguram proteção à dignidade, à saúde, à liberdade e à participação
            ativa na sociedade.
          </p>

          <p>
            O envelhecimento é um direito de todos e deve ocorrer com respeito,
            segurança, autonomia e acesso aos serviços públicos essenciais.
          </p>

          <p>
            A família, a sociedade e o Estado possuem responsabilidade conjunta
            de garantir que a pessoa idosa tenha qualidade de vida e seja
            protegida contra qualquer forma de negligência, discriminação,
            violência ou abandono.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A legislação brasileira assegura diversos direitos fundamentais para
            promover o bem-estar e a inclusão da pessoa idosa.
          </p>

          <ul>
            <li>Atendimento prioritário em órgãos públicos e privados.</li>
            <li>Acesso gratuito ou facilitado aos serviços de saúde.</li>
            <li>Medicamentos e tratamentos pelo SUS quando previstos.</li>
            <li>Direito ao transporte público conforme a legislação.</li>
            <li>Proteção contra violência, abandono e negligência.</li>
            <li>Direito à convivência familiar e comunitária.</li>
            <li>Participação em atividades culturais, esportivas e de lazer.</li>
            <li>Respeito à autonomia, dignidade e liberdade.</li>
          </ul>

          <p>
            Esses direitos existem para garantir uma vida digna e promover o
            envelhecimento saudável e ativo.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>👵 Situações Frequentes</h2>

          <p>
            Algumas situações são comuns no dia a dia das pessoas idosas e
            merecem atenção para evitar violações de direitos.
          </p>

          <div className={styles.grid}>

            <div className={styles.item}>
              <h3>Atendimento Prioritário</h3>
              <p>
                Direito de preferência em filas, repartições públicas,
                estabelecimentos comerciais e serviços de saúde.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Saúde</h3>
              <p>
                Atendimento integral pelo SUS, vacinação, medicamentos e ações
                voltadas ao envelhecimento saudável.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Transporte</h3>
              <p>
                Benefícios previstos em lei para utilização do transporte público
                e viagens interestaduais em determinadas condições.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Aposentadoria</h3>
              <p>
                Direito aos benefícios previdenciários conforme os requisitos
                previstos na legislação.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Convivência Familiar</h3>
              <p>
                Garantia de permanecer junto da família sempre que possível,
                preservando seus vínculos afetivos.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Participação Social</h3>
              <p>
                Incentivo à participação em atividades culturais, comunitárias e
                programas voltados à terceira idade.
              </p>
            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>⚠️ Situações de Violência</h2>

          <p>
            A violência contra a pessoa idosa pode ocorrer de diferentes formas e
            deve ser denunciada sempre que identificada.
          </p>

          <div className={styles.grid}>

            <div className={styles.item}>
              <h3>Violência Física</h3>
              <p>
                Agressões, empurrões, lesões ou qualquer ato que cause dano
                físico.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Violência Psicológica</h3>
              <p>
                Humilhações, ameaças, isolamento, ofensas e intimidação.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Violência Financeira</h3>
              <p>
                Uso indevido de aposentadoria, pensão, cartões bancários ou bens
                da pessoa idosa.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Negligência</h3>
              <p>
                Falta de alimentação, higiene, medicamentos ou cuidados básicos.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Abandono</h3>
              <p>
                Quando familiares ou responsáveis deixam de prestar assistência
                necessária.
              </p>
            </div>

            <div className={styles.item}>
              <h3>Violência Institucional</h3>
              <p>
                Atendimento inadequado ou desrespeitoso por instituições públicas
                ou privadas.
              </p>
            </div>

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>🛟 O que fazer em caso de violação dos direitos?</h2>

          <p>
            Caso a pessoa idosa esteja sofrendo violência, abandono ou qualquer
            violação de direitos, é importante procurar ajuda imediatamente.
          </p>

          <ol>
            <li>Converse com familiares ou pessoas de confiança.</li>
            <li>Procure assistência social do município.</li>
            <li>Registre denúncia pelos canais oficiais.</li>
            <li>Busque orientação jurídica quando necessário.</li>
            <li>Em situações de emergência, acione imediatamente a polícia.</li>
          </ol>

          <p>
            A denúncia é um importante instrumento para proteger a pessoa idosa e
            garantir seus direitos.
          </p>

        </section>

        <section className={styles["content-card"]}>

          <h2>🏛️ Onde Buscar Ajuda?</h2>

          <p>
            Diversos órgãos públicos oferecem atendimento gratuito para proteção,
            orientação e encaminhamento de casos envolvendo pessoas idosas.
          </p>

          <ol>
            <li>CRAS.</li>
            <li>CREAS.</li>
            <li>Conselho Municipal da Pessoa Idosa.</li>
            <li>Defensoria Pública.</li>
            <li>Ministério Público.</li>
            <li>Delegacia de Polícia.</li>
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

          </div>

        </section>

        <section className={styles["content-card"]}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações desta página foram elaboradas com base na legislação
            brasileira e em materiais oficiais relacionados aos direitos da
            pessoa idosa.
          </p>

          <div className={styles["reference-category"]}>

            <div className={styles["reference-item"]}>
              <h4>Constituição Federal de 1988</h4>

              <p>
                Garante a proteção da pessoa idosa e determina o dever da família,
                da sociedade e do Estado.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>
            </div>

            <div className={styles["reference-item"]}>

              <h4>Estatuto da Pessoa Idosa</h4>

              <p>
                Principal legislação brasileira voltada à proteção dos direitos da
                pessoa idosa.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/2003/l10.741.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles["reference-item"]}>

              <h4>Ministério dos Direitos Humanos</h4>

              <p>
                Disponibiliza informações, campanhas e canais de denúncia para a
                proteção da pessoa idosa.
              </p>

              <a
                href="https://www.gov.br/mdh"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

          </div>

          <div className={styles["info-box"]}>

            <h3>📌 Importante</h3>

            <p>
              Este conteúdo possui finalidade educativa e informativa, não
              substituindo a orientação jurídica ou o atendimento realizado pelos
              órgãos competentes.
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

export default Idosos;
