import React from "react";
import { ButtonComponent } from "../../components/cores/button/button";
import { DropdownComponent } from "../../components/cores/dropdown/dropdown";
import Layout from "../../components/Layout";
import style from "./dashboard.module.scss";
export const DashboardPage = () => {
  const list = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <Layout>
      <div className={style["dashboard"]}>
        <div className="section-header">
          <h1>Dashboard from latest session</h1>
          <div className="section-header-btn">
            <DropdownComponent title="Athlete">hello</DropdownComponent>
            <ButtonComponent title="Filter" icon="/icons/filter.svg" />
          </div>
        </div>
        <div className={style["dashboard-sessions"]}>
          {list.slice(0, 5).map((item, key) => (
            <div key={key} className="section-item"></div>
          ))}
        </div>
        <div className={style["dashboard-bottom"]}>
          <div>
            <div className="section-header">
              <h1>Aggregations</h1>
            </div>
            <div className={style["dashboard-aggregations"]}>
              {list.slice(0, 4).map((item, key) => (
                <div key={key} className="section-item"></div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-header">
              <h1>Interactions</h1>
            </div>
            <div className={style["dashboard-interactions"]}>
              <div className="section-item"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
