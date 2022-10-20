module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Role';
    
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unsigned: true
        },
        name: {
            type: dataTypes.STRING
        }
        
    };

    const config = {
        tableName: 'role',
        timestamps: false
    };

    const Role = sequelize.define(alias, cols, config);

    Role.associate = function(models) {
        Role.hasMany(models.Users, {
            as: 'users',
            foreignKey: 'role_id'       
        })
    }

    return Role;

}