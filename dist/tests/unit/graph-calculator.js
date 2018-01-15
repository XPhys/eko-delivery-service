"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const chai_1 = require("chai");
const GraphCalc = require("../../app/libs/graph-calculator");
mocha_typescript_1.suite("Graph Calculator", () => {
    // test data set
    const graph = {
        "A": {
            "B": 3,
            "C": 2
        },
        "B": {
            "C": 1
        },
        "C": {
            "A": 4
        }
    };
    const graphAsArray = GraphCalc.convertGraphToGraphArray(graph);
    let RouteCostTest = class RouteCostTest {
        t1() {
            const exp = 2;
            const act = GraphCalc.calcRouteCost(graph, ['A', 'C']);
            chai_1.assert.equal(act, exp);
        }
        t2() {
            const exp = 'Invalid Input';
            const act = () => GraphCalc.calcRouteCost(graph, ['A']);
            chai_1.expect(act).to.throw(Error, exp);
        }
        t3() {
            const exp = 'No Such Route';
            const act = () => GraphCalc.calcRouteCost(graph, ['A', 'A']);
            chai_1.expect(act).to.throw(Error, exp);
        }
        t4() {
            const exp = 'No Such Node';
            const act = () => GraphCalc.calcRouteCost(graph, ['X', 'Z']);
            chai_1.expect(act).to.throw(Error, exp);
        }
    };
    __decorate([
        mocha_typescript_1.test('should calculate route cost correctly')
    ], RouteCostTest.prototype, "t1", null);
    __decorate([
        mocha_typescript_1.test('should throw error "Invalid Input" if input is invalid')
    ], RouteCostTest.prototype, "t2", null);
    __decorate([
        mocha_typescript_1.test('should throw error "No Such Route" if route doesnt exist')
    ], RouteCostTest.prototype, "t3", null);
    __decorate([
        mocha_typescript_1.test('should throw error "No Such Node" if no node exists')
    ], RouteCostTest.prototype, "t4", null);
    RouteCostTest = __decorate([
        mocha_typescript_1.suite('# Route Cost')
    ], RouteCostTest);
    let PossibleRouteTest = class PossibleRouteTest {
        t1() {
            const exp = [['A', 'B', 'C', 'A'], ['A', 'C', 'A']];
            const act = GraphCalc.calcPossibleRoutes(graphAsArray, 'A', 'A');
            chai_1.expect(act).to.deep.equal(exp);
        }
    };
    __decorate([
        mocha_typescript_1.test('should calculate possible routes correctly')
    ], PossibleRouteTest.prototype, "t1", null);
    PossibleRouteTest = __decorate([
        mocha_typescript_1.suite('# Possible Route')
    ], PossibleRouteTest);
    let ShortedRouteTest = class ShortedRouteTest {
        t1() {
            const exp = { cost: 6, path: ['A', 'C', 'A'] };
            const act = GraphCalc.calcShortestRoute(graph, 'A', 'A');
            chai_1.expect(act).to.deep.equal(exp);
        }
    };
    __decorate([
        mocha_typescript_1.test('should calculate shorted route correctly')
    ], ShortedRouteTest.prototype, "t1", null);
    ShortedRouteTest = __decorate([
        mocha_typescript_1.suite('# Shorted Route')
    ], ShortedRouteTest);
});
//# sourceMappingURL=graph-calculator.js.map