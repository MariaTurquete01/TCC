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

import br.itb.projeto.equita.model.entity.Curso;
import br.itb.projeto.equita.service.CursoService;

@RestController
@RequestMapping("/cursos")
public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Curso> create(@RequestBody Curso curso) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cursoService.create(curso));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> editar(@PathVariable Long id,
            @RequestBody Curso curso) {
        return ResponseEntity.ok(cursoService.editar(id, curso));
    }

    // ===== DELETE substituído por UPDATE de publicado =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Curso> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Curso> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Curso>> findAll() {
        return ResponseEntity.ok(cursoService.findAll());
    }

    @GetMapping("/publicados")
    public ResponseEntity<List<Curso>> findPublicados() {
        return ResponseEntity.ok(cursoService.findPublicados());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> findById(@PathVariable Long id) {
        return ResponseEntity.ok(cursoService.findById(id));
    }

    @GetMapping("/voluntario/{voluntarioId}")
    public ResponseEntity<List<Curso>> findByVoluntarioId(
            @PathVariable Long voluntarioId) {
        return ResponseEntity.ok(cursoService.findByVoluntarioId(voluntarioId));
    }
}
