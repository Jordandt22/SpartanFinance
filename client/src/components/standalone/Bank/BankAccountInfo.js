import React from "react";
import { useNavigate } from "react-router-dom";

// Util
import { currencyFormater } from "../../../util/util";

// SVGs
import MoreIcon from "../../svg/icons/MoreIcon";

function BankAccountInfo(props) {
  const { currentBalance, type, id } = props;
  const navigate = useNavigate();

  return (
    <div className="bank-account">
      <header className="bank-account__header between-row">
        <h2
          className="bank-account__title"
          onClick={() => navigate(`/account/${id}`)}
        >
          {type.toLowerCase()} Account
        </h2>
        <button type="button" className="bank-account__more center">
          <MoreIcon />
        </button>
      </header>
      <p className="bank-account__id">ID: {id}</p>
      <p className="bank-account__balance">
        {currencyFormater(currentBalance)}
      </p>
    </div>
  );
}

export default BankAccountInfo;
