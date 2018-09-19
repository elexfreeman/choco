require('babel-register')({
    presets: ['es2015']
});


const log = console.log;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

const OrdersModel = require('../src/models/orders_model');

let apiKey = 'AiyeSyIUmWlTztLa3ZyE3t25WH9mm0HfD6GixSfRI2a4gBjMO3_RukzRVNLqeSmr';


describe('Get orders:', function () {
    let maybe;

    let xhr = new XMLHttpRequest()
    beforeEach(() => {
        maybe = () => OrdersModel.OrdersModel.Get(0, 10, xhr, apiKey);
    });

    it('should return orders.length > 0', () => {
        return maybe()
            .then(data => {       
                data.orders.length.should.be.above(0);
            });
    });
});

