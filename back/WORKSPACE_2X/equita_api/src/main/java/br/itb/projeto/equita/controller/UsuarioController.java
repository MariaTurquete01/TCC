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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.itb.projeto.equita.dto.LoginDTO;
import br.itb.projeto.equita.dto.UsuarioDTO;
import br.itb.projeto.equita.model.entity.Usuario;
import br.itb.projeto.equita.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/create")
    public ResponseEntity<Usuario> create(@RequestBody Usuario usuario) {
        Usuario createdUsuario = usuarioService.create(usuario);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUsuario);
    }

    // login simples (fase 1, sem JWT): valida bcrypt e devolve o usuário sem senha
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO login) {
        try {
            return ResponseEntity.ok(usuarioService.login(login.getUsername(), login.getPassword()));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(java.util.Map.of("mensagem", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> editar(@PathVariable Long id,
            @RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.editar(id, usuario));
    }

    @PutMapping("/{id}/alterar-senha")
    public ResponseEntity<Usuario> alterarSenha(@PathVariable Long id,
            @RequestParam String newPassword) {
        return ResponseEntity.ok(usuarioService.alterarSenha(id, newPassword));
    }

    // ===== DELETE substituído por UPDATE de statusUsuario =====
    @PutMapping("/{id}/inativar")
    public ResponseEntity<Usuario> inativar(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.inativar(id));
    }

    @PutMapping("/{id}/ativar")
    public ResponseEntity<Usuario> ativar(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.ativar(id));
    }

    @PutMapping("/{id}/nivel-acesso/{nivelAcesso}")
    public ResponseEntity<Usuario> atualizarNivelAcesso(
            @PathVariable Long id,
            @PathVariable String nivelAcesso) {
        return ResponseEntity.ok(usuarioService.atualizarNivelAcesso(id, nivelAcesso));
    }

    @GetMapping("/all")
    public ResponseEntity<List<UsuarioDTO>> findAll() {
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> findById(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }
}
