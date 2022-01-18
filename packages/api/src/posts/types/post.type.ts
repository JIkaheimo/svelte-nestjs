import { IBaseEntity } from 'src/core';

export interface IPost extends IBaseEntity {
  title: string;
  paragraphs: string[];
}
