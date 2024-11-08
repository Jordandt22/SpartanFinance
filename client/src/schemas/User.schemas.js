import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(100, "Your email exceeds the character limit (100).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: Yup.string()
    .trim()
    .min(1, "Please enter your password.")
    .max(300, "Your password exceeds the character limit (300).")
    .required("Please enter your password."),
});

export const SignupSchema = Yup.object().shape({
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
  password: Yup.string()
    .trim()
    .min(8, "Your password must be atleast 8 characters.")
    .max(300, "Your password exceeds the character limit (300).")
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Must contain atleast 1 upper and lower case letter, 1 number, and 1 special symbol."
    )
    .required("Must create a password."),
  confirmPassword: Yup.string()
    .trim()
    .min(1, "You must confirm your password.")
    .max(300, "Your confirmation password exceeds the character limit (300).")
    .oneOf(
      [Yup.ref("password"), null],
      "You confirmation password does NOT match."
    )
    .required("You must confirm your password."),
});

export const BankLoginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .min(1, "Please enter a valid email.")
    .max(100, "Your email exceeds the character limit (100).")
    .email("Please enter a valid email.")
    .required("Please enter a valid email."),
  password: Yup.string()
    .trim()
    .min(1, "Please enter your password.")
    .max(300, "Your password exceeds the character limit (300).")
    .required("Please enter your password."),
});
