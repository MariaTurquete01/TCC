package br.itb.projeto.equita.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import br.itb.projeto.equita.model.entity.CategoriaInstituicao;
import br.itb.projeto.equita.model.entity.Instituicao;
import br.itb.projeto.equita.model.repository.CategoriaInstituicaoRepository;
import br.itb.projeto.equita.model.repository.InstituicaoRepository;

@Service
public class InstituicaoService {

    private final InstituicaoRepository instituicaoRepository;
    private final CategoriaInstituicaoRepository categoriaInstituicaoRepository;

    public InstituicaoService(InstituicaoRepository instituicaoRepository,
            CategoriaInstituicaoRepository categoriaInstituicaoRepository) {
        this.instituicaoRepository = instituicaoRepository;
        this.categoriaInstituicaoRepository = categoriaInstituicaoRepository;
    }

    /* ================= CREATE ================= */
    public Instituicao create(Instituicao instituicao) {

        instituicao.setId(null);

        validarCamposObrigatorios(instituicao);
        validarCategoriaAtiva(instituicao.getCategoriaInstituicaoId());

        if (instituicao.getAtiva() == null) {
            instituicao.setAtiva(true);
        }
        instituicao.setDataCadastro(LocalDateTime.now());
        instituicao.setDataAtualizacao(null);

        return instituicaoRepository.save(instituicao);
    }

    /* ================= EDITAR ================= */
    public Instituicao editar(Long id, Instituicao instituicao) {

        Instituicao _instituicao = instituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));

        validarCamposObrigatorios(instituicao);
        validarCategoriaAtiva(instituicao.getCategoriaInstituicaoId());

        _instituicao.setCategoriaInstituicaoId(instituicao.getCategoriaInstituicaoId());
        _instituicao.setNome(instituicao.getNome());
        _instituicao.setDescricao(instituicao.getDescricao());
        _instituicao.setEndereco(instituicao.getEndereco());
        _instituicao.setCidade(instituicao.getCidade());
        _instituicao.setEstado(instituicao.getEstado());
        _instituicao.setCep(instituicao.getCep());
        _instituicao.setTelefone(instituicao.getTelefone());
        _instituicao.setEmail(instituicao.getEmail());
        _instituicao.setHorarioFuncionamento(instituicao.getHorarioFuncionamento());
        _instituicao.setLatitude(instituicao.getLatitude());
        _instituicao.setLongitude(instituicao.getLongitude());
        _instituicao.setDataAtualizacao(LocalDateTime.now());

        return instituicaoRepository.save(_instituicao);
    }

    private void validarCategoriaAtiva(Long categoriaInstituicaoId) {
        if (categoriaInstituicaoId == null) {
            throw new RuntimeException("Categoria de instituição não encontrada");
        }

        CategoriaInstituicao categoria = categoriaInstituicaoRepository.findById(categoriaInstituicaoId)
                .orElseThrow(() -> new RuntimeException("Categoria de instituição não encontrada"));
        if (!Boolean.TRUE.equals(categoria.getAtivo())) {
            throw new RuntimeException("A categoria de instituição está inativa");
        }
    }

    private void validarCamposObrigatorios(Instituicao instituicao) {
        if (instituicao.getNome() == null || instituicao.getNome().isBlank()) {
            throw new RuntimeException("O nome da instituição é obrigatório");
        }
        if (instituicao.getEndereco() == null || instituicao.getEndereco().isBlank()) {
            throw new RuntimeException("O endereço da instituição é obrigatório");
        }
        if (instituicao.getCidade() == null || instituicao.getCidade().isBlank()) {
            throw new RuntimeException("A cidade da instituição é obrigatória");
        }
        if (instituicao.getEstado() == null || instituicao.getEstado().isBlank()) {
            throw new RuntimeException("O estado da instituição é obrigatório");
        }

        validarComprimento("nome", instituicao.getNome(), 150);
        validarComprimento("descrição", instituicao.getDescricao(), 500);
        validarComprimento("endereço", instituicao.getEndereco(), 250);
        validarComprimento("cidade", instituicao.getCidade(), 100);
        validarComprimento("estado", instituicao.getEstado(), 2);
        validarComprimento("CEP", instituicao.getCep(), 10);
        validarComprimento("telefone", instituicao.getTelefone(), 30);
        validarComprimento("e-mail", instituicao.getEmail(), 150);
        validarComprimento("horário de funcionamento", instituicao.getHorarioFuncionamento(), 200);
        validarCoordenadas(instituicao);
    }

    private void validarCoordenadas(Instituicao instituicao) {
        BigDecimal latitude = instituicao.getLatitude();
        BigDecimal longitude = instituicao.getLongitude();

        if ((latitude == null) != (longitude == null)) {
            throw new RuntimeException("Informe latitude e longitude juntas");
        }
        if (latitude != null
                && (latitude.compareTo(BigDecimal.valueOf(-90)) < 0
                        || latitude.compareTo(BigDecimal.valueOf(90)) > 0)) {
            throw new RuntimeException("A latitude deve estar entre -90 e 90");
        }
        if (longitude != null
                && (longitude.compareTo(BigDecimal.valueOf(-180)) < 0
                        || longitude.compareTo(BigDecimal.valueOf(180)) > 0)) {
            throw new RuntimeException("A longitude deve estar entre -180 e 180");
        }
    }

    private void validarComprimento(String campo, String valor, int maximo) {
        if (valor != null && valor.length() > maximo) {
            throw new RuntimeException("O campo " + campo + " deve ter no máximo " + maximo + " caracteres");
        }
    }

    /* ===== DELETE substituído por UPDATE de ativa = 0 ===== */
    public Instituicao inativar(Long id) {

        Instituicao _instituicao = instituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));

        _instituicao.setAtiva(false);
        _instituicao.setDataAtualizacao(LocalDateTime.now());

        return instituicaoRepository.save(_instituicao);
    }

    public Instituicao ativar(Long id) {

        Instituicao _instituicao = instituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));

        _instituicao.setAtiva(true);
        _instituicao.setDataAtualizacao(LocalDateTime.now());

        return instituicaoRepository.save(_instituicao);
    }

    /* ================= CONSULTAS ================= */
    public List<Instituicao> findAll() {
        return instituicaoRepository.findAll();
    }

    public Instituicao findById(Long id) {
        return instituicaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Instituição não encontrada"));
    }

    public List<Instituicao> findByCidade(String cidade) {
        return instituicaoRepository.findByCidade(cidade);
    }
}
