// const canvas = document.getElementById("graphCanvas");
// const ctx = canvas.getContext("2d");
// let nodes = [], edges = [], adjacencyList = {}, nodeId = 0;
// let selectedNode = null;
// let mode = "addNode";

// canvas.addEventListener("click", e => {
//   const x = e.offsetX, y = e.offsetY;

//   if (mode === "addNode") {
//     nodes.push({ id: nodeId, x, y });
//     adjacencyList[nodeId] = [];
//     nodeId++;
//   } else if (mode === "addEdge") {
//     const clickedNode = getNodeAt(x, y);
//     if (clickedNode !== null) {
//       if (selectedNode === null) {
//         selectedNode = clickedNode;
//       } else {
//         if (selectedNode !== clickedNode) {
//           const randomWeight = Math.floor(Math.random() * 20) + 1;
//           edges.push({ from: selectedNode, to: clickedNode, weight: randomWeight });
//           adjacencyList[selectedNode].push({ node: clickedNode, weight: randomWeight });
//           adjacencyList[clickedNode].push({ node: selectedNode, weight: randomWeight });
//         }
//         selectedNode = null;
//       }
//     }
//   }

//   draw();
// });

// function getNodeAt(x, y) {
//   return nodes.find(n => Math.hypot(n.x - x, n.y - y) <= 20)?.id ?? null;
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   ctx.lineWidth = 2;
//   ctx.strokeStyle = "#546e7a";
//   edges.forEach(e => {
//     const from = nodes.find(n => n.id === e.from);
//     const to = nodes.find(n => n.id === e.to);
//     ctx.beginPath();
//     ctx.moveTo(from.x, from.y);
//     ctx.lineTo(to.x, to.y);
//     ctx.stroke();

//     const midX = (from.x + to.x) / 2;
//     const midY = (from.y + to.y) / 2;
//     ctx.fillStyle = "#d32f2f";
//     ctx.font = "14px Arial";
//     ctx.fillText(e.weight, midX, midY);
//   });

//   nodes.forEach(n => {
//     ctx.beginPath();
//     ctx.arc(n.x, n.y, 20, 0, 2 * Math.PI);
//     ctx.fillStyle = "#4fc3f7";
//     ctx.fill();
//     ctx.strokeStyle = "#0288d1";
//     ctx.lineWidth = 2;
//     ctx.stroke();

//     ctx.fillStyle = "#000";
//     ctx.font = "bold 14px Arial";
//     ctx.fillText(n.id, n.x - 5, n.y + 5);
//   });

//   ctx.lineWidth = 1;
// }

// function highlightNode(node) {
//   draw();
//   ctx.beginPath();
//   ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
//   ctx.strokeStyle = "#ff4081";
//   ctx.lineWidth = 4;
//   ctx.stroke();
//   ctx.lineWidth = 1;
//   ctx.strokeStyle = "black";
// }

// function logResult(text) {
//   const output = document.getElementById("output");
//   output.innerHTML += `<div>➤ ${text}</div>`;
// }

// function startAlgorithm() {
//   document.getElementById("output").innerHTML = "";
//   const algo = document.getElementById("algoSelect").value;
//   const startNode = 0;
//   switch (algo) {
//     case "bfs": bfs(startNode); break;
//     case "dfs": dfs(startNode); break;
//     case "dijkstra": dijkstra(startNode); break;
//   }
// }

// function bfs(start) {
//   let visited = {}, queue = [start], order = [];
//   visited[start] = true;

//   const interval = setInterval(() => {
//     if (queue.length === 0) {
//       logResult("BFS Order: " + order.join(" → "));
//       return clearInterval(interval);
//     }
//     const current = queue.shift();
//     order.push(current);
//     highlightNode(nodes.find(n => n.id === current));
//     adjacencyList[current].forEach(({ node: neigh }) => {
//       if (!visited[neigh]) {
//         visited[neigh] = true;
//         queue.push(neigh);
//       }
//     });
//   }, 800);
// }

// function dfs(start) {
//   let visited = {}, stack = [start], order = [];

//   const interval = setInterval(() => {
//     if (stack.length === 0) {
//       logResult("DFS Order: " + order.join(" → "));
//       return clearInterval(interval);
//     }
//     const current = stack.pop();
//     if (visited[current]) return;
//     visited[current] = true;
//     order.push(current);
//     highlightNode(nodes.find(n => n.id === current));
//     adjacencyList[current].forEach(({ node: neigh }) => {
//       if (!visited[neigh]) stack.push(neigh);
//     });
//   }, 800);
// }

// function dijkstra(start) {
//   const dist = {}, visited = {}, path = {};
//   nodes.forEach(n => {
//     dist[n.id] = Infinity;
//     path[n.id] = "-";
//   });
//   dist[start] = 0;

//   const interval = setInterval(() => {
//     let minDist = Infinity, u = null;
//     for (let v in dist) {
//       if (!visited[v] && dist[v] < minDist) {
//         minDist = dist[v];
//         u = parseInt(v);
//       }
//     }
//     if (u === null) {
//       let result = "Dijkstra Distance from Node 0:<br>";
//       Object.entries(dist).forEach(([node, d]) => {
//         result += `Node ${node} → ${d}<br>`;
//       });
//       logResult(result);
//       return clearInterval(interval);
//     }

//     visited[u] = true;
//     highlightNode(nodes.find(n => n.id === u));
//     adjacencyList[u].forEach(({ node: v, weight }) => {
//       if (dist[u] + weight < dist[v]) {
//         dist[v] = dist[u] + weight;
//         path[v] = u;
//       }
//     });
//   }, 800);
// }

// Full script.js with BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim's, and Kruskal's
const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
let nodes = [], edges = [], adjacencyList = {}, nodeId = 0;
let selectedNode = null;
let mode = "addNode";

canvas.addEventListener("click", e => {
  const x = e.offsetX, y = e.offsetY;
  if (mode === "addNode") {
    nodes.push({ id: nodeId, x, y });
    adjacencyList[nodeId] = [];
    nodeId++;
  } else if (mode === "addEdge") {
    const clickedNode = getNodeAt(x, y);
    if (clickedNode !== null) {
      if (selectedNode === null) {
        selectedNode = clickedNode;
      } else {
        if (selectedNode !== clickedNode) {
          const randomWeight = Math.floor(Math.random() * 20) + 1;
          edges.push({ from: selectedNode, to: clickedNode, weight: randomWeight });
          adjacencyList[selectedNode].push({ node: clickedNode, weight: randomWeight });
          adjacencyList[clickedNode].push({ node: selectedNode, weight: randomWeight });
        }
        selectedNode = null;
      }
    }
  }
  draw();
});

function getNodeAt(x, y) {
  return nodes.find(n => Math.hypot(n.x - x, n.y - y) <= 20)?.id ?? null;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#546e7a";
  edges.forEach(e => {
    const from = nodes.find(n => n.id === e.from);
    const to = nodes.find(n => n.id === e.to);
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    ctx.fillStyle = "#d32f2f";
    ctx.font = "14px Arial";
    ctx.fillText(e.weight, midX, midY);
  });
  nodes.forEach(n => {
    ctx.beginPath();
    ctx.arc(n.x, n.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = "#4fc3f7";
    ctx.fill();
    ctx.strokeStyle = "#0288d1";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.font = "bold 14px Arial";
    ctx.fillText(n.id, n.x - 5, n.y + 5);
  });
  ctx.lineWidth = 1;
}

function highlightNode(node) {
  draw();
  ctx.beginPath();
  ctx.arc(node.x, node.y, 25, 0, 2 * Math.PI);
  ctx.strokeStyle = "#ff4081";
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
}

function logResult(text) {
  const output = document.getElementById("output");
  output.innerHTML += `<div>➤ ${text}</div>`;
}

function startAlgorithm() {
  document.getElementById("output").innerHTML = "";
  const algo = document.getElementById("algoSelect").value;
  const startNode = 0;
  switch (algo) {
    case "bfs": bfs(startNode); break;
    case "dfs": dfs(startNode); break;
    case "dijkstra": dijkstra(startNode); break;
    case "bellman": bellmanFord(startNode); break;
    case "floyd": floydWarshall(); break;
    case "prim": primMST(); break;
    case "kruskal": kruskalMST(); break;
  }
}

function bfs(start) {
  let visited = {}, queue = [start], order = [];
  visited[start] = true;
  const interval = setInterval(() => {
    if (queue.length === 0) {
      logResult("BFS Order: " + order.join(" → "));
      return clearInterval(interval);
    }
    const current = queue.shift();
    order.push(current);
    highlightNode(nodes.find(n => n.id === current));
    adjacencyList[current].forEach(({ node: neigh }) => {
      if (!visited[neigh]) {
        visited[neigh] = true;
        queue.push(neigh);
      }
    });
  }, 800);
}

function dfs(start) {
  let visited = {}, stack = [start], order = [];
  const interval = setInterval(() => {
    if (stack.length === 0) {
      logResult("DFS Order: " + order.join(" → "));
      return clearInterval(interval);
    }
    const current = stack.pop();
    if (visited[current]) return;
    visited[current] = true;
    order.push(current);
    highlightNode(nodes.find(n => n.id === current));
    adjacencyList[current].forEach(({ node: neigh }) => {
      if (!visited[neigh]) stack.push(neigh);
    });
  }, 800);
}

function dijkstra(start) {
  const dist = {}, visited = {}, path = {};
  nodes.forEach(n => {
    dist[n.id] = Infinity;
    path[n.id] = "-";
  });
  dist[start] = 0;
  const interval = setInterval(() => {
    let minDist = Infinity, u = null;
    for (let v in dist) {
      if (!visited[v] && dist[v] < minDist) {
        minDist = dist[v];
        u = parseInt(v);
      }
    }
    if (u === null) {
      let result = "Dijkstra Distance from Node 0:<br>";
      Object.entries(dist).forEach(([node, d]) => {
        result += `Node ${node} → ${d}<br>`;
      });
      logResult(result);
      return clearInterval(interval);
    }
    visited[u] = true;
    highlightNode(nodes.find(n => n.id === u));
    adjacencyList[u].forEach(({ node: v, weight }) => {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
        path[v] = u;
      }
    });
  }, 800);
}

function bellmanFord(start) {
  const dist = {};
  nodes.forEach(n => dist[n.id] = Infinity);
  dist[start] = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.forEach(({ from, to, weight }) => {
      if (dist[from] + weight < dist[to]) dist[to] = dist[from] + weight;
    });
  }
  let result = "Bellman-Ford from Node 0:<br>";
  Object.entries(dist).forEach(([node, d]) => {
    result += `Node ${node} → ${d}<br>`;
  });
  logResult(result);
}

function floydWarshall() {
  const V = nodes.length;
  const dist = Array.from({ length: V }, () => Array(V).fill(Infinity));
  for (let i = 0; i < V; i++) dist[i][i] = 0;
  edges.forEach(({ from, to, weight }) => {
    dist[from][to] = weight;
    dist[to][from] = weight;
  });
  for (let k = 0; k < V; k++)
    for (let i = 0; i < V; i++)
      for (let j = 0; j < V; j++)
        if (dist[i][k] + dist[k][j] < dist[i][j])
          dist[i][j] = dist[i][k] + dist[k][j];
  let result = "Floyd-Warshall Distance Matrix:<br>";
  dist.forEach((row, i) => {
    result += `From Node ${i}: ` + row.map(d => d === Infinity ? "∞" : d).join(", ") + "<br>";
  });
  logResult(result);
}

function primMST() {
  const key = {}, parent = {}, mstSet = {};
  nodes.forEach(n => { key[n.id] = Infinity; mstSet[n.id] = false; });
  key[0] = 0;
  for (let count = 0; count < nodes.length - 1; count++) {
    let u = -1, min = Infinity;
    for (let v in key) {
      if (!mstSet[v] && key[v] < min) {
        min = key[v]; u = parseInt(v);
      }
    }
    if (u === -1) break;
    mstSet[u] = true;
    adjacencyList[u].forEach(({ node: v, weight }) => {
      if (!mstSet[v] && weight < key[v]) {
        key[v] = weight; parent[v] = u;
      }
    });
  }
  let result = "Prim's MST:<br>";
  Object.entries(parent).forEach(([child, par]) => {
    result += `Edge ${par} — ${child} (Weight: ${key[child]})<br>`;
  });
  logResult(result);
}

function kruskalMST() {
  const find = parent => x => (parent[x] === x ? x : parent[x] = find(parent)(parent[x]));
  const union = (x, y, parent) => parent[find(parent)(x)] = find(parent)(y);
  let parent = {}; nodes.forEach(n => parent[n.id] = n.id);
  let mst = [], totalWeight = 0;
  edges.sort((a, b) => a.weight - b.weight);
  edges.forEach(e => {
    const { from, to, weight } = e;
    if (find(parent)(from) !== find(parent)(to)) {
      mst.push(e);
      totalWeight += weight;
      union(from, to, parent);
    }
  });
  let result = "Kruskal's MST:<br>";
  mst.forEach(e => {
    result += `Edge ${e.from} — ${e.to} (Weight: ${e.weight})<br>`;
  });
  result += `Total Weight: ${totalWeight}`;
  logResult(result);
}