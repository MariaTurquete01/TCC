package br.itb.projeto.equita.service;

import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.CategoriaDireito;
import br.itb.projeto.equita.model.repository.CategoriaDireitoRepository;

@Service
public class CategoriaDireitoService {

    private final CategoriaDireitoRepository categoriaDireitoRepository;

    public CategoriaDireitoService(
            CategoriaDireitoRepository categoriaDireitoRepository) {
        this.categoriaDireitoRepository = categoriaDireitoRepository;
    }

    /* ================= CREATE ================= */
    public CategoriaDireito create(CategoriaDireito categoria) {

        categoria.setId(null);

        if (categoria.getNome() == null || categoria.getNome().isBlank()) {
            throw new RuntimeException("O nome da categoria é obrigatório");
        }
        if (categoria.getAtivo() == null) {
            categoria.setAtivo(true);
        }

        return categoriaDireitoRepository.save(categoria);
    }

    /* ================= EDITAR ================= */
    public CategoriaDireito editar(Long id, CategoriaDireito categoria) {

        CategoriaDireito _categoria = categoriaDireitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        if (categoria.getNome() == null || categoria.getNome().isBlank()) {
            throw new RuntimeException("O nome da categoria é obrigatório");
        }

        _categoria.setNome(categoria.getNome());
        _categoria.setDescricao(categoria.getDescricao());

        return categoriaDireitoRepository.save(_categoria);
    }

    /* ===== DELETE substituído por UPDATE de ativo = 0 ===== */
    public CategoriaDireito inativar(Long id) {

        CategoriaDireito _categoria = categoriaDireitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        _categoria.setAtivo(false);

        return categoriaDireitoRepository.save(_categoria);
    }

    public CategoriaDireito ativar(Long id) {

        CategoriaDireito _categoria = categoriaDireitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));

        _categoria.setAtivo(true);

        return categoriaDireitoRepository.save(_categoria);
    }

    /* ================= CONSULTAS ================= */
    public List<CategoriaDireito> findAll() {
        return categoriaDireitoRepository.findAll();
    }

    public CategoriaDireito findById(Long id) {
        return categoriaDireitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
    }
}
