const Load = require("../models/Load");

exports.createLoad = async (req, res) => {
  try {
    const load = new Load({ ...req.body, shipperId: req.user.userId });
    await load.save();
    res.status(201).json({ message: "Load posted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error posting load" });
  }
};

exports.getLoads = async (req, res) => {
  try {
    const loads = await Load.find({ status: "open" }).populate("shipperId", "name email");
    res.json(loads);
  } catch (error) {
    res.status(400).json({ error: "Error fetching loads" });
  }
};

exports.placeBid = async (req, res) => {
    try {
      const { loadId, amount } = req.body;
      const truckerId = req.user.userId; // Get trucker from token
  
      const load = await Load.findById(loadId);
      if (!load) return res.status(404).json({ error: "Load not found" });
  
      load.bids.push({ truckerId, amount });
      await load.save();
  
      res.json({ message: "Bid placed successfully" });
    } catch (error) {
      res.status(400).json({ error: "Error placing bid" });
    }
  };
  
  exports.getBids = async (req, res) => {
    try {
      const { loadId } = req.params;
      const load = await Load.findById(loadId).populate("bids.truckerId", "name email");
  
      if (!load) return res.status(404).json({ error: "Load not found" });
  
      res.json(load.bids);
    } catch (error) {
      res.status(400).json({ error: "Error fetching bids" });
    }
  };
  
