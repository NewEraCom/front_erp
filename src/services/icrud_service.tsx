export interface IcrudService<T> {
    get: () => Promise<T>;
    create: (data: any) => Promise<T>;
    update: (data: any) => Promise<T>;
    delete: (id: string) => Promise<T>;
    getAll: () => Promise<T[]>;
}