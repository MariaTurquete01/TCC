package br.itb.projeto.equita.model.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Inscricao;

@Repository
public interface InscricaoRepository extends JpaRepository<Inscricao, Long> {

    List<Inscricao> findByUsuarioId(Long usuarioId);

    Optional<Inscricao> findByUsuarioIdAndCursoId(Long usuarioId, Long cursoId);
}
