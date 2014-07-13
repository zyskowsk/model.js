module.exports = {
    interpolate: function (string, values) {
        return string.replace(/{([^{}]*)}/g, function(a, match) {
            var value = values[match]; 
            return typeof value === 'string' || typeof value === 'number' ? value : a;
        });
    },

    get_values: function (object) {
        var values = [];
        for (var key in object) {
            values.push(object[key]);
        }

        return values;
    },

    get_keys: function (object) {
        return Object.keys(object);
    }
}
