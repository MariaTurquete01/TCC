import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./assedio.module.css";

function Assedio() {
  return (
    <>
      <Navbar />

      <section className={styles.AssedioPage}>

        <div className={styles.AssedioHero}>

          <span className={styles.Badge}>
            Assédio
          </span>

          <h1>
            Respeito, segurança e dignidade
          </h1>

          <p>
            Saiba identificar situações de assédio
            e conheça seus direitos.
          </p>

        </div>

        <section className={styles.ContentCard}>

          <h2>📖 O que é assédio?</h2>

          <p>
            O assédio é uma forma de violência que ocorre quando uma pessoa é submetida
            a comportamentos indesejados capazes de causar constrangimento, medo,
            intimidação ou sofrimento. Essas atitudes podem acontecer em diferentes
            ambientes da vida cotidiana, como escolas, universidades, locais de
            trabalho, transporte público, espaços de lazer ou até mesmo dentro da
            própria casa.
          </p>

          <p>
            Diferentemente de um simples desentendimento, o assédio cria uma relação
            de desequilíbrio em que a vítima passa a sentir que sua liberdade, sua
            segurança ou sua dignidade estão sendo ameaçadas. Muitas vezes o agressor
            utiliza palavras, gestos, olhares, mensagens ou atitudes que parecem
            pequenas quando observadas isoladamente, mas que, repetidas ao longo do
            tempo, provocam impactos profundos na saúde emocional e na qualidade
            de vida da vítima.
          </p>

          <p>
            O assédio também pode ocorrer por meio da internet. Redes sociais,
            aplicativos de mensagens e outras plataformas digitais facilitaram a
            comunicação entre as pessoas, mas também passaram a ser utilizadas para
            perseguições, ameaças, exposição de informações pessoais e envio constante
            de mensagens indesejadas. Mesmo no ambiente virtual, essas condutas podem
            configurar violência e gerar consequências legais.
          </p>

          <blockquote>
            "Toda pessoa tem o direito de viver e conviver em ambientes seguros,
            respeitosos e livres de qualquer forma de violência ou intimidação."
          </blockquote>

        </section>

        <section className={styles.ContentCard}>

          <h2>🔎 Como identificar uma situação de assédio?</h2>

          <ul>
            <li>Comentários ofensivos ou humilhantes repetidos.</li>

            <li>
              Piadas constrangedoras sobre aparência, gênero, orientação sexual,
              raça ou religião.
            </li>

            <li>Insistência após uma negativa.</li>

            <li>Contato físico sem autorização.</li>

            <li>Ameaças, intimidações ou chantagens.</li>

            <li>Perseguição presencial ou pela internet.</li>

            <li>Controle excessivo da rotina ou da vida pessoal.</li>

            <li>Exposição pública para causar vergonha.</li>
          </ul>

        </section>

        <section className={styles.ContentCard}>

          <h2>⚠️ Tipos de Assédio</h2>

          <div className={styles.Grid}>

            <div className={styles.Item}>
              <h3>Assédio Moral</h3>

              <p>
                Consiste em humilhações, críticas constantes,
                isolamento, constrangimentos ou tratamento
                abusivo repetitivo que prejudica a saúde
                emocional da vítima.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>Assédio Sexual</h3>

              <p>
                Ocorre quando alguém realiza investidas,
                insinuações, propostas, chantadas ou contatos
                físicos de natureza sexual sem consentimento.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>Assédio Virtual</h3>

              <p>
                Inclui perseguições pela internet, envio
                constante de mensagens, divulgação de imagens,
                ofensas, ameaças ou exposição da vítima nas
                redes sociais.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>Stalking</h3>

              <p>
                É a perseguição contínua de uma pessoa,
                presencialmente ou online, causando medo,
                restrição da liberdade ou alteração da rotina.
              </p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>⚖️ Seus Direitos</h2>

          <p>
            Toda pessoa tem o direito de viver em ambientes seguros, respeitosos e livres
            de qualquer forma de violência. A legislação brasileira protege vítimas de
            assédio em diferentes contextos, como no trabalho, na escola, em instituições
            de ensino, em espaços públicos e também no ambiente digital. Além da
            responsabilização do agressor, a vítima pode buscar apoio psicológico,
            assistência jurídica e medidas de proteção quando houver risco à sua
            integridade.
          </p>

          <p>
            Conhecer seus direitos é um passo importante para reconhecer situações de abuso
            e buscar ajuda de forma segura.
          </p>

          <ul>
            <li>
              <strong>Direito à dignidade:</strong> ser tratado com respeito e sem
              humilhações.
            </li>

            <li>
              <strong>Direito à segurança:</strong> viver sem ameaças ou intimidações.
            </li>

            <li>
              <strong>Proteção contra perseguição:</strong> a legislação prevê medidas
              para combater o stalking e outras formas de violência.
            </li>

            <li>
              <strong>Proteção contra discriminação:</strong> ninguém pode sofrer
              violência por motivo de gênero, raça, orientação sexual, religião ou
              qualquer outra condição.
            </li>

            <li>
              <strong>Acesso à justiça:</strong> a vítima pode registrar ocorrência,
              buscar órgãos de proteção e receber orientação jurídica.
            </li>
          </ul>

          <p>
            Dependendo da situação, também é possível solicitar medidas protetivas ou
            outras providências previstas em lei para garantir a segurança da vítima.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>🛟 O que fazer?</h2>

          <p>
            Passar por uma situação de assédio pode gerar medo, insegurança e dúvidas sobre
            como agir. Não existe uma única resposta para todas as situações, mas algumas
            medidas podem ajudar a preservar sua segurança e facilitar uma eventual
            investigação.
          </p>

          <ol>
            <li>Afaste-se da situação quando possível.</li>
            <li>Guarde provas.</li>
            <li>Registre mensagens e documentos.</li>
            <li>Procure apoio.</li>
            <li>Realize uma denúncia.</li>
          </ol>

          <p>
            Se houver risco imediato à sua integridade física, procure um local seguro e
            entre em contato com as autoridades competentes.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>📞 Telefones Úteis</h2>

          <div className={styles.Phones}>

            <div className={styles.Phone}>
              <h3>180</h3>
              <p>Central da Mulher</p>
            </div>

            <div className={styles.Phone}>
              <h3>100</h3>
              <p>Direitos Humanos</p>
            </div>

            <div className={styles.Phone}>
              <h3>190</h3>
              <p>Polícia Militar</p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            Este conteúdo foi desenvolvido com base em legislações brasileiras,
            publicações de órgãos públicos e materiais produzidos por instituições
            reconhecidas na promoção dos direitos humanos e no combate ao assédio.
          </p>

          <div className={styles.ReferenceCategory}>

            <h3>Legislação</h3>

            <div className={styles.ReferenceItem}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Garante direitos fundamentais, como a dignidade da pessoa humana,
                igualdade, liberdade e proteção contra qualquer forma de violência.
              </p>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Lei nº 11.340/2006 — Lei Maria da Penha</h4>

              <p>
                Estabelece mecanismos para prevenir e combater a violência doméstica e
                familiar contra a mulher.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2004-2006/2006/lei/l11340.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar legislação →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Lei nº 14.132/2021 — Crime de Stalking</h4>

              <p>
                Incluiu no Código Penal o crime de perseguição.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/L14132.htm"
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

              <h4>Ministério dos Direitos Humanos e da Cidadania</h4>

              <p>
                Informações sobre direitos humanos, campanhas educativas e canais de denúncia.
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

              <h4>Conselho Nacional de Justiça (CNJ)</h4>

              <p>
                Conteúdos sobre violência contra a mulher, medidas protetivas e acesso à justiça.
              </p>

              <a
                href="https://www.cnj.jus.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.cnj.jus.br
              </a>

            </div>

            <div className={styles.InfoBox}>

              <h3>📌 Importante</h3>

              <p>
                Este conteúdo possui finalidade educativa e informativa. As informações
                apresentadas têm o objetivo de auxiliar na identificação de situações de
                assédio, orientar sobre direitos e indicar caminhos para buscar apoio e
                proteção. Este material não substitui orientação jurídica, psicológica ou
                atendimento realizado por profissionais especializados.
              </p>

            </div>

          </div>

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

            <Link
              to="/cursos"
              className={styles.ActionCard}
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

export default Assedio;
