module.exports = (err, req, res, next) => {
    console.log("-- Error Handler --");
    console.error(err.message);
    res.status(500).send('An error occurred');
}
