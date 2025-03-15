const Transaction = require("../models/Transaction");

exports.createTransaction = async (req, res) => {
  try {
    const { shipperId, truckerId, loadId, amount } = req.body;
    const transaction = new Transaction({ shipperId, truckerId, loadId, amount });
    await transaction.save();

    res.status(201).json({ message: "Transaction recorded" });
  } catch (error) {
    res.status(400).json({ error: "Error creating transaction" });
  }
};

exports.getLedger = async (req, res) => {
  try {
    const { userId } = req.user;
    const ledger = await Transaction.find({ $or: [{ shipperId: userId }, { truckerId: userId }] })
      .populate("shipperId", "name")
      .populate("truckerId", "name")
      .populate("loadId", "title");

    res.json(ledger);
  } catch (error) {
    res.status(400).json({ error: "Error fetching ledger" });
  }
};
