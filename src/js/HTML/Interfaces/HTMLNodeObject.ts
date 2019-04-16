import { HTMLAttribute } from './HTMLAttribute';

export interface HTMLNodeObject {
  name: string,
  tagName: string,
  attributes: Array<HTMLAttribute>,
  content?: string
}