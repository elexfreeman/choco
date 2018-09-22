let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let minifyHTML = require('express-minify-html');
let compression = require('compression');


const cors = require('cors');

let app = express();
app.use(compression());
app.use(minifyHTML({
    override:      true,
    exception_url: false,
    htmlMinifier: {
        removeComments:            true,
        collapseWhitespace:        true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes:     true,
        removeEmptyAttributes:     true,
        minifyJS:                  true
    }
}));
/*для подкл к API*/
app.use(cors());
app.options('*', cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));


/*-------------------*/
/*site routers*/
/*-------------------*/

/*размеры картинок*/
let image_resize_512 = require('./app/api/image_resize_512');
app.use('/img/w512/*', image_resize_512);

/*размеры картинок*/
let image_resize_128 = require('./app/api/image_resize_128');
app.use('/img/w128/*', image_resize_128);

/*размеры картинок*/
let image_resize_1024 = require('./app/api/image_resize_1024');
app.use('/img/w1024/*', image_resize_1024);

let index = require('./app/pages/main_page');
app.use('/', index);

let category = require('./app/pages/category');
app.use('/category/*', category);


let cart = require('./app/pages/cart');
app.use('/cart', cart);


let cart_api = require('./app/api/cart_api');
app.use('/cart_api', cart_api);


let order_api = require('./app/api/order_api');
app.use('/order_api', order_api);


let orders_api = require('./app/api/orders_api');
app.use('/orders_api', orders_api);


let login_api = require('./app/api/login/routes');
app.use('/login_api', login_api);


let user = require('./app/pages/user');
app.use('/user', user);
app.use('/user/*', user);

let user_api = require('./app/api/user_api');
app.use('/user_api', user_api);

let about = require('./app/pages/about');
app.use('/about', about);


let admin = require('./app/pages/adm');
app.use('/admin', admin);
app.use('/admin/*', (req, res) =>{
    res.sendFile('public/admin/index.html', {"root": __dirname});
});

/*admin*/
let users = require('./routes/users');
let admin_categories = require('./admin/categories/routes');
let admin_products = require('./admin/products/routes');
let admin_manufacturer = require('./admin/manufacturer/routes');
let imgUploader = require('./admin/imgUploader');

app.use('/admin_api/categories/', admin_categories);
app.use('/admin_api/products/', admin_products);
app.use('/admin_api/manufacturer/', admin_manufacturer);
app.use('/admin_api/imgUploader/', imgUploader);


let product = require('./app/pages/product');
app.use('/*', product);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
