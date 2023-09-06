export interface ITodo{
  _id?:string,
  name:string,
  description?:string;
  dueDate?:string;
  complete:boolean;
  isEdit?:boolean;
  order?:number;
}
