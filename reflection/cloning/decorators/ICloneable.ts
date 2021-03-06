﻿import GeraniumApp from "../../../runtime/concrete/App";
import { ICloner } from "../interfaces/ICloner";

export function ICloneable(constructor: any) {
    constructor.prototype.clone = function () {
        return GeraniumApp.resolve(ICloner).clone(this);
    };
}
