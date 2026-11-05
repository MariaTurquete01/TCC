package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.AnexoDenuncia;

@Repository
public interface AnexoDenunciaRepository extends JpaRepository<AnexoDenuncia, Long> {

    List<AnexoDenuncia> findByDenunciaId(Long denunciaId);
}
