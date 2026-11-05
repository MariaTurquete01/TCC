package br.itb.projeto.equita.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Denuncia;

@Repository
public interface DenunciaRepository extends JpaRepository<Denuncia, Long> {

    Optional<Denuncia> findByProtocoloAndAtivoTrue(String protocolo);
}
