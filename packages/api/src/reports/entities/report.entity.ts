import { BaseEntity } from 'src/core';
import { Column, Entity } from 'typeorm';
import { IReport } from '../types';

@Entity()
export class Report extends BaseEntity implements IReport {
  @Column()
  price: number;
}

export default Report;
