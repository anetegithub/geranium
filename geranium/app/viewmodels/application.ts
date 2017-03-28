﻿
class app extends ViewModel {
    constructor() {
        super();
        this.show_trip();
    }

    view() {
        return $('._controls').html();
    }

    btn_trip: string = "trip";
    btn_schedule: string = "schedule";

    async show_trip() {
        var tripstate = await State.get(trip);
        
        if (!tripstate.name) {
            var _trains = await State.get(trains);
            tripstate.obtain(_trains.data[0]);
        }
        tripstate.show('.app');
    }

    show_schedule() {
        new trainschedule()
            .display('.app');
    }

    documentTitle() { return 'Application'; }
}