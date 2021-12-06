'use strict';

module.exports = {
    id: '1-add-available-for-adoption-field',

    up : function(db){
        return db.collection('pets').updateMany({}, { $set: { "available_for adoption": false } }, false, true);
    },

    down : function(db){
      return db.collection('pets').updateMany({}, { $unset: { "available_for adoption": "" } }, false, true);
    }
}