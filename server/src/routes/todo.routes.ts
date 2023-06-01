import { Router } from "express";
import {
   createTodo,
   deleteTodoById,
   getAllUserTodos,
   updateTodoById
} from "../controllers/todo.controller";

 const router = Router();

 router.get(
    "/",
    getAllUserTodos
 );

 router.post(
   "/",
   createTodo
 )

 router.put(
   "/:id",
   updateTodoById
 );

 router.delete(
   "/:id",
   deleteTodoById
 )

 export default router;
