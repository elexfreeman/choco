require('babel-register')({
    presets: ['es2015']
});


const log = console.log;
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

const OrderModel = require('../src/models/order_model');

let apiKey = 'AiyeSyIUmWlTztLa3ZyE3t25WH9mm0HfD6GixSfRI2a4gBjMO3_RukzRVNLqeSmr';

let products = [{
    id: 1
    , price: 100
    , count: 2
    , summa: 200
},
{
    id: 2
    , price: 200
    , count: 2
    , summa: 400
}];

let test_order = {
    products: products    
    , delivery_address: 'address 123'
    , comment: 'my comment'
};

let test_request = {
    apiKey: apiKey
    , order: test_order
}

let order_id = 21;

describe('Get order:' + order_id, function () {
    let maybe;

    let xhr = new XMLHttpRequest();
    beforeEach(() => {
        maybe = () => OrderModel.OrderModel.Get(order_id, xhr, apiKey);
    });

    it('should return id', () => {
        return maybe()
            .then(data => {
                data.order.id.should.be.eql(21);
            });
    });
});


describe('Create order:', function () {
    let maybe;

    let xhr = new XMLHttpRequest();
    beforeEach(() => {
        maybe = () => OrderModel.OrderModel.Create(test_order, xhr, apiKey);
    });

    it('should return order_id > 0', () => {
        return maybe()
            .then(data => {
                data.order_id.should.be.above(0);
            });
    });
});

