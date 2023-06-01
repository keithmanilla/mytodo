import { Router } from "express";
import { getAllUserTodos } from "../controllers/todo.controller";

 const router = Router();

 router.get(
    "/",
    getAllUserTodos
 );

 export default router;
