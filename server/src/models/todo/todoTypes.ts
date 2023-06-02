import { ObjectId } from "bson";

/**
 * Todo Types.
 */
export interface TodoTypes {
    // Title is required.
    title: string;
    // Optional description.
    description?: string;
    // Owner ID is required.
    owner: ObjectId;
    // Optional position for sorting.
    position?: number;
    // Handles done state.
    done?: boolean;
}