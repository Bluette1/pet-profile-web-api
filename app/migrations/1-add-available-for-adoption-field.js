'use strict';

module.exports = {
    id: '1-add-available-for-adoption-field',

    up : function(db, cb){
        db.collection('pets').update({}, { $set: { "available_for adoption": false } }, false, true, cb);
    },

    down : function(db, cb){
      db.collection('pets').update({}, { $unset: { "available_for adoption": "" } }, false, true, cb);
    }
}