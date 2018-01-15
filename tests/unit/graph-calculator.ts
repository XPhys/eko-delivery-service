import { suite, test } from 'mocha-typescript';
import { assert, expect, should } from 'chai';
import * as GraphCalc from '../../app/libs/graph-calculator';

suite("Graph Calculator", () => {

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

    @suite('# Route Cost')
    class RouteCostTest {
        @test('should calculate route cost correctly')
        public t1() {
            const exp = 2;
            const act = GraphCalc.calcRouteCost(graph, ['A', 'C']);
            assert.equal(act, exp);
        }

        @test('should throw error "Invalid Input" if input is invalid')
        public t2() {
            const exp = 'Invalid Input';
            const act = () => GraphCalc.calcRouteCost(graph, ['A']);
            expect(act).to.throw(Error, exp);
        }

        @test('should throw error "No Such Route" if route doesnt exist')
        public t3() {
            const exp = 'No Such Route';
            const act = () => GraphCalc.calcRouteCost(graph, ['A', 'A']);
            expect(act).to.throw(Error, exp);
        }

        @test('should throw error "No Such Node" if no node exists')
        public t4() {
            const exp = 'No Such Node';
            const act = () => GraphCalc.calcRouteCost(graph, ['X', 'Z']);
            expect(act).to.throw(Error, exp);
        }
    }

    @suite('# Possible Route')
    class PossibleRouteTest {
        @test('should calculate possible routes correctly')
        public t1() {
            const exp = [['A', 'B', 'C', 'A'], ['A', 'C', 'A']];
            const act = GraphCalc.calcPossibleRoutes(graphAsArray, 'A', 'A');
            expect(act).to.deep.equal(exp);
        }
    }

    @suite('# Shorted Route')
    class ShortedRouteTest {
        @test('should calculate shorted route correctly')
        public t1() {
            const exp = { cost: 6, path: ['A', 'C', 'A'] }
            const act = GraphCalc.calcShortestRoute(graph, 'A', 'A');
            expect(act).to.deep.equal(exp);
        }
    }

});

