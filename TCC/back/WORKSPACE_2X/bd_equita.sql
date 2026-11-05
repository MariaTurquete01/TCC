/*

    BANCO DE DADOS - EQUITÁ

    Sistema de Apoio Social e Cidadania

    SGBD: Microsoft SQL Server
 
    Modelo baseado no documento norteador do projeto Equitá.

    Inclui: usuários/perfis, denúncias, instituições, guia de direitos,

    cursos, materiais, inscrições, progresso, certificados e aprovações.

*/
 
IF DB_ID(N'Equita') IS NULL

BEGIN

    CREATE DATABASE Equita;

END

GO
 
USE Equita;

GO
 
/* =========================

   1. PERFIS DE ACESSO

   ========================= */

IF OBJECT_ID('dbo.Perfis', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Perfis

    (

        PerfilID INT IDENTITY(1,1) PRIMARY KEY,

        Nome VARCHAR(30) NOT NULL UNIQUE,

        Descricao VARCHAR(200) NULL

    );

END

GO
 
IF NOT EXISTS (SELECT 1 FROM dbo.Perfis WHERE Nome = 'USUARIO')

    INSERT INTO dbo.Perfis (Nome, Descricao) VALUES ('USUARIO', 'Usuário comum da plataforma');

IF NOT EXISTS (SELECT 1 FROM dbo.Perfis WHERE Nome = 'VOLUNTARIO')

    INSERT INTO dbo.Perfis (Nome, Descricao) VALUES ('VOLUNTARIO', 'Voluntário aprovado');

IF NOT EXISTS (SELECT 1 FROM dbo.Perfis WHERE Nome = 'ADMINISTRADOR')

    INSERT INTO dbo.Perfis (Nome, Descricao) VALUES ('ADMINISTRADOR', 'Administrador da plataforma');

GO
 
/* =========================

   2. USUÁRIOS

   ========================= */

IF OBJECT_ID('dbo.Usuarios', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Usuarios

    (

        UsuarioID INT IDENTITY(1,1) PRIMARY KEY,

        Nome VARCHAR(120) NOT NULL,

        Email VARCHAR(150) NOT NULL,

        SenhaHash VARCHAR(255) NOT NULL,

        PerfilID INT NOT NULL,

        DoisFatoresAtivo BIT NOT NULL DEFAULT 0,

        Ativo BIT NOT NULL DEFAULT 1,

        DataCadastro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataAtualizacao DATETIME2 NULL,
 
        CONSTRAINT FK_Usuarios_Perfis

            FOREIGN KEY (PerfilID) REFERENCES dbo.Perfis(PerfilID)

    );

END

GO
 
IF NOT EXISTS (

    SELECT 1 FROM sys.indexes

    WHERE name = 'UX_Usuarios_Email'

      AND object_id = OBJECT_ID('dbo.Usuarios')

)

BEGIN

    CREATE UNIQUE INDEX UX_Usuarios_Email

        ON dbo.Usuarios(Email);

END

GO
 
/* =========================

   3. SOLICITAÇÃO DE VOLUNTÁRIO

   ========================= */

IF OBJECT_ID('dbo.SolicitacoesVoluntario', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.SolicitacoesVoluntario

    (

        SolicitacaoID INT IDENTITY(1,1) PRIMARY KEY,

        UsuarioID INT NOT NULL,

        Status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',

        Justificativa VARCHAR(1000) NULL,

        DataSolicitacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataAnalise DATETIME2 NULL,

        AdministradorID INT NULL,

        ObservacaoAdministrador VARCHAR(1000) NULL,
 
        CONSTRAINT CK_SolicitacoesVoluntario_Status

            CHECK (Status IN ('PENDENTE', 'APROVADA', 'REPROVADA')),
 
        CONSTRAINT FK_SolicitacoesVoluntario_Usuario

            FOREIGN KEY (UsuarioID) REFERENCES dbo.Usuarios(UsuarioID),
 
        CONSTRAINT FK_SolicitacoesVoluntario_Administrador

            FOREIGN KEY (AdministradorID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
IF OBJECT_ID('dbo.DocumentosVoluntario', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.DocumentosVoluntario

    (

        DocumentoID INT IDENTITY(1,1) PRIMARY KEY,

        SolicitacaoID INT NOT NULL,

        NomeArquivo VARCHAR(255) NOT NULL,

        CaminhoArquivo VARCHAR(500) NULL,

        TipoArquivo VARCHAR(100) NULL,

        DataEnvio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT FK_DocumentosVoluntario_Solicitacao

            FOREIGN KEY (SolicitacaoID)

            REFERENCES dbo.SolicitacoesVoluntario(SolicitacaoID)

    );

END

GO
 
/* =========================

   4. INSTITUIÇÕES / RECURSOS

   ========================= */

IF OBJECT_ID('dbo.CategoriasInstituicao', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.CategoriasInstituicao

    (

        CategoriaInstituicaoID INT IDENTITY(1,1) PRIMARY KEY,

        Nome VARCHAR(80) NOT NULL UNIQUE,

        Descricao VARCHAR(300) NULL

    );

END

GO
 
IF OBJECT_ID('dbo.Instituicoes', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Instituicoes

    (

        InstituicaoID INT IDENTITY(1,1) PRIMARY KEY,

        CategoriaInstituicaoID INT NOT NULL,

        Nome VARCHAR(150) NOT NULL,

        Descricao VARCHAR(500) NULL,

        Endereco VARCHAR(250) NOT NULL,

        Cidade VARCHAR(100) NOT NULL,

        Estado CHAR(2) NOT NULL,

        CEP VARCHAR(10) NULL,

        Telefone VARCHAR(30) NULL,

        Email VARCHAR(150) NULL,

        HorarioFuncionamento VARCHAR(200) NULL,

        Latitude DECIMAL(10,7) NULL,

        Longitude DECIMAL(10,7) NULL,

        Ativa BIT NOT NULL DEFAULT 1,

        DataCadastro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataAtualizacao DATETIME2 NULL,
 
        CONSTRAINT FK_Instituicoes_Categorias

            FOREIGN KEY (CategoriaInstituicaoID)

            REFERENCES dbo.CategoriasInstituicao(CategoriaInstituicaoID)

    );

END

GO
 
IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'DELEGACIA')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('DELEGACIA', 'Delegacias e serviços de segurança');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'ONG')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('ONG', 'Organizações não governamentais');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'ABRIGO')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('ABRIGO', 'Abrigos e locais de acolhimento');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'ASSISTENCIA_SOCIAL')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('ASSISTENCIA_SOCIAL', 'Centros e serviços de assistência social');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'DEFENSORIA')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('DEFENSORIA', 'Defensorias e serviços jurídicos');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasInstituicao WHERE Nome = 'CENTRO_DE_APOIO')

    INSERT INTO dbo.CategoriasInstituicao (Nome, Descricao) VALUES ('CENTRO_DE_APOIO', 'Centros e redes de apoio');

GO
 
/* =========================

   5. DENÚNCIAS

   ========================= */

IF OBJECT_ID('dbo.Denuncias', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Denuncias

    (

        DenunciaID INT IDENTITY(1,1) PRIMARY KEY,

        Protocolo VARCHAR(40) NOT NULL

            CONSTRAINT DF_Denuncias_Protocolo

            DEFAULT ('EQ-' + REPLACE(CONVERT(CHAR(36), NEWID()), '-', '')),

        UsuarioID INT NULL,

        InstituicaoResponsavelID INT NULL,

        TipoDenuncia VARCHAR(100) NOT NULL,

        Descricao VARCHAR(MAX) NOT NULL,

        DataOcorrencia DATE NULL,

        LocalOcorrencia VARCHAR(300) NULL,

        CidadeOcorrencia VARCHAR(100) NULL,

        EstadoOcorrencia CHAR(2) NULL,

        DenunciaAnonima BIT NOT NULL DEFAULT 1,

        Status VARCHAR(30) NOT NULL DEFAULT 'RECEBIDA',

        DataRegistro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT UQ_Denuncias_Protocolo UNIQUE (Protocolo),
 
        CONSTRAINT CK_Denuncias_Status

            CHECK (Status IN ('RECEBIDA', 'EM_ANALISE', 'ENCAMINHADA', 'EM_ATENDIMENTO', 'FINALIZADA')),
 
        CONSTRAINT FK_Denuncias_Usuario

            FOREIGN KEY (UsuarioID) REFERENCES dbo.Usuarios(UsuarioID),
 
        CONSTRAINT FK_Denuncias_Instituicao

            FOREIGN KEY (InstituicaoResponsavelID)

            REFERENCES dbo.Instituicoes(InstituicaoID)

    );

END

GO
 
IF OBJECT_ID('dbo.AnexosDenuncia', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.AnexosDenuncia

    (

        AnexoID INT IDENTITY(1,1) PRIMARY KEY,

        DenunciaID INT NOT NULL,

        NomeArquivo VARCHAR(255) NOT NULL,

        CaminhoArquivo VARCHAR(500) NULL,

        TipoArquivo VARCHAR(100) NULL,

        DataEnvio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT FK_AnexosDenuncia_Denuncia

            FOREIGN KEY (DenunciaID) REFERENCES dbo.Denuncias(DenunciaID)

    );

END

GO
 
IF OBJECT_ID('dbo.HistoricoDenuncias', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.HistoricoDenuncias

    (

        HistoricoID INT IDENTITY(1,1) PRIMARY KEY,

        DenunciaID INT NOT NULL,

        UsuarioResponsavelID INT NULL,

        StatusAnterior VARCHAR(30) NULL,

        NovoStatus VARCHAR(30) NOT NULL,

        Observacao VARCHAR(1000) NULL,

        DataAlteracao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT FK_HistoricoDenuncias_Denuncia

            FOREIGN KEY (DenunciaID) REFERENCES dbo.Denuncias(DenunciaID),
 
        CONSTRAINT FK_HistoricoDenuncias_Usuario

            FOREIGN KEY (UsuarioResponsavelID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
/* =========================

   6. GUIA DE DIREITOS

   ========================= */

IF OBJECT_ID('dbo.CategoriasDireitos', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.CategoriasDireitos

    (

        CategoriaDireitoID INT IDENTITY(1,1) PRIMARY KEY,

        Nome VARCHAR(100) NOT NULL UNIQUE,

        Descricao VARCHAR(300) NULL

    );

END

GO
 
IF OBJECT_ID('dbo.Direitos', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Direitos

    (

        DireitoID INT IDENTITY(1,1) PRIMARY KEY,

        CategoriaDireitoID INT NOT NULL,

        Titulo VARCHAR(200) NOT NULL,

        Conteudo VARCHAR(MAX) NOT NULL,

        ReferenciaOrgao VARCHAR(300) NULL,

        Ativo BIT NOT NULL DEFAULT 1,

        DataCadastro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT FK_Direitos_Categorias

            FOREIGN KEY (CategoriaDireitoID)

            REFERENCES dbo.CategoriasDireitos(CategoriaDireitoID)

    );

END

GO
 
IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasDireitos WHERE Nome = 'DISCRIMINACAO')

    INSERT INTO dbo.CategoriasDireitos (Nome, Descricao) VALUES ('DISCRIMINACAO', 'Informações sobre discriminação');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasDireitos WHERE Nome = 'ASSEDIO')

    INSERT INTO dbo.CategoriasDireitos (Nome, Descricao) VALUES ('ASSEDIO', 'Informações sobre assédio');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasDireitos WHERE Nome = 'LIBERDADE_DE_EXPRESSAO')

    INSERT INTO dbo.CategoriasDireitos (Nome, Descricao) VALUES ('LIBERDADE_DE_EXPRESSAO', 'Informações sobre liberdade de expressão');

IF NOT EXISTS (SELECT 1 FROM dbo.CategoriasDireitos WHERE Nome = 'PRIVACIDADE')

    INSERT INTO dbo.CategoriasDireitos (Nome, Descricao) VALUES ('PRIVACIDADE', 'Informações sobre privacidade');

GO
 
/* =========================

   7. CURSOS

   ========================= */

IF OBJECT_ID('dbo.Cursos', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Cursos

    (

        CursoID INT IDENTITY(1,1) PRIMARY KEY,

        VoluntarioID INT NOT NULL,

        Titulo VARCHAR(200) NOT NULL,

        Descricao VARCHAR(1000) NOT NULL,

        CargaHoraria INT NULL,

        StatusAprovacao VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',

        Publicado BIT NOT NULL DEFAULT 0,

        DataCadastro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataAtualizacao DATETIME2 NULL,
 
        CONSTRAINT CK_Cursos_StatusAprovacao

            CHECK (StatusAprovacao IN ('PENDENTE', 'APROVADO', 'REPROVADO')),
 
        CONSTRAINT FK_Cursos_Voluntario

            FOREIGN KEY (VoluntarioID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
IF OBJECT_ID('dbo.Materiais', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Materiais

    (

        MaterialID INT IDENTITY(1,1) PRIMARY KEY,

        CursoID INT NOT NULL,

        VoluntarioID INT NOT NULL,

        Titulo VARCHAR(200) NOT NULL,

        Descricao VARCHAR(1000) NULL,

        TipoMaterial VARCHAR(50) NOT NULL,

        CaminhoArquivo VARCHAR(500) NULL,

        LinkExterno VARCHAR(500) NULL,

        StatusAprovacao VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',

        Publicado BIT NOT NULL DEFAULT 0,

        DataCadastro DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataAtualizacao DATETIME2 NULL,
 
        CONSTRAINT CK_Materiais_StatusAprovacao

            CHECK (StatusAprovacao IN ('PENDENTE', 'APROVADO', 'REPROVADO')),
 
        CONSTRAINT FK_Materiais_Curso

            FOREIGN KEY (CursoID) REFERENCES dbo.Cursos(CursoID),
 
        CONSTRAINT FK_Materiais_Voluntario

            FOREIGN KEY (VoluntarioID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
/* =========================

   8. APROVAÇÃO DE CONTEÚDO

   ========================= */

IF OBJECT_ID('dbo.AprovacoesConteudo', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.AprovacoesConteudo

    (

        AprovacaoID INT IDENTITY(1,1) PRIMARY KEY,

        CursoID INT NULL,

        MaterialID INT NULL,

        AdministradorID INT NOT NULL,

        Decisao VARCHAR(20) NOT NULL,

        Observacao VARCHAR(1000) NULL,

        DataAnalise DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT CK_AprovacoesConteudo_Decisao

            CHECK (Decisao IN ('APROVADO', 'REPROVADO')),
 
        CONSTRAINT CK_AprovacoesConteudo_Objeto

            CHECK (

                (CursoID IS NOT NULL AND MaterialID IS NULL)

                OR

                (CursoID IS NULL AND MaterialID IS NOT NULL)

            ),
 
        CONSTRAINT FK_AprovacoesConteudo_Curso

            FOREIGN KEY (CursoID) REFERENCES dbo.Cursos(CursoID),
 
        CONSTRAINT FK_AprovacoesConteudo_Material

            FOREIGN KEY (MaterialID) REFERENCES dbo.Materiais(MaterialID),
 
        CONSTRAINT FK_AprovacoesConteudo_Administrador

            FOREIGN KEY (AdministradorID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
/* =========================

   9. INSCRIÇÕES EM CURSOS

   ========================= */

IF OBJECT_ID('dbo.Inscricoes', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Inscricoes

    (

        InscricaoID INT IDENTITY(1,1) PRIMARY KEY,

        UsuarioID INT NOT NULL,

        CursoID INT NOT NULL,

        DataInscricao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        PercentualProgresso DECIMAL(5,2) NOT NULL DEFAULT 0,

        Concluido BIT NOT NULL DEFAULT 0,

        DataConclusao DATETIME2 NULL,
 
        CONSTRAINT CK_Inscricoes_Progresso

            CHECK (PercentualProgresso BETWEEN 0 AND 100),
 
        CONSTRAINT UQ_Inscricoes_Usuario_Curso

            UNIQUE (UsuarioID, CursoID),
 
        CONSTRAINT FK_Inscricoes_Usuario

            FOREIGN KEY (UsuarioID) REFERENCES dbo.Usuarios(UsuarioID),
 
        CONSTRAINT FK_Inscricoes_Curso

            FOREIGN KEY (CursoID) REFERENCES dbo.Cursos(CursoID)

    );

END

GO
 
/* =========================

   10. PROGRESSO / ATIVIDADES

   ========================= */

IF OBJECT_ID('dbo.ProgressoMateriais', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.ProgressoMateriais

    (

        ProgressoID INT IDENTITY(1,1) PRIMARY KEY,

        InscricaoID INT NOT NULL,

        MaterialID INT NOT NULL,

        Concluido BIT NOT NULL DEFAULT 0,

        DataAcesso DATETIME2 NULL,

        DataConclusao DATETIME2 NULL,
 
        CONSTRAINT UQ_Progresso_Inscricao_Material

            UNIQUE (InscricaoID, MaterialID),
 
        CONSTRAINT FK_Progresso_Inscricao

            FOREIGN KEY (InscricaoID) REFERENCES dbo.Inscricoes(InscricaoID),
 
        CONSTRAINT FK_Progresso_Material

            FOREIGN KEY (MaterialID) REFERENCES dbo.Materiais(MaterialID)

    );

END

GO
 
/* =========================

   11. CERTIFICADOS

   ========================= */

IF OBJECT_ID('dbo.Certificados', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.Certificados

    (

        CertificadoID INT IDENTITY(1,1) PRIMARY KEY,

        InscricaoID INT NOT NULL UNIQUE,

        CodigoCertificado VARCHAR(50) NOT NULL UNIQUE,

        DataEmissao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        CaminhoArquivo VARCHAR(500) NULL,
 
        CONSTRAINT FK_Certificados_Inscricao

            FOREIGN KEY (InscricaoID) REFERENCES dbo.Inscricoes(InscricaoID)

    );

END

GO
 
/* =========================

   12. CONFIGURAÇÕES DA CONTA

   ========================= */

IF OBJECT_ID('dbo.ConfiguracoesUsuario', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.ConfiguracoesUsuario

    (

        ConfiguracaoID INT IDENTITY(1,1) PRIMARY KEY,

        UsuarioID INT NOT NULL UNIQUE,

        NotificacoesAtivas BIT NOT NULL DEFAULT 1,

        Tema VARCHAR(20) NOT NULL DEFAULT 'PADRAO',

        DataAtualizacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
 
        CONSTRAINT FK_Configuracoes_Usuario

            FOREIGN KEY (UsuarioID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
/* =========================

   13. RECUPERAÇÃO DE SENHA

   ========================= */

IF OBJECT_ID('dbo.RecuperacoesSenha', 'U') IS NULL

BEGIN

    CREATE TABLE dbo.RecuperacoesSenha

    (

        RecuperacaoID INT IDENTITY(1,1) PRIMARY KEY,

        UsuarioID INT NOT NULL,

        TokenHash VARCHAR(255) NOT NULL,

        DataSolicitacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),

        DataExpiracao DATETIME2 NOT NULL,

        Utilizado BIT NOT NULL DEFAULT 0,
 
        CONSTRAINT FK_Recuperacoes_Usuario

            FOREIGN KEY (UsuarioID) REFERENCES dbo.Usuarios(UsuarioID)

    );

END

GO
 
/* =========================

   14. ÍNDICES

   ========================= */

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Denuncias_Status')

    CREATE INDEX IX_Denuncias_Status ON dbo.Denuncias(Status);
 
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Denuncias_DataRegistro')

    CREATE INDEX IX_Denuncias_DataRegistro ON dbo.Denuncias(DataRegistro);
 
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Instituicoes_Cidade')

    CREATE INDEX IX_Instituicoes_Cidade ON dbo.Instituicoes(Cidade);
 
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Cursos_StatusAprovacao')

    CREATE INDEX IX_Cursos_StatusAprovacao ON dbo.Cursos(StatusAprovacao);
 
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Materiais_StatusAprovacao')

    CREATE INDEX IX_Materiais_StatusAprovacao ON dbo.Materiais(StatusAprovacao);

GO
 
/* =========================

   15. CONSULTAS DE TESTE

   ========================= */
 
-- Ver todas as tabelas do banco

SELECT TABLE_NAME

FROM INFORMATION_SCHEMA.TABLES

WHERE TABLE_TYPE = 'BASE TABLE'

ORDER BY TABLE_NAME;

GO
 
-- Visualizar usuários e seus perfis

SELECT

    U.UsuarioID,

    U.Nome,

    U.Email,

    P.Nome AS Perfil,

    U.Ativo,

    U.DataCadastro

FROM dbo.Usuarios U

INNER JOIN dbo.Perfis P ON P.PerfilID = U.PerfilID;

GO
 
-- Consultar denúncias pelo protocolo

SELECT

    D.Protocolo,

    D.TipoDenuncia,

    D.Status,

    D.DenunciaAnonima,

    D.DataRegistro,

    I.Nome AS InstituicaoResponsavel

FROM dbo.Denuncias D

LEFT JOIN dbo.Instituicoes I

    ON I.InstituicaoID = D.InstituicaoResponsavelID;

GO
 
-- Consultar cursos publicados

SELECT

    C.CursoID,

    C.Titulo,

    C.Descricao,

    C.CargaHoraria,

    C.StatusAprovacao,

    C.Publicado

FROM dbo.Cursos C

WHERE C.Publicado = 1

  AND C.StatusAprovacao = 'APROVADO';

GO
 
USE Equita;

GO
 
SELECT TABLE_NAME AS Tabela

FROM INFORMATION_SCHEMA.TABLES

WHERE TABLE_TYPE = 'BASE TABLE'

ORDER BY TABLE_NAME;
 