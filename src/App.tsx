import { Routes, Route } from "react-router";
import { Root } from "./routes/root";
import { DashboardRoute } from "./routes/dashboard";
import { CloseApproachInfo } from "./routes/close-approach-info";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<DashboardRoute />} />
        <Route path="close-approach-info" element={<CloseApproachInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
