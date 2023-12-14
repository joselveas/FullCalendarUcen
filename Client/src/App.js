import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Form from "./pages/Form";
import Filtros from "./pages/Filtros";
import ProfeCrud from "./pages/ProfeCrud";
import AlumnoCrud from "./pages/AlumnoCrud";
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CalendarioBig from "./pages/CalendarioBig";
import Profesor from "./pages/Profesor";
import Alumno from "./pages/Alumno";
import Solicitudes from "./pages/Solicitudes";
import Solicitudes_Calendario from "./pages/SOLICITUDES_CALENDARIO";
import Admin from "./pages/Admin";
import CalendarioEventual from "./pages/CalendarioEventual";


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/Filtros":
          title = "";
          metaDescription = "";
          break;
      case "/ProfeCrud":
            title = "";
            metaDescription = "";
            break;
      case "/AlumnoCrud":
            title = "";
            metaDescription = "";
            break;
      case "/Admin":
            title = "";
            metaDescription = "";
            break;
      case "/CalendarioBig":
            title = "";
            metaDescription = "";
            break;
      case "/Profesor":
            title = "";
            metaDescription = "";
            break;
      case "/Alumno":
            title = "";
            metaDescription = "";
            break;
      case "/Solicitudes":
            title = "";
            metaDescription = "";
            break;

      case "/Solicitudes_Calendario":
            title = "";
            metaDescription = "";
            break;

      case "/CalendarioEventual":
            title = "";
            metaDescription = "";
            break;
            
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/Filtros" element={<Filtros />} />
      <Route path="/ProfeCrud" element={<ProfeCrud />} />
      <Route path="/AlumnoCrud" element={<AlumnoCrud />} />
      <Route path="/Admin/:idAdmin" element={<Admin />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/reset/:userType/:id/:token" element={<ResetPassword />} />
      <Route path="/CalendarioBig" element={<CalendarioBig />} />
      <Route path="/Profesor/:idProfesor/:nombreProfesor" element={<Profesor />} />
      <Route path="/Alumno/:idAlumno/:nombre" element={<Alumno />} />
      <Route path="/Solicitudes/:idProfesor" element={<Solicitudes />} />
      <Route path="/Solicitudes_Calendario" element={<Solicitudes_Calendario />} />
      <Route path="/CalendarioEventual" element={<CalendarioEventual />} />
    </Routes>
  );
}
export default App;
