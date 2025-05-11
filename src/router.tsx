import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./Layout/AppLayout.tsx";
import { DashBoardView } from "./Views/Dashboard/DashBoardView.tsx";
import ProjectsViews from "./Views/Projects/ProjectsViews.tsx";
import QuialityMetricsView from "./Views/Metrics/QualityMetricsView.tsx";
import { MetricDetail } from "./Components/Metrics/MetricDetail.tsx";
import { CreateMetricForm } from "./Components/Metrics/CreateMetricForm.tsx";
import { EditMetricForm } from "./Components/Metrics/EditMetricForm.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
        
          {/* DashBoard */}
          <Route index element={<DashBoardView />} />
          <Route path="dashboard" element={<DashBoardView />} />

          {/* Metricas */}
          <Route path="metrics" element={<QuialityMetricsView />} />
          <Route path="/metrics/new" element={<CreateMetricForm />} />
          <Route path="/metrics/:id" element={<MetricDetail />} />
          <Route path="/metrics/edit/:id" element={<EditMetricForm />} />

          {/* Proyectos */}
          <Route path="projects" element={<ProjectsViews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
