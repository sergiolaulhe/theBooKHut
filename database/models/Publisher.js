module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Publisher';
    
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
        tableName: 'publishers',
        timestamps: false
    };

    const Publisher = sequelize.define(alias, cols, config);

    return Publisher;

}