import style from "./login-layout.module.scss";

interface ILoginLayoutComponent {
  children: any;
}
export const LoginLayoutComponent = (props: ILoginLayoutComponent) => {
  return (
    <div className={style["login-layout"]}>
      <div className={style["login-layout-header"]}>
        <div>
          <img src="/img/logo.png" alt="logo" />
        </div>
      </div>
      <div className={style["login-layout-content"]}>
        <div className={style["login-layout-content-left"]}>
          <h1>Studio.</h1>
        </div>
        <div className={style["login-layout-content-right"]}>
          {props.children}
        </div>
      </div>
    </div>
  );
};
