import * as ko from "knockout";

export class ShowWordModel {
    public words: KnockoutObservableArray<any>;

    constructor() {
        this.words = ko.observableArray<any>();
        $.ajax({
            method: 'get',
            url: 'http://localhost:3000/home/words',
            success: (data: any) => {
                this.words(data);
            }
        });
    }

}
