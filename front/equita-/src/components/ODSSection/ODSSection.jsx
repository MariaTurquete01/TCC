import styles from "./ODSSection.module.css";

function ODSSection() {
    return (
        <section className={styles.ods}>
            <div className={styles.odsContent}>
                <div className={styles.odsText}>
                    <span className={styles.odsBadge}>
                        Agenda 2030
                    </span>

                    <h2>
                        Alinhado ao ODS 16
                    </h2>

                    <h3>
                        Paz, Justiça e Instituições Eficazes
                    </h3>

                    <p>
                        O Equitá contribui para a promoção
                        da cidadania, acesso à informação,
                        inclusão social e fortalecimento dos
                        direitos humanos através da educação,
                        orientação e apoio à população.
                    </p>

                    <ul>
                        <li>
                            ✔ Promoção da igualdade
                        </li>

                        <li>
                            ✔ Acesso à informação
                        </li>

                        <li>
                            ✔ Apoio às denúncias
                        </li>

                        <li>
                            ✔ Educação cidadã
                        </li>

                        <li>
                            ✔ Fortalecimento da justiça social
                        </li>
                    </ul>
                </div>

                <div className={styles.odsCard}>
                    <div className={styles.odsNumber}>
                        16
                    </div>

                    <h3>
                        Paz, Justiça e Instituições Eficazes
                    </h3>
                </div>
            </div>
        </section>
    );
}

export default ODSSection;