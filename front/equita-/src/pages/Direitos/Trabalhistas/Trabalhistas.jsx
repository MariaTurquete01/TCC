import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./Trabalhistas.module.css";

function Trabalhistas() {
  return (
    <>
      <Navbar />

      <section className={styles.workPage}>

        <div className={styles.workHero}>

          <span className={styles.badge}>
            Direitos Trabalhistas
          </span>

          <h1>
            Conheça seus direitos no ambiente de trabalho
          </h1>

          <p>
            Informações sobre contratos, salários, jornadas, segurança e
            proteção ao trabalhador.
          </p>

        </div>

        <section className={styles.contentCard}>

          <h2>📖 O que são direitos trabalhistas?</h2>

          <p>
            Direitos trabalhistas são garantias criadas para proteger
            trabalhadores e empregadores, estabelecendo regras para uma relação
            profissional mais justa, segura e equilibrada.
          </p>

          <p>
            Esses direitos determinam questões como salário, jornada de trabalho,
            descanso, férias, segurança, benefícios e condições mínimas para o
            exercício de uma atividade profissional.
          </p>

          <p>
            No Brasil, grande parte dessas normas está reunida na Consolidação
            das Leis do Trabalho (CLT), criada para organizar as relações entre
            empregados e empregadores.
          </p>

        </section>

        <section className={styles.contentCard}>

          <h2>🏭 História dos Direitos Trabalhistas</h2>

          <p>
            Os direitos trabalhistas surgiram principalmente após as mudanças
            provocadas pela Revolução Industrial, quando muitos trabalhadores
            enfrentavam jornadas extremamente longas, baixos salários e
            condições perigosas.
          </p>

          <p>
            Movimentos de trabalhadores, sindicatos e estudiosos passaram a
            defender melhores condições de trabalho, influenciando a criação de
            leis de proteção social.
          </p>

          <p>
            No Brasil, a legislação trabalhista ganhou grande desenvolvimento no
            século XX, especialmente com a criação da CLT em 1943.
          </p>

        </section>

        <section className={styles.contentCard}>

          <h2>👥 Pessoas importantes na história trabalhista</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Getúlio Vargas</h3>

              <p>
                Durante seu governo foram criadas importantes normas trabalhistas
                brasileiras, incluindo a Consolidação das Leis do Trabalho (CLT)
                em 1943.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Karl Marx</h3>

              <p>
                Filósofo e economista que analisou as relações entre trabalho,
                produção e desigualdade social durante a Revolução Industrial.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Movimentos Sindicais</h3>

              <p>
                Organizações de trabalhadores tiveram papel histórico na busca
                por melhores salários, segurança e condições dignas.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Constituição Federal de 1988</h3>

              <p>
                Ampliou direitos sociais e trabalhistas, garantindo proteção ao
                trabalhador brasileiro.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>⚖️ Direitos Garantidos</h2>

          <p>
            A legislação brasileira garante diversos direitos fundamentais aos
            trabalhadores.
          </p>

          <ul>

            <li>
              Carteira de Trabalho assinada.
            </li>

            <li>
              Salário mínimo.
            </li>

            <li>
              13º salário.
            </li>

            <li>
              Férias remuneradas com adicional.
            </li>

            <li>
              Fundo de Garantia do Tempo de Serviço (FGTS).
            </li>

            <li>
              Licença maternidade e paternidade.
            </li>

            <li>
              Pagamento de horas extras.
            </li>

            <li>
              Descanso semanal remunerado.
            </li>

            <li>
              Seguro-desemprego quando previsto.
            </li>

            <li>
              Ambiente de trabalho seguro e saudável.
            </li>

            <li>
              Proteção contra discriminação e assédio.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>📄 Tipos de Contrato de Trabalho</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Contrato CLT</h3>

              <p>
                Relação formal com registro, garantindo direitos previstos na
                legislação trabalhista.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Trabalho Temporário</h3>

              <p>
                Contratação realizada por período determinado para atender
                necessidades específicas.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Jovem Aprendiz</h3>

              <p>
                Programa que combina formação profissional e experiência de
                trabalho.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Estágio</h3>

              <p>
                Modalidade voltada à formação educacional e desenvolvimento
                profissional.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>🚨 Situações Irregulares</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Assédio Moral</h3>

              <p>
                Consiste em atitudes repetidas de humilhação, constrangimento,
                perseguição ou abuso psicológico no ambiente profissional.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Assédio Sexual</h3>

              <p>
                Envolve comportamentos de natureza sexual sem consentimento,
                causando constrangimento ou pressão.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Horas Não Pagas</h3>

              <p>
                Trabalho realizado além da jornada sem a devida compensação ou
                pagamento.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Trabalho Sem Registro</h3>

              <p>
                Ausência de formalização que pode prejudicar o acesso aos
                direitos trabalhistas.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Trabalho Análogo à Escravidão</h3>

              <p>
                Situações envolvendo exploração extrema, condições degradantes
                ou restrição de liberdade.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>🦺 Segurança no Trabalho</h2>

          <p>
            Todo trabalhador possui direito a um ambiente seguro, com medidas
            destinadas a prevenir acidentes e doenças ocupacionais.
          </p>

          <ul>

            <li>
              Equipamentos de proteção quando necessários.
            </li>

            <li>
              Treinamentos de segurança.
            </li>

            <li>
              Condições adequadas de trabalho.
            </li>

            <li>
              Prevenção de riscos físicos e psicológicos.
            </li>

          </ul>

        </section>

        <section className={styles.contentCard}>

          <h2>🛟 O que fazer em caso de problema trabalhista?</h2>

          <ol>

            <li>
              Guarde documentos, contratos, mensagens e comprovantes.
            </li>

            <li>
              Registre situações importantes ocorridas no trabalho.
            </li>

            <li>
              Procure orientação jurídica.
            </li>

            <li>
              Busque sindicatos ou órgãos de fiscalização.
            </li>

            <li>
              Faça denúncias quando houver irregularidades.
            </li>

          </ol>

        </section>

        <section className={styles.contentCard}>

          <h2>💡 Curiosidades sobre trabalho e direitos</h2>

          <div className={styles.grid}>

            <div className={styles.item}>

              <h3>Férias são um direito histórico</h3>

              <p>
                O descanso remunerado surgiu como uma forma de proteger a saúde
                física e mental dos trabalhadores.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Direitos trabalhistas evoluem</h3>

              <p>
                As leis podem mudar conforme novas formas de trabalho e desafios
                sociais aparecem.
              </p>

            </div>

            <div className={styles.item}>

              <h3>Trabalho digno é um direito humano</h3>

              <p>
                A Organização Internacional do Trabalho reconhece condições
                justas de trabalho como fundamentais para a dignidade humana.
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>📞 Telefones Úteis</h2>

          <div className={styles.phones}>

            <div className={styles.phone}>

              <h3>158</h3>

              <p>
                Ministério do Trabalho
              </p>

            </div>

            <div className={styles.phone}>

              <h3>100</h3>

              <p>
                Direitos Humanos
              </p>

            </div>

          </div>

        </section>

        <section className={styles.contentCard}>

          <h2>📚 Fontes e Referências</h2>

          <div className={styles.referenceCategory}>

            <div className={styles.referenceItem}>

              <h4>Consolidação das Leis do Trabalho (CLT)</h4>

              <p>
                Principal conjunto de normas que regulamenta as relações de
                trabalho no Brasil.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar →
              </a>

            </div>

            <div className={styles.referenceItem}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Estabelece direitos sociais e garantias fundamentais aos
                trabalhadores.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
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
              orientação jurídica realizada por profissionais especializados.
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

export default Trabalhistas;
