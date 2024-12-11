import React from "react";
import { useFormik } from "formik";

// Schemas
import { SpendingLimitSchema } from "../../../schemas/Bank.schemas";

// Contexts
import { useGlobal } from "../../../context/Global/Global.context";
import { useBankAPI } from "../../../context/API/BankAPI.context";
import { useUser } from "../../../context/User/User.context";

function SpendingLimitForm() {
  const {
    UI: {
      spendingLimitFormState: { type, ID },
      closeSpendingLimitForm,
    },
    state: { showLoading, closeLoading },
  } = useGlobal();
  const { addAccountSpendingLimit, addCardSpendingLimit } =
    useBankAPI().functions;
  const {
    userState: {
      user: { spendingLimits },
    },
    userFunctions: { updateSpendingLimits },
  } = useUser();
  const accountSpendingLimit = spendingLimits?.accounts?.find(
    (acc) => acc.bankAccountID === ID
  );
  const cardSpendingLimit = spendingLimits?.cards?.find(
    (card) => card.bankCardID === ID
  );
  const initialLimit = accountSpendingLimit
    ? accountSpendingLimit.limit
    : cardSpendingLimit
    ? cardSpendingLimit.limit
    : 0;

  const formik = useFormik({
    initialValues: {
      limit: initialLimit,
    },
    onSubmit: (values, { setErrors }) => {
      showLoading("Adding a spending limit...");
      if (type === "ACCOUNT") {
        addAccountSpendingLimit(
          { ...values, bankAccountID: ID },
          (data, error) => {
            if (error) return console.log(error);

            const { spendingLimits } = data?.user;
            updateSpendingLimits(spendingLimits);
            closeLoading();
            closeSpendingLimitForm();
          }
        );
      } else {
        addCardSpendingLimit({ ...values, bankCardID: ID }, (data, error) => {
          if (error) return console.log(error);

          const { spendingLimits } = data?.user;
          updateSpendingLimits(spendingLimits);
          closeLoading();
          closeSpendingLimitForm();
        });
      }
    },
    validationSchema: SpendingLimitSchema,
  });

  const inputs = [
    {
      name: "limit",
      label: "Spending Limit",
      type: "number",
    },
  ];

  return (
    <div className="sl-form-container center">
      <form className="user-info-form" onSubmit={formik.handleSubmit}>
        <h2 className="user-info-form__title">Add a Spending Limit</h2>

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
            onClick={closeSpendingLimitForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpendingLimitForm;
