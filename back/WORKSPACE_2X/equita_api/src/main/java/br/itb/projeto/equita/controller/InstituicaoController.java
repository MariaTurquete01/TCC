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

import br.itb.projeto.equita.model.entity.Instituicao;
import br.itb.projeto.equita.service.InstituicaoService;

@RestController
@RequestMapping("/instituicoes")
public class InstituicaoController {

    private final InstituicaoService instituicaoService;

    public InstituicaoController(InstituicaoService instituicaoService) {
        this.instituicaoService = instituicaoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Instituicao> create(@RequestBody Instituicao instituicao) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(instituicaoService.create(instituicao));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Instituicao> editar(@PathVariable Long id,
            @RequestBody Instituicao instituicao) {
        return ResponseEntity.ok(instituicaoService.editar(id, instituicao));
    }

    // ===== DELETE substituído por UPDATE de ativa =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Instituicao> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Instituicao> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Instituicao>> findAll() {
        return ResponseEntity.ok(instituicaoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Instituicao> findById(@PathVariable Long id) {
        return ResponseEntity.ok(instituicaoService.findById(id));
    }

    @GetMapping("/cidade/{cidade}")
    public ResponseEntity<List<Instituicao>> findByCidade(@PathVariable String cidade) {
        return ResponseEntity.ok(instituicaoService.findByCidade(cidade));
    }
}
