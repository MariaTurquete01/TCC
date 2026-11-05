import { useEffect, useState } from "react";
import L from "leaflet";
import { CircleMarker, MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { carregarInstituicoes } from "../../services/instituicoes";
import "leaflet/dist/leaflet.css";
import styles from "./recursos.module.css";

const categorias = [
    { valor: "Todas", nome: "Todas" },
    { valor: "DELEGACIA", nome: "Delegacias" },
    { valor: "ONG", nome: "ONGs" },
    { valor: "ABRIGO", nome: "Abrigos" },
    { valor: "ASSISTENCIA_SOCIAL", nome: "Assistência social" },
    { valor: "DEFENSORIA", nome: "Defensoria" },
    { valor: "CENTRO_DE_APOIO", nome: "Centros de apoio" },
];

const iconeInstituicao = L.divIcon({
    className: styles.mapMarkerWrapper,
    html: `<span class="${styles.mapMarker}" aria-hidden="true"></span>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10],
});

function calcularDistanciaKm(origem, recurso) {
    const latitude = Number(recurso.latitude);
    const longitude = Number(recurso.longitude);
    const coordenadasValidas = Number.isFinite(latitude)
        && latitude >= -90
        && latitude <= 90
        && Number.isFinite(longitude)
        && longitude >= -180
        && longitude <= 180;

    if (!coordenadasValidas) return null;

    const radianos = (graus) => (graus * Math.PI) / 180;
    const diferencaLatitude = radianos(latitude - origem.latitude);
    const diferencaLongitude = radianos(longitude - origem.longitude);
    const valor = Math.sin(diferencaLatitude / 2) ** 2
        + Math.cos(radianos(origem.latitude))
        * Math.cos(radianos(latitude))
        * Math.sin(diferencaLongitude / 2) ** 2;

    return 6371 * 2 * Math.atan2(Math.sqrt(valor), Math.sqrt(1 - valor));
}

function formatarDistancia(distanciaKm) {
    return distanciaKm < 1
        ? `${Math.round(distanciaKm * 1000)} m`
        : `${distanciaKm.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;
}

function AjustarMapa({ instituicoes, localizacaoUsuario }) {
    const mapa = useMap();

    useEffect(() => {
        const coordenadas = instituicoes.map((instituicao) => [
            Number(instituicao.latitude),
            Number(instituicao.longitude),
        ]);
        if (localizacaoUsuario) {
            coordenadas.push([localizacaoUsuario.latitude, localizacaoUsuario.longitude]);
        }

        if (coordenadas.length === 0) return;

        if (coordenadas.length === 1) {
            mapa.setView(coordenadas[0], 13);
            return;
        }

        mapa.fitBounds(L.latLngBounds(coordenadas), { padding: [32, 32], maxZoom: 13 });
    }, [instituicoes, localizacaoUsuario, mapa]);

    return null;
}

function obterUrlRota(recurso) {
    const latitude = Number(recurso.latitude);
    const longitude = Number(recurso.longitude);
    const coordenadasValidas = Number.isFinite(latitude)
        && latitude >= -90
        && latitude <= 90
        && Number.isFinite(longitude)
        && longitude >= -180
        && longitude <= 180;

    return coordenadasValidas
        ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${latitude},${longitude}`)}`
        : null;
}

function Recursos() {
    const [pesquisa, setPesquisa] = useState("");
    const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todas");
    const [pesquisaAplicada, setPesquisaAplicada] = useState("");
    const [recursos, setRecursos] = useState([]);
    const [carregandoRecursos, setCarregandoRecursos] = useState(true);
    const [erroRecursos, setErroRecursos] = useState("");

    // carregarInstituicoes é assíncrona (API) → busca ao abrir a página
    useEffect(() => {
        let ativo = true;

        carregarInstituicoes()
            .then((instituicoes) => {
                if (ativo) setRecursos(instituicoes.filter((recurso) => recurso.ativa));
            })
            .catch((excecao) => {
                if (ativo) setErroRecursos(excecao.message || "Não foi possível carregar os recursos.");
            })
            .finally(() => {
                if (ativo) setCarregandoRecursos(false);
            });

        return () => {
            ativo = false;
        };
    }, []);

    const [localizacaoUsuario, setLocalizacaoUsuario] = useState(null);
    const [buscandoLocalizacao, setBuscandoLocalizacao] = useState(false);
    const [erroLocalizacao, setErroLocalizacao] = useState("");
    const recursosCorrespondentes = recursos.filter((recurso) => {
        const correspondeTexto = `${recurso.nome} ${recurso.cidade} ${recurso.endereco} ${recurso.descricao || ""}`
            .toLocaleLowerCase("pt-BR")
            .includes(pesquisaAplicada.toLocaleLowerCase("pt-BR"));
        const correspondeCategoria = categoriaSelecionada === "Todas"
            || recurso.categoria === categoriaSelecionada;
        return correspondeTexto && correspondeCategoria;
    });
    const recursosFiltrados = localizacaoUsuario
        ? [...recursosCorrespondentes].sort((a, b) => (
            (calcularDistanciaKm(localizacaoUsuario, a) ?? Infinity)
            - (calcularDistanciaKm(localizacaoUsuario, b) ?? Infinity)
        ))
        : recursosCorrespondentes;
    const recursosMapeaveis = recursosFiltrados.filter((recurso) => (
        recurso.latitude !== null
        && recurso.latitude !== ""
        && recurso.longitude !== null
        && recurso.longitude !== ""
        && Number.isFinite(Number(recurso.latitude))
        && Number.isFinite(Number(recurso.longitude))
        && Number(recurso.latitude) >= -90
        && Number(recurso.latitude) <= 90
        && Number(recurso.longitude) >= -180
        && Number(recurso.longitude) <= 180
    ));
    const possuiFiltros = pesquisaAplicada || categoriaSelecionada !== "Todas";

    function nomeCategoria(valor) {
        return categorias.find((categoria) => categoria.valor === valor)?.nome || "Outro";
    }

    function usarLocalizacao() {
        if (!navigator.geolocation) {
            setErroLocalizacao("Este navegador não oferece geolocalização.");
            return;
        }

        setBuscandoLocalizacao(true);
        setErroLocalizacao("");
        navigator.geolocation.getCurrentPosition(
            ({ coords }) => {
                setLocalizacaoUsuario({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                });
                setBuscandoLocalizacao(false);
            },
            (erro) => {
                setErroLocalizacao(erro.code === erro.PERMISSION_DENIED
                    ? "Permissão de localização negada. Você ainda pode buscar por cidade ou categoria."
                    : "Não foi possível obter sua localização. Tente novamente ou busque por cidade.");
                setBuscandoLocalizacao(false);
            },
            { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 }
        );
    }

    return (
        <>
            <Navbar />

            <main className={styles.resourcesPage}>

                <section className={styles.resourcesHero}>

                    <span className={styles.heroBadge}>Localizador de Recursos</span>
                    <h1>Recursos perto de você</h1>
                    <p>Pesquise instituições de apoio cadastradas e ativas na plataforma.</p>

                </section>

                <section className={styles.searchSection}>

                    <form className={styles.searchCard} onSubmit={(event) => {
                        event.preventDefault();
                        setPesquisaAplicada(pesquisa.trim());
                    }}>
                        <label htmlFor="resource-search">Pesquisar por cidade ou serviço</label>
                        <div className={styles.searchGrid}>
                            <input
                                id="resource-search"
                                type="search"
                                value={pesquisa}
                                onChange={(event) => setPesquisa(event.target.value)}
                                placeholder="Digite cidade ou serviço"
                            />
                            <button type="submit">Pesquisar</button>
                        </div>
                    </form>

                </section>

                <section className={styles.filtersSection}>

                    <h2>Filtrar por categoria</h2>
                    <div className={styles.locationControl}>
                        <button
                            type="button"
                            className={styles.locationButton}
                            onClick={usarLocalizacao}
                            disabled={buscandoLocalizacao}
                            aria-busy={buscandoLocalizacao}
                        >
                            {buscandoLocalizacao ? "Localizando..." : "Usar minha localização"}
                        </button>
                        <p className={styles.locationPrivacy}>Sua posição é usada apenas nesta página e não fica armazenada.</p>
                        {erroLocalizacao && <p className={styles.locationError} role="alert">{erroLocalizacao}</p>}
                        {localizacaoUsuario && (
                            <p className={styles.locationMessage} role="status">
                                Serviços ordenados pela distância aproximada; sua posição não foi armazenada.
                            </p>
                        )}
                    </div>
                    <div className={styles.filters} role="group" aria-label="Categorias de recursos">
                        {categorias.map((categoria) => (
                            <button
                                type="button"
                                key={categoria.valor}
                                aria-pressed={categoriaSelecionada === categoria.valor}
                                className={categoriaSelecionada === categoria.valor ? styles.filterActive : ""}
                                onClick={() => setCategoriaSelecionada(categoria.valor)}
                            >
                                {categoria.nome}
                            </button>
                        ))}
                    </div>

                </section>

                <section className={styles.resourceLayout}>
                    <div className={styles.resultsSection}>
                        <h2>Serviços disponíveis</h2>
                        {carregandoRecursos ? (
                            <p role="status">Carregando recursos...</p>
                        ) : erroRecursos ? (
                            <p className={styles.locationError} role="alert">{erroRecursos}</p>
                        ) : recursosFiltrados.length > 0 ? (
                            <div className={styles.resultsGrid}>
                                {recursosFiltrados.map((recurso) => {
                                    const urlRota = obterUrlRota(recurso);
                                    const distancia = localizacaoUsuario
                                        ? calcularDistanciaKm(localizacaoUsuario, recurso)
                                        : null;

                                    return (
                                        <article className={styles.resourceCard} key={recurso.id}>
                                            <span className={styles.resourceCategory}>{nomeCategoria(recurso.categoria)}</span>
                                            <h3>{recurso.nome}</h3>
                                            {recurso.descricao && <p>{recurso.descricao}</p>}
                                            <p>{[recurso.endereco, recurso.cidade, recurso.estado].filter(Boolean).join(" - ")}</p>
                                            {distancia !== null && <p className={styles.distance}>Aproximadamente {formatarDistancia(distancia)}</p>}
                                            {recurso.telefone && <a href={`tel:${recurso.telefone}`}>{recurso.telefone}</a>}
                                            {recurso.email && <a href={`mailto:${recurso.email}`}>{recurso.email}</a>}
                                            {recurso.horarioFuncionamento && <p>{recurso.horarioFuncionamento}</p>}
                                            {urlRota && <a href={urlRota} target="_blank" rel="noopener noreferrer">Como chegar</a>}
                                        </article>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className={styles.emptyState} role="status">
                                <h3>{possuiFiltros ? "Nenhum recurso corresponde aos filtros" : "Nenhuma instituição ativa cadastrada"}</h3>
                                <p>{possuiFiltros ? "Tente outra busca ou categoria." : "Instituições ativas cadastradas no painel administrativo aparecerão aqui."}</p>
                            </div>
                        )}
                    </div>

                    <aside className={styles.mapSection} aria-label="Mapa de recursos">
                        <h2 className={styles.mapHeading}>Mapa de recursos</h2>
                        <MapContainer
                            className={styles.mapCanvas}
                            center={[-14.235, -51.9253]}
                            zoom={4}
                            scrollWheelZoom
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <AjustarMapa instituicoes={recursosMapeaveis} localizacaoUsuario={localizacaoUsuario} />
                            {recursosMapeaveis.map((instituicao) => (
                                <Marker
                                    key={instituicao.id}
                                    position={[Number(instituicao.latitude), Number(instituicao.longitude)]}
                                    icon={iconeInstituicao}
                                >
                                    <Popup>
                                        <strong>{instituicao.nome}</strong>
                                        <br />
                                        {[instituicao.endereco, instituicao.cidade, instituicao.estado].filter(Boolean).join(" - ")}
                                        <br />
                                        <a href={obterUrlRota(instituicao)} target="_blank" rel="noopener noreferrer">Como chegar</a>
                                    </Popup>
                                </Marker>
                            ))}
                            {localizacaoUsuario && (
                                <CircleMarker
                                    center={[localizacaoUsuario.latitude, localizacaoUsuario.longitude]}
                                    radius={8}
                                    pathOptions={{ color: "#fffdf9", weight: 3, fillColor: "#537a67", fillOpacity: 1 }}
                                >
                                    <Popup>Sua localização aproximada</Popup>
                                </CircleMarker>
                            )}
                        </MapContainer>
                        {recursosMapeaveis.length === 0 && (
                            <p className={styles.mapNotice} role="status">
                                {recursos.length === 0
                                    ? "Cadastre instituições ativas para preencher o localizador."
                                    : "As instituições correspondentes precisam de latitude e longitude para aparecer no mapa."}
                            </p>
                        )}
                    </aside>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Recursos;