import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./Components/ProtectedRoute.tsx";
import { DashBoardView } from "./Views/Dashboard/DashBoardView.tsx";
import ProjectsViews from "./Views/Projects/ProjectsViews.tsx";
import QuialityMetricsView from "./Views/Metrics/QualityMetricsView.tsx";
import { MetricDetail } from "./Components/Metrics/MetricDetail.tsx";
import { CreateMetricForm } from "./Components/Metrics/CreateMetricForm.tsx";
import { EditMetricForm } from "./Components/Metrics/EditMetricForm.tsx";
import LoginLayout from "./Layout/LoginLayout.tsx";
import { AppLayout } from "./Layout/AppLayout.tsx";
import LoginView from "./Views/Login/LoginView.tsx";
import ProjectForm from "./Components/Projects/ProjectForm.tsx";
import EvaluationView from "./Views/Evaluation/EvaluationView.tsx";
import EvaluationsList from "./Components/Evaluation/EvaluationsList.tsx";
import EvaluationChartView from "./Views/Evaluation/EvaluationChartView.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginLayout />}>
            <Route index element={<LoginView />} />
          </Route>

          {/* Rutas protegidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashBoardView />} />

            <Route path="metrics" element={<QuialityMetricsView />} />
            <Route path="metrics/new" element={<CreateMetricForm />} />
            <Route path="metrics/:id" element={<MetricDetail />} />
            <Route path="metrics/edit/:id" element={<EditMetricForm />} />

            <Route path="projects" element={<ProjectsViews />} />
            <Route path="/projects/new" element={<ProjectForm />} />
            <Route path="/projects/edit/:id" element={<ProjectForm />} />

            <Route path="/evaluation" element={<EvaluationsList />} />
            <Route path="/evaluation/create" element={<EvaluationView />} />
            <Route path="/evaluation/chart" element={<EvaluationChartView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
