import React from "react";
import { useFormik } from "formik";

// Schemas
import { UserFinanceSchema } from "../../../schemas/User.schemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";
import { useUserAPI } from "../../../context/API/UserAPI.context";
import { useAuth } from "../../../context/Auth/Auth.context";
import { useUser } from "../../../context/User/User.context";

function UserInfoForm() {
  const {
    UI: { closeUserInfoForm },
    state: { showLoading, closeLoading },
  } = useGlobal();
  const {
    authState: { uid, accessToken },
  } = useAuth();
  const {
    userState: {
      user: { financialInfo, financialInfoAdded },
    },
    userFunctions: { updateFinancialInfo },
  } = useUser();
  const { updateUserFinancialInfo } = useUserAPI().functions;
  const formik = useFormik({
    initialValues: financialInfoAdded
      ? financialInfo
      : {
          monthlyIncome: 0,
          monthlySpending: 0,
          monthlySavings: 0,
        },
    onSubmit: (values, { setErrors }) => {
      showLoading("Updating your financial information...");
      updateUserFinancialInfo(uid, accessToken, values, (data, error) => {
        if (error) return console.log(error);

        updateFinancialInfo(values);
        closeLoading();
        closeUserInfoForm();
      });
    },
    validationSchema: UserFinanceSchema,
  });

  const inputs = [
    {
      name: "monthlyIncome",
      label: "Monthly Income",
      type: "number",
    },
    {
      name: "monthlySpending",
      label: "Monthly Spending",
      type: "number",
    },
    {
      name: "monthlySavings",
      label: "Monthly Savings",
      type: "number",
    },
  ];

  return (
    <div className="user-info-form-container center">
      <form className="user-info-form" onSubmit={formik.handleSubmit}>
        <h2 className="user-info-form__title">Your Financial Information</h2>

        {/* Inputs */}
        <div className="user-info-form__inputs">
          {inputs.map((input) => {
            const { name, label, type } = input;
            const { touched, errors } = formik;
            const isError = touched[name] && errors[name];
            const isValid = touched[name] && !errors[name];

            return (
              <div
                key={name}
                className={`user-info-form__input-box ${
                  isValid ? "valid-input" : isError ? "error-input" : ""
                }`}
              >
                <label className="user-info-form__label" htmlFor={name}>
                  {label}
                </label>
                <input
                  name={name}
                  type={type}
                  onChange={formik.handleChange}
                  value={formik.values[name]}
                  placeholder="Ex: $0 - $1,000,000"
                  className="user-info-form__input"
                  min={0}
                  max={1000 * 1000}
                />
                {isError && (
                  <p className="user-info-form__error">{errors[name]}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Button */}
        <div className="row">
          <button type="submit" className="user-info-form__submit">
            Submit
          </button>
          <button
            type="button"
            className="user-info-form__cancel"
            onClick={closeUserInfoForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserInfoForm;
