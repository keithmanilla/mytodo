import { Router } from "express";
import { deleteTodoById, getAllUserTodos, updateTodoById } from "../controllers/todo.controller";

 const router = Router();

 router.get(
    "/",
    getAllUserTodos
 );

 router.put(
   "/:id",
   updateTodoById
 );

 router.delete(
   "/:id",
   deleteTodoById
 )

 export default router;
