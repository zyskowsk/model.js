var require_module  = require('./helpers').require_module;
var should          = require('chai').should();
var model           = require_module('model');

var Model           = model.Model;

if (process.env.TEST_ENV) {
    describe('Mode#_get_table_name', function () {
        it('should be snake case version of model name', function () {
            var TestModel = Model.create('TestModel', {});
            var test_model = new TestModel();
            test_model._get_table_name().should.equal('test_model');
        });
    });

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
}
