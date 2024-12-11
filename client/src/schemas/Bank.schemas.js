import * as Yup from "yup";

export const SpendingLimitSchema = Yup.object().shape({
  limit: Yup.number()
    .min(1, "A spending limit is required.")
    .max(1000 * 1000, "The max value is 1 million.")
    .required("A spending limit is required."),
});
