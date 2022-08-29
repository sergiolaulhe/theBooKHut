// ***** Require's ***** //
const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const logMiddleware = require('./middlewares/logMiddleware.js');



// ***** Express execution ***** //
const app = express();

// ***** Middlewares ***** //

// Accediendo a recursos estaticos

const publicFolderPath = path.resolve(__dirname, 'public');
app.use(express.static(publicFolderPath));

// Configuramos el motor de plantilla EJS / View Engine Setup
app.set('view engine', 'ejs');

// Decodificamos los datos de los formularios
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuramos la app para poder sobreescribir los metodos originales del formulario
app.use(methodOverride('method'));

// Levantar servidor con Express

app.listen(3100, () => console.log('Servidor en linea en puerto 3100'));



// ***** Route System require and use() ***** //

const mainRoutes = require('./routes/main');
const usersRoutes = require('./routes/users');
const productsRouter = require('./routes/products');




app.use('/', mainRoutes);
app.use('/users', usersRoutes);
app.use('/products', productsRouter);

app.use(logMiddleware);




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

// ************ exports app - dont'touch ************
module.exports = app;
