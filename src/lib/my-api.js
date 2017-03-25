'use strict';

var aggregate = function(entity){
    var prop;
    var type;
    var items = [];

    for (prop in entity) {
        try {
            type = Object.prototype.toString.call(entity[prop]);
        } catch (e) {
            type = 'n/a';
        }

        items.push({
            name: prop,
            type: type
        });
    }

    return {
        entity: entity,
        items: items,
        search: function (q) {
            return items.filter(function (prop) {
                return new RegExp(q).test(prop.name);
            });
        }
    }
};

module.exports = {
    aggegate: aggregate
};
