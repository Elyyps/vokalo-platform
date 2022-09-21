import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getUserAPI } from "./api/user";
import "./App.scss";
import Layout from "./components/Layout";
import { AccountContext } from "./context/account";
import { FilterContextProvider } from "./context/filter";
import { DashboardPage } from "./pages/dashboard/dashboard";
import { ForgotPasswordPage } from "./pages/forgot-password/forgot-password";
import { LoginPage } from "./pages/login/login";
import { SessionDetailsPage } from "./pages/session-details/session-details";
import { SessionsPage } from "./pages/sessions/sessions";
import { SquadDetailsPage } from "./pages/squad-details/squad-details";
import { SquadPage } from "./pages/squad/squad";
import { CookiesProvider } from "react-cookie";

const App = () => {
  const [user, setUser] = React.useState<any>(undefined);
  const { getAccount, isLogged } = React.useContext(AccountContext);
  const getUser = async (session: any) => {
    const data = await getUserAPI(session);
    setUser(data);
  };
  React.useEffect(() => {
    getAccount()
      .then((session: any) => {
        getUser(session);
      })
      .catch(() => setUser(undefined));
  }, [isLogged]);

  const addPageLayout = (component: any, title?: string) => {
    let defaultTitle = "Vokalo";
    if (title) {
      defaultTitle = defaultTitle.concat(" | " + title);
    }
    return isLogged === false ? (
      <Navigate to={"/login"} />
    ) : (
      user && (
        <Layout user={user} title={defaultTitle}>
          {component}
        </Layout>
      )
    );
  };

  return (
    <div className="App">
      <CookiesProvider>
        <FilterContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              <Route
                index
                element={addPageLayout(<DashboardPage user={user} />)}
              />
              {/* <Route
              path="/coach"
              element={addPageLayout(<CoachPage user={user} />, "Coachs")}
            /> */}
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
      </CookiesProvider>
    </div>
  );
};

export default App;
