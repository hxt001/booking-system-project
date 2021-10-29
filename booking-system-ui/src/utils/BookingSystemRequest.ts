type Method = 'GET' | 'POST';

export default class BookingSystemRequest {
    domain: string = 'http://localhost:8081';
    path: string;
    request: XMLHttpRequest;
    payload: any | undefined;
    method: string;
    handleSuccess: (response: any) => void = () => {};
    handleFailure: (response: any, status: number) => void = () => {};

    constructor(path: string, method: Method) {
        this.request = new XMLHttpRequest();
        this.path = path;
        this.method = method;
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

        return function(this: XMLHttpRequest) {
            if (this.status >= 200 && this.status < 300){
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
        this.request.open(this.method, `${this.domain}/${this.path}`);
        this.request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.request.addEventListener('loadend', this.onFinished());
        this.request.send(this.payload);
    }

}