import React from "react";
import { sidebarAdminData, sidebarData } from "../api/sidebar";
import { HeaderComponent } from "./modules/header/header";
import { SidebarComponent } from "./modules/sidebar/sidebar";
import { Helmet, HelmetProvider } from "react-helmet-async";

type Props = {
  children?: any;
  user?: any;
  title: string;
  isAdmin?: boolean;
};

const Layout = ({ children, user, title, isAdmin }: Props) => {
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
        <div className={`layout-sidebar ${isAdmin && "layout-sidebar-admin"}`}>
          <SidebarComponent
            sidebarModule={isAdmin ? sidebarAdminData() : sidebarData()}
          />
        </div>
        <div className={`layout-body ${isAdmin && "layout-body-admin"}`}>
          <div className="container">
            {!isAdmin && (
              <div className="layout-header">
                <HeaderComponent user={user} />
              </div>
            )}
            <div className="layout-content">{children}</div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Layout;
