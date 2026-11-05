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

import br.itb.projeto.equita.model.entity.Denuncia;
import br.itb.projeto.equita.service.DenunciaService;

@RestController
@RequestMapping("/denuncias")
public class DenunciaController {

    private final DenunciaService denunciaService;

    public DenunciaController(DenunciaService denunciaService) {
        this.denunciaService = denunciaService;
    }

    @PostMapping("/create")
    public ResponseEntity<Denuncia> create(@RequestBody Denuncia denuncia) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(denunciaService.create(denuncia));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Denuncia> editar(@PathVariable Long id,
            @RequestBody Denuncia denuncia) {
        return ResponseEntity.ok(denunciaService.editar(id, denuncia));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Denuncia> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(denunciaService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Denuncia> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(denunciaService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Denuncia>> findAll() {
        return ResponseEntity.ok(denunciaService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Denuncia> findById(@PathVariable Long id) {
        return ResponseEntity.ok(denunciaService.findById(id));
    }

    // consulta de protocolo usada pelo frontend
    @GetMapping("/protocolo/{protocolo}")
    public ResponseEntity<Denuncia> findByProtocolo(@PathVariable String protocolo) {
        return ResponseEntity.ok(denunciaService.findByProtocolo(protocolo));
    }
}
