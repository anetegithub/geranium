﻿module geranium.runtime {
    export abstract class AppSettings {
        private static _current: _AppSettings = new _AppSettings();
        static get Current(): AppSettings {
            return AppSettings._current;
        }

        private static initialized: boolean = false;
        static init(settings: {
            request?: any,
            templating?: any,
            storage?:any
        }) {
            if (AppSettings.initialized)
                throw new Error('Application settings already initialized!');

            if (settings) {
                Object.assign(this, settings);
                AppSettings.initialized = true;
            }
        }

        request: any = {};
        templating: any = {};
        storage: any = {};
    }

    class _AppSettings extends AppSettings { }
}