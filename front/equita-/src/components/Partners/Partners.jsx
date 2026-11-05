import styles from "./Partners.module.css";

function Partners() {
    return (
        <section className={styles.partners}>
            <div className={styles.partnersHeader}>
                <span className={styles.partnersBadge}>
                    Parcerias
                </span>

                <h2>
                    Construindo impacto social juntos
                </h2>

                <p>
                    O Equitá busca conectar instituições,
                    organizações e educadores para ampliar
                    o acesso à informação e à cidadania.
                </p>
            </div>

            <div className={styles.partnersGrid}>
                <div className={styles.partnerCard}>
                    <h3>
                        🏛️ Instituições Públicas
                    </h3>

                    <p>
                        Apoio na divulgação de direitos,
                        recursos e serviços à população.
                    </p>
                </div>

                <div className={styles.partnerCard}>
                    <h3>
                        🎓 Universidades
                    </h3>

                    <p>
                        Participação em projetos de extensão
                        e produção de conteúdo educativo.
                    </p>
                </div>

                <div className={styles.partnerCard}>
                    <h3>
                        🤝 ONGs
                    </h3>

                    <p>
                        Cooperação em ações de inclusão,
                        proteção e assistência social.
                    </p>
                </div>

                <div className={styles.partnerCard}>
                    <h3>
                        🏢 Empresas
                    </h3>

                    <p>
                        Incentivo a iniciativas de impacto
                        social e responsabilidade cidadã.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Partners;

 