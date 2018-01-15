import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as errorHandler from 'errorhandler';
import { ControllerRouter } from './router';

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;

// Init server
const server = express();

// Init middlewares
server.use(cors());
server.use(bodyParser.json());
if (env == 'development') {
  server.use(morgan('dev'));
  server.use(errorHandler());
}

// Init route
new ControllerRouter(server);

// Start server
server.listen(port, () => {
  console.log('===============================================================');
  console.log(`Environment: ${env}`);
  console.log('===============================================================');
  console.log(`Delivery Service starts listening on port ${port}`);
  console.log('===============================================================');
});

export { server }




















// import * as fs from 'fs';
// import * as path from 'path';

// import * as model from './models';

// // const data = fs.readFileSync(path.join(__dirname, 'database.json'));
// // const db = JSON.parse(data.toString());

// const data2 = fs.readFileSync(path.join(__dirname, 'database-2.json'));
// const db = JSON.parse(data2.toString());


// // function BreathFirstSearch() {
// //     let openSet = new model.Queue<any>();
// //     let closedSet = new model.Set();
// //     let meta = {}

// //     let start = 'SOMETHING';
// //     meta[start] = {};
// //     openSet.enQueue(start);

// //     let parentState = openSet.deQueue();
// //     while (parentState) {

// //     }


// // }


// // function constructPath(state: string, meta: {}) {
// //     let actionList = [];


// //     return actionList.reverse();
// // }










// /**
//  * Basic priority queue implementation. If a better priority queue is wanted/needed,
//  * this code works with the implementation in google's closure library (https://code.google.com/p/closure-library/).
//  * Use goog.require('goog.structs.PriorityQueue'); and new goog.structs.PriorityQueue()
//  */
// function PriorityQueue () {
//     this._nodes = [];

//     this.enqueue = function (priority, key) {
//       this._nodes.push({key: key, priority: priority });
//       this.sort();
//     };
//     this.dequeue = function () {
//       return this._nodes.shift().key;
//     };
//     this.sort = function () {
//       this._nodes.sort(function (a, b) {
//         return a.priority - b.priority;
//       });
//     };
//     this.isEmpty = function () {
//       return !this._nodes.length;
//     };
//   }

//   /**
//    * Pathfinding starts here
//    */
//   function Graph(){
//     var INFINITY = 1/0;
//     this.vertices = {};

//     this.addVertex = function(name, edges){
//       this.vertices[name] = edges;
//     };

//     this.shortestPath = function (start, finish) {
//       var nodes = new PriorityQueue(),
//           distances = {},
//           previous = {},
//           path = [],
//           smallest, vertex, neighbor, alt;

//       for(vertex in this.vertices) {
//         if(vertex === start) {
//           distances[vertex] = 0;
//           nodes.enqueue(0, vertex);
//         }
//         else {
//           distances[vertex] = INFINITY;
//           nodes.enqueue(INFINITY, vertex);
//         }

//         previous[vertex] = null;
//       }

//       while(!nodes.isEmpty()) {
//         smallest = nodes.dequeue();

//         if(smallest === finish) {
//           path = [];

//           while(previous[smallest]) {
//             path.push(smallest);
//             smallest = previous[smallest];
//           }

//           break;
//         }

//         if(!smallest || distances[smallest] === INFINITY){
//           continue;
//         }

//         for(neighbor in this.vertices[smallest]) {
//           alt = distances[smallest] + this.vertices[smallest][neighbor];

//           if(alt < distances[neighbor]) {
//             distances[neighbor] = alt;
//             previous[neighbor] = smallest;

//             nodes.enqueue(alt, neighbor);
//           }
//         }
//       }

//       return path;
//     };
//   }

//   var g = new Graph();

//   g.addVertex('A', {B: 1, C: 4, D: 10});
//   g.addVertex('B', {E: 3});
//   g.addVertex('C', {D: 4, F: 2});
//   g.addVertex('D', {E: 1});
//   g.addVertex('E', {B: 3, A: 2});
//   g.addVertex('F', {D: 1});

//   // Log test, with the addition of reversing the path and prepending the first node so it's more readable
//   console.log(g.shortestPath('E', 'E').concat(['E']).reverse());




















// ////////// [1]

// // const input = ['A', 'D', 'F'];

// // if (input.length <= 1) throw Error("Test");

// // let totalCost = 0;
// // for (let i = 0; i < input.length - 1; i++) {
// //     const id0 = input[i];
// //     const id1 = input[i + 1];

// //     const node0 = db[id0];
// //     if (node0) {
// //         const cost = node0[id1];
// //         if (!cost) {
// //             console.log('No Such Route');
// //             break;
// //         }
// //         totalCost += cost;
// //     }
// //     else {
// //         console.log('No Such Node');
// //         break;
// //     }

// //     console.log(`Node [${id0}] --> Node [${id1}], has cost [${totalCost}]`);

// // }


