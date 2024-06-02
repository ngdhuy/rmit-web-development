module.exports = (err, req, res, next) => {
    console.log("-- Client Error Handler --");
    if(req.xhr) {
        res.status(500).send({error: 'Something failed!'});
    } else {
        next(err);
    }
}