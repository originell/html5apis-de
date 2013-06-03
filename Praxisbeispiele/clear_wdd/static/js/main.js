!function() {
    var app = ToDo.init();

    $('#listen a').on('click', function(event) {
        //    stateObject  -v
        //      seitentitle       -v
        //        link auf den wir verweisen -v
        //history.pushState(null, '1234', '/wdd911/');
        var $el = $(event.target);
        var ziel = $el.attr('href');
        var stateobj = {kam_von: window.location.pathname,
                        geht_zu: ziel};
        history.pushState(stateobj, '', ziel);

        // 1. Laden der Einkaufsliste (mit AJAX)
        $.get(ziel, function(data) {
            // --- workaround ---
            // Daten für Zepto durchsuchbar machen
            var loaded_doc = document.implementation
                                     .createHTMLDocument("newlist");
            loaded_doc.documentElement.innerHTML = data;
            // ------------------
            // Einkaufsliste aus geladenen Daten holen -v
            var new_list = $(loaded_doc).find('#todo_list');
            // 2. Ersetzen der "Diverse"-Todo Liste durch die Einkaufsliste
            $('#todo_list').replaceWith(new_list);
            // Todo app initialisieren damit die neue liste geladen wird.
            var app = ToDo.init();

            // angewählter listen-button hervorgehoben.
            $('#listen a').removeClass('active');
            $el.addClass('active');
        });

        window.addEventListener('popstate', function(event) {
            var new_href = event.state.geht_zu;
            $.get(new_href, function(data) {
                // --- workaround ---
                // Daten für Zepto durchsuchbar machen
                var loaded_doc = document.implementation
                                         .createHTMLDocument("newlist");
                loaded_doc.documentElement.innerHTML = data;
                // ------------------
                // Einkaufsliste aus geladenen Daten holen -v
                var new_list = $(loaded_doc).find('#todo_list');
                // 2. Ersetzen der "Diverse"-Todo Liste durch die Einkaufsliste
                $('#todo_list').replaceWith(new_list);
                // Todo app initialisieren damit die neue liste geladen wird.
                var app = ToDo.init();

                // angewählter listen-button hervorgehoben.
                //$('#listen a').removeClass('active');
                //$el.addClass('active');
            });
        });
        return false;
    });

}();
