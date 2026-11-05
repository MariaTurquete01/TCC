package br.itb.projeto.equita.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Instituicao;

@Repository
public interface InstituicaoRepository extends JpaRepository<Instituicao, Long> {

    List<Instituicao> findByCidade(String cidade);

    List<Instituicao> findByCategoriaInstituicaoId(Long categoriaInstituicaoId);
}
