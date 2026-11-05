package br.itb.projeto.equita.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.CategoriaInstituicao;
import br.itb.projeto.equita.model.repository.CategoriaInstituicaoRepository;

@Service
public class CategoriaInstituicaoService {

    private final CategoriaInstituicaoRepository categoriaInstituicaoRepository;

    public CategoriaInstituicaoService(
            CategoriaInstituicaoRepository categoriaInstituicaoRepository) {
        this.categoriaInstituicaoRepository = categoriaInstituicaoRepository;
    }

    /* ================= CREATE ================= */
    public CategoriaInstituicao create(CategoriaInstituicao categoria) {

        categoria.setId(null);

        if (categoria.getNome() == null || categoria.getNome().isBlank()) {
            throw new RuntimeException("O nome da categoria é obrigatório");
        }
        if (categoria.getAtivo() == null) {
            categoria.setAtivo(true);
        }

        return categoriaInstituicaoRepository.save(categoria);
    }

    /* ================= EDITAR ================= */
    public CategoriaInstituicao editar(Long id, CategoriaInstituicao categoria) {

        CategoriaInstituicao _categoria = categoriaInstituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        if (categoria.getNome() == null || categoria.getNome().isBlank()) {
            throw new RuntimeException("O nome da categoria é obrigatório");
        }

        _categoria.setNome(categoria.getNome());
        _categoria.setDescricao(categoria.getDescricao());

        return categoriaInstituicaoRepository.save(_categoria);
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public CategoriaInstituicao inativar(Long id) {

        CategoriaInstituicao _categoria = categoriaInstituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        _categoria.setAtivo(false);

        return categoriaInstituicaoRepository.save(_categoria);
    }

    public CategoriaInstituicao ativar(Long id) {

        CategoriaInstituicao _categoria = categoriaInstituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        _categoria.setAtivo(true);

        return categoriaInstituicaoRepository.save(_categoria);
    }

    /* ================= CONSULTAS ================= */
    public List<CategoriaInstituicao> findAll() {
        return categoriaInstituicaoRepository.findAll().stream()
                .filter(categoria -> Boolean.TRUE.equals(categoria.getAtivo()))
                .toList();
    }

    public CategoriaInstituicao findById(Long id) {
        return categoriaInstituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }
}
