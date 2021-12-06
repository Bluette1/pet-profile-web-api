'use strict';

const path = require('path');
const Migration = require('mongration').Migration;

const config = {
	hosts: 'localhost:27017',
	db: 'pet_profile_db',
	migrationCollection: 'migrationversion',
  mongoUri: 'mongodb://localhost:27017/pet_profile_db'
};

var migration = new Migration(config);

migration.add([
	path.join(__dirname, './app/migrations/1-add-available-for-adoption-field.js'),
]);	

migration.migrate(function(err, results){
    if (err) {
			console.log('An error occurred during the migration: ', error);
		} else {
			console.log('Migration successfull...');
		}
});