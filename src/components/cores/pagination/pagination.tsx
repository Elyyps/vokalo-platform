import style from "./pagination.module.scss";
interface IPaginationComponent {
  list: any[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export const PaginationComponent = (props: IPaginationComponent) => {
  const numberOfPages = Math.ceil(props.list.length / 10);
  return props.list.length > 10 ? (
    <div className={style["pagination"]}>
      Pages:
      {props.list.slice(0, numberOfPages).map((squad, index) => (
        <div
          key={index}
          onClick={() => props.setCurrentPage(index + 1)}
          className={
            props.currentPage === index + 1 ? style["pagination-selected"] : ""
          }
        >
          <b>{index + 1}</b>
        </div>
      ))}
    </div>
  ) : (
    <div />
  );
};
