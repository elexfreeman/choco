const log = console.log;

const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

const OrdersModel = require('../app/models/orders_model');

log('***** ORDERS MODEL TESTS ****');

let Orders = new OrdersModel;


describe('Get orders', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Orders.Get(1, 1, 10);
    });

    it('should return orders.length > 0', () => {
        return maybe()
            .then(data => {
                data.length.should.be.above(0);
            });
    });

});

