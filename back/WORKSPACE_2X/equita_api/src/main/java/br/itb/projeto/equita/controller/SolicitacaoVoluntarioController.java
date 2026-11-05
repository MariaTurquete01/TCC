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

import br.itb.projeto.equita.model.entity.SolicitacaoVoluntario;
import br.itb.projeto.equita.service.SolicitacaoVoluntarioService;

@RestController
@RequestMapping("/solicitacoes-voluntario")
public class SolicitacaoVoluntarioController {

    private final SolicitacaoVoluntarioService solicitacaoVoluntarioService;

    public SolicitacaoVoluntarioController(
            SolicitacaoVoluntarioService solicitacaoVoluntarioService) {
        this.solicitacaoVoluntarioService = solicitacaoVoluntarioService;
    }

    @PostMapping("/create")
    public ResponseEntity<SolicitacaoVoluntario> create(
            @RequestBody SolicitacaoVoluntario solicitacao) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(solicitacaoVoluntarioService.create(solicitacao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SolicitacaoVoluntario> editar(@PathVariable Long id,
            @RequestBody SolicitacaoVoluntario solicitacao) {
        return ResponseEntity.ok(solicitacaoVoluntarioService.editar(id, solicitacao));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<SolicitacaoVoluntario> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(solicitacaoVoluntarioService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<SolicitacaoVoluntario> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(solicitacaoVoluntarioService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<SolicitacaoVoluntario>> findAll() {
        return ResponseEntity.ok(solicitacaoVoluntarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SolicitacaoVoluntario> findById(@PathVariable Long id) {
        return ResponseEntity.ok(solicitacaoVoluntarioService.findById(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<SolicitacaoVoluntario>> findByUsuarioId(
            @PathVariable Long usuarioId) {
        return ResponseEntity.ok(solicitacaoVoluntarioService.findByUsuarioId(usuarioId));
    }
}
