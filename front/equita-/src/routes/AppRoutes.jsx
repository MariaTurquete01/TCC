import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Cadastro from "../pages/Cadastro/Cadastro";
import RecuperarSenha from "../pages/Login/RecuperarSenha";
import Perfil from "../pages/Perfil/Perfil";
import Configuracoes from "../pages/Configuracoes/Configuracoes";
import Denuncias from "../pages/Denuncias/Denuncias";
import Cursos from "../pages/Cursos/Cursos";
import CursoDetalhe from "../pages/Cursos/CursoDetalhe";
import MeusCursos from "../pages/Cursos/MeusCursos";
import Direitos from "../pages/Direitos/Direitos";
import Assedio from "../pages/Direitos/Assedio/Assedio";
import Beneficios from "../pages/Direitos/Beneficios/Beneficios";
import Bullying from "../pages/Direitos/Bullying/Bullying";
import Criancas from "../pages/Direitos/Criancas/Criancas";
import Diversidade from "../pages/Direitos/Diversidade/Diversidade";
import Familia from "../pages/Direitos/Familia/Familia";
import Idosos from "../pages/Direitos/Idosos/Idosos";
import Mulheres from "../pages/Direitos/Mulheres/Mulheres";
import Pcd from "../pages/Direitos/PCD/PCD";
import Racismo from "../pages/Direitos/Racismo/Racismo";
import SaudeMental from "../pages/Direitos/SaudeMental/SaudeMental";
import Trabalhistas from "../pages/Direitos/Trabalhistas/Trabalhistas";
import Recursos from "../pages/Recursos/Recursos";
import Protocolo from "../pages/Protocolo/Protoclo";
import Dashboard from "../pages/Dashboard/Dashoboard";
import { obterSessao } from "../services/sessao";

function ExigirPerfil({ niveis, children }) {
  const sessao = obterSessao();
  if (!sessao) return <Navigate to="/login" replace />;
  if (!niveis.includes(sessao.nivelAcesso)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/perfil" element={<ExigirPerfil niveis={["USER", "VOLUNTARIO", "ADMIN"]}><Perfil /></ExigirPerfil>} />
        <Route path="/configuracoes" element={<ExigirPerfil niveis={["USER", "VOLUNTARIO", "ADMIN"]}><Configuracoes /></ExigirPerfil>} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/cursos/:id" element={<CursoDetalhe />} />
        <Route path="/meus-cursos" element={<ExigirPerfil niveis={["USER", "VOLUNTARIO", "ADMIN"]}><MeusCursos /></ExigirPerfil>} />
        <Route path="/voluntario/meus-cursos" element={<ExigirPerfil niveis={["VOLUNTARIO"]}><MeusCursos /></ExigirPerfil>} />
        <Route path="/admin" element={<ExigirPerfil niveis={["ADMIN"]}><Dashboard /></ExigirPerfil>} />
        <Route path="/direitos" element={<Direitos />} />
        <Route path="/direitos/assedio" element={<Assedio />} />
        <Route path="/direitos/beneficios" element={<Beneficios />} />
        <Route path="/direitos/bullying" element={<Bullying />} />
        <Route path="/direitos/criancas" element={<Criancas />} />
        <Route path="/direitos/diversidade" element={<Diversidade />} />
        <Route path="/direitos/familia" element={<Familia />} />
        <Route path="/direitos/idosos" element={<Idosos />} />
        <Route path="/direitos/mulheres" element={<Mulheres />} />
        <Route path="/direitos/pcd" element={<Pcd />} />
        <Route path="/direitos/racismo" element={<Racismo />} />
        <Route path="/direitos/saude-mental" element={<SaudeMental />} />
        <Route path="/direitos/trabalhistas" element={<Trabalhistas />} />
        <Route path="/recursos" element={<Recursos />} />
        <Route path="/sobre" element={<Protocolo />} />
        <Route path="/protocolo" element={<Protocolo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
