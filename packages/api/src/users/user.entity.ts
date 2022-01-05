import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Index()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Column({ unique: true })
  @Index()
  @IsNotEmpty()
  @IsString()
  username: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @Exclude()
  password: string;
}
