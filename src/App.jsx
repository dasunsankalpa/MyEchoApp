import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Explore from "./pages/Explore";
import MapPage from "./pages/MapPage";
import EchoDetail from "./pages/EchoDetail";
import LeaveEcho from "./pages/LeaveEcho";
import Notifications from "./pages/Notifications";
import EmptyState from "./pages/EmptyState";
import ManyMemories from "./pages/ManyMemories";
import DeletedEcho from "./pages/DeletedEcho";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

function Shell() {
  const { pathname } = useLocation();
  const hideNav =
    pathname === "/map" ||
    pathname === "/empty" ||
    pathname === "/leave" ||
    pathname === "/deleted";

  return (
    <>
      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/echo/:id" element={<EchoDetail />} />
        <Route path="/leave" element={<LeaveEcho />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/empty" element={<EmptyState />} />
        <Route path="/many" element={<ManyMemories />} />
        <Route path="/deleted" element={<DeletedEcho />} />
      </Routes>
      {!hideNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
  <HashRouter>
    <Shell />
  </HashRouter>
  );
}