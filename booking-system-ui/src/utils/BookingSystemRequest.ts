type Method = 'GET' | 'POST';

export default class BookingSystemRequest {
    base: string = '/api';
    path: string;
    request: XMLHttpRequest;
    payload: any | undefined;
    method: string;
    handleSuccess: (response: any) => void = () => {};
    handleFailure: (response: any, status: number) => void = () => {};
    isFormData: boolean;

    constructor(path: string, method: Method, isFormData=false) {
        this.request = new XMLHttpRequest();
        this.path = path;
        this.method = method;
        this.isFormData = isFormData;
    }

    setPayload(payload: any): BookingSystemRequest{
        this.payload = JSON.stringify(payload);
        return this;
    }

    onStart(handleSatrt: () => void): BookingSystemRequest {
        this.request.addEventListener('loadstart', handleSatrt);
        return this;
    }

    onFinished(): (this: XMLHttpRequest) => void {
        const handleSuccess = this.handleSuccess;
        const handleFailure = this.handleFailure;

        return function (this: XMLHttpRequest) {
            if (this.status >= 200 && this.status < 300) {
                handleSuccess(this.response);
            } else {
                handleFailure(this.response, this.status);
            }
        }
    }

    onSuccess(handleSuccess: (response: any) => void): BookingSystemRequest {
        this.handleSuccess = handleSuccess;
        return this;
    }

    onFailure(handleFailure: (response: any, status: number) => void): BookingSystemRequest {
        this.handleFailure = handleFailure;
        return this;
    }

    onError(handleError: (err: any) => void): BookingSystemRequest {
        this.request.addEventListener('error', handleError);
        return this;
    }

    send() {
        this.request.open(this.method, `${this.base}/${this.path}`);
        if (this.isFormData) {
            this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        } else {
            this.request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        }
        this.request.withCredentials = true;
        this.request.addEventListener('loadend', this.onFinished());
        this.request.send(this.payload);
    }

}