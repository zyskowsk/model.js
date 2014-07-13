var mysql       = require('mysql');
var interpolate = require('./utilities').interpolate;
var get_keys    = require('./utilities').get_keys;
var get_values  = require('./utilities').get_values;

var DEFAULT_SETTINGS = {
    database: 'model',
    host: 'localhost',
    user: 'root',
    password: ''
}
var TEST_SETTINGS = {
    database: 'model_test',
    host: 'localhost',
    user: 'root',
    password: ''
}
var MYSQL_SETTINGS = process.env.TEST_ENV === 'test' ? TEST_SETTINGS : DEFAULT_SETTINGS;

function MySql(settings) {
    this.settings = settings || MYSQL_SETTINGS;
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

MySql.prototype.insert_query = function(table_name, values) {
    var field_string = '(' + get_keys(values).join(', ') + ')';
    var value_string = '(' + get_values(values).join(', ') + ')';
    var insert_query = 'INSERT INTO `{table_name}` {fields} ' +
                       'VALUES {values};'
    
    return interpolate(insert_query, {
        table_name: table_name,
        fields: field_string,
        values: value_string
    });
}

module.exports = {
    MySql: MySql
}
