!function() {
    var form = document.forms.todoForm,
        input = document.forms.todoForm.todo,
        counter = 0;

    function bindRemove(el) {
        function _del(e) {
            e.currentTarget.removeEventListener(_del);
            var todo = e.currentTarget.parentNode;
            document.querySelector('ul').removeChild(todo);

            var remaining_todos = document.querySelectorAll('li'),
                new_count = remaining_todos.length;
            localStorage.clear();
            for (var i = 0; i < new_count; i++) {
                localStorage.setItem('todo:' + i,
                                     remaining_todos[i].innerText);
                console.log('SETTING', 'todo:'+i, 'to',
                            remaining_todos[i].innerText);
            }
            localStorage.setItem('todo:counter', new_count);
        }

        var remove = el.querySelector('.icon-remove');
        remove.removeEventListener('click', _del);
        remove.addEventListener('click', _del);
    }


    var ls_counter = parseInt(localStorage.getItem('todo:counter'));
    if (ls_counter) {
        counter = ls_counter;
        console.log('Locally stored TODOs found. Loading...');
        var todos = [];
        for (var i = 0; i < counter; i++) {
            console.log('RESTORING', 'todo:'+i, 'to', localStorage.getItem('todo:' + i));
            todos.push(localStorage.getItem('todo:' + i));
            var li = document.createElement('LI');
            li.innerText = localStorage.getItem('todo:' + i);
            li.innerHTML += '<i class="icon-remove"></i>';
            document.querySelector('ul').appendChild(li);
            bindRemove(li);
        }
        console.log('TODOs loaded', todos);
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!input.value.replace(/\s+/g, '')) return;

        var li = document.createElement('LI');
        // Security ---v!
        // li.innerHTML = input.value;
        li.innerText = input.value;
        li.innerHTML += '<i class="icon-remove"></i>';
        document.querySelector('ul').appendChild(li);
        bindRemove(li);

        console.log('STORING', input.value, 'under todo:'+counter);
        localStorage.setItem('todo:' + counter, input.value);
        localStorage.setItem('todo:counter', ++counter);
        input.value = '';
    });
}();
