import React from "react";
import style from "./input.module.scss";

interface IInputProps {
  classModify?: string;
  errorMessage?: string;
  label?: string;
  name: string;
  onBlur?: (text: string) => void;
  onChange?: (event: any) => void;
  onChangeText?: (text: string) => void;
  onClick?: any;
  placeholder?: string;
  styles?: any;
  type?: string;
  value?: any;
}

const InputComponent = (props: IInputProps) => {
  const { name, type, styles, placeholder, label, errorMessage, value } = props;

  const [values, setValues] = React.useState("");

  React.useEffect(() => {
    setValues(value);
  }, [value]);

  const handleChange = (event: any) => {
    if (props.onChangeText) {
      props.onChangeText(event.target.value);
    }
    if (props.onChange) {
      props.onChange(event);
    }
    if (value) {
      setValues(event.target.value);
    }
  };
  const handleBlur = (event: any) => {
    if (props.onBlur) {
      props.onBlur(event);
    }
    if (value) {
      setValues(event.target.value);
    }
  };

  return (
    <div className={style["form__item"]}>
      {label && (
        <label htmlFor="label" className={style["form__item-label"]}>
          {label}
        </label>
      )}
      <div className={style["form__item-holder"]}>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          type={type ? type : "text"}
          name={name}
          step={1}
          value={values ? values : ""}
          style={styles}
          placeholder={placeholder}
        />
      </div>

      <div className={style["error-message"]}>{errorMessage}</div>
    </div>
  );
};

export { InputComponent };
