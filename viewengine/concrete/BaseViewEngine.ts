﻿import { IViewEngine } from "../interfaces/IViewEngine";
import { ViewExecutingContext } from "../contracts/ViewExecutingContext";
import { ViewDOM } from "../../viewdom/abstract/ViewDOM";
import { ExecuteContext } from "../contracts/ExecuteContext";
import { IViewable } from "../../view/interfaces/IViewable";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { ViewPublishContext } from "../contracts/ViewPublishContext";

export class BaseViewEngine implements IViewEngine {
    ["`container"]: ICoherenceContainer;

    async execute(context: ViewExecutingContext): Promise<HTMLElement[]> {
        var view = await IViewEngine.ViewEngineView(context.iViewed, context.selector);

        var execCtx = new ExecuteContext(context);
        var bindingContext = new BindContext(view, execCtx.bindingFlags);
        var viewbinder = this["`container"].resolve(IViewBinder);
        await viewbinder.bind(bindingContext);

        return await view.DOM();
    }
}