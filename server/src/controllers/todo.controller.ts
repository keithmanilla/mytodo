import { Request, Response } from "express";
import { TodoModel } from "../models/todo/todo";
import _ from 'lodash';
import { UserModel } from "../models/user/user";
import { ObjectId } from "bson";

/**
 * Get All User Todos.
 */
 export const getAllUserTodos = async (req: Request, res: Response) => {
  try {
    // FIXME: Pending Auth Implementation. Get User ID from middleware.
    const userId: string | undefined = '6478d420475bfba774f84163'; // _.get(req, 'user.id');
    const user: any | undefined = await UserModel.findOne({ _id: new ObjectId(`${userId}`) });

    // Return 404 Error if User Record was not found.
    if (!user) {
        userNotFound(res);
    };

    // Query for User's Todos from DB.
    // FIXME: Props.
    const userTodos: any[] = await TodoModel.aggregate([
        {
            $match: {
                owner: user?._id
            }
        },
        {
            $sort: {
                position: 1
            }
        }
    ]);

    if (userTodos?.length > 0) {
        // Returned records.
        return res.status(200).send({
            status: 200,
            message: 'Successfully returned todo records.',
            error: {},
            todos: userTodos,
        });
    } else {
        // Status 200 is maintained as Axios will return an error
        // in front end if status is 404.
        return res.status(200).send({
            status: 200,
            message: 'No Records Found',
            error: {
                value: 'RECORDS_NOT_FOUND',
                message: 'No records were found.'
            },
            todos: [],
        });
    };
  } catch (error) {
    // Catch error and return as status 400.
    caughtError(res, error);
  };
};

/**
 * Create a new Todo.
 * The minimum requirements are:
 * 1. Todo title.
 * 2. Owner (User ID).
 * Owner is handled by the middleware.
 */
export const createTodo = async (req: Request, res: Response) => {
    try { 
        const payload = _.get(req, 'body');
        
        // FIXME: Pending Auth Implementation. Get User ID from middleware.
        const userId: string | undefined = '6478d420475bfba774f84163'; // _.get(req, 'user.id');
        const user: any | undefined = await UserModel.findOne({ _id: new ObjectId(`${userId}`) });
    
        // Return 404 Error if User Record was not found.
        if (!user) {
            userNotFound(res);
        };
    
        // FIXME: Props.
        const newTodo: any = await new TodoModel({
            ...payload,
            owner: user?._id
        }).save();

        console.log(newTodo);
    
        if (newTodo) {
            return res.status(201).send({
                status: 201,
                message: 'Successfully created todo record.',
                error: {},
                todo: newTodo,
            });
        } else {
            return res.status(400).send({
                status: 400,
                message: 'Unable to create record.',
                error: {
                    value: 'UNABLE_TO_CREATE',
                    message: 'Unable to create record.'
                },
                todo: {},
            });
        };
    } catch (error) {
        // Catch error and return as status 400.
        caughtError(res, error);
    };
  };

/**
 * Update Todo by ID.
 * This API requires an ID as params.
 */
export const updateTodoById = async (req: Request, res: Response) => {
    try {
        // Get payloads and params.
        const id: string = _.get(req, 'params.id');
        const payload = _.get(req, 'body');

        // TODO: Implement OAuth 2.
        const userId: string | undefined = '6478d420475bfba774f84163'; // _.get(req, 'user.id'); -> from middleware
        const user: any | undefined = await UserModel.findOne({ _id: new ObjectId(`${userId}`) });
    
        // Return 404 Error if User Record was not found.
        if (!user) {
            userNotFound(res);
        };
  
        // TODO: Props to replace any.
        const updateTodo: any = await TodoModel.updateOne(
            {
                _id: new ObjectId(`${id}`)
            },
            {
                $set: {
                    ...payload
                }
            }
        );
    
        if (updateTodo) {
            // Successfully updated record.
            return res.status(201).send({
                status: 201,
                message: 'Successfully udpated todo record.',
                error: {},
                todo: updateTodo,
            });
        } else {
            // Unknown 400 error.
            return res.status(400).send({
                status: 400,
                message: 'Unable to update record.',
                error: {
                    value: 'UNABLE_TO_UPDATE',
                    message: 'Unable to update record.'
                },
                todo: {},
            });
        };
    } catch (error) {
        // Catch error and return as status 400.
        caughtError(res, error);
    };
  };

  /**
   * Delete Todo.
   * This requires a Todo ID as params.
   */
  export const deleteTodoById = async (req: Request, res: Response) => {
    try { 
        const id: string = _.get(req, 'params.id');

        // TODO: Implement OAuth 2.
        const userId: string | undefined = '6478d420475bfba774f84163'; // _.get(req, 'user.id'); -> from middleware
        const user: any | undefined = await UserModel.findOne({ _id: new ObjectId(`${userId}`) });

        // Return 404 Error if User Record was not found.
        if (!user) {
            userNotFound(res);
        };
  
        // FIXME: Props.
        const deleteTodo: any = await TodoModel.deleteOne({ _id: new ObjectId(`${id}`) })
    
        if (deleteTodo) {
            // Successfully deleted.
            return res.status(200).send({
                status: 200,
                message: 'Successfully deleted todo record.',
                error: {},
            });
        } else {
            // Unable to process request.
            return res.status(400).send({
                status: 400,
                message: 'Unable to delete record.',
                error: {
                    value: 'UNABLE_TO_DELETE',
                    message: 'Unable to delete record.'
                },
            });
        };
    } catch (error) {
      console.error('Status 500 -> ', error);
      return res.status(500).send({
          status: 500,
          error
      });
    };
  };

  /**
   * Resuable response if user was not found.
   * Possible Causes:
   * 1. User Was Deleted.
   * 2. Faked Auth.
   * 
   * @param res - Request from express passed.
   * @returns User Not Found Response.
   */
  export const userNotFound = (res: any): any => {
    return res.status(404).send({
        status: 404,
        message: 'User record not found.',
        error: {
            value: 'USER_NOT_FOUND',
            message: 'User may have been deleted or record has been corrupted.'
        },
    });
  };

  /**
   * Resuable response for the caught errors in try and catch.
   * Most errors returned are from MongoDB Atlas.
   * 
   * @param res - Request from express passed.
   * @param error - Error passed.
   * @returns Status 400 with errors.
   */
  export const caughtError = (res: any, error: any): any => {
    console.error('Status 400 -> ', error);
    return res.status(400).send({
        status: 400,
        error
    });
  };
