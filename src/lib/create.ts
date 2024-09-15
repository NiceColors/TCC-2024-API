import { type NextFunction, type Request, type Response, Router } from 'express';
import type { z } from 'zod';




// Roteador Express, permite a adição de rotas através de um callback, e retorna o roteador configurado.
export function createRouter(callback: (router: Router) => void) {
    const router = Router();
    callback(router);
    return router;
}






// Handler para uma rota, validando a requisição com um schema Zod antes de chamar o handler fornecido.
// Retorna uma função assíncrona que pode ser usada como middleware no Express.
export function createHandler<T extends z.ZodType>(
    schema: T,
    handler: (
        req: Omit<Request, keyof z.output<T>> & z.output<T>,
        res: Response,
        next: NextFunction
    ) => void | Promise<void>
): (req: Request, res: Response, next: NextFunction) => Promise<void>;







// handler para uma rota sem validação de schema.
// Retorna uma função assíncrona que pode ser usada como middleware no Express.
export function createHandler(
    handler: (req: Request, res: Response, next: NextFunction) => void | Promise<void>
): (req: Request, res: Response, next: NextFunction) => Promise<void>;







// Implementa ambas as versões de createHandler. 
// Se um schema for fornecido, ele valida a requisição; caso contrário, chama diretamente o handler.
// Retorna uma função assíncrona que pode ser usada como middleware no Express.
export function createHandler<T extends z.ZodType>(
    schemaOrHandler:
        | T
        | ((req: Request, res: Response, next: NextFunction) => void | Promise<void>),
    handler?: (
        req: Omit<Request, keyof z.output<T>> & z.output<T>,
        res: Response,
        next: NextFunction
    ) => void | Promise<void>,
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (handler) {
                const schema = schemaOrHandler as T;
                schema.parse(req); // Valida a requisição usando o schema Zod
                await handler(req, res, next); // Chama o handler
            } else {
                const handler = schemaOrHandler as (
                    req: Request,
                    res: Response,
                    next: NextFunction
                ) => void | Promise<void>;
                await handler(req, res, next); // Chama o handler sem validação
            }
        } catch (error) {
            next(error); // Passa o erro para o próximo middleware
        }
    };
}
