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
    var insert_query = 'INSERT INTO `{table_name}` {fields} ' +
                       'VALUES {values};'
    
    return interpolate(insert_query, {
        table_name: table_name,
        fields: this._field_string(values),
        values: this._value_string(values)
    });
}

MySql.prototype._field_string = function (values) {
    var backtick_fields = get_keys(values).map(function (field) {
        return '`' + field + '`';
    });

    return '(' + backtick_fields.join(', ') + ')';
}

MySql.prototype._value_string = function (values) {
    var stringify_values = get_values(values).map(function (field) {
        if (typeof field === 'string') {
            return '\'' + field + '\'';
        } else {
            return field;
        }
    });

    return '(' + stringify_values.join(', ') + ')';
}

module.exports = {
    MySql: MySql
}
