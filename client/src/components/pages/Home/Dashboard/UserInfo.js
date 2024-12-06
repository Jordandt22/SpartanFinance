import React from "react";
import { NavLink } from "react-router-dom";

// Util
import { currencyFormater } from "../../../../util/util";

// Contexts
import { useUser } from "../../../../context/User/User.context";
import { useGlobal } from "../../../../context/Global/Global.context";

function UserInfo() {
  const {
    userState: {
      user: { financialInfoAdded, financialInfo },
    },
  } = useUser();
  const { openUserInfoForm } = useGlobal().UI;

  return (
    <div className="user-info">
      {/* Header */}
      <header className="user-info__header row">
        <h1 className="user-info__title">Income & Spending Information</h1>
        <button
          type="button"
          className="user-info__update"
          onClick={openUserInfoForm}
        >
          {financialInfoAdded ? "Update" : "Add"} Info
        </button>
      </header>
      {/* Finance Info */}
      {financialInfoAdded ? (
        <div className="row">
          {/* Monthly Income */}
          <div className="financial-info">
            <h2 className="financial-info__label">Monthly Income:</h2>
            <p className="financial-info__amount">
              {currencyFormater(financialInfo.monthlyIncome)}
            </p>
          </div>
          {/* Monthly Spending */}
          <div className="financial-info">
            <h2 className="financial-info__label">Monthly Spending:</h2>
            <p className="financial-info__amount">
              {currencyFormater(financialInfo.monthlySpending)}
            </p>
          </div>
          {/* Monthly Savings */}
          <div className="financial-info">
            <h2 className="financial-info__label">Monthly Savings:</h2>
            <p className="financial-info__amount">
              {currencyFormater(financialInfo.monthlySavings)}
            </p>
          </div>
        </div>
      ) : (
        <p className="user-info__disclaimer">
          Please input your financial information to access this feature.
        </p>
      )}
    </div>
  );
}

export default UserInfo;
