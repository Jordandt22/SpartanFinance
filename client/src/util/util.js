export const currencyFormater = (value) => {
  // Create our number formatter.
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options can be used to round to whole numbers.
    // trailingZeroDisplay: "stripIfInteger",
    // This is probably what most people
    // want. It will only stop printing
    // the fraction when the input
    // amount is a round number (int)
    // already. If that's not what you
    // need, have a look at the options
    // below.
    //minimumFractionDigits: 0, // This suffices for whole numbers, but will
    // print 2500.10 as $2,500.1
    maximumFractionDigits: 2, // Causes 2500.99 to be printed as $2,501
  });

  return formatter.format(value);
};

export const getMonthlySpending = (transactions) => {
  let totalSpending = 0;

  transactions.map((t) => {
    const today = new Date();
    const transactionDate = new Date(t.date);
    if (
      transactionDate.getFullYear() === today.getFullYear() &&
      transactionDate.getMonth() === today.getMonth()
    ) {
      totalSpending += t.amount * -1;
    }
  });

  return totalSpending <= 0 ? 0 : totalSpending;
};

export const getPercentageLevel = (currentBalance, limit) => {
  const percentageUsed = (currentBalance / limit) * 100;
  let percentageLevel = "green";
  if (percentageUsed >= 80) {
    percentageLevel = "red";
  } else if (percentageUsed >= 50) {
    percentageLevel = "yellow";
  }

  return {
    percentageUsed,
    percentageLevel,
  };
};
