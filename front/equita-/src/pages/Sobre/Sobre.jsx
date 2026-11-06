import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./sobre.module.css";

const PILARES = [
  { icone: "⚖️", titulo: "Direitos", texto: "Guias em linguagem simples sobre direitos de mulheres, crianças, idosos, pessoas com deficiência, trabalhadores e muito mais." },
  { icone: "🛡️", titulo: "Denúncias", texto: "Registro de denúncias anônimas ou identificadas, com número de protocolo para acompanhar o andamento." },
  { icone: "📚", titulo: "Cursos", texto: "Conteúdos educativos criados por voluntários e revisados pela equipe antes de serem publicados." },
  { icone: "📍", titulo: "Recursos", texto: "Mapa com delegacias, ONGs, abrigos, defensorias e centros de apoio próximos de você." },
];

const VALORES = [
  { titulo: "Acolhimento", texto: "Quem procura ajuda precisa ser ouvido sem julgamento." },
  { titulo: "Segurança", texto: "Os dados de quem denuncia são tratados com cuidado e sigilo." },
  { titulo: "Acesso à informação", texto: "Conhecer os próprios direitos é o primeiro passo para exercê-los." },
  { titulo: "Colaboração", texto: "Cidadãos, voluntários e instituições trabalhando juntos." },
];

function Sobre() {
  return (
    <>
      <Navbar />

      <main className={styles.aboutPage}>
        <section className={styles.aboutHero}>
          <span className={styles.badge}>Sobre o Equitá</span>
          <h1>Informação, proteção e apoio em um só lugar</h1>
          <p>
            O Equitá é uma plataforma de cidadania e inclusão social. Ela reúne
            orientação sobre direitos, canal de denúncias, cursos educativos e um
            mapa de instituições de apoio, para aproximar quem precisa de ajuda
            de quem pode ajudar.
          </p>
        </section>

        <section className={styles.section}>
          <div className={styles.twoColumns}>
            <div>
              <h2>Por que o Equitá existe</h2>
              <p>
                Muitas pessoas passam por situações de violência, discriminação ou
                violação de direitos sem saber a quem recorrer. A informação existe,
                mas costuma estar espalhada, em linguagem difícil ou longe de quem
                mais precisa.
              </p>
              <p>
                O Equitá nasceu para resolver isso: um ponto de partida único,
                gratuito e acessível, onde qualquer pessoa pode entender seus
                direitos, pedir ajuda e encontrar o serviço certo perto de casa.
              </p>
            </div>
            <div className={styles.missionCard}>
              <h3>Nossa missão</h3>
              <p>
                Fortalecer a cidadania e promover a igualdade por meio do acesso à
                informação, da educação e da conexão com a rede de apoio.
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`}>
          <div className={styles.sectionTitle}>
            <h2>O que você encontra aqui</h2>
            <p>Quatro frentes que funcionam juntas.</p>
          </div>
          <div className={styles.cardGrid}>
            {PILARES.map((pilar) => (
              <article className={styles.card} key={pilar.titulo}>
                <span className={styles.icon} aria-hidden="true">{pilar.icone}</span>
                <h3>{pilar.titulo}</h3>
                <p>{pilar.texto}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.twoColumns}>
            <div>
              <span className={styles.badge}>Agenda 2030 da ONU</span>
              <h2>Alinhado ao ODS 16</h2>
              <p>
                O projeto contribui para o Objetivo de Desenvolvimento Sustentável
                16, <strong>Paz, Justiça e Instituições Eficazes</strong>, ao
                facilitar o acesso à justiça, incentivar a denúncia de violências e
                aproximar a população das instituições públicas e da sociedade civil.
              </p>
            </div>
            <ul className={styles.valuesList}>
              {VALORES.map((valor) => (
                <li key={valor.titulo}>
                  <strong>{valor.titulo}</strong>
                  <span>{valor.texto}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionSoft}`}>
          <div className={styles.sectionTitle}>
            <h2>Um projeto acadêmico com propósito social</h2>
            <p>
              O Equitá foi desenvolvido como Trabalho de Conclusão de Curso, com
              back-end em Java (Spring Boot), front-end em React e banco de dados
              SQL Server.
            </p>
          </div>
        </section>

        <section className={styles.cta}>
          <h2>Quer fazer parte?</h2>
          <p>Crie sua conta para acompanhar cursos ou se candidatar como voluntário.</p>
          <div className={styles.ctaButtons}>
            <Link to="/cadastro" className={styles.primaryBtn}>Criar conta</Link>
            <Link to="/protocolo" className={styles.secondaryBtn}>Consultar protocolo</Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Sobre;
