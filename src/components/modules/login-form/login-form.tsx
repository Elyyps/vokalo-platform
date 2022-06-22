import style from "./login-form.module.scss";
import { withFormik, FormikProps, FormikErrors, Form } from "formik";
import { validateEmail } from "../../../utils/validate-email";
import { InputComponent } from "../../cores/input/input";

interface IContactFormErrorMessages {
  username: string;
  password: string;
}
export interface IContactFormValues {
  username: string;
  password: string;
}
const formOnChange = () => {
  return;
};
const InnerForm = (props: FormikProps<IContactFormValues>) => {
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
            //placeholder="enter your email"
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
            // placeholder="enter your password"
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
  onSubmit: (values: IContactFormValues) => void;
}

export const LoginFormComponent = withFormik<IFormProps, IContactFormValues>({
  mapPropsToValues: () => ({
    username: "",
    password: "",
  }),

  validate: (values: IContactFormValues) => {
    const errors: FormikErrors<IContactFormErrorMessages> = {};

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

  handleSubmit: (values: IContactFormValues, bag: any) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
