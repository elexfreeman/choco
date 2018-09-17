/*Случайное целое между min и max*/
var conn = require('../../db-sync');
var brain = require('brain.js');
var moment = require('moment');
var fs = require('fs');


function getTrainData() {
    var sql = " " +
        "select  " +
        "i.`date` " +
        ",yd.clicks clicks " +
        ",yd.cost cost " +
        ",round((yd.cost/yd.clicks),3) cost_c " +
        ",igg.search search " +
        ",igg.context context " +
        " " +
        ",yd.campaign_id " +
        " " +
        " " +
        "from indicators i " +
        " " +
        "join i_yandex_direct yd " +
        "on yd.i_id = i.id " +
        " " +
        "JOIN i_goal_27053184_direct igg " +
        "on igg.i_id = i.id " +
        " " +
        "where  " +
        "(yd.clicks>0) " +
        " and(yd.campaign_id=25854651)";
    var res = conn.query(sql);
    if (res.length === 0) {
        return null;
    } else {
        return res;
    }
}

/*нормализатор от 0 до 1*/

/*http://neuronus.com/theory/931-sposoby-normalizatsii-peremennykh.html*/
function normalize(min, max, val) {
    return Math.round(((val - min) / (max - min)) * 100) / 100;
}


function setTrainData(input) {
    var trainData = getTrainData();

    var out = [];

    var input = [];
    var output = [];

    var tmpData = null;
    var s = 0;
    var c = 0;
    for (key in trainData) {
        tmpData = (moment(trainData[key].date).format('MM')) / 10;
        s = 0;
        if (parseInt(trainData[key].search) > 0) s = 1;

        c = 0;
        if (parseInt(trainData[key].context) > 0) c = 1;

        out.push({
            input: [normalize(2, 4, trainData[key].cost_c), normalize(1, 350, trainData[key].clicks)]
            , output: [s, c]

        })
    }
    return out;
}


/*нейрон*/
var net1 = new brain.recurrent.LSTM({
    activation: 'sigmoid', // activation function
    hiddenLayers: [200, 200, 200, 200, 200],
    iterations: 20000,
    learningRate: 0.5, // global learning rate, useful when training using streams
    log: true
});
var net2 = new brain.recurrent.LSTM();

net2 = new brain.NeuralNetwork({
    activation: 'sigmoid', // activation function
    hiddenLayers: [200, 200, 300, 200, 200],
    iterations: 20000,
    learningRate: 0.5 // global learning rate, useful when training using streams
});

net = new brain.recurrent.RNN();

var trainData = setTrainData(getTrainData());

console.info(trainData);


var cost = 3.7;
var month = 0.5;
var clicks = 121;


var dd = [normalize(2, 4, cost), normalize(1, 350, clicks)];


var search = 2;
var context = 0;
var clicks = normalize(1, 350, 32);

/*var dd = {
    search: 0.10
    ,context: 0.00
    ,clicks: 0.32000
};*/
console.info('----------------');
console.info(dd);


net.train(trainData, {
    iterations: 1500
    , log: true
});

var json = net.toJSON();


fs.writeFile("learnData.json", JSON.stringify(json), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
var output = net.run(dd);

/*todo остроить сеть на LSTM */
/*она строится на последовательности во времени с вх данными 0 или 1*/
/*к примеру цена за клик*/
/* [0.1-0.9] [1-2] [3-4] [5-6]  */
/* цена за клик 3   */
/* [0, 0, 1, 0]*/



console.info('----------------');
console.info(output);
//console.info('cost: '+output.cost);

/*

net.train([
    {
        input: {r: 0.03, g: 0.7, b: 0.5},
        output: {black: 1}
        },
    {input: {r: 0.16, g: 0.09, b: 0.2}, output: {white: 1}},
    {input: {r: 0.5, g: 0.5, b: 1.0}, output: {white: 1}}]);

*/
