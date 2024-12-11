import React from "react";
import {
  currencyFormater,
  getMonthlySpending,
  getPercentageLevel,
} from "../../../util/util";

function SpendingLimit(props) {
  const { transactions, spendingLimit } = props;
  const montlyhSpending = getMonthlySpending(transactions);
  const { percentageUsed, percentageLevel } = getPercentageLevel(
    montlyhSpending,
    spendingLimit.limit
  );

  return (
    <div className={`bank-card__pl-${percentageLevel}`}>
      <p className="BA-container__label">Monthly Spending Limit:</p>
      <p className="BA-container__limit">
        {currencyFormater(montlyhSpending)} /{" "}
        {currencyFormater(spendingLimit.limit)}
      </p>
      {/* Progress Bar */}
      <div className="bank-card__progress">
        <div
          className="bank-card__progress-amount"
          style={{ width: `${percentageUsed}%` }}
        ></div>
      </div>
      <p className="bank-card__spent">{percentageUsed.toFixed(2)}% Used</p>
    </div>
  );
}

export default SpendingLimit;
