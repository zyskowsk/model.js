var require_module  = require('./helpers').require_module;
var should          = require('chai').should();
var mysql           = require_module('mysql');

var MySql           = mysql.MySql;

if (process.env.TEST_ENV === 'test') {
    describe('MySql#insert_query', function() {
        it('should interpolate the table name', function() {
            var mysql = new MySql();
            var expected = 'INSERT INTO `test_table_name` (name, value, numeric) ' +
                           'VALUES (foo, bar, 123);'
            var table_name = 'test_table_name';
            var values = {
                name: 'foo',
                value: 'bar',
                numeric: 123
            }
            
            mysql.insert_query(table_name, values).should.equal(expected);
        });
    });
}
