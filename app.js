// ***** Require's ***** //
const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

// const axios = require('axios');




// ***** Express execution ***** //

const app = express();

// ***** Middlewares require ***** //

const logMiddleware = require('./middlewares/logMiddleware.js');
const cookieAuthMiddleware = require('./middlewares/cookieAuthMiddleware');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

// Accediendo a recursos estaticos

const publicFolderPath = path.resolve(__dirname, 'public');
app.use(express.static(publicFolderPath));

// Configuramos el motor de plantilla EJS / View Engine Setup
app.set('view engine', 'ejs');

// Decodificamos los datos de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuramos la app para poder sobreescribir los metodos originales del formulario
app.use(methodOverride('_method'));

// session

app.use(session( {
    secret: 'theBooKHut secret',
    resave: false,
    saveUninitialized: false
}));

// Cookie parser

app.use(cookieParser());

// Middlewares

app.use(logMiddleware);
app.use(cookieAuthMiddleware);
app.use(userLoggedMiddleware);



// ***** Route System require and use() ***** //

const mainRoutes = require('./routes/mainRoutes');
const usersRoutes = require('./routes/usersRoutes');
const productsRouter = require('./routes/productsRoutes');


// ***** APIs Route System require and use() ***** //

const apiProductsRoutes = require('./routes/api/apiProductsRoutes');
// const apiUsersRoutes = requires('./routes/api/apiUsersRoutes');


app.use('/', mainRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRouter);


app.use('/api/v1', apiProductsRoutes);
// app.use('/api/v1', apiUsersRoutes);


// ***** catch 404 and forward to error handler ***** //

app.use((req, res, next) => {
    res.status(404).render('not-found');
    next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// Levantar servidor con Express

app.listen(3100, () => console.log('Servidor en linea en puerto 3100'));

// ************ exports app - dont'touch ************
// module.exports = app;
