package br.itb.projeto.equita.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.DocumentoVoluntario;
import br.itb.projeto.equita.model.repository.DocumentoVoluntarioRepository;
import br.itb.projeto.equita.model.repository.SolicitacaoVoluntarioRepository;

@Service
public class DocumentoVoluntarioService {

    private final DocumentoVoluntarioRepository documentoVoluntarioRepository;
    private final SolicitacaoVoluntarioRepository solicitacaoVoluntarioRepository;

    public DocumentoVoluntarioService(
            DocumentoVoluntarioRepository documentoVoluntarioRepository,
            SolicitacaoVoluntarioRepository solicitacaoVoluntarioRepository) {
        this.documentoVoluntarioRepository = documentoVoluntarioRepository;
        this.solicitacaoVoluntarioRepository = solicitacaoVoluntarioRepository;
    }

    /* ================= CREATE ================= */
    public DocumentoVoluntario create(DocumentoVoluntario documento) {

        documento.setId(null);
        validarSolicitacao(documento.getSolicitacaoId());

        if (documento.getNomeArquivo() == null || documento.getNomeArquivo().isBlank()) {
            throw new RuntimeException("O nome do arquivo é obrigatório");
        }

        documento.setDataEnvio(LocalDateTime.now());
        if (documento.getAtivo() == null) {
            documento.setAtivo(true);
        }

        return documentoVoluntarioRepository.save(documento);
    }

    /* ================= EDITAR ================= */
    public DocumentoVoluntario editar(Long id, DocumentoVoluntario documento) {

        DocumentoVoluntario _documento = documentoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado"));

        validarSolicitacao(documento.getSolicitacaoId());

        if (documento.getNomeArquivo() == null || documento.getNomeArquivo().isBlank()) {
            throw new RuntimeException("O nome do arquivo é obrigatório");
        }

        // dataEnvio não muda depois de criada
        _documento.setSolicitacaoId(documento.getSolicitacaoId());
        _documento.setNomeArquivo(documento.getNomeArquivo());
        _documento.setCaminhoArquivo(documento.getCaminhoArquivo());
        _documento.setTipoArquivo(documento.getTipoArquivo());

        return documentoVoluntarioRepository.save(_documento);
    }

    private void validarSolicitacao(Long solicitacaoId) {
        if (solicitacaoId == null
                || !solicitacaoVoluntarioRepository.existsById(solicitacaoId)) {
            throw new RuntimeException("Solicitação de voluntário não encontrada");
        }
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public DocumentoVoluntario inativar(Long id) {

        DocumentoVoluntario _documento = documentoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado"));

        _documento.setAtivo(false);

        return documentoVoluntarioRepository.save(_documento);
    }

    public DocumentoVoluntario ativar(Long id) {

        DocumentoVoluntario _documento = documentoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado"));

        _documento.setAtivo(true);

        return documentoVoluntarioRepository.save(_documento);
    }

    /* ================= CONSULTAS ================= */
    public List<DocumentoVoluntario> findAll() {
        return documentoVoluntarioRepository.findAll();
    }

    public DocumentoVoluntario findById(Long id) {
        return documentoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Documento não encontrado"));
    }

    public List<DocumentoVoluntario> findBySolicitacaoId(Long solicitacaoId) {
        return documentoVoluntarioRepository.findBySolicitacaoId(solicitacaoId);
    }
}
