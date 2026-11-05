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

import br.itb.projeto.equita.model.entity.Inscricao;
import br.itb.projeto.equita.service.InscricaoService;

@RestController
@RequestMapping("/inscricoes")
public class InscricaoController {

    private final InscricaoService inscricaoService;

    public InscricaoController(InscricaoService inscricaoService) {
        this.inscricaoService = inscricaoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Inscricao> create(@RequestBody Inscricao inscricao) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(inscricaoService.create(inscricao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inscricao> editar(@PathVariable Long id,
            @RequestBody Inscricao inscricao) {
        return ResponseEntity.ok(inscricaoService.editar(id, inscricao));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Inscricao> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(inscricaoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Inscricao> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(inscricaoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Inscricao>> findAll() {
        return ResponseEntity.ok(inscricaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inscricao> findById(@PathVariable Long id) {
        return ResponseEntity.ok(inscricaoService.findById(id));
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Inscricao>> findByUsuarioId(
            @PathVariable Long usuarioId) {
        return ResponseEntity.ok(inscricaoService.findByUsuarioId(usuarioId));
    }
}
