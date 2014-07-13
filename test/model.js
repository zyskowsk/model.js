var require_module  = require('./helpers').require_module;
var cleanse_db       = require('./helpers').cleanse_db;
var should          = require('chai').should();
var model           = require_module('model');

var Model           = model.Model;

if (process.env.TEST_ENV) {
    describe('Model#Create', function () {
        it('should set fields', function () {
            var expected = ['name', 'text', 'number'];
            var TestModel = Model.create('TestModel', {
                name: 'String',
                text: 'varchar(255)',
                number: 'int'
            });
            var test_model = new TestModel();

            test_model.fields.should.deep.equal(expected);
        });

        it('should set instance attributes', function () {
            var TestModel = Model.create('TestModel', {
                name: 'String',
                text: 'varchar(255)',
                number: 'int'
            });
            var test_model = new TestModel({
                name: 'Rob',
                text: 'hi',
                number: 1
            });

            test_model.name.should.equal('Rob');
            test_model.text.should.equal('hi');
            test_model.number.should.equal(1);
        });
    });

    describe('Model::_get_table_name', function () {
        it('should be snake case version of model name', function () {
            var TestModel = Model.create('TestModel', {});
            var test_model = new TestModel();
            test_model._get_table_name().should.equal('test_model');
        });
    });

    describe('Model::persist', function () {
        it('should persist model', function () {
            var TestModel = Model.create('TestModel', {
                name: 'varchar(255)',
                blurb: 'varchar(255)',
                age: 'int'
            });
            var test_model = new TestModel({
                name: 'test name',
                blurb: 'this is a test blurb',
                age: 26
            });

            test_model.persist();
            cleanse_db([test_model]);
        });
    });
}
