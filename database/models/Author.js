module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Author';
    
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unsigned: true
        },
        first_name: {
            type: dataTypes.STRING
        },
        last_name: {
            type: dataTypes.STRING
        }
        
    };

    const config = {
        tableName: 'authors',
        timestamps: false
    };

    const Author = sequelize.define(alias, cols, config);

    Author.associate = function(models) {
        Author.hasMany(models.Book, {
            as: 'books',
            foreignKey: 'author_id'       
        })

    }

    return Author;
}