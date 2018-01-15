"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculate shortest route
 * @param graph reference graph
 * @param from origin node (vertex)
 * @param to destination node (vertex)
 */
function calcShortestRoute(graph, from, to) {
    // track lowest cost to reach each node
    const costs = Object.assign({ finish: Infinity }, graph[from]);
    // track paths
    const parents = { finish: null };
    for (let child in graph[from]) {
        parents[child] = 'start';
    }
    // track nodes that have already been processed
    const processed = [];
    let node = lowestCostNode(costs, processed);
    while (node) {
        let cost = costs[node];
        let children = graph[node];
        for (let n in children) {
            let newCost = cost + children[n];
            if (!costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
            }
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }
    let optimalPath = [to];
    let parent = parents[to];
    while (parent) {
        optimalPath.push(parent);
        parent = parents[parent];
    }
    optimalPath.reverse();
    optimalPath[0] = from;
    const results = {
        cost: costs[to],
        path: optimalPath
    };
    return results;
}
exports.calcShortestRoute = calcShortestRoute;
;
/**
 * Calculate route cost
 * @param graph reference graph
 * @param input array of routes such as ['A','B','E', ...]
 */
function calcRouteCost(graph, input) {
    if (input.length <= 1)
        throw new Error("Invalid Input");
    let totalCost = 0;
    for (let i = 0; i < input.length - 1; i++) {
        const id0 = input[i];
        const id1 = input[i + 1];
        const node0 = graph[id0];
        if (node0) {
            const cost = node0[id1];
            if (!cost) {
                throw new Error("No Such Route");
            }
            totalCost += cost;
        }
        else {
            throw new Error("No Such Node");
        }
    }
    return totalCost;
}
exports.calcRouteCost = calcRouteCost;
/**
 * Calculate possible routes
 * @param graphArray reference graph as array form
 * @param from origin node (vertex)
 * @param to destination node (vertex)
 */
function calcPossibleRoutes(graphArray, from, to) {
    let path = [];
    const linkedNodes = memoize(nodes.bind(null, graphArray));
    return explore(from, to);
    function explore(currNode, to, paths = []) {
        path.push(currNode);
        for (let linkedNode of linkedNodes(currNode)) {
            if (linkedNode === to) {
                let result = path.slice(); // copy values
                result.push(to);
                paths.push(result);
                continue;
            }
            // do not re-explore edges
            if (!hasEdgeBeenFollowedInPath({
                edge: {
                    from: currNode,
                    to: linkedNode
                },
                path
            })) {
                explore(linkedNode, to, paths);
            }
        }
        path.pop(); // sub-graph fully explored            
        return paths;
    }
}
exports.calcPossibleRoutes = calcPossibleRoutes;
/**
 * Convert graph to graph array
 * For ex: {'A' : { 'B': 1, 'C': 2 }} to [['A','B',1], ['A','B',2]]
 * @param graph reference graph
 */
function convertGraphToGraphArray(graph) {
    let graphArray = [];
    for (let node in graph) {
        for (let adjacentNode in graph[node]) {
            graphArray.push([node, adjacentNode, graph[node][adjacentNode]]);
        }
    }
    return graphArray;
}
exports.convertGraphToGraphArray = convertGraphToGraphArray;
/**
 * Get all nodes linked to, from node
 */
function nodes(graph, node) {
    return graph.reduce((p, c) => {
        (c[0] === node) && p.push(c[1]);
        return p;
    }, []);
}
/**
 * Has an edge been followed in the given path?
 */
function hasEdgeBeenFollowedInPath({ edge, path }) {
    var indices = allIndices(path, edge.from);
    return indices.some(i => path[i + 1] === edge.to);
}
/**
 * Utility to get all indices of values matching 'val' in 'arr'.
 */
function allIndices(arr, val) {
    var indices = [], i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            indices.push(i);
        }
    }
    return indices;
}
/**
 * Avoids recalculating linked nodes.
 */
function memoize(fn) {
    const cache = new Map();
    return function (arg) {
        var key = JSON.stringify(arguments);
        var cached = cache.get(key);
        if (cached) {
            return cached;
        }
        cached = fn.apply(this, arguments);
        cache.set(key, cached);
        return cached;
        ;
    };
}
/**
 * Get lowest-cost node
 */
function lowestCostNode(costs, processed) {
    return Object.keys(costs).reduce((lowest, node) => {
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;
    }, null);
}
//# sourceMappingURL=graph-calculator.js.map