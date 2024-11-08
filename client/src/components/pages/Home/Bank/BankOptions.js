import React, { useState } from "react";

// Contexts
import { useUser } from "../../../../context/User/User.context";

// Components
import Bank from "../../../svg/Bank";

function BankOptions() {
  const {
    bankFunctions: { setToStepTwo },
  } = useUser();
  const [bankInfo, setBankInfo] = useState({
    logo: null,
    bankName: "",
    isSvg: false,
  });
  const [selectedBank, setSelectedBank] = useState(null);
  const banks = [
    {
      logo: "bofa-logo",
      name: "Bank of America",
      available: false,
    },

    {
      logo: "chase-bank-logo",
      name: "Chase Bank",
      available: false,
    },
    {
      logo: "wells-fargo-logo",
      name: "Wells Fargo Bank",
      available: false,
    },
    {
      logo: <Bank />,
      isSvg: true,
      name: "Dummy Bank",
      available: true,
    },
  ];

  return (
    <div className="bank-options">
      <h1 className="bank-options__title">Bank Login</h1>
      <p className="bank-options__text">
        Choose the bank you want to connect to:
      </p>

      {banks.map((bank, i) => {
        const { logo, name, available, isSvg } = bank;
        const isSelected = selectedBank === i;

        return (
          <div className="bank-opt between-row" key={name}>
            <div className="row">
              {isSvg ? (
                <>{logo}</>
              ) : (
                <img
                  src={process.env.PUBLIC_URL + `/assets/images/${logo}.png`}
                  alt={name}
                />
              )}
              <p className="bank-opt__name">{name}</p>
            </div>

            {available ? (
              <>
                {isSelected ? (
                  <button
                    className="bank-opt__active"
                    onClick={() => {
                      setSelectedBank(null);
                      setBankInfo({ logo: null, bankName: "", isSvg: false });
                    }}
                  >
                    Connected
                  </button>
                ) : (
                  <button
                    className="bank-opt__connect"
                    onClick={() => {
                      setSelectedBank(i);
                      setBankInfo({ logo, bankName: name, isSvg });
                    }}
                  >
                    Connect
                  </button>
                )}
              </>
            ) : (
              <div className="bank-opt__not-available">Unavailable</div>
            )}
          </div>
        );
      })}

      {selectedBank === null ? (
        <div className="bank-options__invalid">Please Select a Bank</div>
      ) : (
        <button
          className="bank-options__next"
          onClick={() => setToStepTwo(bankInfo)}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default BankOptions;
