import styles from "./Pillars.module.css";

function Pillars() {
    return (
        <section className={styles.pillars}>
            <div className={styles.sectionTitle}>
                <h2>Os 5 pilares do Equitá</h2>

                <p>
                    Uma plataforma completa para orientação,
                    proteção, educação e inclusão social.
                </p>
            </div>

            <div className={styles.pillarsGrid}>
                <div className={styles.pillarCard}>
                    <div className={styles.icon}>⚖️</div>

                    <h3>Direitos</h3>

                    <p>
                        Conheça seus direitos de forma clara
                        e acessível.
                    </p>
                </div>

                <div className={styles.pillarCard}>
                    <div className={styles.icon}>🛡️</div>

                    <h3>Denúncias</h3>

                    <p>
                        Realize denúncias anônimas ou
                        identificadas com segurança.
                    </p>
                </div>

                <div className={styles.pillarCard}>
                    <div className={styles.icon}>📚</div>

                    <h3>Cursos</h3>

                    <p>
                        Aprenda através de cursos oferecidos
                        por educadores voluntários.
                    </p>
                </div>

                <div className={styles.pillarCard}>
                    <div className={styles.icon}>📍</div>

                    <h3>Recursos</h3>

                    <p>
                        Encontre instituições próximas
                        que possam ajudar.
                    </p>
                </div>

                <div className={styles.pillarCard}>
                    <div className={styles.icon}>🤝</div>

                    <h3>Inclusão Social</h3>

                    <p>
                        Promovendo igualdade,
                        respeito e cidadania.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Pillars;
