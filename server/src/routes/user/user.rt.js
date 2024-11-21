const userRouter = require("express-promise-router")();
const {
  createUser,
  getUser,
  deleteUser,
} = require("../../controllers/user/user.ct");
const { authUser } = require("../../middleware/auth.mw");

// POST: Create User
userRouter.post("/:uid", authUser, createUser);

// GET: Get User
userRouter.get("/:uid", authUser, getUser);

// DELETE: Delete User
userRouter.delete("/:uid", authUser, deleteUser);

module.exports = userRouter;
