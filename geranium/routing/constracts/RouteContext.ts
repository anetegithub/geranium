﻿namespace geranium.routing.contracts {
    export class RouteContext {
        prepath?: string;
        parent?: { new (...args: any[]): any };
        executable?: string;
    }
}