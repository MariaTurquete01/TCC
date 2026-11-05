import styles from "./HowItWorks.module.css";

function HowItWorks() {
    return (
        <section className={styles.howItWorks}>
            <div className={styles.sectionHeader}>
                <span className={styles.sectionBadge}>
                    Como Funciona
                </span>

                <h2>
                    Um caminho simples para informação e apoio
                </h2>

                <p>
                    O Equitá foi desenvolvido para orientar,
                    proteger e conectar cidadãos a recursos
                    importantes de forma rápida e acessível.
                </p>
            </div>

            <div className={styles.steps}>
                <div className={styles.step}>
                    <div className={styles.stepNumber}>
                        1
                    </div>

                    <h3>
                        Conheça seus direitos
                    </h3>

                    <p>
                        Explore conteúdos organizados por temas
                        e entenda quais são seus direitos.
                    </p>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>
                        2
                    </div>

                    <h3>
                        Busque orientação
                    </h3>

                    <p>
                        Receba informações claras sobre o que
                        fazer em diferentes situações.
                    </p>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>
                        3
                    </div>

                    <h3>
                        Encontre ajuda
                    </h3>

                    <p>
                        Localize instituições e serviços
                        próximos à sua região.
                    </p>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>
                        4
                    </div>

                    <h3>
                        Realize denúncias
                    </h3>

                    <p>
                        Envie denúncias de forma segura,
                        anônima ou identificada.
                    </p>
                </div>

                <div className={styles.step}>
                    <div className={styles.stepNumber}>
                        5
                    </div>

                    <h3>
                        Aprenda e compartilhe
                    </h3>

                    <p>
                        Participe de cursos e ações educativas
                        promovidas por voluntários.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
