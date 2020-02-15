import * as ko from "knockout";

export class AddWordModel {
    public original: KnockoutObservable<string>;
    public translation: KnockoutObservable<string>;
    public lang: KnockoutObservable<string>;
    public langParts: KnockoutObservableArray<string>;


    constructor() {
        this.original = ko.observable('');
        this.translation = ko.observable('');
        this.lang = ko.observable('en');
        this.langParts = ko.observableArray<string>();

    }

    addWord(data: any, event: any) {
        event.preventDefault();
        console.log(`${this.original()} - ${this.translation()} - ${this.lang()}`);
        const payload = {
            original: this.original(),
            tags: this.langParts().join(','),
            translation: this.translation(),
            lang: this.lang()
        };
        $.ajax({
            url: 'http://localhost:3000/home/add_sample',
            data: payload,
            method: 'post',
            success: (data: any) => {
                this.original('');
                this.translation('');
            },
            failure: (data: any) => {
                this.original('');
                this.translation('');
            }
        });

    }
}
