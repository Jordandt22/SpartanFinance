import React from "react";
import { useNavigate } from "react-router-dom";

// Util
import { currencyFormater, getPercentageLevel } from "../../../util/util";

// SVGs
import MoreIcon from "../../svg/icons/MoreIcon";

function BankCardInfo(props) {
  const { currentBalance, cardLimit, type, id } = props;
  const navigate = useNavigate();
  const { percentageUsed, percentageLevel } = getPercentageLevel(
    currentBalance,
    cardLimit
  );

  return (
    <div
      key={id}
      className={`bank-account bank-card bank-card__pl-${percentageLevel}`}
    >
      <header className="bank-account__header between-row">
        <h2
          className="bank-account__title"
          onClick={() => navigate(`/card/${id}`)}
        >
          {type.toLowerCase()} Card
        </h2>
        <button type="button" className="bank-account__more center">
          <MoreIcon />
        </button>
      </header>
      <p className="bank-account__id">ID: {id}</p>
      <p className="bank-account__balance">
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
  );
}

export default BankCardInfo;
