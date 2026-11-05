package br.itb.projeto.equita.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.Certificado;
import br.itb.projeto.equita.model.entity.Inscricao;
import br.itb.projeto.equita.model.repository.CertificadoRepository;
import br.itb.projeto.equita.model.repository.InscricaoRepository;

@Service
public class CertificadoService {

    private final CertificadoRepository certificadoRepository;
    private final InscricaoRepository inscricaoRepository;

    public CertificadoService(CertificadoRepository certificadoRepository,
            InscricaoRepository inscricaoRepository) {
        this.certificadoRepository = certificadoRepository;
        this.inscricaoRepository = inscricaoRepository;
    }

    /* ================= CREATE ================= */
    public Certificado create(Certificado certificado) {

        certificado.setId(null);
        validarInscricao(certificado.getInscricaoId());

        // regra de negócio: 1 inscrição => 1 certificado
        if (certificadoRepository
                .findByInscricaoId(certificado.getInscricaoId()).isPresent()) {
            throw new RuntimeException("Já existe certificado para esta inscrição");
        }

        // código gerado automaticamente quando não informado
        if (certificado.getCodigoCertificado() == null
                || certificado.getCodigoCertificado().isBlank()) {
            certificado.setCodigoCertificado(gerarCodigoCertificado());
        } else if (certificadoRepository
                .findByCodigoCertificado(certificado.getCodigoCertificado()).isPresent()) {
            throw new RuntimeException("Código de certificado já cadastrado");
        }

        certificado.setDataEmissao(LocalDateTime.now());
        if (certificado.getAtivo() == null) {
            certificado.setAtivo(true);
        }

        return certificadoRepository.save(certificado);
    }

    /* ================= EDITAR ================= */
    public Certificado editar(Long id, Certificado certificado) {

        Certificado _certificado = certificadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));

        validarInscricao(certificado.getInscricaoId());

        if (certificado.getInscricaoId() != null
                && !certificado.getInscricaoId().equals(_certificado.getInscricaoId())
                && certificadoRepository
                        .findByInscricaoId(certificado.getInscricaoId()).isPresent()) {
            throw new RuntimeException("Já existe certificado para esta inscrição");
        }

        // codigoCertificado e dataEmissao são gerados no create e não mudam
        _certificado.setInscricaoId(certificado.getInscricaoId());
        _certificado.setCaminhoArquivo(certificado.getCaminhoArquivo());

        return certificadoRepository.save(_certificado);
    }

    private void validarInscricao(Long inscricaoId) {
        if (inscricaoId == null) {
            throw new RuntimeException("Inscrição não encontrada");
        }

        Inscricao inscricao = inscricaoRepository.findById(inscricaoId)
                .orElseThrow(() -> new RuntimeException("Inscrição não encontrada"));
        if (!Boolean.TRUE.equals(inscricao.getAtivo())) {
            throw new RuntimeException("Não é possível emitir certificado para inscrição inativa");
        }
        if (!Boolean.TRUE.equals(inscricao.getConcluido())
                || inscricao.getPercentualProgresso() == null
                || inscricao.getPercentualProgresso().compareTo(BigDecimal.valueOf(100)) < 0) {
            throw new RuntimeException("A inscrição precisa estar concluída para emitir certificado");
        }
    }

    // formato: EQ-CERT-<ano>-<8 caracteres aleatórios>
    private String gerarCodigoCertificado() {
        String codigo;
        do {
            String sufixo = UUID.randomUUID().toString()
                    .replace("-", "").toUpperCase();
            codigo = "EQ-CERT-" + LocalDateTime.now().getYear()
                    + "-" + sufixo.substring(0, 8);
        } while (certificadoRepository.findByCodigoCertificado(codigo).isPresent());
        return codigo;
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public Certificado inativar(Long id) {

        Certificado _certificado = certificadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));

        _certificado.setAtivo(false);

        return certificadoRepository.save(_certificado);
    }

    public Certificado ativar(Long id) {

        Certificado _certificado = certificadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));

        _certificado.setAtivo(true);

        return certificadoRepository.save(_certificado);
    }

    /* ================= CONSULTAS ================= */
    public List<Certificado> findAll() {
        return certificadoRepository.findAll();
    }

    public Certificado findById(Long id) {
        return certificadoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));
    }

    public Certificado findByInscricaoId(Long inscricaoId) {
        return certificadoRepository.findByInscricaoId(inscricaoId)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));
    }

    public Certificado findByCodigoCertificado(String codigoCertificado) {
        return certificadoRepository.findByCodigoCertificado(codigoCertificado)
                .orElseThrow(() -> new RuntimeException("Certificado não encontrado"));
    }
}
