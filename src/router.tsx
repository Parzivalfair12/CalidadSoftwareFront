import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./Layout/AppLayout.tsx";
import { DashBoardView } from "./Views/Dashboard/DashBoardView.tsx";
import ProjectsViews from "./Views/Projects/ProjectsViews.tsx";
import QuialityMetricsView from "./Views/Metrics/QualityMetricsView.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashBoardView />} />
          <Route path="dashboard" element={<DashBoardView />} />
          <Route path="metrics" element={<QuialityMetricsView />} />
          <Route path="projects" element={<ProjectsViews />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
