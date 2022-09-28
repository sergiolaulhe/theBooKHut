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
        }

    };

    let config = {
        tableName: "users",
        timestamps: true
    };

    const Usuario = sequelize.define(alias, cols, config);

    return Usuario;
}


