import React from "react";
import { sidebarData } from "../api/sidebar";
import { HeaderComponent } from "./modules/header/header";
import { SidebarComponent } from "./modules/sidebar/sidebar";

type Props = {
  children?: any;
  user?: any;
};

const Layout = ({ children, user }: Props) => {
  return (
    <div className="layout">
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
  );
};

export default Layout;
