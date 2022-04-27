import AlarmNotification from "../models/AlarmNotification";
import { Sequelize } from "sequelize-typescript";
require('../../db/config/dotenv');


export default class DatabaseService {
  constructor() {
    const sequelize: Sequelize = new Sequelize({
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE_NAME,
      host: process.env.DB_HOST,
      dialect: 'mysql',
      timezone: '+09:00',
      logging: process.env.NODE_ENV !== 'test',
      dialectOptions: {
        decimalNumbers: true,
      },
    });
    sequelize.addModels([AlarmNotification]);
  }
}