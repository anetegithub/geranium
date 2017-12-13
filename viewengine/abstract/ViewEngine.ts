﻿import { IViewEngine } from "../interfaces/iviewengine";
import { ViewExecutingContext } from "../contracts/viewexecutingcontext";
import { ViewDOM } from "../../viewdom/abstract/viewdom";
import { ExecuteContext } from "../contracts/executecontext";
import { IViewable } from "../../view/interfaces/IViewable";
import { ICoherenceContainer } from "../../coherence/interfaces/ICoherenceContainer";
import { BindContext } from "../../viewbinding/contracts/BindContext";
import { IViewBinder } from "../../viewbinding/interfaces/IViewBinder";
import { ViewPublishContext } from "../contracts/ViewPublishContext";

export abstract class ViewEngine implements IViewEngine {
    ["`container"]: ICoherenceContainer;

    async execute(context: ViewExecutingContext): Promise<void> {
        var view = await IViewEngine.ViewEngineView(context.iViewed, context.selector);

        var execCtx = new ExecuteContext(context);
        var bindingContext = new BindContext(view, execCtx.bindingFlags);
        var viewbinder = this["`container"].resolve(IViewBinder);
        await viewbinder.bind(bindingContext);

        return this.publish({
            dom: await view.DOM(),
            selector: context.selector
        });
    }
    protected abstract publish(viewDOM: ViewPublishContext): Promise<void>;
}