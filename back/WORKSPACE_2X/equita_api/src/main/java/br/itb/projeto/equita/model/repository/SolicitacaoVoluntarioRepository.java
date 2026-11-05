package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.SolicitacaoVoluntario;

@Repository
public interface SolicitacaoVoluntarioRepository
        extends JpaRepository<SolicitacaoVoluntario, Long> {

    List<SolicitacaoVoluntario> findByUsuarioId(Long usuarioId);

    List<SolicitacaoVoluntario> findByStatus(String status);
}
