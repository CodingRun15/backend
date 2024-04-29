const access = (...roles) => {
    return (req, res, next) => {
        if (roles.includes(req.role)){
            next();
        } else {
            res.status(403).json({
                message: 'Forbidden'
            });
        }
    };
};

module.exports = {
    access
};