module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Classification';
    
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
        tableName: 'classifications',
        timestamps: false
    };

    const Classification = sequelize.define(alias, cols, config);

    return Classification;
}