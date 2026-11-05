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

import br.itb.projeto.equita.model.entity.AnexoDenuncia;
import br.itb.projeto.equita.service.AnexoDenunciaService;

@RestController
@RequestMapping("/anexos-denuncia")
public class AnexoDenunciaController {

    private final AnexoDenunciaService anexoDenunciaService;

    public AnexoDenunciaController(AnexoDenunciaService anexoDenunciaService) {
        this.anexoDenunciaService = anexoDenunciaService;
    }

    @PostMapping("/create")
    public ResponseEntity<AnexoDenuncia> create(@RequestBody AnexoDenuncia anexo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(anexoDenunciaService.create(anexo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AnexoDenuncia> editar(@PathVariable Long id,
            @RequestBody AnexoDenuncia anexo) {
        return ResponseEntity.ok(anexoDenunciaService.editar(id, anexo));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<AnexoDenuncia> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(anexoDenunciaService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<AnexoDenuncia> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(anexoDenunciaService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<AnexoDenuncia>> findAll() {
        return ResponseEntity.ok(anexoDenunciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnexoDenuncia> findById(@PathVariable Long id) {
        return ResponseEntity.ok(anexoDenunciaService.findById(id));
    }

    @GetMapping("/denuncia/{denunciaId}")
    public ResponseEntity<List<AnexoDenuncia>> findByDenunciaId(
            @PathVariable Long denunciaId) {
        return ResponseEntity.ok(anexoDenunciaService.findByDenunciaId(denunciaId));
    }
}
