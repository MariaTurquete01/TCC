package br.itb.projeto.equita.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.itb.projeto.equita.model.entity.Certificado;

@Repository
public interface CertificadoRepository extends JpaRepository<Certificado, Long> {

    Optional<Certificado> findByInscricaoId(Long inscricaoId);

    Optional<Certificado> findByCodigoCertificado(String codigoCertificado);
}
