import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./SaudeMental.module.css";

function SaudeMental() {
  return (
    <>
      <Navbar />

      <section className={styles.mentalPage}>

        <div className={styles.mentalHero}>

          <span className={styles.badge}>
            Saúde Mental
          </span>

          <h1>
            Cuidar da mente também é um direito
          </h1>

          <p>
            Informação, prevenção, autoconhecimento e caminhos para buscar
            apoio psicológico e emocional.
          </p>

        </div>

        <section className={styles.contentCard}>

          <h2>📖 O que é saúde mental?</h2>

          <p>
            Saúde mental é o estado de equilíbrio emocional, psicológico e
            social que permite que uma pessoa compreenda suas emoções, enfrente
            dificuldades, desenvolva relações saudáveis e participe da vida em
            sociedade.
          </p>

          <p>
            Ter saúde mental não significa estar feliz o tempo todo ou nunca
            enfrentar problemas. Todas as pessoas passam por momentos de
            tristeza, medo, ansiedade ou estresse. A diferença está na capacidade
            de lidar com essas experiências e buscar apoio quando necessário.
          </p>

          <p>
            A saúde mental envolve pensamentos, sentimentos, comportamentos,
            relações sociais, autoestima, identidade e a forma como cada pessoa
            interpreta suas experiências.
          </p>

        </section>

        <section className={styles.contentCard}>

          <h2>🧠 Como funciona a mente humana?</h2>

          <p>
            A mente humana envolve processos como pensamentos, memórias,
            emoções, percepções e comportamentos. Diversas áreas estudam esses
            processos, incluindo psicologia, psiquiatria e neurociência.
          </p>

          <p>
            O desenvolvimento da psicologia trouxe diferentes formas de
            compreender o funcionamento humano. Um dos nomes mais conhecidos é
            <strong> Sigmund Freud</strong>, criador da psicanálise.
          </p>

          <p>
            Freud defendia que muitos comportamentos humanos eram influenciados
            por processos inconscientes, ou seja, pensamentos, desejos e
            experiências que nem sempre percebemos conscientemente.
          </p>

          <p>
            Atualmente existem diversas abordagens psicológicas, como a
            psicologia cognitivo-comportamental, humanista e psicanálise, cada
            uma oferecendo diferentes formas de compreender e tratar questões
            emocionais.
          </p>

        </section>

        <section className={styles.contentCard}>

          <h2>⚠️ Sinais de Atenção</h2>

          <p>
            Alguns sinais podem indicar que uma pessoa precisa de apoio
            emocional ou profissional.
          </p>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Ansiedade Excessiva</h3>

              <p>
                Preocupações intensas, medo constante, dificuldade de relaxar ou
                sensação frequente de perigo.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Tristeza Persistente</h3>

              <p>
                Sentimentos prolongados de desânimo, perda de interesse e falta
                de energia.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Isolamento Social</h3>

              <p>
                Afastamento de familiares, amigos ou atividades que antes eram
                importantes.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Alterações no Sono</h3>

              <p>
                Insônia, sono excessivo ou mudanças significativas na rotina de
                descanso.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Dificuldade de Concentração</h3>

              <p>
                Problemas para manter atenção, organizar pensamentos ou realizar
                tarefas.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Mudanças de Comportamento</h3>

              <p>
                Alterações repentinas no humor, hábitos ou relacionamento com
                outras pessoas.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>🩺 Principais transtornos mentais</h2>

          <p>
            Transtornos mentais são condições que podem afetar emoções,
            pensamentos e comportamentos. Apenas profissionais especializados
            podem realizar diagnósticos.
          </p>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Depressão</h3>

              <p>
                Pode envolver tristeza intensa, perda de interesse, alterações
                no sono, energia e autoestima.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Transtornos de Ansiedade</h3>

              <p>
                Envolvem preocupações excessivas, medo intenso e sintomas
                físicos relacionados ao estresse.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Transtorno Bipolar</h3>

              <p>
                Caracteriza-se por alterações importantes de humor, envolvendo
                períodos de depressão e outros de maior energia ou euforia.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Transtornos Alimentares</h3>

              <p>
                Envolvem dificuldades relacionadas à alimentação, imagem
                corporal e relação com o próprio corpo.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>🌱 Como cuidar da saúde mental?</h2>

          <ul>

            <li>
              Manter uma rotina equilibrada de sono.
            </li>

            <li>
              Praticar atividades físicas quando possível.
            </li>

            <li>
              Ter momentos de lazer e descanso.
            </li>

            <li>
              Cultivar relações saudáveis.
            </li>

            <li>
              Expressar sentimentos e conversar sobre dificuldades.
            </li>

            <li>
              Evitar o isolamento prolongado.
            </li>

            <li>
              Buscar ajuda profissional quando necessário.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>🛟 Como Buscar Ajuda?</h2>

          <ol>

            <li>
              Converse com pessoas de confiança.
            </li>

            <li>
              Procure psicólogos ou profissionais da saúde.
            </li>

            <li>
              Utilize serviços públicos de atendimento.
            </li>

            <li>
              Participe de grupos de apoio.
            </li>

            <li>
              Procure atendimento emergencial em situações de risco.
            </li>

          </ol>

        </section>

        <section className={styles.contentCard}>

          <h2>⚖️ Direitos Garantidos</h2>

          <ul>

            <li>
              Direito ao atendimento pelo SUS.
            </li>

            <li>
              Direito ao tratamento humanizado.
            </li>

            <li>
              Direito à privacidade e confidencialidade.
            </li>

            <li>
              Direito à dignidade e respeito.
            </li>

            <li>
              Direito à proteção contra discriminação.
            </li>

            <li>
              Direito à assistência psicológica e psiquiátrica quando indicada.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>💭 Mitos e Verdades</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>"Pedir ajuda é sinal de fraqueza"</h3>

              <p>
                Mito. Buscar apoio demonstra cuidado consigo mesmo e
                responsabilidade com a própria saúde.
              </p>

            </div>

            <div className={styles.item}>

              <h3>"Todo sofrimento precisa ser escondido"</h3>

              <p>
                Mito. Falar sobre sentimentos pode ajudar no enfrentamento das
                dificuldades.
              </p>

            </div>

            <div className={styles.item}>

              <h3>"Terapia é apenas para pessoas com transtornos"</h3>

              <p>
                Mito. A psicoterapia também pode auxiliar no autoconhecimento,
                desenvolvimento pessoal e melhoria dos relacionamentos.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>📞 Telefones Úteis</h2>

          <div className={styles.phones}>

            <div className={styles.phone}>

              <h3>188</h3>

              <p>
                Centro de Valorização da Vida (CVV)
              </p>

            </div>

            <div className={styles.phone}>

              <h3>136</h3>

              <p>
                Disque Saúde
              </p>

            </div>

            <div className={styles.phone}>

              <h3>192</h3>

              <p>
                SAMU - Emergências médicas
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>📚 Fontes e Referências</h2>

          <div className={styles.referenceCategory}>

            <div className={styles.referenceItem}>

              <h4>Organização Mundial da Saúde (OMS)</h4>

              <p>
                Referência internacional em informações sobre saúde mental e
                bem-estar.
              </p>

              <a
                href="https://www.who.int"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles.referenceItem}>

              <h4>Sistema Único de Saúde (SUS)</h4>

              <p>
                Oferece atendimento e serviços relacionados à saúde mental.
              </p>

              <a
                href="https://www.gov.br/saude"
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
              Este conteúdo possui finalidade educativa e não substitui
              avaliação, diagnóstico ou tratamento realizado por profissionais
              da saúde.
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

export default SaudeMental;
