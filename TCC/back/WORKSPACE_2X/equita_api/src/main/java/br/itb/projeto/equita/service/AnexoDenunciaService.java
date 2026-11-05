package br.itb.projeto.equita.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.AnexoDenuncia;
import br.itb.projeto.equita.model.repository.AnexoDenunciaRepository;
import br.itb.projeto.equita.model.repository.DenunciaRepository;

@Service
public class AnexoDenunciaService {

    private final AnexoDenunciaRepository anexoDenunciaRepository;
    private final DenunciaRepository denunciaRepository;

    public AnexoDenunciaService(AnexoDenunciaRepository anexoDenunciaRepository,
            DenunciaRepository denunciaRepository) {
        this.anexoDenunciaRepository = anexoDenunciaRepository;
        this.denunciaRepository = denunciaRepository;
    }

    /* ================= CREATE ================= */
    public AnexoDenuncia create(AnexoDenuncia anexo) {

        anexo.setId(null);
        validarDenuncia(anexo.getDenunciaId());

        if (anexo.getNomeArquivo() == null || anexo.getNomeArquivo().isBlank()) {
            throw new RuntimeException("O nome do arquivo é obrigatório");
        }

        anexo.setDataEnvio(LocalDateTime.now());
        if (anexo.getAtivo() == null) {
            anexo.setAtivo(true);
        }

        return anexoDenunciaRepository.save(anexo);
    }

    /* ================= EDITAR ================= */
    public AnexoDenuncia editar(Long id, AnexoDenuncia anexo) {

        AnexoDenuncia _anexo = anexoDenunciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));

        validarDenuncia(anexo.getDenunciaId());

        if (anexo.getNomeArquivo() == null || anexo.getNomeArquivo().isBlank()) {
            throw new RuntimeException("O nome do arquivo é obrigatório");
        }

        // dataEnvio não muda depois de criada
        _anexo.setDenunciaId(anexo.getDenunciaId());
        _anexo.setNomeArquivo(anexo.getNomeArquivo());
        _anexo.setCaminhoArquivo(anexo.getCaminhoArquivo());
        _anexo.setTipoArquivo(anexo.getTipoArquivo());

        return anexoDenunciaRepository.save(_anexo);
    }

    private void validarDenuncia(Long denunciaId) {
        if (denunciaId == null || !denunciaRepository.existsById(denunciaId)) {
            throw new RuntimeException("Denúncia não encontrada");
        }
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public AnexoDenuncia inativar(Long id) {

        AnexoDenuncia _anexo = anexoDenunciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));

        _anexo.setAtivo(false);

        return anexoDenunciaRepository.save(_anexo);
    }

    public AnexoDenuncia ativar(Long id) {

        AnexoDenuncia _anexo = anexoDenunciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));

        _anexo.setAtivo(true);

        return anexoDenunciaRepository.save(_anexo);
    }

    /* ================= CONSULTAS ================= */
    public List<AnexoDenuncia> findAll() {
        return anexoDenunciaRepository.findAll();
    }

    public AnexoDenuncia findById(Long id) {
        return anexoDenunciaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Anexo não encontrado"));
    }

    public List<AnexoDenuncia> findByDenunciaId(Long denunciaId) {
        return anexoDenunciaRepository.findByDenunciaId(denunciaId);
    }
}
