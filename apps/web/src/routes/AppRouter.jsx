import { BrowserRouter, Routes, Route } from 'react-router-dom';

import DashboardDocente from '../pages/dashboard-docente/DashboardDocente';
import DashboardEstudiante from '../pages/dashboard-estudiante/DashboardEstudiante';
import Usuarios from '../pages/usuarios/Usuarios';
import Fichas from '../pages/fichas/Fichas';
import Asistencia from '../pages/asistencia/Asistencia';
import Calificaciones from '../pages/calificaciones/Calificaciones';
import CalificacionIA from '../pages/calificacion-ia/CalificacionIA';
import Reportes from '../pages/reportes/Reportes';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/dashboard-docente" element={<DashboardDocente />} />
      <Route path="/dashboard-estudiante" element={<DashboardEstudiante />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/fichas" element={<Fichas />} />
      <Route path="/asistencia" element={<Asistencia />} />
      <Route path="/calificaciones" element={<Calificaciones />} />
      <Route path="/calificacion-ia" element={<CalificacionIA />} />
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;