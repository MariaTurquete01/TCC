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

import br.itb.projeto.equita.model.entity.CategoriaInstituicao;
import br.itb.projeto.equita.service.CategoriaInstituicaoService;

@RestController
@RequestMapping("/categorias-instituicao")
public class CategoriaInstituicaoController {

    private final CategoriaInstituicaoService categoriaInstituicaoService;

    public CategoriaInstituicaoController(
            CategoriaInstituicaoService categoriaInstituicaoService) {
        this.categoriaInstituicaoService = categoriaInstituicaoService;
    }

    @PostMapping("/create")
    public ResponseEntity<CategoriaInstituicao> create(
            @RequestBody CategoriaInstituicao categoria) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(categoriaInstituicaoService.create(categoria));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriaInstituicao> editar(@PathVariable Long id,
            @RequestBody CategoriaInstituicao categoria) {
        return ResponseEntity.ok(categoriaInstituicaoService.editar(id, categoria));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<CategoriaInstituicao> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaInstituicaoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<CategoriaInstituicao> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaInstituicaoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<CategoriaInstituicao>> findAll() {
        return ResponseEntity.ok(categoriaInstituicaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaInstituicao> findById(@PathVariable Long id) {
        return ResponseEntity.ok(categoriaInstituicaoService.findById(id));
    }
}
