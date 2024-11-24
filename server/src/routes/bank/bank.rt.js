const bankRouter = require("express-promise-router")();
const { connectToBank } = require("../../controllers/bank/bank.ct");
const { checkIfUserExist } = require("../../middleware/auth.mw");

// POST: Connect to Bank
bankRouter.post("/connect", checkIfUserExist, connectToBank);

module.exports = bankRouter;
