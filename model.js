function Model() {
    this.name = "Model";
    this.table_name = this._get_table_name();
}

Model.prototype._get_table_name = function() {
    return this.name.replace(/([a-z](?=[A-Z]))/, '$1_').toLowerCase();
};

Model.create = function(model_name) {
    function NewModel() {
        this.name = model_name;
    }
    function Surrogate() {}
    Surrogate.prototype = this.prototype;
    NewModel.prototype = new Surrogate();

    return NewModel;
}

module.exports = {
    Model: Model
}
