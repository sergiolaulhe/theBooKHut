module.exports = (sequelize, dataTypes) => {
    let alias = "Users";

    let cols = {
        id: {
            type:dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
            
        },
        email: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        user_name: {
            type: dataTypes.STRING
        },
        birth_date: {
            type: dataTypes.DATE
        },
        address: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.INTEGER
        },
        role_id: {
            type: dataTypes.INTEGER
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }

        
        

    };

    let config = {
        tableName: "users",
        timestamps: true
    };

    const Users = sequelize.define(alias, cols, config);

    Users.associate = function(models) {
        Users.belongsTo(models.Role, {
            as: 'role',
            foreignKey: 'role_id'       
        })
    }

    return Users;
}


