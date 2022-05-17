import React from "react";
import { sessionsData } from "../../api/session";
import { SessionsTableComponent } from "../../components/modules/sessions-table/sessions-table";

export const SessionPage = () => {
  return (
    <div>
      <SessionsTableComponent sessions={sessionsData()} />
    </div>
  );
};
