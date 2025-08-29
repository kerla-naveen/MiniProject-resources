import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NoticeBoard from "./pages/NoticeBoard.jsx";
import TimeTable from "./pages/Timetable.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all child routes */}
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<Dashboard />} />         {/* "/" */}
          <Route path="dashboard" element={<Dashboard />} /> {/* "/dashboard" */}
          <Route path="notice-board" element={<NoticeBoard />} />
          <Route path="timetable" element={<TimeTable />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
