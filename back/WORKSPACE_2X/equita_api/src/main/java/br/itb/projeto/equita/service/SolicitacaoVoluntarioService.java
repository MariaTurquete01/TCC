package br.itb.projeto.equita.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.itb.projeto.equita.model.entity.SolicitacaoVoluntario;
import br.itb.projeto.equita.model.entity.Usuario;
import br.itb.projeto.equita.model.repository.SolicitacaoVoluntarioRepository;
import br.itb.projeto.equita.model.repository.UsuarioRepository;

@Service
public class SolicitacaoVoluntarioService {

    private final SolicitacaoVoluntarioRepository solicitacaoVoluntarioRepository;
    private final UsuarioRepository usuarioRepository;

    public SolicitacaoVoluntarioService(
            SolicitacaoVoluntarioRepository solicitacaoVoluntarioRepository,
            UsuarioRepository usuarioRepository) {
        this.solicitacaoVoluntarioRepository = solicitacaoVoluntarioRepository;
        this.usuarioRepository = usuarioRepository;
    }

    /* ================= CREATE ================= */
    public SolicitacaoVoluntario create(SolicitacaoVoluntario solicitacao) {

        solicitacao.setId(null);

        if (solicitacao.getUsuarioId() == null
                || !usuarioRepository.existsById(solicitacao.getUsuarioId())) {
            throw new RuntimeException("Usuário não encontrado");
        }
        validarAdministrador(solicitacao.getAdministradorId());

        if (solicitacao.getStatus() == null) {
            solicitacao.setStatus("PENDENTE");
        }
        validarStatus(solicitacao.getStatus());
        validarTamanhoDosTextos(solicitacao);
        solicitacao.setDataSolicitacao(LocalDateTime.now());
        if (solicitacao.getAtivo() == null) {
            solicitacao.setAtivo(true);
        }

        return solicitacaoVoluntarioRepository.save(solicitacao);
    }

    /* ================= EDITAR ================= */
    @Transactional
    public SolicitacaoVoluntario editar(Long id, SolicitacaoVoluntario solicitacao) {

        SolicitacaoVoluntario _solicitacao = solicitacaoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        if (solicitacao.getUsuarioId() == null
                || !usuarioRepository.existsById(solicitacao.getUsuarioId())) {
            throw new RuntimeException("Usuário não encontrado");
        }
        validarAdministrador(solicitacao.getAdministradorId());
        validarStatus(solicitacao.getStatus());
        validarTamanhoDosTextos(solicitacao);

        // dataSolicitacao não muda depois de criada
        _solicitacao.setUsuarioId(solicitacao.getUsuarioId());
        _solicitacao.setStatus(solicitacao.getStatus());
        _solicitacao.setJustificativa(solicitacao.getJustificativa());
        _solicitacao.setDataAnalise(solicitacao.getDataAnalise());
        _solicitacao.setAdministradorId(solicitacao.getAdministradorId());
        _solicitacao.setObservacaoAdministrador(solicitacao.getObservacaoAdministrador());

        if ("APROVADA".equals(solicitacao.getStatus())) {
            Usuario usuario = usuarioRepository.findById(_solicitacao.getUsuarioId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            usuario.setNivelAcesso("VOLUNTARIO");
            usuario.setDataAtualizacao(LocalDateTime.now());
            usuarioRepository.save(usuario);
        }

        return solicitacaoVoluntarioRepository.save(_solicitacao);
    }

    private void validarTamanhoDosTextos(SolicitacaoVoluntario solicitacao) {
        if (solicitacao.getJustificativa() != null
                && solicitacao.getJustificativa().length() > 1000) {
            throw new RuntimeException("A justificativa deve ter no máximo 1000 caracteres");
        }
        if (solicitacao.getObservacaoAdministrador() != null
                && solicitacao.getObservacaoAdministrador().length() > 1000) {
            throw new RuntimeException("A observação do administrador deve ter no máximo 1000 caracteres");
        }
    }

    private void validarStatus(String status) {
        if (!"PENDENTE".equals(status)
                && !"APROVADA".equals(status)
                && !"REPROVADA".equals(status)) {
            throw new RuntimeException("Status da solicitação de voluntário inválido");
        }
    }

    private void validarAdministrador(Long administradorId) {
        if (administradorId == null) {
            return;
        }

        Usuario administrador = usuarioRepository.findById(administradorId)
                .orElseThrow(() -> new RuntimeException("Administrador não encontrado"));
        if (!"ADMIN".equals(administrador.getNivelAcesso())
                || !"ATIVO".equals(administrador.getStatusUsuario())) {
            throw new RuntimeException("A análise deve ser atribuída a um administrador ativo");
        }
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public SolicitacaoVoluntario inativar(Long id) {

        SolicitacaoVoluntario _solicitacao = solicitacaoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        _solicitacao.setAtivo(false);

        return solicitacaoVoluntarioRepository.save(_solicitacao);
    }

    public SolicitacaoVoluntario ativar(Long id) {

        SolicitacaoVoluntario _solicitacao = solicitacaoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        _solicitacao.setAtivo(true);

        return solicitacaoVoluntarioRepository.save(_solicitacao);
    }

    /* ================= CONSULTAS ================= */
    public List<SolicitacaoVoluntario> findAll() {
        return solicitacaoVoluntarioRepository.findAll();
    }

    public SolicitacaoVoluntario findById(Long id) {
        return solicitacaoVoluntarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
    }

    public List<SolicitacaoVoluntario> findByUsuarioId(Long usuarioId) {
        return solicitacaoVoluntarioRepository.findByUsuarioId(usuarioId);
    }
}
