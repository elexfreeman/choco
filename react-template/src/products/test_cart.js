import './cart';

let cartItem = {
    offerNum: 2
    , roomsCount: 1
    , category: 150
    , count: 4
    , price: 300
};

let cartItem1 = {
    offerNum: 12
    , roomsCount: 4
    , category: 200
    , count: 1
    , price: 250
};

let cartItem2 = {
    offerNum: 123
    , roomsCount: 34
    , category: 53
    , count: 1
    , price: 100
};

CartModule.add(cartItem);
CartModule.add(cartItem1);
CartModule.add(cartItem2);

console.info(CartModule.get());
console.info(CartModule.remove(12));
console.info(CartModule.get());
console.info(CartModule.getTotalPrice());
