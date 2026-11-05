package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Curso;

@Repository
public interface CursoRepository extends JpaRepository<Curso, Long> {

    List<Curso> findByPublicadoTrueAndStatusAprovacao(String statusAprovacao);

    List<Curso> findByVoluntarioId(Long voluntarioId);
}
