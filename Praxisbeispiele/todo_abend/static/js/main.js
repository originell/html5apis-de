!function() {
    var todo = document.forms.todoForm.todo,
        form = document.forms.todoForm,
        todoList = document.getElementById('todo_list'),
        counter = 0;


    // bindRemove sollte mit einem element aufgerufen werden welches einen
    // i-tag enthält.
    function bindRemove(el) {
        var i = el.querySelector('i');
        i.addEventListener('click', function(event) {
            var li = event.target.parentNode;
            todoList.removeChild(li);
            localStorage.clear();
            var new_counter = todoList.childNodes.length;
            localStorage.setItem('todo:counter', new_counter);
            for (var i = 0; i < new_counter; i++) {
                localStorage.setItem('todo:' + i,
                                     todoList.childNodes[i].innerText);
            }
        });
    }

    var existing_counter = localStorage.getItem('todo:counter');
    if (existing_counter) {
        counter = existing_counter;
        for (var i = 0; i < counter; i++) {
            var existing_todo = localStorage.getItem('todo:' + i);
            var li = document.createElement('li');
            li.innerText = existing_todo;
            li.innerHTML += '<i class="icon-ok"></i>';
            todoList.appendChild(li);
            bindRemove(li);
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var text = todo.value;
        var li = document.createElement('li');
        // innerHTML => Security Problem.
        li.innerText = text;
        li.innerHTML += '<i class="icon-ok"></i>';
        bindRemove(li);
        todoList.appendChild(li);

        localStorage.setItem('todo:' + counter, text);
        counter++;
        localStorage.setItem('todo:counter', counter);

        todo.value = '';
    });
}();
