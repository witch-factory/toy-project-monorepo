/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */
export interface paths {
    "/todos": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 주어진 사용자의 todo 조회 */
        get: operations["TodosController_findTodo"];
        put?: never;
        /** 새로운 Todo 생성 */
        post: operations["TodosController_createTodo"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/todos/{todoId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** todo 삭제 */
        delete: operations["TodosController_removeTodo"];
        options?: never;
        head?: never;
        /** todo 수정 */
        patch: operations["TodosController_updateTodo"];
        trace?: never;
    };
    "/users/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["UsersController_create"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_findAll"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_findOne"];
        put?: never;
        post?: never;
        delete: operations["UsersController_remove"];
        options?: never;
        head?: never;
        patch: operations["UsersController_update"];
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CreateTodoDto: {
            title: string;
            completed?: boolean;
            userId: number;
        };
        TodoEntity: {
            id: number;
            title: string;
            userId: number;
            completed: boolean;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        UpdateTodoDto: {
            title?: string;
            completed?: boolean;
            userId?: number;
        };
        CreateUserDto: {
            username: string;
            password: string;
        };
        UpdateUserDto: {
            username?: string;
            password?: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    TodosController_findTodo: {
        parameters: {
            query: {
                /** @description Todo를 조회할 사용자 ID */
                userId: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Todo 조회 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoEntity"][];
                };
            };
        };
    };
    TodosController_createTodo: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Data for the new Todo */
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateTodoDto"];
            };
        };
        responses: {
            /** @description Todo 생성 성공 */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoEntity"];
                };
            };
            /** @description Validation error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TodosController_removeTodo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 삭제할 Todo ID */
                todoId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Todo 삭제 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoEntity"];
                };
            };
            /** @description Todo not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    TodosController_updateTodo: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description 수정할 Todo의 ID */
                todoId: number;
            };
            cookie?: never;
        };
        /** @description 수정할 Todo의 정보 */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateTodoDto"];
            };
        };
        responses: {
            /** @description Todo 수정 성공 */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TodoEntity"];
                };
            };
            /** @description Todo not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_create: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["CreateUserDto"];
            };
        };
        responses: {
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_findAll: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>[];
                };
            };
        };
    };
    UsersController_findOne: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": Record<string, never>;
                };
            };
        };
    };
    UsersController_remove: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_update: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UpdateUserDto"];
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
//# sourceMappingURL=schema.d.ts.map