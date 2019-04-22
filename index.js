const config = require('config');
const express = require('express');
const app = express()
const logMiddleware = require('./middlewares/log');
const helmet = require('helmet');
const morgan = require('morgan');

// Debuggers. 
startDebug = require('debug')('app:startup');
dbDebug = require('debug')('app:database');
// add the middleware to convert body to json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet())

// configuration 
startDebug(config.get('name'))
if (app.get('env') === 'development'){
    startDebug('Development')
    app.use(morgan('dev'));
}
dbDebug('Connected to Database')

// Routes 
const courses = require('./routes/courses');
const homeRouter = require('./routes/home');

app.use('/api/courses', courses);
app.use('/', homeRouter)

// Middleware to serve static files. this don't be necessary
// nginx will serve all the static files. 
app.use(express.static('./public'));
    // Customs Middlewares function. 
app.use(logMiddleware);

// Middleware function. 
app.use(function(req, res, next){
    startDebug('Authenticated...');
    next();     // to finish de request-response cycle
});

port = process.env.PORT || 3000;

app.listen(port,() =>{
    startDebug('Running on port ', port);
})