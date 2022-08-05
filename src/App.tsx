import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { getUserAPI } from "./api/user";
import "./App.scss";
import Layout from "./components/Layout";
import { AccountContext } from "./context/account";
import { FilterContextProvider } from "./context/filter";
import { CoachPage } from "./pages/coach/coach";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { ForgotPasswordPage } from "./pages/forgot-password/forgot-password";
import { LoginPage } from "./pages/login/login";
import { SessionDetailsPage } from "./pages/session-details/session-details";
import { SessionsPage } from "./pages/sessions/sessions";
import { SquadDetailsPage } from "./pages/squad-details/squad-details";
import { SquadPage } from "./pages/squad/squad";

const App = () => {
  const [user, setUser] = React.useState<any>();
  const [isLogged, setIsLogged] = React.useState<boolean>(true);

  const { getAccount } = React.useContext(AccountContext);
  const getUser = async (session: any) => {
    const data = await getUserAPI(session);
    setUser(data);
  };
  React.useEffect(() => {
    getAccount()
      .then((session: any) => {
        getUser(session);
        setIsLogged(true);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, [getAccount]);

  const addPageLayout = (component: any, title?: string) => {
    let defaultTitle = "Vokalo";
    if (title) {
      defaultTitle = defaultTitle.concat(" | " + title);
    }
    return (
      <Layout user={user} title={defaultTitle} hasNoSession={!isLogged}>
        {component}
      </Layout>
    );
  };

  return (
    <div className="App">
      <FilterContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route index element={addPageLayout(<DashboardPage />)} />
            <Route
              path="/coach"
              element={addPageLayout(<CoachPage user={user} />, "Coachs")}
            />
            <Route
              path="/sessions"
              element={addPageLayout(<SessionsPage />, "Sessions")}
            />
            <Route
              path="/sessions/:id"
              element={addPageLayout(<SessionDetailsPage />, "Coach")}
            />
            <Route
              path="/squad"
              element={addPageLayout(<SquadPage user={user} />, "Squads")}
            />
            <Route
              path="/squad/:id"
              element={addPageLayout(<SquadDetailsPage />, "Squad")}
            />
            {/* <Route path="/video-sync" element={<div>Video sync</div>} />
            <Route path="/recordings" element={<div>Recordings</div>} /> */}
            <Route
              path="/settings"
              element={addPageLayout(<div>Settings</div>, "Settings")}
            />
          </Routes>
        </BrowserRouter>
      </FilterContextProvider>
    </div>
  );
};

export default App;
