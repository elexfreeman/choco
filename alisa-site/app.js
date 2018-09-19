let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let minifyHTML = require('express-minify-html');
let compression = require('compression');

/*admin*/
let users = require('./routes/users');
let admin_categories = require('./admin/categories/routes');
let admin_products = require('./admin/products/routes');
let admin_manufacturer = require('./admin/manufacturer/routes');
let imgUploader = require('./admin/imgUploader');

/*-------------------*/
/*site routers*/
/*-------------------*/
let admin = require('./app/pages/adm');
let index = require('./app/pages/main_page');


let category = require('./app/pages/category');
let product = require('./app/pages/product');
let about = require('./app/pages/about');

let cart = require('./app/pages/cart');


let user = require('./app/pages/user');
let user_api = require('./app/api/user_api');
let login_api = require('./app/api/login/routes');


let order_api = require('./app/api/order_api');



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

app.use('/', index);
app.use('/category/*', category);
app.use('/cart', cart);

app.use('/order_api', order_api);

app.use('/login_api', login_api);


app.use('/user', user);
app.use('/user_api', user_api);

app.use('/about', about);
app.use('/admin', admin);
app.use('/admin/categories/', admin_categories);
app.use('/admin/products/', admin_products);
app.use('/admin/manufacturer/', admin_manufacturer);
app.use('/admin/imgUploader/', imgUploader);

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
