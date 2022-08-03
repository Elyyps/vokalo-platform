import style from "./new-password-form.module.scss";
import { withFormik, FormikProps, FormikErrors, Form } from "formik";
import { InputComponent } from "../../cores/input/input";
import { validatePassword } from "../../../utils/validate";

interface INewPasswordFormErrorMessages {
  code: string;
  password: string;
  confirmPassword: string;
}
export interface INewPasswordFormValues {
  code: string;
  password: string;
  confirmPassword: string;
}
const formOnChange = () => {
  return;
};
const InnerForm = (props: FormikProps<INewPasswordFormValues>) => {
  const { touched, errors } = props;
  return (
    <Form action={"#"} onChange={formOnChange}>
      <div className={style["new-password-form"]}>
        <span>Welcome</span>
        <h2>Change your password</h2>
        <div className={style["new-password-form-inputs"]}>
          <InputComponent
            type="text"
            name="code"
            label="Code"
            errorMessage={touched.code ? errors.code : ""}
            onChange={(e: any) => {
              props.handleChange(e);
            }}
            onBlur={(e: any) => {
              props.handleBlur(e);
            }}
            value={props.values.code}
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
          <InputComponent
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            errorMessage={touched.confirmPassword ? errors.confirmPassword : ""}
            onChange={(e: any) => {
              props.handleChange(e);
            }}
            onBlur={(e: any) => {
              props.handleBlur(e);
            }}
            value={props.values.confirmPassword}
          />
        </div>

        <div className={style["new-password-form-save"]}>
          <button type="submit">Change password</button>
        </div>
      </div>
    </Form>
  );
};

interface IFormProps {
  onSubmit: (values: INewPasswordFormValues) => void;
}

export const NewPasswordFormComponent = withFormik<
  IFormProps,
  INewPasswordFormValues
>({
  mapPropsToValues: () => ({
    code: "",
    password: "",
    confirmPassword: "",
  }),

  validate: (values: INewPasswordFormValues) => {
    const errors: FormikErrors<INewPasswordFormErrorMessages> = {};

    if (!values.code) {
      errors.code = "code is required";
    }
    if (!values.password) {
      errors.password = "password is required";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "confirm password is required";
    }
    if (
      values.password !== values.confirmPassword &&
      values.password &&
      values.confirmPassword
    ) {
      errors.confirmPassword = "password should match";
    }
    if (!validatePassword(values.password) && values.password) {
      errors.password =
        "password should have Upper/Lower case characters and numbers";
    }
    if (!validatePassword(values.confirmPassword) && values.confirmPassword) {
      errors.confirmPassword =
        "password should have Upper/Lower case characters and numbers";
    }
    return errors;
  },

  handleSubmit: (values: INewPasswordFormValues, bag: any) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
