
export const permission = (req: any, res: any, next: any) => {
    const hasPermission = true;

    if (hasPermission) {
        next();
    } else {
        res.status(401).json({ message: 'Usuário não autorizado' });
    }
}