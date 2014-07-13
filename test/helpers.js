var interpolate = require('../lib/utilities').interpolate;
var MySql = require('../lib/mysql').MySql;

module.exports = {
    require_module: function (module) {
        return require('../lib/' + module);
    },

    cleanse_db: function (models) {
        var mysql_client = new MySql();

        models.forEach(function (model) {
            var truncate_table = interpolate('TRUNCATE TABLE `{table}`;', {
                table: model._get_table_name()
            });

            mysql_client.execute_raw_query(truncate_table);
        });
    }
}
