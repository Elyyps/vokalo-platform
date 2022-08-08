import React from "react";
import { sidebarData } from "../api/sidebar";
import { HeaderComponent } from "./modules/header/header";
import { SidebarComponent } from "./modules/sidebar/sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: any;
  user?: any;
  title: string;
  isLogged?: boolean;
};

const Layout = ({ children, user, title, isLogged }: Props) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    }
  }, [isLogged, user]);

  return (
    <HelmetProvider>
      <div className="layout">
        <Helmet>
          <title>{title}</title>
          <link rel="shortcut icon" href="/logo.ico" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta
            name="description"
            content="Amazing app to manage sport games"
          />
        </Helmet>
        <div className="layout-sidebar">
          <SidebarComponent sidebarModule={sidebarData()} />
        </div>
        <div className="layout-body">
          <div className="container">
            <div className="layout-header">
              <HeaderComponent user={user} />
            </div>
            <div className="layout-content">{children}</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
