const { db, banks, graph } = require("../models/database");
const { dijkstraFastest, dijkstraCheapest } = require("../utils/dijkstra");

exports.findFastestRoute = (req, res) => {
  const { fromBank, toBank } = req.body;
  const result = dijkstraFastest(fromBank, toBank, graph);
  if (!result) return res.status(404).json({ error: "No path found" });
  db.run(
    "INSERT INTO transactions (fromBank, toBank, route, time) VALUES (?, ?, ?, ?)",
    [fromBank, toBank, result.path.join(" -> "), result.time]
  );
  res.json({ route: result.path, time: result.time });
};

exports.findCheapestRoute = (req, res) => {
  const { fromBank, toBank } = req.body;
  const result = dijkstraCheapest(fromBank, toBank, banks, graph);
  if (!result) return res.status(404).json({ error: "No path found" });
  db.run(
    "INSERT INTO transactions (fromBank, toBank, route, cost) VALUES (?, ?, ?, ?)",
    [fromBank, toBank, result.path.join(" -> "), result.cost]
  );
  res.json({ route: result.path, cost: result.cost });
};
