import { ObjectId } from "bson";

export interface TodoTypes {
    title: string;
    description?: string;
    owner: ObjectId;
    position: number;
    done: boolean;
}