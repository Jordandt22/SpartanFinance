import React, { useEffect, useRef } from "react";
import { useBank } from "../../../context/User/Bank.context";
import BankCardInfo from "../../standalone/Bank/BankCardInfo";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";
import Chart from "chart.js/auto";

function BankCards() {
    const { ID, type } = useParams();
    const {
        bankData: { cards, accounts },
    } = useBank();

    // Chart reference
    const chartRef = useRef(null);

    // Find the specific card based on ID and type
    let bankData = null;

    if (type === "card") {
        bankData = cards.find((card) => card._id === ID);
    } else if (type === "account") {
        bankData = accounts.find((acc) => acc._id === ID);
    }

    useEffect(() => {
        if (!bankData || !bankData.transactions) return;

        // Cleanup the previous chart instance
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Aggregate transaction amounts by category
        const categoryData = bankData.transactions.reduce((acc, transaction) => {
            const { category, amount } = transaction;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += amount;
            return acc;
        }, {});

        const labels = Object.keys(categoryData); // Categories as labels
        const data = Object.values(categoryData).map((value) => Math.abs(value)); // Absolute values for chart

        const ctx = document.getElementById("spendingChart").getContext("2d");
        chartRef.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels, // Categories as labels
                datasets: [
                    {
                        data, // Data corresponding to categories
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4BC0C0",
                            "#9966FF",
                            "#FF9F40",
                        ], // Add more colors as needed
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56",
                            "#4BC0C0",
                            "#9966FF",
                            "#FF9F40",
                        ],
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [bankData]);

    if (!bankData) {
        return <NotFound />;
    }

    const { transactions = [] } = bankData; // Extract transactions from bankData

    return (
        <div className="bank-accounts-container container">
            <h1 className="bank-accounts-container__title">Spending Chart</h1>
            <div className="bank-accounts">
                <BankCardInfo
                    key={bankData._id}
                    currentBalance={bankData.currentBalance}
                    cardLimit={bankData.cardLimit}
                    type={bankData.type}
                    id={bankData._id}
                />
            </div>
            <div
                style={{
                    width: "300px", // Set the desired width
                    height: "300px", // Set the desired height
                    margin: "0 auto", // Center the chart
                }}
            >
                <canvas id="spendingChart" />
            </div>
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
                                    {new Date(date).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div>
                                <p
                                    className={`BA-transactions__amount ${
                                        isNegative ? "negative" : "positive"
                                    }`}
                                >
                                    {isNegative
                                        ? amount.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })
                                        : "+" +
                                        amount.toLocaleString("en-US", {
                                            style: "currency",
                                            currency: "USD",
                                        })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BankCards;
