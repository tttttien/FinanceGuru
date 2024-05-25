'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const filePath = path.join(__dirname, file);
    console.log(`Requiring model file: ${file}`); // Debugging line

    try {
      const model = require(filePath);
      if (typeof model !== 'function') {
        throw new Error(`File ${file} does not export a function`);
      }

      db[model(sequelize, Sequelize.DataTypes).name] = model(sequelize, Sequelize.DataTypes);
      console.log(`Loaded model: ${model.name}`); // Debugging line
    } catch (error) {
      console.error(`Error loading model file ${file}: ${error.message}`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
