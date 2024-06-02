module.exports = (err, req, res, next) => {
    console.log("-- Log Error --");
    console.error(err.stack); 
    next(err);
}