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

import br.itb.projeto.equita.model.entity.Direito;
import br.itb.projeto.equita.service.DireitoService;

@RestController
@RequestMapping("/direitos")
public class DireitoController {

    private final DireitoService direitoService;

    public DireitoController(DireitoService direitoService) {
        this.direitoService = direitoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Direito> create(@RequestBody Direito direito) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(direitoService.create(direito));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Direito> editar(@PathVariable Long id,
            @RequestBody Direito direito) {
        return ResponseEntity.ok(direitoService.editar(id, direito));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Direito> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(direitoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Direito> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(direitoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Direito>> findAll() {
        return ResponseEntity.ok(direitoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Direito> findById(@PathVariable Long id) {
        return ResponseEntity.ok(direitoService.findById(id));
    }

    @GetMapping("/categoria/{categoriaDireitoId}")
    public ResponseEntity<List<Direito>> findByCategoriaDireitoId(
            @PathVariable Long categoriaDireitoId) {
        return ResponseEntity.ok(
                direitoService.findByCategoriaDireitoId(categoriaDireitoId));
    }
}
