var mysql       = require('./mysql');
var get_keys    = require('./utilities').get_keys

var mysql_client = new mysql.MySql();

module.exports.Model = Model;


function Model() {
    this.name = "Model";
}

Model.prototype._get_table_name = function () {
    return this.name.replace(/([a-z](?=[A-Z]))/, '$1_').toLowerCase();
};

Model.create = function (model_name, fields_meta) {
    function NewModel (attributes) {
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
};

Model.prototype.persist = function () {
    var table_name = this._get_table_name();
    var insert_query = mysql_client.insert_query(table_name, this._get_attributes());
    mysql_client.execute_raw_query(insert_query);
};

Model.prototype._get_attributes = function () {
    var attrs = {};
    this.fields.forEach(function (field) {
        attrs[field] = this._[field];
    });

    return attrs;
};
