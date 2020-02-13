import * as ko from "knockout";

export default function()  {
    ko.bindingHandlers.dataTags = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            const el = $(element);
            // @ts-ignore
            const tags = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                local: [{name: 'Amsterdam'}]
            });
            tags.initialize();

            el.tagsinput({
                itemValue: 'name',
                itemText: 'name',
                preventPost: true,
                typeaheadjs: {
                    name: 'tags',
                    displayKey: 'name',
                    valueKey: 'name',
                    source: tags.ttAdapter()
                },
                freeInput: false
            });
            const itemAdded = function(event: any) {
                const val = valueAccessor();
                val.push(event.item);

                console.log(event)
            };

            const itemRemoved = function(event: any) {
                const val = valueAccessor();
                val.remove(event.item);
                console.log(event)
            };


            el.on('keydown', function(e: any){
                if (e.keyCode == 13){
                    debugger
                    e.keyCode = 188;
                    e.preventDefault();
                }});

            el.on('itemAdded', itemAdded);
            el.on('itemRemoved', itemRemoved);
            return { controlsDescendantBindings: false };
        }
    };
}
