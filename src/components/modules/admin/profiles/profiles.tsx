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
    {
      id: 0,
      firstName: "Alexander",
      lastName: "Plagborg",
      role: "player",
      team: "ASA",
    },
    {
      id: 1,
      firstName: "Andreas",
      lastName: "Louridsen",
      role: "player",
      team: "ASA",
    },
    {
      id: 2,
      firstName: "Christan",
      lastName: "Jorgensen",
      role: "coach",
      team: "ASA",
    },
    {
      id: 3,
      firstName: "Gabriel",
      lastName: "Shawol",
      role: "player",
      team: "ASA",
    },
    {
      id: 4,
      firstName: "Jakob",
      lastName: "Agger",
      role: "player",
      team: "ASA",
    },
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
                onClick={(e: any) =>
                  e.target.localName === "td" &&
                  navigate("/admin/profile/" + row.id)
                }
              >
                <td>
                  {row.firstName} {row.lastName}
                </td>
                <td>{row.role}</td>
                <td>{row.team}</td>
                <td>
                  <DropdownComponent
                    icon="/icons/more.svg"
                    variant="transparent"
                  >
                    <ul>
                      <li>edit</li>
                      <li>delete</li>
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
