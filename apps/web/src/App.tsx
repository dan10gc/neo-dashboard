import { Route, Routes } from "react-router";

import { CloseApproachInfo } from "./routes/close-approach-info";
import { DashboardRoute } from "./routes/dashboard";
import { Root } from "./routes/root";

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
