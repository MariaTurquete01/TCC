import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./racismo.module.css";

function Racismo() {
  return (
    <>
      <Navbar />

      <section className={styles.racismoPage}>

        <div className={styles.racismoHero}>

          <span className={styles.badge}>
            Racismo e Discriminação
          </span>

          <h1>
            Respeito, igualdade e combate ao preconceito
          </h1>

          <p>
            Conheça seus direitos, entenda as formas de discriminação racial e
            saiba como agir diante de situações de racismo.
          </p>

        </div>

        <section className={styles.contentCard}>

          <h2>📖 O que é racismo?</h2>

          <p>
            Racismo é qualquer prática, comportamento ou atitude que resulte
            em tratamento desigual ou injusto de uma pessoa ou grupo por causa
            de sua raça, cor, origem étnica ou características relacionadas.
          </p>

          <p>
            Ele pode ocorrer de forma direta, através de ofensas, agressões e
            exclusões explícitas, ou de forma indireta, quando regras,
            comportamentos ou estruturas sociais acabam criando desigualdades
            entre grupos raciais.
          </p>

          <p>
            No Brasil, o racismo é considerado crime e qualquer pessoa vítima
            ou testemunha de uma situação discriminatória pode buscar os órgãos
            responsáveis pela proteção dos direitos.
          </p>

          <p>
            O combate ao racismo busca garantir igualdade de oportunidades,
            respeito à diversidade e proteção da dignidade humana.
          </p>

        </section>

        <section className={styles.contentCard}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A legislação brasileira garante proteção contra qualquer forma de
            discriminação racial e assegura direitos fundamentais para todas as
            pessoas.
          </p>

          <ul>

            <li>
              Direito à igualdade perante a lei.
            </li>

            <li>
              Direito à proteção contra discriminação racial.
            </li>

            <li>
              Direito à dignidade, respeito e valorização da identidade.
            </li>

            <li>
              Direito ao acesso igualitário à educação.
            </li>

            <li>
              Direito à igualdade de oportunidades no trabalho.
            </li>

            <li>
              Direito ao acesso aos serviços públicos sem discriminação.
            </li>

            <li>
              Direito à liberdade religiosa e respeito às tradições culturais.
            </li>

            <li>
              Direito à proteção contra discursos de ódio e violência.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>🌎 Tipos de Racismo</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Racismo Individual</h3>

              <p>
                Ocorre quando uma pessoa pratica atitudes discriminatórias,
                como insultos, ameaças ou tratamento desigual baseado em raça ou
                origem.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Racismo Institucional</h3>

              <p>
                Acontece quando instituições ou organizações possuem práticas
                que dificultam o acesso igualitário de determinados grupos.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Racismo Estrutural</h3>

              <p>
                Refere-se às desigualdades históricas presentes na sociedade
                que afetam oportunidades, acesso e participação social.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Racismo Cultural</h3>

              <p>
                Envolve a desvalorização de culturas, costumes, religiões ou
                tradições associadas a determinados grupos.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>🔎 Situações que podem indicar discriminação</h2>

          <p>
            Algumas atitudes podem caracterizar práticas racistas e devem ser
            observadas com atenção:
          </p>

          <ul>

            <li>
              Ofensas relacionadas à cor, raça ou origem.
            </li>

            <li>
              Impedir uma pessoa de acessar serviços ou oportunidades por causa
              de sua aparência ou origem.
            </li>

            <li>
              Tratamento desigual em ambientes de trabalho ou estudo.
            </li>

            <li>
              Perseguições, ameaças ou humilhações motivadas por questões
              raciais.
            </li>

            <li>
              Divulgação de conteúdos racistas em ambientes físicos ou digitais.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>🚨 O que fazer em caso de racismo?</h2>

          <p>
            Caso uma pessoa sofra ou presencie uma situação de racismo, algumas
            medidas podem ajudar na proteção dos direitos e na responsabilização
            dos envolvidos.
          </p>

          <ol>

            <li>
              Mantenha registros da situação, como mensagens, imagens, vídeos ou
              documentos.
            </li>

            <li>
              Anote informações importantes, como data, local e possíveis
              testemunhas.
            </li>

            <li>
              Procure apoio de pessoas de confiança.
            </li>

            <li>
              Registre uma denúncia em uma delegacia ou órgão responsável.
            </li>

            <li>
              Busque orientação jurídica quando necessário.
            </li>

          </ol>

        </section>

        <section className={styles.contentCard}>

          <h2>🏛️ Onde Buscar Ajuda?</h2>

          <p>
            Existem instituições responsáveis por receber denúncias, orientar
            vítimas e promover a defesa dos direitos humanos.
          </p>

          <ul>

            <li>
              Disque Direitos Humanos - 100.
            </li>

            <li>
              Delegacias de Polícia.
            </li>

            <li>
              Ministério Público.
            </li>

            <li>
              Defensoria Pública.
            </li>

            <li>
              Ouvidorias de órgãos públicos.
            </li>

            <li>
              Conselhos de Promoção da Igualdade Racial.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações desta página foram organizadas com base na legislação
            brasileira e em documentos relacionados aos direitos humanos e à
            igualdade racial.
          </p>

          <div className={styles.referenceCategory}>

            <div className={styles.referenceItem}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Estabelece a igualdade de direitos e determina o combate à
                discriminação.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles.referenceItem}>

              <h4>Lei do Crime Racial</h4>

              <p>
                Define crimes relacionados à discriminação ou preconceito de
                raça, cor, etnia, religião ou origem.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l7716.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

          </div>

          <div className={styles.infoBox}>

            <h3>📌 Importante</h3>

            <p>
              Este conteúdo possui finalidade educativa e informativa e não
              substitui atendimento jurídico ou orientação profissional.
            </p>

          </div>

        </section>

        <section className={styles.actionsSection}>

          <h2>
            O que deseja fazer agora?
          </h2>

          <div className={styles.actionsGrid}>

            <Link
              to="/direitos"
              className={styles.actionCard}
            >
              ⚖️ Voltar para Direitos
            </Link>

            <Link
              to="/recursos"
              className={styles.actionCard}
            >
              📍 Encontrar Ajuda Próxima
            </Link>

            <Link
              to="/cursos"
              className={styles.actionCard}
            >
              🎓 Cursos Relacionados
            </Link>

          </div>

        </section>

      </section>

      <Footer />
    </>
  );
}

export default Racismo;
