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

import br.itb.projeto.equita.model.entity.Material;
import br.itb.projeto.equita.service.MaterialService;

@RestController
@RequestMapping("/materiais")
public class MaterialController {

    private final MaterialService materialService;

    public MaterialController(MaterialService materialService) {
        this.materialService = materialService;
    }

    @PostMapping("/create")
    public ResponseEntity<Material> create(@RequestBody Material material) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(materialService.create(material));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Material> editar(@PathVariable Long id,
            @RequestBody Material material) {
        return ResponseEntity.ok(materialService.editar(id, material));
    }

    // ===== DELETE substituído por UPDATE de publicado =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Material> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Material> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Material>> findAll() {
        return ResponseEntity.ok(materialService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Material> findById(@PathVariable Long id) {
        return ResponseEntity.ok(materialService.findById(id));
    }

    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<Material>> findByCursoId(@PathVariable Long cursoId) {
        return ResponseEntity.ok(materialService.findByCursoId(cursoId));
    }
}
