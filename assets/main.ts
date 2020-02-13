import 'expose-loader?jQuery!expose-loader?$!jquery';
import 'script-loader!corejs-typeahead/dist/bloodhound';
import 'script-loader!corejs-typeahead/dist/typeahead.bundle';
import './bootstrap4-tagsinput';



import * as ko from "knockout";
// import 'bootstrap4-tagsinput-umd/tagsinput';
import tagsBinding from "./tagsBinding";

tagsBinding();

class AddWordModel {
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
            tags: this.langParts(),
            translation: this.translation(),
            lang: this.lang()
        };
        $.ajax({
            url: 'http://localhost:3000/home/add_sample',
            data: payload,
            method: 'post',
            success: (data: any) => {
                console.log(data)
                this.original('');
                this.translation('');
            },
            failure: (data: any) => {
                console.log(data);
                this.original('');
                this.translation('');
            }
        });

    }
}

document.addEventListener('DOMContentLoaded', function(){
    ko.applyBindings(new AddWordModel(), document.getElementById('app-add-new-words'));
});

