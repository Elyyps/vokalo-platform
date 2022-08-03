import style from "./login-form.module.scss";
import { withFormik, FormikProps, FormikErrors, Form } from "formik";
import { validateEmail } from "../../../utils/validate";
import { InputComponent } from "../../cores/input/input";
import { Link } from "react-router-dom";

interface ILoginFormErrorMessages {
  username: string;
  password: string;
}
export interface ILoginFormValues {
  username: string;
  password: string;
}
const formOnChange = () => {
  return;
};
const InnerForm = (props: FormikProps<ILoginFormValues>) => {
  const { touched, errors } = props;
  return (
    <Form action={"#"} onChange={formOnChange}>
      <div className={style["login-form"]}>
        <span>Welcome back</span>
        <h2>Login to your club</h2>
        <div className={style["login-form-inputs"]}>
          <InputComponent
            type="email"
            name="username"
            label="Username"
            errorMessage={touched.username ? errors.username : ""}
            onChange={(e: any) => {
              props.handleChange(e);
            }}
            onBlur={(e: any) => {
              props.handleBlur(e);
            }}
            value={props.values.username}
          />
          <InputComponent
            type="password"
            name="password"
            label="Password"
            errorMessage={touched.password ? errors.password : ""}
            onChange={(e: any) => {
              props.handleChange(e);
            }}
            onBlur={(e: any) => {
              props.handleBlur(e);
            }}
            value={props.values.password}
          />
          <small>
            <Link to="/forgot-password">Forgot your password ?</Link>
          </small>
        </div>

        <div className={style["login-form-save"]}>
          <input type="checkbox" name="save" />
          <label htmlFor="save">Remember me</label>
          <button title="Login now" type="submit">
            Login now
          </button>
        </div>
      </div>
    </Form>
  );
};

interface IFormProps {
  onSubmit: (values: ILoginFormValues) => void;
}

export const LoginFormComponent = withFormik<IFormProps, ILoginFormValues>({
  mapPropsToValues: () => ({
    username: "",
    password: "",
  }),

  validate: (values: ILoginFormValues) => {
    const errors: FormikErrors<ILoginFormErrorMessages> = {};

    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.username) {
      errors.username = "email is required";
    } else if (!validateEmail(values.username)) {
      errors.username = "enter a correct email";
    }

    return errors;
  },

  handleSubmit: (values: ILoginFormValues, bag: any) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
