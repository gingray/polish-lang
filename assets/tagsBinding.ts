import * as ko from "knockout";

export default function()  {
    ko.bindingHandlers.dataTags = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            const el = $(element);
            const itemAdded = function(event: any) {
                const val = valueAccessor();
                val.push(event.item['name']);

                console.log(event)
            };

            const itemRemoved = function(event: any) {
                const val = valueAccessor();
                val.remove(event.item['name']);
                console.log(event)
            };


            $.ajax({
                method: 'get',
                url: 'http://localhost:3000/home/language_parts',
                success: (data: any) => {
                    // @ts-ignore
                    const tags = new Bloodhound({
                        // @ts-ignore
                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                        // @ts-ignore
                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                        local: data
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
                    el.on('itemAdded', itemAdded);
                    el.on('itemRemoved', itemRemoved);
                }
            });
            return { controlsDescendantBindings: false };
        }
    };
}
