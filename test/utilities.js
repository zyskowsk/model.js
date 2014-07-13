var require_module  = require('./helpers').require_module;
var should          = require('chai').should();
var utilities       = require_module('utilities');

describe('utilities#interpolate', function () {
    it('should interpolate strings', function () {
        var expected = 'this is a string';
        var string = 'this is a {test}';

        utilities.interpolate(string, {test: 'string'}).should.equal(expected);
    }); 
});

describe('utilities:get_keys', function () {
    it('should return an array of keys', function () {
        var expected = ['key_1', 'key_2', 'key_3'];
        var object = {
            key_1: 'value_1',
            key_2: 'value_2',
            key_3: 'value_3'
        };

        utilities.get_keys(object).should.deep.equal(expected);
    });
});

describe('utilities:get_values', function () {
    it('should return an array of values', function () {
        var expected = ['value_1', 'value_2', 'value_3'];
        var object = {
            key_1: 'value_1',
            key_2: 'value_2',
            key_3: 'value_3'
        };

        utilities.get_values(object).should.deep.equal(expected);
    });
});
