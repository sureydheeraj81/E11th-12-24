const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: 'Asia/Kolkata',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
    },
});
const syncDatabase = async()=>{
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');

      await sequelize.sync();
        // await sequelize.sync({ alter: true })

      //console.log('Database & tables created!');
    //   await sequelize.sync({});
  } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
}

syncDatabase();

module.exports = sequelize;