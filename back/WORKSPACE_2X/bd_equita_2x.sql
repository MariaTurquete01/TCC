/*

    BANCO DE DADOS - EQUITÁ 2X
    ==========================

    Sistema de Apoio Social e Cidadania (TCC - Ensino Médio)

    SGBD: Microsoft SQL Server

    Script criado a partir de duas referências da pasta:
      - bd_equita.sql ......... modelo original das tabelas do Equitá
      - bd_pizzaria_2x.sql .... estilo de "esquema de desenvolvimento"
                                (DROP/CREATE do banco, tabelas simples com
                                 INT IDENTITY + PRIMARY KEY (id), colunas em
                                 camelCase, SMALLDATETIME DEFAULT GETDATE(),
                                 dados de teste e consultas no final)

    FASE 1 - tabelas incluídas (nesta ordem):
      Usuario (base), SolicitacoesVoluntario, DocumentosVoluntario,
      CategoriasInstituicao, Instituicoes, Denuncias, AnexosDenuncia,
      CategoriasDireitos, Direitos, Cursos, Materiais, Inscricoes,
      Certificados

    Boas práticas aplicadas (sem rotinas sofisticadas de produção):
      - Chaves estrangeiras NOMEADAS, unindo as tabelas entre si
      - Chaves únicas onde existe risco de duplicidade
        (protocolo, e-mail, código do certificado, par usuário+curso)
      - CHECK nos campos de status (valores permitidos documentados)
      - Índices nas colunas mais consultadas
      - Dados de teste cobrindo TODAS as tabelas
      - Consultas com JOIN no final, provando que os relacionamentos funcionam

    Observações:
      - A tabela Usuario entra nesta fase porque 5 das tabelas pedidas
        guardam o usuário responsável (sem ela não seria possível criar
        as chaves estrangeiras)
      - Senha de todos os usuários de teste: 12345678
        (hash bcrypt, mesmo exemplo do bd_pizzaria_2x.sql)
      - As chaves estrangeiras NÃO usam ON DELETE CASCADE: antes de excluir
        um registro pai, exclua primeiro os filhos (mais simples de entender)
      - DELETE LÓGICO: nenhuma tabela é apagada de verdade. A API substitui
        o DELETE por UPDATE de status → Usuario: statusUsuario = 'INATIVO',
        Instituicoes: ativa = 0, Cursos/Materiais: publicado = 0 e as demais
        tabelas: ativo = 0 (coluna ativo adicionada para o delete lógico)

*/

-- ============================================================
-- CRIAR O BANCO (mesmo padrão do bd_pizzaria_2x.sql)
-- ============================================================
USE master
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'bd_equita_2x')
    DROP DATABASE bd_equita_2x
GO

CREATE DATABASE bd_equita_2x
GO

USE bd_equita_2x
GO

-- ============================================================
-- 1. USUARIO (tabela base do esquema de desenvolvimento)
--    Necessária para as FK de SolicitacoesVoluntario, Denuncias,
--    Cursos, Materiais e Inscricoes.
-- ============================================================
CREATE TABLE Usuario
(
    id              INT            IDENTITY,
    nome            VARCHAR(254)   NOT NULL,
    username        VARCHAR(255)   NOT NULL UNIQUE, -- e-mail usado no login
    password        VARCHAR(100)   NOT NULL,        -- senha em hash bcrypt
    nivelAcesso     VARCHAR(10)    NULL,            -- ADMIN, USER ou VOLUNTARIO
    dataCadastro    SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    dataAtualizacao SMALLDATETIME  NULL,
    statusUsuario   VARCHAR(20)    NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO ou TROCAR_SENHA

    PRIMARY KEY (id)
);
GO

-- senha de todos: 12345678 (hash bcrypt igual ao do bd_pizzaria_2x.sql)
INSERT INTO Usuario (nome, username, password, nivelAcesso, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Administrador do Sistema', 'admin@equita.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'ADMIN', GETDATE(), NULL, 'ATIVO')
INSERT INTO Usuario (nome, username, password, nivelAcesso, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Ana Souza', 'ana@equita.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'VOLUNTARIO', GETDATE(), NULL, 'ATIVO')
INSERT INTO Usuario (nome, username, password, nivelAcesso, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Bruno Lima', 'bruno@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', GETDATE(), NULL, 'ATIVO')
INSERT INTO Usuario (nome, username, password, nivelAcesso, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Carla Mendes', 'carla@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', GETDATE(), NULL, 'ATIVO')
GO

-- ============================================================
-- 2. SOLICITACOES DE VOLUNTARIO
--    Um usuário pede para virar voluntário; o administrador analisa.
-- ============================================================
CREATE TABLE SolicitacoesVoluntario
(
    id                      INT            IDENTITY,
    usuarioId               INT            NOT NULL,
    status                  VARCHAR(20)    NOT NULL DEFAULT 'PENDENTE', -- PENDENTE, APROVADA ou REPROVADA
    justificativa           VARCHAR(1000)  NULL,
    dataSolicitacao         SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    dataAnalise             SMALLDATETIME  NULL,
    administradorId         INT            NULL, -- quem analisou
    observacaoAdministrador VARCHAR(1000)  NULL,
    ativo                   BIT            NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT FK_SolicitacoesVoluntario_Usuario
        FOREIGN KEY (usuarioId) REFERENCES Usuario(id),

    CONSTRAINT FK_SolicitacoesVoluntario_Administrador
        FOREIGN KEY (administradorId) REFERENCES Usuario(id),

    CONSTRAINT CK_SolicitacoesVoluntario_Status
        CHECK (status IN ('PENDENTE', 'APROVADA', 'REPROVADA'))
);
GO

-- Observação: os valores fixos das chaves estrangeiras abaixo (1, 2, 3...)
-- são seguros porque este script SEMPRE recria o banco do zero.
INSERT INTO SolicitacoesVoluntario (usuarioId, status, justificativa, dataSolicitacao, dataAnalise, administradorId, observacaoAdministrador)
VALUES (2, 'APROVADA', 'Quero ajudar em campanhas de conscientização sobre direitos humanos.', GETDATE(), GETDATE(), 1, 'Perfil aprovado pela coordenação.')
INSERT INTO SolicitacoesVoluntario (usuarioId, status, justificativa, dataSolicitacao, dataAnalise, administradorId, observacaoAdministrador)
VALUES (3, 'PENDENTE', 'Gostaria de colaborar com cursos sobre direitos do idoso.', GETDATE(), NULL, NULL, NULL)
GO

-- ============================================================
-- 3. DOCUMENTOS DO VOLUNTARIO (anexos da solicitação)
-- ============================================================
CREATE TABLE DocumentosVoluntario
(
    id             INT            IDENTITY,
    solicitacaoId  INT            NOT NULL,
    nomeArquivo    VARCHAR(255)   NOT NULL,
    caminhoArquivo VARCHAR(500)   NULL,
    tipoArquivo    VARCHAR(100)   NULL, -- ex.: image/jpeg, application/pdf
    dataEnvio      SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    ativo          BIT            NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT FK_DocumentosVoluntario_Solicitacao
        FOREIGN KEY (solicitacaoId) REFERENCES SolicitacoesVoluntario(id)
);
GO

INSERT INTO DocumentosVoluntario (solicitacaoId, nomeArquivo, caminhoArquivo, tipoArquivo)
VALUES (1, 'identidade-frente.jpg', '/arquivos/voluntarios/identidade-frente.jpg', 'image/jpeg')
INSERT INTO DocumentosVoluntario (solicitacaoId, nomeArquivo, caminhoArquivo, tipoArquivo)
VALUES (1, 'comprovante-endereco.pdf', '/arquivos/voluntarios/comprovante-endereco.pdf', 'application/pdf')
GO

-- ============================================================
-- 4. CATEGORIAS DE INSTITUICAO
-- ============================================================
CREATE TABLE CategoriasInstituicao
(
    id        INT           IDENTITY,
    nome      VARCHAR(80)   NOT NULL UNIQUE,
    descricao VARCHAR(300)  NULL,
    ativo     BIT           NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id)
);
GO

INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('DELEGACIA', 'Delegacias e serviços de segurança')
INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('ONG', 'Organizações não governamentais')
INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('ABRIGO', 'Abrigos e locais de acolhimento')
INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('ASSISTENCIA_SOCIAL', 'Centros e serviços de assistência social')
INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('DEFENSORIA', 'Defensorias e serviços jurídicos')
INSERT INTO CategoriasInstituicao (nome, descricao) VALUES ('CENTRO_DE_APOIO', 'Centros e redes de apoio')
GO

-- ============================================================
-- 5. INSTITUICOES (guia de recursos usados na página Recursos)
-- ============================================================
CREATE TABLE Instituicoes
(
    id                     INT            IDENTITY,
    categoriaInstituicaoId INT            NOT NULL,
    nome                   VARCHAR(150)   NOT NULL,
    descricao              VARCHAR(500)   NULL,
    endereco               VARCHAR(250)   NOT NULL,
    cidade                 VARCHAR(100)   NOT NULL,
    estado                 CHAR(2)        NOT NULL,
    cep                    VARCHAR(10)    NULL,
    telefone               VARCHAR(30)    NULL,
    email                  VARCHAR(150)   NULL,
    horarioFuncionamento   VARCHAR(200)   NULL,
    latitude               DECIMAL(10,7)  NULL, -- usado pelo mapa (Leaflet)
    longitude              DECIMAL(10,7)  NULL,
    ativa                  BIT            NOT NULL DEFAULT 1,
    dataCadastro           SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    dataAtualizacao        SMALLDATETIME  NULL,

    PRIMARY KEY (id),

    CONSTRAINT FK_Instituicoes_CategoriaInstituicao
        FOREIGN KEY (categoriaInstituicaoId) REFERENCES CategoriasInstituicao(id),

    CONSTRAINT CK_Instituicoes_Coordenadas
        CHECK (
            (latitude IS NULL AND longitude IS NULL)
            OR (
                latitude IS NOT NULL AND longitude IS NOT NULL
                AND latitude BETWEEN -90 AND 90
                AND longitude BETWEEN -180 AND 180
            )
        )
);
GO

INSERT INTO Instituicoes (categoriaInstituicaoId, nome, descricao, endereco, cidade, estado, cep, telefone, email, horarioFuncionamento, latitude, longitude, ativa, dataCadastro)
VALUES (1, 'Delegacia da Mulher Centro', 'Atendimento a mulheres em situação de violência.', 'Rua da Consolação, 1000', 'São Paulo', 'SP', '01301-000', '(11) 3214-5678', 'delmulher@ssp.sp.gov.br', 'Atendimento 24 horas', -23.5489000, -46.6388000, 1, GETDATE())
INSERT INTO Instituicoes (categoriaInstituicaoId, nome, descricao, endereco, cidade, estado, cep, telefone, email, horarioFuncionamento, latitude, longitude, ativa, dataCadastro)
VALUES (4, 'CRAS Vila Mariana', 'Serviço de referência em assistência social.', 'Rua Joaquim Távora, 500', 'São Paulo', 'SP', '04038-000', '(11) 3871-2233', 'cras.vilamariana@prefeitura.sp.gov.br', 'Segunda a sexta, 8h às 17h', -23.5860000, -46.6410000, 1, GETDATE())
GO

-- ============================================================
-- 6. DENUNCIAS
--    O protocolo é gerado automaticamente (EQ- + código aleatório)
--    No SQLite/JSON do frontend as denúncias ficam anônimas por padrão;
--    aqui usuarioId fica NULL quando a denúncia é anônima.
-- ============================================================
CREATE TABLE Denuncias
(
    id                       INT           IDENTITY,
    protocolo                VARCHAR(40)   NOT NULL
        CONSTRAINT DF_Denuncias_Protocolo
        DEFAULT ('EQ-' + REPLACE(CONVERT(CHAR(36), NEWID()), '-', '')),
    usuarioId                INT           NULL, -- NULL = denúncia anônima
    instituicaoResponsavelId INT           NULL,
    tipoDenuncia             VARCHAR(100)  NOT NULL,
    descricao                VARCHAR(MAX)  NOT NULL,
    dataOcorrencia           DATE          NOT NULL,
    localOcorrencia          VARCHAR(300)  NULL,
    cidadeOcorrencia         VARCHAR(100)  NULL,
    estadoOcorrencia         CHAR(2)       NULL,
    denunciaAnonima          BIT           NOT NULL DEFAULT 1,
    status                   VARCHAR(30)   NOT NULL DEFAULT 'RECEBIDA', -- RECEBIDA, EM_ANALISE, ENCAMINHADA, EM_ATENDIMENTO ou FINALIZADA
    dataRegistro             SMALLDATETIME NOT NULL DEFAULT GETDATE(),
    ativo                   BIT           NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT UQ_Denuncias_Protocolo UNIQUE (protocolo),

    CONSTRAINT CK_Denuncias_Status
        CHECK (status IN ('RECEBIDA', 'EM_ANALISE', 'ENCAMINHADA', 'EM_ATENDIMENTO', 'FINALIZADA')),

    CONSTRAINT FK_Denuncias_Usuario
        FOREIGN KEY (usuarioId) REFERENCES Usuario(id),

    CONSTRAINT FK_Denuncias_Instituicao
        FOREIGN KEY (instituicaoResponsavelId) REFERENCES Instituicoes(id)
);
GO

INSERT INTO Denuncias (usuarioId, instituicaoResponsavelId, tipoDenuncia, descricao, dataOcorrencia, localOcorrencia, cidadeOcorrencia, estadoOcorrencia, denunciaAnonima, status)
VALUES (NULL, 1, 'Assédio escolar', 'Estou sendo humilhado por colegas na escola há várias semanas.', '2026-10-10', 'Escola Municipal Centro', 'São Paulo', 'SP', 1, 'EM_ANALISE')
INSERT INTO Denuncias (usuarioId, instituicaoResponsavelId, tipoDenuncia, descricao, dataOcorrencia, localOcorrencia, cidadeOcorrencia, estadoOcorrencia, denunciaAnonima, status)
VALUES (3, 2, 'Violência familiar', 'Vizinhos relatam situação de risco para uma criança na residência.', '2026-10-12', 'Rua das Flores, 200', 'São Paulo', 'SP', 0, 'RECEBIDA')
GO

-- ============================================================
-- 7. ANEXOS DA DENUNCIA
-- ============================================================
CREATE TABLE AnexosDenuncia
(
    id             INT           IDENTITY,
    denunciaId     INT           NOT NULL,
    nomeArquivo    VARCHAR(255)  NOT NULL,
    caminhoArquivo VARCHAR(500)  NULL,
    tipoArquivo    VARCHAR(100)  NULL, -- ex.: image/png, audio/mpeg
    dataEnvio      SMALLDATETIME NOT NULL DEFAULT GETDATE(),
    ativo          BIT           NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT FK_AnexosDenuncia_Denuncia
        FOREIGN KEY (denunciaId) REFERENCES Denuncias(id)
);
GO

INSERT INTO AnexosDenuncia (denunciaId, nomeArquivo, caminhoArquivo, tipoArquivo)
VALUES (1, 'print-conversa.png', '/arquivos/denuncias/print-conversa.png', 'image/png')
INSERT INTO AnexosDenuncia (denunciaId, nomeArquivo, caminhoArquivo, tipoArquivo)
VALUES (1, 'audio-depoimento.mp3', '/arquivos/denuncias/audio-depoimento.mp3', 'audio/mpeg')
GO

-- ============================================================
-- 8. CATEGORIAS DE DIREITOS
--    Os nomes seguem as páginas de Direitos do frontend
--    (src/pages/Direitos/...): Assedio, Beneficios, Bullying, etc.
-- ============================================================
CREATE TABLE CategoriasDireitos
(
    id        INT           IDENTITY,
    nome      VARCHAR(100)  NOT NULL UNIQUE,
    descricao VARCHAR(300)  NULL,
    ativo     BIT           NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id)
);
GO

INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('ASSEDIO', 'Informações sobre assédio')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('BENEFICIOS', 'Informações sobre benefícios e direitos sociais')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('BULLYING', 'Informações sobre bullying escolar')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('CRIANCAS', 'Direitos da criança e do adolescente (ECA)')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('DIVERSIDADE', 'Direitos da diversidade e da LGBTQIA+')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('FAMILIA', 'Direitos da família')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('IDOSOS', 'Direitos da pessoa idosa')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('MULHERES', 'Direitos das mulheres')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('PCD', 'Direitos da pessoa com deficiência')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('RACISMO', 'Informações sobre racismo e discriminação racial')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('SAUDE_MENTAL', 'Direitos relacionados à saúde mental')
INSERT INTO CategoriasDireitos (nome, descricao) VALUES ('TRABALHISTAS', 'Direitos trabalhistas')
GO

-- ============================================================
-- 9. DIREITOS (conteúdo da guia de direitos)
-- ============================================================
CREATE TABLE Direitos
(
    id                 INT            IDENTITY,
    categoriaDireitoId INT            NOT NULL,
    titulo             VARCHAR(200)   NOT NULL,
    conteudo            VARCHAR(MAX)  NOT NULL,
    referenciaOrgao    VARCHAR(300)   NULL,
    ativo              BIT            NOT NULL DEFAULT 1,
    dataCadastro       SMALLDATETIME  NOT NULL DEFAULT GETDATE(),

    PRIMARY KEY (id),

    CONSTRAINT FK_Direitos_CategoriaDireito
        FOREIGN KEY (categoriaDireitoId) REFERENCES CategoriasDireitos(id)
);
GO

INSERT INTO Direitos (categoriaDireitoId, titulo, conteudo, referenciaOrgao)
VALUES (1, 'Assédio no trabalho: o que fazer?', 'O assédio moral e o assédio sexual violam a dignidade do trabalhador. Guarde provas, procure o RH ou a ouvidoria e, se necessário, registre um boletim de ocorrência.', 'Ministério Público do Trabalho')
INSERT INTO Direitos (categoriaDireitoId, titulo, conteudo, referenciaOrgao)
VALUES (3, 'Bullying escolar: como agir', 'A Lei 13.185/2015 trata da intimidação sistemática (bullying). Avise a escola, guarde registros e procure orientação nos serviços de saúde.', 'Lei 13.185/2015')
INSERT INTO Direitos (categoriaDireitoId, titulo, conteudo, referenciaOrgao)
VALUES (8, 'Lei Maria da Penha', 'A Lei 11.340/2006 protege mulheres em situação de violência doméstica. O atendimento pode ser feito na Delegacia da Mulher ou pelo Ligue 180.', 'Ligue 180 - Central de Atendimento à Mulher')
INSERT INTO Direitos (categoriaDireitoId, titulo, conteudo, referenciaOrgao)
VALUES (10, 'Racismo é crime', 'O racismo é crime inafiançável previsto na Lei 7.716/1989. As denúncias podem ser feitas na Delegacia ou pelo Disque 100.', 'Disque 100 - Direitos Humanos')
GO

-- ============================================================
-- 10. CURSOS (criados pelos voluntários, aprovados pelo admin)
-- ============================================================
CREATE TABLE Cursos
(
    id              INT            IDENTITY,
    voluntarioId    INT            NOT NULL, -- usuário que criou o curso
    titulo          VARCHAR(200)   NOT NULL,
    descricao       VARCHAR(1000)  NOT NULL,
    cargaHoraria    INT            NULL, -- quantidade de horas
    statusAprovacao VARCHAR(20)    NOT NULL DEFAULT 'PENDENTE', -- PENDENTE, APROVADO ou REPROVADO
    publicado       BIT            NOT NULL DEFAULT 0,
    dataCadastro    SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    dataAtualizacao SMALLDATETIME  NULL,

    PRIMARY KEY (id),

    CONSTRAINT CK_Cursos_StatusAprovacao
        CHECK (statusAprovacao IN ('PENDENTE', 'APROVADO', 'REPROVADO')),

    CONSTRAINT FK_Cursos_Voluntario
        FOREIGN KEY (voluntarioId) REFERENCES Usuario(id)
);
GO

INSERT INTO Cursos (voluntarioId, titulo, descricao, cargaHoraria, statusAprovacao, publicado, dataCadastro)
VALUES (2, 'Introdução aos Direitos Humanos', 'Conceitos fundamentais dos direitos humanos, cidadania e dignidade da pessoa humana.', 6, 'APROVADO', 1, GETDATE())
INSERT INTO Cursos (voluntarioId, titulo, descricao, cargaHoraria, statusAprovacao, publicado, dataCadastro)
VALUES (2, 'Combate à Violência Doméstica', 'Como identificar a violência doméstica e conhecer os canais de apoio.', 8, 'PENDENTE', 0, GETDATE())
GO

-- ============================================================
-- 11. MATERIAIS dos cursos (PDF, vídeos, links...)
-- ============================================================
CREATE TABLE Materiais
(
    id              INT            IDENTITY,
    cursoId         INT            NOT NULL,
    voluntarioId    INT            NOT NULL,
    titulo          VARCHAR(200)   NOT NULL,
    descricao       VARCHAR(1000)  NULL,
    tipoMaterial    VARCHAR(50)    NOT NULL, -- PDF, VIDEO, LINK, SLIDES, IMAGEM
    caminhoArquivo  VARCHAR(500)   NULL,
    linkExterno     VARCHAR(500)   NULL,
    statusAprovacao VARCHAR(20)    NOT NULL DEFAULT 'PENDENTE', -- PENDENTE, APROVADO ou REPROVADO
    publicado       BIT            NOT NULL DEFAULT 0,
    dataCadastro    SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    dataAtualizacao SMALLDATETIME  NULL,

    PRIMARY KEY (id),

    CONSTRAINT CK_Materiais_StatusAprovacao
        CHECK (statusAprovacao IN ('PENDENTE', 'APROVADO', 'REPROVADO')),

    CONSTRAINT FK_Materiais_Curso
        FOREIGN KEY (cursoId) REFERENCES Cursos(id),

    CONSTRAINT FK_Materiais_Voluntario
        FOREIGN KEY (voluntarioId) REFERENCES Usuario(id)
);
GO

INSERT INTO Materiais (cursoId, voluntarioId, titulo, descricao, tipoMaterial, caminhoArquivo, linkExterno, statusAprovacao, publicado)
VALUES (1, 2, 'Apostila: Direitos Humanos', 'Apostila introdutória com os conceitos básicos.', 'PDF', '/arquivos/materiais/apostila-dh.pdf', NULL, 'APROVADO', 1)
INSERT INTO Materiais (cursoId, voluntarioId, titulo, descricao, tipoMaterial, caminhoArquivo, linkExterno, statusAprovacao, publicado)
VALUES (1, 2, 'Vídeo: O que são direitos humanos?', 'Vídeo introdutório do canal educativo.', 'VIDEO', NULL, 'https://www.youtube.com/watch?v=exemplo', 'PENDENTE', 0)
GO

-- ============================================================
-- 12. INSCRICOES em cursos
-- ============================================================
CREATE TABLE Inscricoes
(
    id                   INT            IDENTITY,
    usuarioId            INT            NOT NULL,
    cursoId              INT            NOT NULL,
    dataInscricao        SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    percentualProgresso  DECIMAL(5,2)   NOT NULL DEFAULT 0, -- 0 a 100
    concluido            BIT            NOT NULL DEFAULT 0,
    dataConclusao        SMALLDATETIME  NULL,
    ativo                BIT            NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT CK_Inscricoes_Progresso
        CHECK (percentualProgresso BETWEEN 0 AND 100),

    -- o mesmo usuário não pode se inscrever duas vezes no mesmo curso
    CONSTRAINT UQ_Inscricoes_Usuario_Curso
        UNIQUE (usuarioId, cursoId),

    CONSTRAINT FK_Inscricoes_Usuario
        FOREIGN KEY (usuarioId) REFERENCES Usuario(id),

    CONSTRAINT FK_Inscricoes_Curso
        FOREIGN KEY (cursoId) REFERENCES Cursos(id)
);
GO

INSERT INTO Inscricoes (usuarioId, cursoId, dataInscricao, percentualProgresso, concluido, dataConclusao)
VALUES (3, 1, GETDATE(), 100.00, 1, GETDATE())
INSERT INTO Inscricoes (usuarioId, cursoId, dataInscricao, percentualProgresso, concluido, dataConclusao)
VALUES (4, 1, GETDATE(), 40.00, 0, NULL)
GO

-- ============================================================
-- 13. CERTIFICADOS (1 por inscrição concluída)
-- ============================================================
CREATE TABLE Certificados
(
    id                INT            IDENTITY,
    inscricaoId       INT            NOT NULL UNIQUE, -- só 1 certificado por inscrição
    codigoCertificado VARCHAR(50)    NOT NULL UNIQUE,
    dataEmissao       SMALLDATETIME  NOT NULL DEFAULT GETDATE(),
    caminhoArquivo    VARCHAR(500)   NULL,
    ativo             BIT            NOT NULL DEFAULT 1, -- delete lógico

    PRIMARY KEY (id),

    CONSTRAINT FK_Certificados_Inscricao
        FOREIGN KEY (inscricaoId) REFERENCES Inscricoes(id)
);
GO

INSERT INTO Certificados (inscricaoId, codigoCertificado, dataEmissao, caminhoArquivo)
VALUES (1, 'EQ-CERT-2026-0001', GETDATE(), '/arquivos/certificados/eq-cert-2026-0001.pdf')
GO

-- ============================================================
-- 14. INDICES (colunas mais filtradas/ordenadas nas consultas)
-- ============================================================
CREATE INDEX IX_Denuncias_Status ON Denuncias(status)
CREATE INDEX IX_Denuncias_DataRegistro ON Denuncias(dataRegistro)
CREATE INDEX IX_Instituicoes_Cidade ON Instituicoes(cidade)
CREATE INDEX IX_Cursos_StatusAprovacao ON Cursos(statusAprovacao)
CREATE INDEX IX_Materiais_StatusAprovacao ON Materiais(statusAprovacao)
GO

-- ============================================================
-- 15. CONSULTAS DE TESTE (validam os relacionamentos)
-- ============================================================

-- 15.1 Listar todas as tabelas criadas
SELECT name AS Tabela
FROM sys.tables
ORDER BY name;
GO

-- 15.2 Quantidade de registros em cada tabela
SELECT 'Usuario' AS Tabela, COUNT(*) AS Registros FROM Usuario
UNION ALL SELECT 'SolicitacoesVoluntario', COUNT(*) FROM SolicitacoesVoluntario
UNION ALL SELECT 'DocumentosVoluntario', COUNT(*) FROM DocumentosVoluntario
UNION ALL SELECT 'CategoriasInstituicao', COUNT(*) FROM CategoriasInstituicao
UNION ALL SELECT 'Instituicoes', COUNT(*) FROM Instituicoes
UNION ALL SELECT 'Denuncias', COUNT(*) FROM Denuncias
UNION ALL SELECT 'AnexosDenuncia', COUNT(*) FROM AnexosDenuncia
UNION ALL SELECT 'CategoriasDireitos', COUNT(*) FROM CategoriasDireitos
UNION ALL SELECT 'Direitos', COUNT(*) FROM Direitos
UNION ALL SELECT 'Cursos', COUNT(*) FROM Cursos
UNION ALL SELECT 'Materiais', COUNT(*) FROM Materiais
UNION ALL SELECT 'Inscricoes', COUNT(*) FROM Inscricoes
UNION ALL SELECT 'Certificados', COUNT(*) FROM Certificados;
GO

-- 15.3 Usuários e a situação da solicitação de voluntário
SELECT u.nome, u.username, u.nivelAcesso, s.status AS statusSolicitacao, s.dataSolicitacao
FROM Usuario u
INNER JOIN SolicitacoesVoluntario s ON s.usuarioId = u.id;
GO

-- 15.4 Documentos enviados em cada solicitação
SELECT s.id AS solicitacao, u.nome AS solicitante, d.nomeArquivo, d.dataEnvio
FROM DocumentosVoluntario d
INNER JOIN SolicitacoesVoluntario s ON s.id = d.solicitacaoId
INNER JOIN Usuario u ON u.id = s.usuarioId;
GO

-- 15.5 Instituições com a sua categoria (página Recursos)
SELECT i.nome AS instituicao, c.nome AS categoria, i.cidade, i.estado, i.telefone
FROM Instituicoes i
INNER JOIN CategoriasInstituicao c ON c.id = i.categoriaInstituicaoId;
GO

-- 15.6 Denúncias com protocolo e instituição responsável
SELECT d.protocolo, d.tipoDenuncia, d.status, d.denunciaAnonima,
       i.nome AS instituicaoResponsavel
FROM Denuncias d
LEFT JOIN Instituicoes i ON i.id = d.instituicaoResponsavelId;
GO

-- 15.7 Direitos agrupados por categoria
SELECT c.nome AS categoria, dt.titulo, dt.referenciaOrgao
FROM Direitos dt
INNER JOIN CategoriasDireitos c ON c.id = dt.categoriaDireitoId
ORDER BY c.nome;
GO

-- 15.8 Materiais dos cursos publicados
SELECT cu.titulo AS curso, m.titulo AS material, m.tipoMaterial, m.statusAprovacao
FROM Materiais m
INNER JOIN Cursos cu ON cu.id = m.cursoId
WHERE cu.publicado = 1;
GO

-- 15.9 Relação completa: inscrição -> curso -> usuário -> certificado
SELECT u.nome AS aluno, c.titulo AS curso, i.percentualProgresso,
       i.concluido, cert.codigoCertificado
FROM Inscricoes i
INNER JOIN Usuario u ON u.id = i.usuarioId
INNER JOIN Cursos c ON c.id = i.cursoId
LEFT JOIN Certificados cert ON cert.inscricaoId = i.id;
GO
