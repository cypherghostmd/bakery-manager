module.exports = function checkBodyEmpty(req, res, next) {
    if(!req.body || Object.keys(req.body).length === 0) {
        res.status(400).json({"response": "body vazio"});
        return;
    }
    next();
}