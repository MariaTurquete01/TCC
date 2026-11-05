package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.DocumentoVoluntario;

@Repository
public interface DocumentoVoluntarioRepository
        extends JpaRepository<DocumentoVoluntario, Long> {

    List<DocumentoVoluntario> findBySolicitacaoId(Long solicitacaoId);
}
