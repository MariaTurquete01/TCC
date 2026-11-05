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

import br.itb.projeto.equita.model.entity.CategoriaDireito;
import br.itb.projeto.equita.service.CategoriaDireitoService;

@RestController
@RequestMapping("/categorias-direitos")
public class CategoriaDireitoController {

    private final CategoriaDireitoService categoriaDireitoService;

    public CategoriaDireitoController(
            CategoriaDireitoService categoriaDireitoService) {
        this.categoriaDireitoService = categoriaDireitoService;
    }

    @PostMapping("/create")
    public ResponseEntity<CategoriaDireito> create(
            @RequestBody CategoriaDireito categoria) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(categoriaDireitoService.create(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaDireito> editar(@PathVariable Long id,
            @RequestBody CategoriaDireito categoria) {
        return ResponseEntity.ok(categoriaDireitoService.editar(id, categoria));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<CategoriaDireito> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaDireitoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<CategoriaDireito> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaDireitoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoriaDireito>> findAll() {
        return ResponseEntity.ok(categoriaDireitoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaDireito> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaDireitoService.findById(id));
    }
}
