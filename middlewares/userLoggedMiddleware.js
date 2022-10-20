const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize');

const userLoggedMiddleware = async (req, res, next) => {
    res.locals.isLogged = false;

    const emailInCookie = req.cookies.userEmail;
    let userFromCookie = await db.Users.findOne({ where: { email: { [Op.like] : emailInCookie } } });

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;

    };

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware;