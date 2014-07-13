var get_keys = require('./utilities').get_keys

module.exports.Model = Model;

function Model() {
    this.name = "Model";
    this.table_name = this._get_table_name();
}

Model.prototype._get_table_name = function() {
    return this.name.replace(/([a-z](?=[A-Z]))/, '$1_').toLowerCase();
};

Model.create = function(model_name, fields_meta) {
    function NewModel(attributes) {
        this.name = model_name;
        this.fields = get_keys(fields_meta);
        for (var attr in attributes) {
            this[attr] = attributes[attr];
        }
    }

    function Surrogate() {}
    Surrogate.prototype = this.prototype;
    NewModel.prototype = new Surrogate();

    return NewModel;
}

Model.prototype.add
