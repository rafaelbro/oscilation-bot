import { Column, CreatedAt, DataType, Model, NotEmpty, Table } from "sequelize-typescript";

@Table
export default class AlarmNotification extends Model {
  @NotEmpty
  @Column
  currencyPair: string;

  @NotEmpty
  @Column({ type: DataType.DECIMAL(32, 16) })
  originalBidPrice: number;

  @NotEmpty
  @Column({ type: DataType.DECIMAL(32, 16) })
  fetchedBidPrice: number;

  @NotEmpty
  @Column({ type: DataType.DECIMAL(10, 7) })
  oscilationPercentage: number;

  @NotEmpty
  @Column({ type: DataType.DECIMAL(10, 7) })
  percentPriceDifference: number;

  @NotEmpty
  @Column({ type: DataType.DECIMAL(10, 3) })
  fetchIntervalInSeconds: number;

  @NotEmpty
  @Column
  timeOfBidPrice: Date;

  @CreatedAt
  timeOfNotification: Date;
}