process.env.NODE_ENV = process.env.NODE_ENV || 'test';

import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { suite, test } from 'mocha-typescript';
import { server } from '../../app/server';

const expect = chai.expect;
chai.use(chaiHttp);

suite("API Routing", () => {

    @suite('# Admin')
    class AdminRouteTest {
        @test('should return 200 OK, if navigate to "/healthcheck"')
        public t1() {
            return chai.request(server).get('/healthcheck')
                .then(res => {
                    expect(res).to.have.status(200);
                });
        }
    }

    suite('# Delivery', () => {
        @suite('## Route Cost API')
        class DeliveryRouteTest {
            @test('should return 200 OK with Code 1, if search correctly')
            public t1() {
                return chai.request(server)
                    .get('/delivery/route/cost')
                    .query({ 'r': 'A-B-E' })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body['code']).to.equal(1);
                    });
            }

            @test('should return 400 Bad Request, if search query incorrectly')
            public t2() {
                return chai.request(server).get('/delivery/route/cost')
                    .catch(err => {
                        expect(err).to.have.status(400);
                    });
            }
        }

        @suite('## Possible Route API')
        class PossibleRouteTest {
            @test('should return 200 OK with Code 1, if search correctly')
            public t1() {
                return chai.request(server)
                    .get('/delivery/route/possible')
                    .query({ r1: 'A', r2: 'A' })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body['code']).to.equal(1);
                    });
            }
        }

        @suite('## Shorted Route API')
        class ShortedRouteTest {
            @test('should return 200 OK with Code 1, if search correctly')
            public t1() {
                return chai.request(server)
                    .get('/delivery/route/cheapest')
                    .query({ r1: 'A', r2: 'A' })
                    .then(res => {
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(res.body['code']).to.equal(1);
                    });
            }
        }
    });


});


// describe("GET /api", () => {
//     it("should return 200 OK", () => {
//         request
//             .get("/api")
//             .expect(200);
//     });
// });