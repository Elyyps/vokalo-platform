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
  hasNoSession?: boolean;
};

const Layout = ({ children, user, title, hasNoSession }: Props) => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = React.useState<boolean>(true);

  React.useEffect(() => {
    console.log("sdaasas");
    if (hasNoSession) {
      navigate("/login");
    }
  }, [hasNoSession]);
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
