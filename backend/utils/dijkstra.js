// backend/utils/dijkstra.js
const Heap = require("heap");

// Dijkstra's algorithm for fastest path (minimizing time)
function dijkstraFastest(start, end, graph) {
  let distances = {};
  let predecessors = {};
  let pq = new Heap((a, b) => a.distance - b.distance);
  distances[start] = 0;
  pq.push({ node: start, distance: 0 });

  while (!pq.empty()) {
    let current = pq.pop();
    if (current.node === end) break;
    if (current.distance > distances[current.node]) continue;

    for (let neighbor of graph[current.node] || []) {
      let newDist = current.distance + neighbor.time;
      if (newDist < (distances[neighbor.to] || Infinity)) {
        distances[neighbor.to] = newDist;
        predecessors[neighbor.to] = current.node;
        pq.push({ node: neighbor.to, distance: newDist });
      }
    }
  }

  if (!(end in distances)) return null;

  let path = [];
  let current = end;
  while (current !== start) {
    path.push(current);
    current = predecessors[current];
  }
  path.push(start);
  path.reverse();
  return { path, time: distances[end] };
}

// Dijkstra's algorithm for cheapest path (minimizing cost)
function dijkstraCheapest(start, end, banks, graph) {
  let distances = {};
  let predecessors = {};
  let pq = new Heap((a, b) => a.distance - b.distance);
  distances[start] = banks[start];
  pq.push({ node: start, distance: banks[start] });

  while (!pq.empty()) {
    let current = pq.pop();
    if (current.node === end) break;
    if (current.distance > distances[current.node]) continue;

    for (let neighbor of graph[current.node] || []) {
      let newDist = current.distance + (banks[neighbor.to] || Infinity);
      if (newDist < (distances[neighbor.to] || Infinity)) {
        distances[neighbor.to] = newDist;
        predecessors[neighbor.to] = current.node;
        pq.push({ node: neighbor.to, distance: newDist });
      }
    }
  }

  if (!(end in distances)) return null;

  let path = [];
  let current = end;
  while (current !== start) {
    path.push(current);
    current = predecessors[current];
  }
  path.push(start);
  path.reverse();
  return { path, cost: distances[end] };
}

module.exports = { dijkstraFastest, dijkstraCheapest };
