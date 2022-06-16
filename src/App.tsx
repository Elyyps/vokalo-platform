import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./components/Layout";
import { CoachPage } from "./pages/coach/coach";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { SessionDetailsPage } from "./pages/session-details/session-details";
import { SessionsPage } from "./pages/sessions/sessions";
import { SquadDetailsPage } from "./pages/squad-details/squad-details";
import { SquadPage } from "./pages/squad/squad";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/login" element={<CoachPage />} />
            <Route index element={<DashboardPage />} />
            <Route path="/coach" element={<CoachPage />} />
            <Route path="/sessions" element={<SessionsPage />} />
            <Route path="/sessions/:caoch" element={<SessionDetailsPage />} />
            <Route path="/squad" element={<SquadPage />} />
            <Route path="/squad/:name" element={<SquadDetailsPage />} />
            {/* <Route path="/video-sync" element={<div>Video sync</div>} />
            <Route path="/recordings" element={<div>Recordings</div>} /> */}
            <Route path="/settings" element={<div>Settings</div>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
