!function() {
    var app = ToDo.init();
    // Unser Beweis dass die Webseite wirklich neu geladen wurde.
    console.log('Seite wurde geladen.');

    // 1. Listen-Schalter holen
    // 2. Bei klick wollen wir die Adresszeile ändern.
    $('#listen a').on('click', function(event) {
        event.preventDefault();
        // Seitentitel von browsern noch nicht unterstützt.
        //                         -v
        // history.pushState(null, 'WDD911', '/wdd911/');
        var $el = $(event.target);
        var ziel = $el.attr('href');
        var stateObj = {kam_von: window.location.pathname,
                        geht_zu: ziel};
        history.pushState(stateObj, '', ziel);

        // 1. Laden wir beispielsweise die einkaeufe.html (mit AJAX)
        $.get(ziel, function(data) {
            // !!! Zepto Workaround !!! (nicht merken)
            var loaded_doc = document.implementation
                                     .createHTMLDocument("newlist");
            loaded_doc.documentElement.innerHTML = data;
            // ---------------------------------------
            // 2. Aus den Daten die Todo-Liste herausfiltern.
            // Einkaufsliste aus geladenen Daten holen -v
            var new_list = $(loaded_doc).find('#todo_list');
            // 3. Bestehende mit dieser ersetzen.
            $('#todo_list').replaceWith(new_list);
            // 4. ToDo neu initialisieren (init()).
            app = ToDo.init();

            $('#listen a').removeClass('active');
            $el.addClass('active');
        });
    });

    window.addEventListener('popstate', function(event) {
        if (!event.state) return;
        // 1. Laden wir beispielsweise die einkaeufe.html (mit AJAX)
        $.get(event.state.geht_zu, function(data) {
            // !!! Zepto Workaround !!! (nicht merken)
            var loaded_doc = document.implementation
                                     .createHTMLDocument("newlist");
            loaded_doc.documentElement.innerHTML = data;
            // ---------------------------------------
            // 2. Aus den Daten die Todo-Liste herausfiltern.
            // Einkaufsliste aus geladenen Daten holen -v
            var new_list = $(loaded_doc).find('#todo_list');
            // 3. Bestehende mit dieser ersetzen.
            $('#todo_list').replaceWith(new_list);
            // 4. ToDo neu initialisieren (init()).
            app = ToDo.init();
        });
    });

}();
