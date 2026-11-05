package br.itb.projeto.equita.model.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "Direitos")
public class Direito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoriaDireitoId", nullable = false)
    private Long categoriaDireitoId; // FK → CategoriasDireitos

    @Column(name = "titulo", nullable = false, length = 200)
    private String titulo;

    @Lob
    @Column(name = "conteudo", nullable = false)
    private String conteudo; // VARCHAR(MAX)

    @Column(name = "referenciaOrgao", length = 300)
    private String referenciaOrgao;

    @Column(name = "ativo", nullable = false)
    private Boolean ativo; // delete lógico: 1 = ativo | 0 = inativo

    @Column(name = "dataCadastro", nullable = false)
    private LocalDateTime dataCadastro;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategoriaDireitoId() {
        return categoriaDireitoId;
    }

    public void setCategoriaDireitoId(Long categoriaDireitoId) {
        this.categoriaDireitoId = categoriaDireitoId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getReferenciaOrgao() {
        return referenciaOrgao;
    }

    public void setReferenciaOrgao(String referenciaOrgao) {
        this.referenciaOrgao = referenciaOrgao;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
