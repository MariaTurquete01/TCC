package br.itb.projeto.equita.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "AnexosDenuncia")
public class AnexoDenuncia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "denunciaId", nullable = false)
    private Long denunciaId; // FK → Denuncias

    @Column(name = "nomeArquivo", nullable = false, length = 255)
    private String nomeArquivo;

    @Column(name = "caminhoArquivo", length = 500)
    private String caminhoArquivo;

    @Column(name = "tipoArquivo", length = 100)
    private String tipoArquivo;

    @Column(name = "dataEnvio", nullable = false)
    private LocalDateTime dataEnvio;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo; // delete lógico: 1 = ativo | 0 = inativo

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDenunciaId() {
        return denunciaId;
    }

    public void setDenunciaId(Long denunciaId) {
        this.denunciaId = denunciaId;
    }

    public String getNomeArquivo() {
        return nomeArquivo;
    }

    public void setNomeArquivo(String nomeArquivo) {
        this.nomeArquivo = nomeArquivo;
    }

    public String getCaminhoArquivo() {
        return caminhoArquivo;
    }

    public void setCaminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    public String getTipoArquivo() {
        return tipoArquivo;
    }

    public void setTipoArquivo(String tipoArquivo) {
        this.tipoArquivo = tipoArquivo;
    }

    public LocalDateTime getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(LocalDateTime dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
