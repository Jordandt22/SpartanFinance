module.exports = {
  sendMessage: async (req, res, next) => {
    res.status(200).json({ message: "Test" });
  },
};
