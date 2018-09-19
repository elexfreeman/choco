const log = console.log;

const assert = require('chai').assert;
const should = require('chai').should();
const expect = require('chai').expect;

const OrderModel = require('../app/models/order_model');

log('***** ORDER MODEL TESTS ****');

let Order = new OrderModel;

let product = {
    id: 1
    , price: 100
    , count: 2
    , summa: 200
};

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
    user_id: 1
    , products: products
    , summa: 20
    , delivery_address: 'address 123'
    , comment: 'my comment'
    , status: 1
};


describe('Calculate products summa', () => {
    it('Should return 600', () => {
        assert.equal(Order.GetProductsSumma(products), 600);
    });
});


describe('Insert into order product', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Order.InserOrderProduct(1, product);
    });

    it('should return id', () => {
        return maybe()
            .then(data => {
                (typeof data).should.be.oneOf(["string", "number"]);
            });
    });

});



describe('Insert order', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Order.Insert(test_order);
    });

    it('should return order_id', () => {
        return maybe()
            .then(data => {
                (typeof data).should.be.oneOf(["string", "number"]);
            });
    });
});



describe('Create order', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Order.Create(test_order);
    });

    it('should return order_id', () => {
        return maybe()
            .then(data => {
                (typeof data).should.be.oneOf(["string", "number"]);
            });
    });
});



describe('Get order products', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Order.GetOrderProducts(1);
    });

    it('should return array', () => {
        return maybe()
            .then(data => {
                data.length.should.be.above(0);
            });
    });
});



describe('Get (order_id = 21) and (user_id = 1)', () => {
    let maybe;
    beforeEach(() => {
        maybe = () => Order.Get(21, 1);
    });

    it('should return user_id=1', () => {
        return maybe()
            .then(data => {   
                data.user_id.should.be.eql(1);
            });
    });
});

