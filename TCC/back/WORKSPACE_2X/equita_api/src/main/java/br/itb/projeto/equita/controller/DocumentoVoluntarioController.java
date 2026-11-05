package br.itb.projeto.equita.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.equita.model.entity.DocumentoVoluntario;
import br.itb.projeto.equita.service.DocumentoVoluntarioService;

@RestController
@RequestMapping("/documentos-voluntario")
public class DocumentoVoluntarioController {

    private final DocumentoVoluntarioService documentoVoluntarioService;

    public DocumentoVoluntarioController(
            DocumentoVoluntarioService documentoVoluntarioService) {
        this.documentoVoluntarioService = documentoVoluntarioService;
    }

    @PostMapping("/create")
    public ResponseEntity<DocumentoVoluntario> create(
            @RequestBody DocumentoVoluntario documento) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(documentoVoluntarioService.create(documento));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DocumentoVoluntario> editar(@PathVariable Long id,
            @RequestBody DocumentoVoluntario documento) {
        return ResponseEntity.ok(documentoVoluntarioService.editar(id, documento));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<DocumentoVoluntario> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(documentoVoluntarioService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<DocumentoVoluntario> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(documentoVoluntarioService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<DocumentoVoluntario>> findAll() {
        return ResponseEntity.ok(documentoVoluntarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DocumentoVoluntario> findById(@PathVariable Long id) {
        return ResponseEntity.ok(documentoVoluntarioService.findById(id));
    }

    @GetMapping("/solicitacao/{solicitacaoId}")
    public ResponseEntity<List<DocumentoVoluntario>> findBySolicitacaoId(
            @PathVariable Long solicitacaoId) {
        return ResponseEntity.ok(
                documentoVoluntarioService.findBySolicitacaoId(solicitacaoId));
    }
}
