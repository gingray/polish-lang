import 'expose-loader?jQuery!expose-loader?$!jquery';
import 'script-loader!corejs-typeahead/dist/bloodhound';
import 'script-loader!corejs-typeahead/dist/typeahead.bundle';
import './bootstrap4-tagsinput';
import * as ko from "knockout";
import tagsBinding from "./tagsBinding";
tagsBinding();

import {AddWordModel} from "./addWord";
import {ShowWordModel} from "./showWord";


document.addEventListener('DOMContentLoaded', function(){
    if (document.getElementById('app-add-new-words') != null) {
        ko.applyBindings(new AddWordModel(), document.getElementById('app-add-new-words'));
    }

    if (document.getElementById('app-show-words') != null) {
        ko.applyBindings(new ShowWordModel(), document.getElementById('app-show-words'));
    }

});

