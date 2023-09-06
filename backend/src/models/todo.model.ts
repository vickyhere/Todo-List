import * as mongoose from "mongoose"
export const TodoSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    dueDate: {
        type: String,
        required: false,
    },
    complete: {
        type: Boolean,
        required: true,
      },
    order: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
)

export interface Todo extends mongoose.Document {
    id?: string;
    name: string;
    complete: boolean;
    description?: number;
    dueDate?: Date;
    order?: number;
}