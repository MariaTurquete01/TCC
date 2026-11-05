package br.itb.projeto.equita.model.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "Denuncias")
public class Denuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "protocolo", nullable = false, length = 40, unique = true)
    private String protocolo; // gerado pelo Service: EQ-xxxxxxxx...

    @Column(name = "usuarioId")
    private Long usuarioId; // FK → Usuario (NULL quando anônima)

    @Column(name = "instituicaoResponsavelId")
    private Long instituicaoResponsavelId; // FK → Instituicoes

    @Column(name = "tipoDenuncia", nullable = false, length = 100)
    private String tipoDenuncia;

    @Lob
    @Column(name = "descricao", nullable = false)
    private String descricao; // VARCHAR(MAX)

    @Column(name = "dataOcorrencia", nullable = false)
    private LocalDate dataOcorrencia;

    @Column(name = "localOcorrencia", length = 300)
    private String localOcorrencia;

    @Column(name = "cidadeOcorrencia", length = 100)
    private String cidadeOcorrencia;

    @Column(name = "estadoOcorrencia", length = 2)
    private String estadoOcorrencia;

    @Column(name = "denunciaAnonima", nullable = false)
    private Boolean denunciaAnonima;

    @Column(name = "status", nullable = false, length = 30)
    private String status; // RECEBIDA | EM_ANALISE | ENCAMINHADA | EM_ATENDIMENTO | FINALIZADA

    @Column(name = "dataRegistro", nullable = false)
    private LocalDateTime dataRegistro;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo; // delete lógico: 1 = ativo | 0 = inativo

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProtocolo() {
        return protocolo;
    }

    public void setProtocolo(String protocolo) {
        this.protocolo = protocolo;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Long getInstituicaoResponsavelId() {
        return instituicaoResponsavelId;
    }

    public void setInstituicaoResponsavelId(Long instituicaoResponsavelId) {
        this.instituicaoResponsavelId = instituicaoResponsavelId;
    }

    public String getTipoDenuncia() {
        return tipoDenuncia;
    }

    public void setTipoDenuncia(String tipoDenuncia) {
        this.tipoDenuncia = tipoDenuncia;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getDataOcorrencia() {
        return dataOcorrencia;
    }

    public void setDataOcorrencia(LocalDate dataOcorrencia) {
        this.dataOcorrencia = dataOcorrencia;
    }

    public String getLocalOcorrencia() {
        return localOcorrencia;
    }

    public void setLocalOcorrencia(String localOcorrencia) {
        this.localOcorrencia = localOcorrencia;
    }

    public String getCidadeOcorrencia() {
        return cidadeOcorrencia;
    }

    public void setCidadeOcorrencia(String cidadeOcorrencia) {
        this.cidadeOcorrencia = cidadeOcorrencia;
    }

    public String getEstadoOcorrencia() {
        return estadoOcorrencia;
    }

    public void setEstadoOcorrencia(String estadoOcorrencia) {
        this.estadoOcorrencia = estadoOcorrencia;
    }

    public Boolean getDenunciaAnonima() {
        return denunciaAnonima;
    }

    public void setDenunciaAnonima(Boolean denunciaAnonima) {
        this.denunciaAnonima = denunciaAnonima;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getDataRegistro() {
        return dataRegistro;
    }

    public void setDataRegistro(LocalDateTime dataRegistro) {
        this.dataRegistro = dataRegistro;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
