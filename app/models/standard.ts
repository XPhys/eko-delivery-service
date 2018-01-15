/**
 * Api standard response
 * Entire api response must be followed
 */
export class ApiResponse<T> {

    /**
     * Status code of API operation
     * 1 = success
     * 0 = fail
     */
    code: number;

    /**
     * Status message
     */
    message: string;

    /**
     * Generic data
     */
    data: T;

    constructor(code?: number, message?: string, data?: T) {
        this.code = code || 0;
        this.message = message || '';
        this.data = data || undefined;
    }
}