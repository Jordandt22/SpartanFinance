const Yup = require("yup");

// ---- User Schemas ----
const UserSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(100, "Your email exceeds the character limit (100).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  username: Yup.string()
    .trim()
    .min(1, "Please create a username.")
    .max(100, "Your username exceeds the character limit (100).")
    .required("Please create a username."),
});

const UserFinancalInfoSchema = Yup.object().shape({
  monthlyIncome: Yup.number()
    .min(0, "Value must be between 0 and 1 million.")
    .max(1000 * 1000, "Value must be between 0 and 1 million.")
    .required("Must enter your monthly income."),
  monthlySpending: Yup.number()
    .min(0, "Value must be between 0 and 1 million.")
    .max(1000 * 1000, "Value must be between 0 and 1 million.")
    .required("Must enter your monthly spending."),
  monthlySavings: Yup.number()
    .min(0, "Value must be between 0 and 1 million.")
    .max(1000 * 1000, "Value must be between 0 and 1 million.")
    .required("Must enter your monthly savings."),
});

// ---- Bank Schemas ----
const BankConnectionSchema = Yup.object().shape({
  bankEmail: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(100, "Your email exceeds the character limit (100).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  bankPassword: Yup.string()
    .trim()
    .min(1, "Please enter your password.")
    .max(300, "Your password exceeds the character limit (300).")
    .required("Please enter your password."),
});

module.exports = {
  schemas: { UserSchema, UserFinancalInfoSchema, BankConnectionSchema },
  bodyValidator: (schema) => async (req, res, next) => {
    try {
      await schema.validate({
        ...req.body,
      });

      next();
    } catch (err) {
      const { errors } = err;
      res.status(422).json({ message: "Invalid data.", formErrors: errors });
    }
  },
};
