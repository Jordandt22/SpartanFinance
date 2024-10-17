import React, { useEffect, useState } from "react";

// Components
import Finance from "../../svg/Finance";
import CreditCard from "../../svg/CreditCard";
import Vault from "../../svg/Vault";
import Investments from "../../svg/Investments";
import AIChatBot from "../../svg/AIChatBot";

function AuthSideContent() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      subTitle: "Nice to see you again",
      title: "Welcome Back",
      img: <Finance />,
    },
    {
      subTitle: "Categorize Transactions & Spending Analysis",
      title: "Track Your Spending",
      img: <CreditCard />,
    },
    {
      subTitle: "Personalized Saving & Spending Tips",
      title: "Set Financial Goals",
      img: <Vault />,
    },
    {
      subTitle: "Stocks & Index Funds",
      title: "Investment Suggestions",
      img: <Investments />,
    },
    {
      subTitle: "Have any questions about finance?",
      title: "Ask Our AI Helper",
      img: <AIChatBot />,
    },
  ];

  // Slides Interval
  useEffect(() => {
    setInterval(() => {
      setActiveSlide(activeSlide === slides.length - 1 ? 0 : activeSlide + 1);
    }, 3000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide]);

  const { subTitle, title, img } = slides[activeSlide];
  return (
    <div className="side-content center">
      <h2 className="side-content__subTitle">{subTitle}</h2>
      <h2 className="side-content__title">{title}</h2>
      <div className="side-content__img">{img}</div>

      {/* Tabs */}
      <div className="side-content__tabs between-row">
        {slides.map((slide, i) => {
          const isActive = i === activeSlide;

          return (
            <button
              key={slide.title}
              type="button"
              className={`side-content__tab ${isActive ? "active-tab" : ""}`}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default AuthSideContent;
