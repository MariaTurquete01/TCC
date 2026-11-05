package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Direito;

@Repository
public interface DireitoRepository extends JpaRepository<Direito, Long> {

    List<Direito> findByCategoriaDireitoId(Long categoriaDireitoId);
}
