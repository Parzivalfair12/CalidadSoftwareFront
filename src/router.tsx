import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./Layout/AppLayout.tsx";
import { DashBoardView } from "./Views/Dashboard/DashBoardView.tsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashBoardView />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
