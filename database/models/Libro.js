module.exports = (sequelize, dataTypes) => {
    let alias = 'Libros';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: dataTypes.STRING
        },
        author: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.DECIMAL
        },
        cathegory: {
            type: dataTypes.STRING
        },
        description: {
            type: dataTypes.INTEGER
        },
        publisher: {
            type: dataTypes.INTEGER
        },
        image: {
            type: dataTypes.INTEGER
        }

    };
    let config = {
        tableName: 'libros',
        timestamps: false
    };

    const Libro = sequelize.define(alias, cols, config);

    return Libro;
}