import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./criancas.module.css";

function Criancas() {
  return (
    <>
      <Navbar />

      <section className={styles.ChildrenPage}>

        <div className={styles.ChildrenHero}>

          <span className={styles.Badge}>
            Crianças e Adolescentes
          </span>

          <h1>
            Proteção, desenvolvimento e dignidade
          </h1>

          <p>
            Conheça os direitos garantidos pelo
            Estatuto da Criança e do Adolescente.
          </p>

        </div>

        <section className={styles.ContentCard}>

          <h2>📖 O que é o ECA?</h2>

          <p>
            O Estatuto da Criança e do Adolescente (ECA), instituído pela Lei nº
            8.069/1990, é a principal legislação brasileira voltada à proteção dos
            direitos de crianças e adolescentes. Seu objetivo é garantir que todas as
            pessoas com menos de 18 anos tenham acesso ao desenvolvimento físico,
            emocional, intelectual e social em condições de liberdade, dignidade e
            segurança.
          </p>

          <p>
            O ECA estabelece que crianças e adolescentes são sujeitos de direitos e
            devem receber proteção integral da família, da sociedade e do Estado. Isso
            significa que qualquer situação que coloque em risco sua saúde, educação,
            integridade física ou emocional deve ser combatida e comunicada aos órgãos
            competentes.
          </p>

          <p>
            Além de proteger contra diferentes formas de violência, o Estatuto também
            promove políticas públicas voltadas à educação, saúde, assistência social,
            lazer, cultura e profissionalização, buscando assegurar um desenvolvimento
            saudável durante toda a infância e adolescência.
          </p>

          <blockquote>
            "É dever da família, da sociedade e do Estado assegurar, com absoluta
            prioridade, os direitos da criança e do adolescente."
          </blockquote>

        </section>

        <section className={styles.ContentCard}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            O Estatuto assegura diversos direitos fundamentais indispensáveis para o
            desenvolvimento saudável de crianças e adolescentes. Esses direitos devem ser
            respeitados em qualquer ambiente, seja em casa, na escola, na comunidade ou em
            instituições públicas e privadas.
          </p>

          <ul>

            <li>
              <strong>Direito à vida e à saúde:</strong> acesso ao atendimento médico,
              vacinação, alimentação adequada e qualidade de vida.
            </li>

            <li>
              <strong>Direito à educação:</strong> acesso à escola, permanência e
              aprendizagem em ambiente seguro.
            </li>

            <li>
              <strong>Direito ao lazer:</strong> brincar, praticar esportes e participar
              de atividades culturais.
            </li>

            <li>
              <strong>Direito à convivência familiar:</strong> crescer em ambiente de
              afeto, respeito e proteção.
            </li>

            <li>
              <strong>Direito à proteção:</strong> contra negligência, violência física,
              psicológica, sexual e exploração.
            </li>

            <li>
              <strong>Direito ao respeito e dignidade:</strong> ser tratado com igualdade
              e sem discriminação.
            </li>

          </ul>

        </section>

        <section className={styles.ContentCard}>

          <h2>⚠️ Situações de Risco</h2>

          <div className={styles.Item}>

            <h3>Negligência</h3>

            <p>
              Quando responsáveis deixam de oferecer alimentação, cuidados médicos,
              educação, higiene ou proteção necessários ao desenvolvimento da criança.
            </p>

          </div>

          <div className={styles.Item}>

            <h3>Violência Física</h3>

            <p>
              Qualquer agressão que provoque dor, lesões ou coloque a integridade física da
              criança ou adolescente em risco.
            </p>

          </div>

          <div className={styles.Item}>

            <h3>Violência Psicológica</h3>

            <p>
              Humilhações, ameaças, rejeição, intimidação, isolamento ou qualquer atitude
              que prejudique a autoestima e o desenvolvimento emocional.
            </p>

          </div>

          <div className={styles.Item}>

            <h3>Abuso Sexual</h3>

            <p>
              Qualquer ato de natureza sexual envolvendo crianças ou adolescentes,
              independentemente do uso de violência física.
            </p>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>🔎 Sinais que merecem atenção</h2>

          <p>
            Nem sempre crianças e adolescentes conseguem relatar situações de violência.
            Alguns comportamentos podem indicar que algo está acontecendo.
          </p>

          <ul>

            <li>Mudanças bruscas de comportamento.</li>

            <li>Medo constante de determinadas pessoas.</li>

            <li>Queda repentina no rendimento escolar.</li>

            <li>Machucados frequentes sem explicação.</li>

            <li>Isolamento social.</li>

            <li>Tristeza, ansiedade ou agressividade excessiva.</li>

            <li>Fuga de casa ou da escola.</li>

          </ul>

        </section>

        <section className={styles.ContentCard}>

          <h2>🛟 O que fazer?</h2>

          <p>
            Ao identificar uma situação de violência ou suspeita de violação de direitos,
            é importante agir com responsabilidade para proteger a criança ou adolescente.
          </p>

          <ol>

            <li>Garanta a segurança imediata da criança.</li>

            <li>Escute com atenção e sem julgamentos.</li>

            <li>Não exponha a vítima.</li>

            <li>Procure um responsável de confiança quando adequado.</li>

            <li>Acione o Conselho Tutelar ou os órgãos competentes.</li>

            <li>Registre a denúncia pelos canais oficiais.</li>

          </ol>

          <p>
            Em situações de emergência ou risco iminente, acione imediatamente a Polícia
            Militar pelo telefone 190.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>📞 Telefones Úteis</h2>

          <div className={styles.Phones}>

            <div className={styles.Phone}>
              <h3>100</h3>
              <p>Disque Direitos Humanos</p>
            </div>

            <div className={styles.Phone}>
              <h3>190</h3>
              <p>Polícia Militar</p>
            </div>

            <div className={styles.Phone}>
              <h3>192</h3>
              <p>SAMU</p>
            </div>

            <div className={styles.Phone}>
              <h3>193</h3>
              <p>Corpo de Bombeiros</p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            Este conteúdo foi elaborado com base na legislação brasileira e em materiais
            produzidos por órgãos oficiais de proteção à infância e adolescência.
          </p>

          <div className={styles.ReferenceCategory}>

            <h3>Legislação</h3>

            <div className={styles.ReferenceItem}>

              <h4>
                Lei nº 8.069/1990 — Estatuto da Criança e do Adolescente
              </h4>

              <p>
                Dispõe sobre a proteção integral de crianças e adolescentes e estabelece
                seus direitos fundamentais.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8069.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar legislação →
              </a>

            </div>

          </div>

          <div className={styles.ReferenceCategory}>

            <h3>Órgãos Oficiais</h3>

            <div className={styles.ReferenceItem}>

              <h4>Ministério dos Direitos Humanos</h4>

              <p>
                Informações sobre direitos da criança, canais de denúncia e campanhas
                educativas.
              </p>

              <a
                href="https://www.gov.br/mdh"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.gov.br/mdh
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>
                Conselho Nacional dos Direitos da Criança e do Adolescente (CONANDA)
              </h4>

              <p>
                Normas e políticas públicas voltadas à proteção da infância e adolescência.
              </p>

            </div>

            <div className={styles.InfoBox}>

              <h3>📌 Importante</h3>

              <p>
                Este conteúdo possui finalidade educativa e informativa. As informações
                apresentadas têm o objetivo de auxiliar na compreensão dos direitos de
                crianças e adolescentes, identificar possíveis situações de violação de
                direitos e orientar sobre os caminhos para buscar proteção e apoio.
                Este material não substitui atendimento realizado por profissionais,
                órgãos de proteção ou orientação jurídica especializada.
              </p>

            </div>

          </div>

        </section>

      </section>

      <section className={styles.ActionsSection}>

        <h2>O que deseja fazer agora?</h2>

        <div className={styles.ActionsGrid}>

          <Link
            to="/direitos"
            className={styles.ActionCard}
          >
            ⚖️ Voltar para Direitos
          </Link>

          <Link
            to="/recursos"
            className={styles.ActionCard}
          >
            📍 Encontrar Ajuda Próxima
          </Link>

          {/*<Link
            to="/denuncias"
            className={styles.ActionCard}
          >
            🚨 Fazer Denúncia
          </Link> */}

          <Link
            to="/cursos"
            className={styles.ActionCard}
          >
            🎓 Cursos Relacionados
          </Link>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Criancas;