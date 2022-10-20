module.exports = (sequelize, dataTypes) => {
    
    const alias = 'Book';
    
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
            type: dataTypes.DATEONLY
        },
        stock: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.STRING
        }
    };

    const config = {
        tableName: 'books',
        timestamps: false
    };

    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Author, {
            as: 'author',
            foreignKey: 'author_id'       
        }),
        Book.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id'       
        }),
        Book.belongsTo(models.Classification, {
            as: 'classification',
            foreignKey: 'classification_id'       
        }),
        Book.belongsTo(models.Publisher, {
            as: 'publisher',
            foreignKey: 'publisher_id'       
        })

    }
    

    return Book;
}