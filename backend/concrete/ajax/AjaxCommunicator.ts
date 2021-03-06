﻿import { ICommunicator } from "../../interfaces/ICommunicator";
import { CommunicationException } from "../../../exceptions/backend/CommunicationException";

export class AjaxCommunicator extends ICommunicator {
    private data: XHRSettings;

    async send<TRequest extends XHRSettings>(data: TRequest): Promise<void> {
        this.validate(data);
        this.data = data;
    }

    async recive<TResponse>(): Promise<TResponse> {
        return new Promise<TResponse>((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.responseType = "text";
            this.setContentType(this.data, xhr);

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr.response as any);
                } else if (xhr.status == 0 && xhr.response) {
                    resolve(xhr.response as any);
                } {
                    reject(`${xhr.status}: ${xhr.statusText}`);
                }
            };

            xhr.onerror = function () {
                reject(`${xhr.status}: ${xhr.statusText}`);
            };

            xhr.open(this.data.method, this.data.url, this.data.async, this.data.user, this.data.pasw);
            xhr.send(this.data.data);
        });
    }

    private validate(data: XHRSettings) {
        if (!data.method || !data.url) {
            throw new CommunicationException("XHR request must declare method and url!");
        }
    }

    private setContentType(opt: XHRSettings, xhr: XMLHttpRequest) {
        if (opt.method != "GET") {
            xhr.setRequestHeader("Content-Type", 'application/x-www-form-urlencoded; charset=UTF-8');
        }
    }
}

export interface XHRSettings {
    method?: HttpMethod;
    url?: string;
    async?: boolean;
    user?: string;
    pasw?: string;
    data?: any;
}

type HttpMethod = keyof { GET, POST, PUT, PATCH, DELETE };