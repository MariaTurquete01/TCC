package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Material;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {

    List<Material> findByCursoId(Long cursoId);

    List<Material> findByPublicadoTrue();
}
