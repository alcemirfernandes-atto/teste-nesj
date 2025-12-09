export interface IRepository<T> {
    create(data: Partial<T>): Promise<void>;
    update(id: string, data: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
}
