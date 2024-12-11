const Sequelize = require('sequelize');
const sequelize = require('../config/dbConfig');
const registerModel = require('./registrationFormModel');  // Ensure paths are correct
const subscriptionPaymentFinal = require('./subscription_payment_final');

// Load all models
const models = {
  registerModel,
  subscriptionPaymentFinal,
};

// Run the associate method to set up associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

module.exports = models;
