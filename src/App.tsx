import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getUserAPI } from "./api/user";
import "./App.scss";
import Layout from "./components/Layout";
import { AccountContext } from "./context/account";
import { FilterContextProvider } from "./context/filter";
import { CoachPage } from "./pages/coach/coach";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { LoginPage } from "./pages/login/login";
import { SessionDetailsPage } from "./pages/session-details/session-details";
import { SessionsPage } from "./pages/sessions/sessions";
import { SquadDetailsPage } from "./pages/squad-details/squad-details";
import { SquadPage } from "./pages/squad/squad";

const App = () => {
  const [user, setUser] = React.useState<any>();

  const { getAccount } = React.useContext(AccountContext);

  const getUser = async (session: any) => {
    const data = await getUserAPI(session);
    setUser(data);
  };
  React.useEffect(() => {
    getAccount().then((session: any) => {
      getUser(session);
    });
  }, [getAccount]);

  const addPageLayout = (component: any) => {
    return <Layout user={user}>{component}</Layout>;
  };

  return (
    <div className="App">
      <FilterContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route index element={addPageLayout(<DashboardPage />)} />
            <Route path="/coach" element={addPageLayout(<CoachPage />)} />
            <Route path="/sessions" element={addPageLayout(<SessionsPage />)} />
            <Route
              path="/sessions/:caoch"
              element={addPageLayout(<SessionDetailsPage />)}
            />
            <Route path="/squad" element={addPageLayout(<SquadPage />)} />
            <Route
              path="/squad/:name"
              element={addPageLayout(<SquadDetailsPage />)}
            />
            {/* <Route path="/video-sync" element={<div>Video sync</div>} />
            <Route path="/recordings" element={<div>Recordings</div>} /> */}
            <Route
              path="/settings"
              element={addPageLayout(<div>Settings</div>)}
            />
          </Routes>
        </BrowserRouter>
      </FilterContextProvider>
    </div>
  );
};

export default App;
