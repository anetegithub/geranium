﻿module geranium {

    class H1 extends view.abstract.View {
        declare(): string { return '<h1 data-field="time">{{time}}</h1>'; }
    }
    class timestate extends states.State {
        time: string = "12:15:16";
        autoupdate() {
            return {
                url: '/server.s',
                method: 'post'
            };
        }
    }
    class vs extends viewstate.ViewState {
        state(): any { return timestate; }
        view(): any { return H1; }
    }

    class v extends view.abstract.View {
        declare(): string {
            return '<div>Train now at <span data-field="now">{{now}}</span> of <span data-field="max">{{max}}</span> (<button onclick="maxdecrement">-</button><button onclick="maxincrement">+</button>) stations</div><br/>\
            <div><button onclick="decrement">prev station</button><button onclick="increment">next station</button></div><br/>\
            <div>road to <input name="jumpto" type="number" /> station <button onclick="jump">go</button><br/>';
        }
    }
    class vm extends viewmodels.abstract.ViewModel {
        max: number = 10;
        now: number = 0;
        jumpto: number = 0;

        maxincrement() {
            this.max++;
        }
        maxdecrement() {
            this.max--;
        }

        increment() {
            this.now++;
        }
        decrement() {
            this.now--;
        }
        jump() {
            debugger;
            this.now = this.jumpto;
        }

        autoupdate() { return false; }
        view(): any { return v; }
    }

    export async function blossom() {
        var _vm = new vm('.viewmodel');

        //var _vs = new vs('.viewstate');
        //setInterval(() => {
        //    runtime.AppSettings.Current.request.trigger();
        //}, 1000);
    }
}
geranium.blossom();