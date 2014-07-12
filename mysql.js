var mysql = require('mysql');
var DEFAULT_SETTINGS = {
    database: 'test',
    host: 'localhost',
    user: 'root',
    password: ''
}

function MySql(settings) {
    this.settings = settings || DEFAULT_SETTINGS;
}

MySql.prototype.get_connection = function() {
    return mysql.createConnection(this.settings);
};

MySql.prototype.execute_raw_query = function(query) {
    var rows;
    var connection = this.get_connection();

    connection.query(query, function(err, rows) {
        if (err) throw err;
        rows = rows; 
    });
    connection.end();

    return rows;
};

module.exports = {
    MySql: MySql
}
