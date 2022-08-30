import spinnerStyle from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={spinnerStyle.spinner}>
      <i className={spinnerStyle.spinner__i}></i>
    </div>
  );
};

export default Spinner;
