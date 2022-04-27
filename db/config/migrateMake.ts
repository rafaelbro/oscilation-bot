import './dotenv';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration';
import { Sequelize } from "sequelize-typescript";
import * as path from 'path';
import AlarmNotification from '../../src/models/AlarmNotification'

const bootstrap = async () => {
  const sequelize: Sequelize = new Sequelize({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    models: [AlarmNotification],
    timezone: '+09:00',
    logging: false,
  });

  try {
    const result = await SequelizeTypescriptMigration.makeMigration(sequelize, {
      outDir: path.join(__dirname, '../migrate'),
    });
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
bootstrap();
