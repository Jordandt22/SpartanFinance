const UserModel = require("../../models/db");
const Axios = require("axios");
const { BANK_API_URI } = process.env;

module.exports = {
  connectToBank: async (req, res, next) => {
    const { uid } = req.user;
    const { bankEmail, bankPassword } = req.body;

    try {
      // Get Bank Info
      const dummyBankAPICall = await Axios.post(BANK_API_URI + "/users/auth", {
        email: bankEmail,
        password: bankPassword,
      });
      const bankData = dummyBankAPICall?.data?.user;

      // Check if a user is already connected to this bank
      const bankID = bankData._id;
      const bankAlreadyConnected = await UserModel.exists({
        bankID,
      });
      if (bankAlreadyConnected)
        return res.status(409).json({
          user: null,
          error: "An account has already connected to this bank.",
        });

      // Add Bank ID to User Data
      const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        {
          bankID,
        },
        { returnDocument: "after" }
      );

      return res.status(200).json({
        user: { ...updatedUser._doc, bankInfo: bankData },
        error: null,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ user: null, error: "There was an error on the server." });
    }
  },
};
