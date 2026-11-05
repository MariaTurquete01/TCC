package br.itb.projeto.equita.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.CategoriaDireito;

@Repository
public interface CategoriaDireitoRepository
        extends JpaRepository<CategoriaDireito, Long> {
}
