import { ButtonComponent } from "../../../cores/button/button";
import style from "./profiles.module.scss";
import { DropdownComponent } from "../../../cores/dropdown/dropdown";
import { useNavigate } from "react-router-dom";

export const AdminProfilesComponent = () => {
  const columns = [
    { name: "profile", param: [""] },
    { name: "role", param: [""] },
    { name: "team", param: [""] },
  ];
  const rows = [
    { profile: "Profile 1", role: "player", team: "ASA" },
    { profile: "Profile 2", role: "player", team: "ASA" },
    { profile: "Profile 3", role: "player", team: "ASA" },
    { profile: "Profile 4", role: "player", team: "ASA" },
    { profile: "Profile 5", role: "player", team: "ASA" },
  ];
  let navigate = useNavigate();
  return (
    <div className={style["admin-profiles"]}>
      <div className={"admin-header"}>
        <span>All profiles</span>
        <ButtonComponent
          variant="admin"
          title="create profile"
          onClick={() => navigate("/admin/create-profile")}
        />
      </div>
      <div className={` ${style["admin-profiles-table"]} section-item`}>
        <table>
          <thead>
            <tr>
              {columns.map((column, key) => (
                <th key={key}>
                  <span>{column.name}</span>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, key) => (
              <tr
                key={key}
                // onClick={(e: any) =>
                //   e.target.localName === "td" &&
                //   navigate("/sessions/" + row.id)
                // }
              >
                <td>{row.profile}</td>
                <td>{row.role}</td>
                <td>{row.team}</td>
                <td>
                  <DropdownComponent
                    icon="/icons/more.svg"
                    variant="transparent"
                  >
                    <ul>
                      <li>edit</li>
                    </ul>
                  </DropdownComponent>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
