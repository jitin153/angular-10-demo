import { ErrorDetail } from './error-detail.model';

export interface ServiceResponse<T> {
    result:T;
    isError:boolean;
    errors: ErrorDetail[]
}
