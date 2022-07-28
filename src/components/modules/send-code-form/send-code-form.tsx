import style from "./send-code-form.module.scss";
import { withFormik, FormikProps, FormikErrors, Form } from "formik";
import { InputComponent } from "../../cores/input/input";
import { validateEmail } from "../../../utils/validate-email";

interface ISendCodeFormErrorMessages {
  username: string;
}
export interface ISendCodeFormValues {
  username: string;
}
const formOnChange = () => {
  return;
};
const InnerForm = (props: FormikProps<ISendCodeFormValues>) => {
  const { touched, errors } = props;
  return (
    <Form action={"#"} onChange={formOnChange}>
      <div className={style["send-code-form"]}>
        <span>Welcome</span>
        <h2>Verification Code</h2>
        <div className={style["send-code-form-inputs"]}>
          <InputComponent
            type="text"
            name="username"
            label="Email"
            errorMessage={touched.username ? errors.username : ""}
            onChange={(e: any) => {
              props.handleChange(e);
            }}
            onBlur={(e: any) => {
              props.handleBlur(e);
            }}
            value={props.values.username}
          />
        </div>

        <div className={style["send-code-form-save"]}>
          <button type="submit">Send Code</button>
        </div>
      </div>
    </Form>
  );
};

interface IFormProps {
  onSubmit: (values: ISendCodeFormValues) => void;
}

export const SendCodeFormComponent = withFormik<
  IFormProps,
  ISendCodeFormValues
>({
  mapPropsToValues: () => ({
    username: "",
  }),

  validate: (values: ISendCodeFormValues) => {
    const errors: FormikErrors<ISendCodeFormErrorMessages> = {};

    if (!values.username) {
      errors.username = "email is required";
    } else if (!validateEmail(values.username)) {
      errors.username = "enter a correct email";
    }

    return errors;
  },

  handleSubmit: (values: ISendCodeFormValues, bag: any) => {
    bag.props.onSubmit(values);
  },
})(InnerForm);
