import React from "react";
import { NavLink, useParams } from "react-router-dom";
import dateFormat from "dateformat";

// Util
import { currencyFormater } from "../../../util/util";

// Contexts
import { useBank } from "../../../context/User/Bank.context";
import { useGlobal } from "../../../context/Global/Global.context";
import { useUser } from "../../../context/User/User.context";

// SVGs
import Plus from "../../svg/Plus";
import PieChartIcon from "../../svg/icons/PieChartIcon";
import EditIcon from "../../svg/icons/EditIcon";

// Components
import NotFound from "../NotFound/NotFound";
import SpendingLimit from "./SpendingLimit";

export default function BankAccount() {
  const { accountID } = useParams();
  const {
    bankData: { accounts },
  } = useBank();
  const {
    userState: {
      user: { spendingLimits },
    },
  } = useUser();
  const { openSpendingLimitForm } = useGlobal().UI;
  const bankAccount = accounts.find((acc) => acc._id === accountID);
  const spendingLimit = spendingLimits?.accounts?.find(
    (acc) => acc.bankAccountID === accountID
  );

  if (!bankAccount) {
    return <NotFound />;
  }

  const { currentBalance, type, _id: id, transactions } = bankAccount;
  return (
    <div className="BA-container container">
      {/* Title */}
      <header className="between-row">
        <div>
          <h1 className="BA-container__title">{type.toLowerCase()} Account</h1>
          <h2 className="BA-container__sub-title">ID: {id}</h2>
        </div>
        <NavLink
          className="BA-container__link center"
          to={`/spending/account/${id}`}
        >
          <PieChartIcon /> Track Spending
        </NavLink>
      </header>

      {/* Current Balance & Spending Limits */}
      <div className="row">
        <div className="BA-container__box">
          <p className="BA-container__label">Current Balance:</p>
          <p className="BA-container__balance">
            {currencyFormater(currentBalance)}
          </p>
        </div>
        {transactions.length > 0 && (
          <>
            <div className="BA-container__box">
              {spendingLimit && transactions.length > 0 ? (
                <div className="between-row">
                  <SpendingLimit
                    transactions={transactions}
                    spendingLimit={spendingLimit}
                  />
                  <button
                    type="button"
                    className="BA-container__edit center"
                    onClick={() => openSpendingLimitForm("ACCOUNT", accountID)}
                  >
                    <EditIcon />
                  </button>
                </div>
              ) : (
                <>
                  <p className="BA-container__message">
                    No Active Spending Limit
                  </p>
                  <button
                    type="button"
                    className="BA-container__btn center"
                    onClick={() => openSpendingLimitForm("ACCOUNT", accountID)}
                  >
                    <Plus />
                    Add Limit
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Transactions */}
      <div className="BA-transactions">
        <h3 className="BA-transactions__title">Transactions</h3>

        {transactions.length > 0 ? (
          <>
            {transactions.map((t) => {
              const { amount, category, _id: transID, date, name } = t;
              const isNegative = amount < 0;

              return (
                <div key={transID} className="BA-transactions__box between-row">
                  <div className="BA-transactions__info">
                    <p className="BA-transactions__name">
                      {name} <span>({category})</span>
                    </p>
                    <p className="BA-transactions__date">
                      {dateFormat(date, "mmm d, yyyy")}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`BA-transactions__amount ${
                        isNegative ? "negative" : "positive"
                      }`}
                    >
                      {isNegative
                        ? currencyFormater(amount)
                        : "+" + currencyFormater(amount)}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="BA-container__disclaimer">
            There are no transactions for this bank account.
          </p>
        )}
      </div>
    </div>
  );
}
