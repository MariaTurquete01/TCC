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

import br.itb.projeto.equita.model.entity.Certificado;
import br.itb.projeto.equita.service.CertificadoService;

@RestController
@RequestMapping("/certificados")
public class CertificadoController {

    private final CertificadoService certificadoService;

    public CertificadoController(CertificadoService certificadoService) {
        this.certificadoService = certificadoService;
    }

    @PostMapping("/create")
    public ResponseEntity<Certificado> create(@RequestBody Certificado certificado) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(certificadoService.create(certificado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certificado> editar(@PathVariable Long id,
            @RequestBody Certificado certificado) {
        return ResponseEntity.ok(certificadoService.editar(id, certificado));
    }

    // ===== DELETE substituído por UPDATE de ativo =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Certificado> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(certificadoService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Certificado> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(certificadoService.ativar(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Certificado>> findAll() {
        return ResponseEntity.ok(certificadoService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certificado> findById(@PathVariable Long id) {
        return ResponseEntity.ok(certificadoService.findById(id));
    }

    @GetMapping("/inscricao/{inscricaoId}")
    public ResponseEntity<Certificado> findByInscricaoId(
            @PathVariable Long inscricaoId) {
        return ResponseEntity.ok(certificadoService.findByInscricaoId(inscricaoId));
    }

    @GetMapping("/codigo/{codigoCertificado}")
    public ResponseEntity<Certificado> findByCodigoCertificado(
            @PathVariable String codigoCertificado) {
        return ResponseEntity.ok(
                certificadoService.findByCodigoCertificado(codigoCertificado));
    }
}
