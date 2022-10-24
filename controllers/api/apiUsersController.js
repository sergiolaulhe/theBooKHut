// *************** Require's ****************//

const db = require('../../database/models');

const sequelize = db.sequelize;

// *************** Controller Requirer ****************//

const apiUsersController = {

// ***** Get all users from DB ***** //

    list: async function(req, res) { 
        await db.Users.findAll()
            .then(function(users) {
                res.json({
                    meta: {
                        status: 200,
                        total: users.length,
                        url: "api/v1/users"
                
                    },
                    data: users
                })

            }).catch((error) => {
                console.log({ error });
                res.status(500).json({
                    mensaje: 'Error de conexión'
                })
            })
            
    },

// ***** Detail - Detail from one user id ***** //
    
    detail: function (req, res) { 
        db.Users.findByPk(req.params.id)
        .then(function(user) {
            res.json({
                meta: {
                    status: 200,
                    url: "api/v1/user/id"
            
                },
                data: user
            })

        }).catch((error) => {
            console.log({ error });
            res.status(500).json({
                mensaje: 'Error de conexión'
            })
        })

    },

}

module.exports = apiUsersController;