import { GridViewEnum } from '../Enums/GridViewEnum';

export interface GridView {
  title: string,
  type: GridViewEnum,
  items: Array<Date>
}