import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { Environment } from "../env.validation";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USER"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_NAME"),
  entities: ["dist/**/*.entity.js"],
  migrations: ["dist/db/migrations/*.js"],
  migrationsTableName: "migrations",
  migrationsRun: false,
  synchronize: configService.get<Environment>("NODE_ENV") === Environment.Development,
  logging: configService.get<Environment>("NODE_ENV") === Environment.Development,
  extra: {
    connectionLimit: 10, // Adjust based on your database connection pool requirements
  },
};

const dataSource = new DataSource(dataSourceOptions);

// You might want to do
// dataSource.initialize()
// but I found mine working regardless of it

export default dataSource;
