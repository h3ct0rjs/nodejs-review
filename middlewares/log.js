function log (req, res, next){
    console.log('Logging ...');
    next();     // to finish de request-response cycle
}

module.exports = log;