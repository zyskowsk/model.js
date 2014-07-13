var require_module  = require('./helpers').require_module;
var should          = require('chai').should();
var model           = require_module('model');

var Model           = model.Model;

describe('Mode#_get_table_name', function() {
    it('should be snake case version of model name', function() {
        var TestModel = Model.create('TestModel');
        var test_model = new TestModel();
        test_model._get_table_name().should.equal('test_model');
    });
});
