package br.itb.projeto.equita.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.CategoriaDireito;
import br.itb.projeto.equita.model.entity.Direito;
import br.itb.projeto.equita.model.repository.CategoriaDireitoRepository;
import br.itb.projeto.equita.model.repository.DireitoRepository;

@Service
public class DireitoService {

    private final DireitoRepository direitoRepository;
    private final CategoriaDireitoRepository categoriaDireitoRepository;

    public DireitoService(DireitoRepository direitoRepository,
            CategoriaDireitoRepository categoriaDireitoRepository) {
        this.direitoRepository = direitoRepository;
        this.categoriaDireitoRepository = categoriaDireitoRepository;
    }

    /* ================= CREATE ================= */
    public Direito create(Direito direito) {

        direito.setId(null);
        validarCategoria(direito.getCategoriaDireitoId());

        if (direito.getTitulo() == null || direito.getTitulo().isBlank()) {
            throw new RuntimeException("O título do direito é obrigatório");
        }
        if (direito.getConteudo() == null || direito.getConteudo().isBlank()) {
            throw new RuntimeException("O conteúdo do direito é obrigatório");
        }

        if (direito.getAtivo() == null) {
            direito.setAtivo(true);
        }
        direito.setDataCadastro(LocalDateTime.now());

        return direitoRepository.save(direito);
    }

    /* ================= EDITAR ================= */
    public Direito editar(Long id, Direito direito) {

        Direito _direito = direitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Direito não encontrado"));

        validarCategoria(direito.getCategoriaDireitoId());

        if (direito.getTitulo() == null || direito.getTitulo().isBlank()) {
            throw new RuntimeException("O título do direito é obrigatório");
        }
        if (direito.getConteudo() == null || direito.getConteudo().isBlank()) {
            throw new RuntimeException("O conteúdo do direito é obrigatório");
        }

        // ativo e dataCadastro não mudam por aqui
        _direito.setCategoriaDireitoId(direito.getCategoriaDireitoId());
        _direito.setTitulo(direito.getTitulo());
        _direito.setConteudo(direito.getConteudo());
        _direito.setReferenciaOrgao(direito.getReferenciaOrgao());

        return direitoRepository.save(_direito);
    }

    private void validarCategoria(Long categoriaDireitoId) {
        if (categoriaDireitoId == null) {
            throw new RuntimeException("Categoria de direito não encontrada");
        }

        CategoriaDireito categoria = categoriaDireitoRepository.findById(categoriaDireitoId)
                .orElseThrow(() -> new RuntimeException("Categoria de direito não encontrada"));
        if (!Boolean.TRUE.equals(categoria.getAtivo())) {
            throw new RuntimeException("A categoria de direito está inativa");
        }
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public Direito inativar(Long id) {

        Direito _direito = direitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Direito não encontrado"));

        _direito.setAtivo(false);

        return direitoRepository.save(_direito);
    }

    public Direito ativar(Long id) {

        Direito _direito = direitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Direito não encontrado"));

        _direito.setAtivo(true);

        return direitoRepository.save(_direito);
    }

    /* ================= CONSULTAS ================= */
    public List<Direito> findAll() {
        return direitoRepository.findAll();
    }

    public Direito findById(Long id) {
        return direitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Direito não encontrado"));
    }

    public List<Direito> findByCategoriaDireitoId(Long categoriaDireitoId) {
        return direitoRepository.findByCategoriaDireitoId(categoriaDireitoId);
    }
}
