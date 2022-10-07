import React from "react";
import { useCookies } from "react-cookie";
import { DropdownComponent } from "../dropdown/dropdown";
import style from "./pagination.module.scss";
interface IPaginationComponent {
  list: any[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export const PaginationComponent = (props: IPaginationComponent) => {
  const [cookies, setCookie] = useCookies(["rows"]);
  const numberOfPages = Math.ceil(
    props.list.length / (cookies.rows ? cookies.rows : 24)
  );
  const setRows = (num: number) => {
    setCookie("rows", num);
  };
  return props.list.length > 12 ? (
    <div className={style["pagination"]}>
      <div>
        <DropdownComponent
          title={cookies.rows ? cookies.rows + "" : "24"}
          hasBorder
          contentPosition="top"
        >
          <ul>
            <li onClick={() => setRows(12)}>12</li>
            <li onClick={() => setRows(24)}>24</li>
            <li onClick={() => setRows(48)}>48</li>
          </ul>
        </DropdownComponent>
      </div>
      {numberOfPages > 1 && (
        <div>
          Pages:
          {props.list.slice(0, numberOfPages).map((squad, index) => (
            <div
              key={index}
              onClick={() => props.setCurrentPage(index + 1)}
              className={
                props.currentPage === index + 1
                  ? style["pagination-selected"]
                  : ""
              }
            >
              <b>{index + 1}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div />
  );
};
