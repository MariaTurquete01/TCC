import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./bullying.module.css";

function Bullying() {
  return (
    <>
      <Navbar />

      <section className={styles.BullyingPage}>

        <div className={styles.BullyingHero}>

          <span className={styles.Badge}>
            Bullying e Cyberbullying
          </span>

          <h1>
            Respeito e segurança dentro e fora da internet
          </h1>

          <p>
            Saiba identificar situações de bullying,
            cyberbullying e conhecer seus direitos.
          </p>

        </div>

        <section className={styles.ContentCard}>

          <h2>📖 O que é Bullying?</h2>

          <p>
            Bullying é uma forma de violência caracterizada por atitudes repetitivas de
            agressão, intimidação, humilhação ou exclusão, que causam sofrimento físico,
            emocional ou psicológico à vítima.


            Essas ações geralmente acontecem em contextos de convivência contínua, como
            escolas, ambientes esportivos ou grupos sociais, onde há uma relação de
            desequilíbrio entre quem pratica e quem sofre a agressão.


            O bullying não deve ser tratado como “brincadeira” ou algo comum da infância,
            pois seus impactos podem afetar a autoestima, o desempenho escolar e a saúde
            mental da vítima.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>💻 O que é Cyberbullying?</h2>

          <p>
            O cyberbullying é a prática de bullying realizada por meios digitais, como
            redes sociais, aplicativos de mensagens, jogos online e outras plataformas da
            internet.

            Ele pode envolver ofensas, exposição de informações pessoais, criação de
            perfis falsos, divulgação de imagens sem consentimento ou envio constante de
            mensagens ofensivas.

            Por acontecer no ambiente virtual, o cyberbullying pode se espalhar rapidamente
            e atingir um grande número de pessoas, ampliando o impacto emocional sobre a
            vítima.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <p>
            O bullying e o cyberbullying podem se manifestar de diferentes formas no
            cotidiano. Em muitos casos, essas atitudes começam de maneira sutil e acabam
            se tornando recorrentes ao longo do tempo.
          </p>

          <h2>⚠️ Exemplos</h2>

          <div className={styles.Grid}>

            <div className={styles.Item}>
              <h3>Ofensas</h3>
              <p>Insultos e xingamentos frequentes.</p>
            </div>

            <div className={styles.Item}>
              <h3>Exclusão</h3>
              <p>Isolar alguém de grupos e atividades.</p>
            </div>

            <div className={styles.Item}>
              <h3>Boatos</h3>
              <p>Espalhar informações falsas.</p>
            </div>

            <div className={styles.Item}>
              <h3>Humilhação Online</h3>
              <p>Exposição pública nas redes sociais.</p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>⚖️ Direitos</h2>

          <p>
            Toda pessoa tem direito a ser tratada com respeito e dignidade, especialmente
            em ambientes de convivência como a escola e a internet. No Brasil, existem
            leis e políticas públicas voltadas à proteção de crianças e adolescentes
            contra situações de violência, incluindo o bullying.
          </p>

          <ul>
            <li>Direito à dignidade e respeito.</li>
            <li>Proteção no ambiente escolar.</li>
            <li>Proteção contra violência psicológica.</li>
            <li>Acompanhamento pedagógico adequado.</li>
            <li>Acesso a apoio psicológico quando necessário.</li>
          </ul>

          <p>
            A escola e a família têm papel fundamental na prevenção, identificação e
            encaminhamento de casos de bullying.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>🛟 O que fazer?</h2>

          <p>
            Ao vivenciar ou presenciar situações de bullying ou cyberbullying, é importante
            buscar ajuda e não enfrentar o problema sozinho. Existem medidas que podem
            ajudar a interromper esse ciclo de violência.
          </p>

          <ol>
            <li>Evite responder com agressividade.</li>
            <li>Guarde mensagens, imagens ou outras provas.</li>
            <li>Converse com pessoas de confiança, como familiares ou responsáveis.</li>
            <li>Informe a escola ou instituição responsável.</li>
            <li>Busque apoio psicológico ou orientação especializada.</li>
          </ol>

          <p>
            Em casos mais graves, é possível recorrer aos órgãos de proteção à criança e ao
            adolescente ou às autoridades competentes.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>📞 Telefones Úteis</h2>

          <p>
            Os serviços abaixo oferecem apoio, orientação e acolhimento em situações de
            violência, sofrimento emocional ou violação de direitos.
          </p>

          <div className={styles.Phones}>

            <div className={styles.Phone}>
              <h3>100</h3>
              <p>Direitos Humanos</p>
            </div>

            <div className={styles.Phone}>
              <h3>188</h3>
              <p>Apoio Emocional</p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações apresentadas nesta página foram elaboradas com base em
            materiais oficiais de órgãos públicos brasileiros e legislações que tratam
            da proteção de crianças, adolescentes e cidadãos em situação de
            vulnerabilidade ou violência.
          </p>

          <div className={styles.ReferenceCategory}>

            <div className={styles.ReferenceItem}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Estabelece os direitos fundamentais, incluindo dignidade, igualdade,
                proteção social e direito à segurança.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>
                Lei nº 13.185/2015 — Programa de Combate à Intimidação Sistemática
              </h4>

              <p>
                Institui o programa nacional de combate ao bullying no Brasil.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13185.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Ministério dos Direitos Humanos e da Cidadania</h4>

              <p>
                Órgão responsável por políticas de proteção de direitos humanos e canais
                de denúncia.
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

              <h4>Organização Mundial da Saúde (OMS)</h4>

              <p>
                Estudos sobre violência, saúde mental e impactos do bullying.
              </p>

              <a
                href="https://www.who.int"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.who.int
              </a>

            </div>

          </div>

          <div className={styles.InfoBox}>

            <h3>📌 Importante</h3>

            <p>
              Este conteúdo tem caráter educativo e não substitui orientação psicológica,
              jurídica ou atendimento especializado.
            </p>

          </div>

        </section>

        <section className={styles.ActionsSection}>

          <h2>O que deseja fazer agora?</h2>

          <div className={styles.ActionsGrid}>

            <Link to="/direitos" className={styles.ActionCard}>
              ⚖️ Voltar para Direitos
            </Link>

            <Link to="/recursos" className={styles.ActionCard}>
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link to="/cursos" className={styles.ActionCard}>
              🎓 Cursos Relacionados
            </Link>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
}

export default Bullying;