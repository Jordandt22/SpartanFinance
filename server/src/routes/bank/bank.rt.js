const bankRouter = require("express-promise-router")();
const { connectToBank } = require("../../controllers/bank/bank.ct");
const { checkIfUserExist } = require("../../middleware/auth.mw");
const {
  schemas: { BankConnectionSchema },
  bodyValidator,
} = require("../../middleware/validator.mw");

// POST: Connect to Bank
bankRouter.post(
  "/connect",
  checkIfUserExist,
  bodyValidator(BankConnectionSchema),
  connectToBank
);

module.exports = bankRouter;
