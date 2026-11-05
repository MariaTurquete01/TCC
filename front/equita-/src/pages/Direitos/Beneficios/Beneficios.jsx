import Navbar from "../../../components/Navbar/Navbar";
import Footer from "../../../components/Footer/Footer";
import { Link } from "react-router-dom";

import styles from "./beneficios.module.css";

function Beneficios() {
  return (
    <>
      <Navbar />

      <section className={styles.BenefitsPage}>

        <div className={styles.BenefitsHero}>

          <span className={styles.Badge}>
            Benefícios Sociais
          </span>

          <h1>
            Conheça programas e auxílios disponíveis
          </h1>

          <p>
            Informações sobre benefícios sociais,
            assistência e apoio governamental.
          </p>

        </div>

        <section className={styles.ContentCard}>

          <h2>📖 O que são benefícios sociais?</h2>

          <p>
            Os benefícios sociais são programas, auxílios e serviços oferecidos pelo poder
            público com o objetivo de reduzir desigualdades, combater a pobreza e garantir
            condições mínimas de dignidade para pessoas e famílias em situação de
            vulnerabilidade social. Essas políticas públicas fazem parte do sistema de
            proteção social brasileiro e buscam assegurar o acesso a direitos básicos,
            como alimentação, saúde, educação, moradia e assistência.
          </p>

          <p>
            Cada benefício possui critérios específicos para concessão, como renda
            familiar, composição da família, idade, condição de saúde ou situação de
            vulnerabilidade. Em muitos casos, é necessário estar inscrito no Cadastro
            Único (CadÚnico), que reúne informações socioeconômicas das famílias de baixa
            renda e serve como porta de entrada para diversos programas governamentais.
          </p>

          <p>
            Conhecer os benefícios disponíveis é um passo importante para garantir o acesso
            a direitos e serviços que podem contribuir para melhorar a qualidade de vida
            das famílias brasileiras.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>💰 Principais Benefícios</h2>

          <br></br>

          <p>
            O Governo Federal, estados e municípios oferecem diferentes programas de
            assistência social. Alguns fornecem apoio financeiro direto, enquanto outros
            garantem descontos em serviços essenciais ou acesso a políticas públicas.
            Conheça alguns dos principais benefícios disponíveis.
          </p>

          <div className={styles.Grid}>

            <div className={styles.Item}>
              <h3>Bolsa Família</h3>

              <p>
                Programa de transferência de renda destinado a famílias em situação de pobreza
                ou extrema pobreza, contribuindo para garantir alimentação, educação e acesso
                a serviços de saúde.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>BPC</h3>

              <p>
                O Benefício de Prestação Continuada garante um salário mínimo mensal para
                idosos com 65 anos ou mais e pessoas com deficiência que comprovem baixa renda,
                conforme os critérios estabelecidos pela legislação.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>Auxílio Gás</h3>

              <p>
                Benefício destinado às famílias de baixa renda para auxiliar na compra do gás
                de cozinha, contribuindo para reduzir o impacto desse custo no orçamento
                familiar.
              </p>
            </div>

            <div className={styles.Item}>
              <h3>Tarifa Social de Energia Elétrica</h3>

              <p>
                Concede descontos na conta de energia para famílias inscritas no CadÚnico ou
                que atendam aos critérios definidos pela legislação.
              </p>
            </div>

          </div>

        </section>

        <section className={styles.ContentCard}>

          <h2>📋 Requisitos Gerais</h2>

          <p>
            Embora cada benefício possua regras específicas, alguns requisitos costumam ser
            comuns entre os principais programas sociais. Manter os dados atualizados e
            apresentar a documentação correta facilita a análise e a concessão do benefício.
          </p>

          <ul>

            <li>
              <strong>Cadastro Único atualizado:</strong> requisito para diversos programas sociais.
            </li>

            <li>
              <strong>Comprovação de renda:</strong> utilizada para verificar o enquadramento da família.
            </li>

            <li>
              <strong>Documentação pessoal:</strong> RG, CPF, comprovante de residência e outros documentos podem ser solicitados.
            </li>

            <li>
              <strong>Cumprimento das regras do programa:</strong> alguns benefícios possuem exigências específicas relacionadas à saúde, educação ou composição familiar.
            </li>

          </ul>

          <p>
            Caso haja dúvidas sobre a documentação necessária, procure o CRAS ou o órgão
            responsável pelo benefício desejado.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>🏢 Onde solicitar?</h2>

          <p>
            O atendimento para programas sociais é realizado por diferentes órgãos,
            dependendo do benefício. Em muitos casos, o primeiro atendimento ocorre no
            Centro de Referência de Assistência Social (CRAS), responsável pelo
            acolhimento, orientação e atualização do Cadastro Único.
          </p>

          <ol>

            <li>
              Procure o CRAS mais próximo de sua residência.
            </li>

            <li>
              Atualize ou realize seu Cadastro Único, quando necessário.
            </li>

            <li>
              Apresente a documentação solicitada.
            </li>

            <li>
              Aguarde a análise dos critérios do programa.
            </li>

            <li>
              Acompanhe o andamento da solicitação pelos canais oficiais.
            </li>

          </ol>

          <p>
            Alguns benefícios também podem ser solicitados ou acompanhados por aplicativos,
            sites oficiais ou unidades específicas do órgão responsável.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>📞 Telefones Úteis</h2>

          <p>
            Os canais abaixo oferecem atendimento, informações e orientações sobre
            benefícios sociais e serviços públicos relacionados à assistência social.
          </p>

          <div className={styles.Phones}>

            <div className={styles.Phone}>
              <h3>121</h3>
              <p>Assistência Social</p>
            </div>

            <div className={styles.Phone}>
              <h3>111</h3>
              <p>Caixa Econômica Federal</p>
            </div>

            <div className={styles.Phone}>
              <h3>135</h3>
              <p>INSS</p>
            </div>

          </div>

          <p>
            Antes de entrar em contato, tenha em mãos seus documentos pessoais, pois alguns
            serviços poderão solicitar informações para localizar seu cadastro.
          </p>

        </section>

        <section className={styles.ContentCard}>

          <h2>📚 Fontes e Referências</h2>

          <p>
            As informações apresentadas nesta página foram elaboradas com base em
            legislações brasileiras e em materiais publicados por órgãos oficiais
            responsáveis pela gestão da assistência social e dos programas de
            transferência de renda. O objetivo é fornecer informações confiáveis e de
            fácil compreensão sobre os principais benefícios sociais disponíveis no
            Brasil.
          </p>

          <div className={styles.ReferenceCategory}>

            <h3>Legislação</h3>

            <div className={styles.ReferenceItem}>

              <h4>Constituição Federal de 1988</h4>

              <p>
                Estabelece os direitos sociais dos cidadãos brasileiros, incluindo
                saúde, educação, assistência social, previdência e proteção às pessoas
                em situação de vulnerabilidade.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar Constituição Federal →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>
                Lei Orgânica da Assistência Social (LOAS) — Lei nº 8.742/1993
              </h4>

              <p>
                Regulamenta a assistência social no Brasil e estabelece direitos como o
                Benefício de Prestação Continuada (BPC).
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/leis/l8742.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar LOAS →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>
                Lei nº 14.601/2023 — Programa Bolsa Família
              </h4>

              <p>
                Dispõe sobre as regras, critérios e funcionamento do Programa Bolsa
                Família.
              </p>

              <a
                href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14601.htm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar Lei do Bolsa Família →
              </a>

            </div>

          </div>

          <div className={styles.ReferenceCategory}>

            <h3>Órgãos Oficiais</h3>

            <div className={styles.ReferenceItem}>

              <h4>
                Ministério do Desenvolvimento e Assistência Social, Família e Combate à Fome (MDS)
              </h4>

              <p>
                Órgão responsável pela coordenação dos programas de assistência social,
                Cadastro Único, Bolsa Família e Benefício de Prestação Continuada.
              </p>

              <a
                href="https://www.gov.br/mds"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.gov.br/mds
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Cadastro Único (CadÚnico)</h4>

              <p>
                Sistema utilizado para identificar e caracterizar famílias de baixa
                renda, servindo como porta de entrada para diversos programas sociais.
              </p>

              <a
                href="https://www.gov.br/mds/pt-br/acoes-e-programas/cadastro-unico"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cadastro Único →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Programa Bolsa Família</h4>

              <p>
                Informações oficiais sobre requisitos, critérios, benefícios e formas
                de acesso ao programa.
              </p>

              <a
                href="https://www.gov.br/pt-br/servicos/receber-o-bolsa-familia"
                target="_blank"
                rel="noopener noreferrer"
              >
                Página oficial do Bolsa Família →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Benefício de Prestação Continuada (BPC)</h4>

              <p>
                Informações sobre o benefício destinado a idosos e pessoas com
                deficiência em situação de baixa renda.
              </p>

              <a
                href="https://www.gov.br/mds/pt-br/acoes-e-programas/suas/beneficios-assistenciais/beneficios-assistenciais"
                target="_blank"
                rel="noopener noreferrer"
              >
                Página oficial do BPC →
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Caixa Econômica Federal</h4>

              <p>
                Responsável pelo pagamento de diversos benefícios sociais e programas
                de transferência de renda do Governo Federal.
              </p>

              <a
                href="https://www.caixa.gov.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.caixa.gov.br
              </a>

            </div>

            <div className={styles.ReferenceItem}>

              <h4>Instituto Nacional do Seguro Social (INSS)</h4>

              <p>
                Informações sobre benefícios previdenciários e assistenciais,
                incluindo o Benefício de Prestação Continuada (BPC).
              </p>

              <a
                href="https://www.gov.br/inss"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.gov.br/inss
              </a>

            </div>

          </div>

          <div className={styles.InfoBox}>

            <h3>📌 Importante</h3>

            <p>
              Os critérios de concessão dos benefícios sociais podem ser alterados por
              mudanças na legislação ou em normas administrativas. Para verificar
              requisitos atualizados, consulte sempre os canais oficiais do Governo
              Federal ou procure atendimento no CRAS do seu município.
            </p>

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

export default Beneficios;
