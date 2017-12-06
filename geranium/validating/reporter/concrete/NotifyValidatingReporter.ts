﻿import { IValidatingReporter } from "../interfaces/IValidatatingReporter";
import { ValidationResult } from "../../contracts/ValidationResult";

export class NotifyValidatingReporter implements IValidatingReporter {
    report(viewDOM: ViewDOM, validatingResult: ValidationResult) {
        validatingResult.errors.forEach(x => {
            console.error('VALLIDATING_ERR [' + x.name + ']:' + x.message);
        });
    }
}