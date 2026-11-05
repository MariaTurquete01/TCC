package br.itb.projeto.equita.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SolicitacoesVoluntario")
public class SolicitacaoVoluntario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "usuarioId", nullable = false)
    private Long usuarioId; // FK → Usuario

    @Column(name = "status", nullable = false, length = 20)
    private String status; // PENDENTE | APROVADA | REPROVADA

    @Column(name = "justificativa", length = 1000)
    private String justificativa;

    @Column(name = "dataSolicitacao", nullable = false)
    private LocalDateTime dataSolicitacao;

    @Column(name = "dataAnalise")
    private LocalDateTime dataAnalise;

    @Column(name = "administradorId")
    private Long administradorId; // FK → Usuario (ADMIN que analisou)

    @Column(name = "observacaoAdministrador", length = 1000)
    private String observacaoAdministrador;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo; // delete lógico: 1 = ativo | 0 = inativo

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getJustificativa() {
        return justificativa;
    }

    public void setJustificativa(String justificativa) {
        this.justificativa = justificativa;
    }

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public LocalDateTime getDataAnalise() {
        return dataAnalise;
    }

    public void setDataAnalise(LocalDateTime dataAnalise) {
        this.dataAnalise = dataAnalise;
    }

    public Long getAdministradorId() {
        return administradorId;
    }

    public void setAdministradorId(Long administradorId) {
        this.administradorId = administradorId;
    }

    public String getObservacaoAdministrador() {
        return observacaoAdministrador;
    }

    public void setObservacaoAdministrador(String observacaoAdministrador) {
        this.observacaoAdministrador = observacaoAdministrador;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
