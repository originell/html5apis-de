!function() {
    var app = ToDo.init();

    function loadPage(href, back) {
        var back = back || false;
        console.log(' ==== LOAD '+ href +'==== ');
        $.get(href, function(data) {

            $('#listen a').each(function(idx, el) {
                var el_href = el.getAttribute('href');
                $(el).removeClass('active');
                if (href.indexOf(el_href) > -1) {
                    $(el).addClass('active');
                };
            });

            // Zepto supported anscheinend html parsen nicht...
            // manual cruise control!
            var loaded_doc = document.implementation.createHTMLDocument("newlist");
            loaded_doc.documentElement.innerHTML = data;
            var new_list = $(loaded_doc).find('#todo_list');
            $('#todo_list').replaceWith(new_list);
            // und die App neeuustarteeen.!
            var app = ToDo.init();

            console.log(loaded_doc.title);
            // Keine DOM elemente :(
            if (!back) {
                var stateObj = {came_from: window.location.pathname,
                                going_to: href};
                //                           v-- momentan nicht bbenutzt
                history.pushState(stateObj, loaded_doc.title, href);
            }
            document.title = loaded_doc.title;
        });
    }

    $('#listen a').on('click', function(e) {
        e.preventDefault();
        var $el = $(e.currentTarget);
        loadPage($el.attr('href'));
    });
    window.addEventListener('popstate', function(e) {
        if (!e.state) return;
        loadPage(e.state.going_to, true);
    })
}();
