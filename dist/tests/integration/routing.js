"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = process.env.NODE_ENV || 'test';
const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha_typescript_1 = require("mocha-typescript");
const server_1 = require("../../app/server");
const expect = chai.expect;
chai.use(chaiHttp);
mocha_typescript_1.suite("API Routing", () => {
    let AdminRouteTest = class AdminRouteTest {
        t1() {
            return chai.request(server_1.server).get('/healthcheck')
                .then(res => {
                expect(res).to.have.status(200);
            });
        }
    };
    __decorate([
        mocha_typescript_1.test('should return 200 OK, if navigate to "/healthcheck"')
    ], AdminRouteTest.prototype, "t1", null);
    AdminRouteTest = __decorate([
        mocha_typescript_1.suite('# Admin')
    ], AdminRouteTest);
    mocha_typescript_1.suite('# Delivery', () => {
        let DeliveryRouteTest = class DeliveryRouteTest {
            t1() {
                return chai.request(server_1.server)
                    .get('/delivery/route/cost')
                    .query({ 'r': 'A-B-E' })
                    .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body['code']).to.equal(1);
                });
            }
            t2() {
                return chai.request(server_1.server).get('/delivery/route/cost')
                    .catch(err => {
                    expect(err).to.have.status(400);
                });
            }
        };
        __decorate([
            mocha_typescript_1.test('should return 200 OK with Code 1, if search correctly')
        ], DeliveryRouteTest.prototype, "t1", null);
        __decorate([
            mocha_typescript_1.test('should return 400 Bad Request, if search query incorrectly')
        ], DeliveryRouteTest.prototype, "t2", null);
        DeliveryRouteTest = __decorate([
            mocha_typescript_1.suite('## Route Cost API')
        ], DeliveryRouteTest);
        let PossibleRouteTest = class PossibleRouteTest {
            t1() {
                return chai.request(server_1.server)
                    .get('/delivery/route/possible')
                    .query({ r1: 'A', r2: 'A' })
                    .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body['code']).to.equal(1);
                });
            }
        };
        __decorate([
            mocha_typescript_1.test('should return 200 OK with Code 1, if search correctly')
        ], PossibleRouteTest.prototype, "t1", null);
        PossibleRouteTest = __decorate([
            mocha_typescript_1.suite('## Possible Route API')
        ], PossibleRouteTest);
        let ShortedRouteTest = class ShortedRouteTest {
            t1() {
                return chai.request(server_1.server)
                    .get('/delivery/route/cheapest')
                    .query({ r1: 'A', r2: 'A' })
                    .then(res => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body['code']).to.equal(1);
                });
            }
        };
        __decorate([
            mocha_typescript_1.test('should return 200 OK with Code 1, if search correctly')
        ], ShortedRouteTest.prototype, "t1", null);
        ShortedRouteTest = __decorate([
            mocha_typescript_1.suite('## Shorted Route API')
        ], ShortedRouteTest);
    });
});
// describe("GET /api", () => {
//     it("should return 200 OK", () => {
//         request
//             .get("/api")
//             .expect(200);
//     });
// }); 
//# sourceMappingURL=routing.js.map