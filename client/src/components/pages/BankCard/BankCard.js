import React from "react";
import { NavLink, useParams } from "react-router-dom";
import dateFormat from "dateformat";

// Util
import { currencyFormater } from "../../../util/util";

// Contexts
import { useBank } from "../../../context/User/Bank.context";

// SVGs
import PieChartIcon from "../../svg/icons/PieChartIcon";
import Plus from "../../svg/Plus";

// Components
import NotFound from "../NotFound/NotFound";

export default function BankCard() {
  const { cardID } = useParams();
  const {
    bankData: { cards },
  } = useBank();
  const bankCard = cards.find((acc) => acc._id === cardID);

  if (!bankCard) {
    return <NotFound />;
  }

  const { currentBalance, cardLimit, type, _id: id, transactions } = bankCard;
  const percentageUsed = (currentBalance / cardLimit) * 100;
  let percentageLevel = "green";
  if (percentageUsed >= 80) {
    percentageLevel = "red";
  } else if (percentageUsed >= 50) {
    percentageLevel = "yellow";
  }

  return (
    <div className="BA-container BC-container container">
      {/* Title */}
      <header className="between-row">
        <div>
          <h1 className="BA-container__title">{type.toLowerCase()} Card</h1>
          <h2 className="BA-container__sub-title">ID: {id}</h2>
        </div>
        <NavLink
          className="BA-container__link center"
          to={`/spending/card/${id}`}
        >
          <PieChartIcon /> Track Spending
        </NavLink>
      </header>

      {/* Current Balance & Spending Limits */}
      <div className="row">
        <div
          className={`BA-container__box BC-container__box bank-card__pl-${percentageLevel}`}
        >
          <p className="BA-container__label">Current Balance:</p>
          <p className="BA-container__balance BC-container__balance">
            {currencyFormater(currentBalance)} / {currencyFormater(cardLimit)}
          </p>
          <div className="bank-card__progress">
            <div
              className="bank-card__progress-amount"
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
          <p className="bank-card__spent">{percentageUsed.toFixed(2)}% Used</p>
        </div>
        <div className="BA-container__box">
          <p className="BA-container__message">No Active Spending Limit</p>
          <button type="button" className="BA-container__btn center">
            <Plus />
            Add Limit
          </button>
        </div>
      </div>

      {/* Transactions */}
      <div className="BA-transactions">
        <h3 className="BA-transactions__title">Transactions</h3>

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
      </div>
    </div>
  );
}
