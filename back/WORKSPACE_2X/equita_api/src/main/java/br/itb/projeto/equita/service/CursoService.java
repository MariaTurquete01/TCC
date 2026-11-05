package br.itb.projeto.equita.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.Curso;
import br.itb.projeto.equita.model.entity.Usuario;
import br.itb.projeto.equita.model.repository.CursoRepository;
import br.itb.projeto.equita.model.repository.UsuarioRepository;

@Service
public class CursoService {

    private final CursoRepository cursoRepository;
    private final UsuarioRepository usuarioRepository;

    public CursoService(CursoRepository cursoRepository,
            UsuarioRepository usuarioRepository) {
        this.cursoRepository = cursoRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /* ================= CREATE ================= */
    public Curso create(Curso curso) {

        curso.setId(null);
        validarVoluntario(curso.getVoluntarioId());

        if (curso.getTitulo() == null || curso.getTitulo().isBlank()) {
            throw new RuntimeException("O título do curso é obrigatório");
        }
        if (curso.getDescricao() == null || curso.getDescricao().isBlank()) {
            throw new RuntimeException("A descrição do curso é obrigatória");
        }

        curso.setStatusAprovacao("PENDENTE");
        curso.setPublicado(false);
        curso.setDataCadastro(LocalDateTime.now());
        curso.setDataAtualizacao(null);

        return cursoRepository.save(curso);
    }

    /* ================= EDITAR ================= */
    public Curso editar(Long id, Curso curso) {

        Curso _curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        validarVoluntario(curso.getVoluntarioId());

        if (curso.getTitulo() == null || curso.getTitulo().isBlank()) {
            throw new RuntimeException("O título do curso é obrigatório");
        }
        if (curso.getDescricao() == null || curso.getDescricao().isBlank()) {
            throw new RuntimeException("A descrição do curso é obrigatória");
        }
        validarStatusAprovacao(curso.getStatusAprovacao());

        _curso.setVoluntarioId(curso.getVoluntarioId());
        _curso.setTitulo(curso.getTitulo());
        _curso.setDescricao(curso.getDescricao());
        _curso.setCargaHoraria(curso.getCargaHoraria());
        _curso.setStatusAprovacao(curso.getStatusAprovacao());
        if (!"APROVADO".equals(curso.getStatusAprovacao())) {
            _curso.setPublicado(false);
        }
        _curso.setDataAtualizacao(LocalDateTime.now());

        return cursoRepository.save(_curso);
    }

    private void validarVoluntario(Long voluntarioId) {
        if (voluntarioId == null) {
            throw new RuntimeException("Usuário voluntário não encontrado");
        }

        Usuario usuario = usuarioRepository.findById(voluntarioId)
                .orElseThrow(() -> new RuntimeException("Usuário voluntário não encontrado"));
        if (!"VOLUNTARIO".equals(usuario.getNivelAcesso())
                || !"ATIVO".equals(usuario.getStatusUsuario())) {
            throw new RuntimeException("É necessário um usuário ativo com perfil de voluntário");
        }
    }

    private void validarStatusAprovacao(String statusAprovacao) {
        if (!"PENDENTE".equals(statusAprovacao)
                && !"APROVADO".equals(statusAprovacao)
                && !"REPROVADO".equals(statusAprovacao)) {
            throw new RuntimeException("Status de aprovação do curso inválido");
        }
    }

    /* === DELETE substituído por UPDATE de publicado = 0 === */
    public Curso inativar(Long id) {

        Curso _curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        _curso.setPublicado(false);
        _curso.setDataAtualizacao(LocalDateTime.now());

        return cursoRepository.save(_curso);
    }

    public Curso ativar(Long id) {

        Curso _curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        if (!"APROVADO".equals(_curso.getStatusAprovacao())) {
            throw new RuntimeException("Somente cursos aprovados podem ser publicados");
        }

        _curso.setPublicado(true);
        _curso.setDataAtualizacao(LocalDateTime.now());

        return cursoRepository.save(_curso);
    }

    /* ================= CONSULTAS ================= */
    public List<Curso> findAll() {
        return cursoRepository.findAll();
    }

    public Curso findById(Long id) {
        return cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));
    }

    // catálogo: só cursos publicados
    public List<Curso> findPublicados() {
        return cursoRepository.findByPublicadoTrueAndStatusAprovacao("APROVADO");
    }

    public List<Curso> findByVoluntarioId(Long voluntarioId) {
        return cursoRepository.findByVoluntarioId(voluntarioId);
    }
}
