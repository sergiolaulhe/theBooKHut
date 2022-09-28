module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Books';
    
    const cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: dataTypes.STRING
        },
        author_id: {
            type: dataTypes.INTEGER
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.DECIMAL
        },
        description: {
            type: dataTypes.TEXT
        },
        publisher_id: {
            type: dataTypes.INTEGER
        },
        classification_id: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        },
        release_date: {
            type: dataTypes.DATE
        },
        image: {
            type: dataTypes.STRING
        }
    };

    const config = {
        tableName: 'books',
        timestamps: false
    };

    const Books = sequelize.define(alias, cols, config);

    Books.associate = function(models) {
        Books.belongsTo(models.Author, {
            as: 'author',
            foreignKey: 'author_id'       
        })

    }
    

    return Books;
}