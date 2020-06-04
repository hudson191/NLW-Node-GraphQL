const path = require('path');

const connection =require('knex')({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname,  'db.sqlite')
    },
    useNullAsDefault: true
});

module.exports = connection;