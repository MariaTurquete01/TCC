package br.itb.projeto.equita.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Certificados")
public class Certificado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "inscricaoId", nullable = false, unique = true)
    private Long inscricaoId; // FK → Inscricoes (1 certificado por inscrição)

    @Column(name = "codigoCertificado", nullable = false, length = 50, unique = true)
    private String codigoCertificado; // gerado pelo Service: EQ-CERT-AAAA-XXXX

    @Column(name = "dataEmissao", nullable = false)
    private LocalDateTime dataEmissao;

    @Column(name = "caminhoArquivo", length = 500)
    private String caminhoArquivo;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo; // delete lógico: 1 = ativo | 0 = inativo

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getInscricaoId() {
        return inscricaoId;
    }

    public void setInscricaoId(Long inscricaoId) {
        this.inscricaoId = inscricaoId;
    }

    public String getCodigoCertificado() {
        return codigoCertificado;
    }

    public void setCodigoCertificado(String codigoCertificado) {
        this.codigoCertificado = codigoCertificado;
    }

    public LocalDateTime getDataEmissao() {
        return dataEmissao;
    }

    public void setDataEmissao(LocalDateTime dataEmissao) {
        this.dataEmissao = dataEmissao;
    }

    public String getCaminhoArquivo() {
        return caminhoArquivo;
    }

    public void setCaminhoArquivo(String caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}
