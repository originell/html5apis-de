!function() {
    var todo = document.forms.todoForm.todo,
        form = document.forms.todoForm,
        todoList = document.querySelector('#todo_list'),
        count = 0;

    var existing_count = localStorage.getItem('todo:count');
    if (existing_count) {
        count = existing_count;
        for (var i = 0; i < existing_count; i++) {
            // Basteln wir uns den Schlüssel unter dem das Todo gespeicher ist
            var key = 'todo:' + i;
            // Da holen wir uns beispielsweise todo:1 aus dem localStorage
            var stored_todo = localStorage.getItem(key);
            // und bauen uns wieder ein listen element
            var new_li = document.createElement('li');
            // welches den gespeicherten wert bekommt
            new_li.innerText = stored_todo;
            new_li.innerHTML += '<i class="icon-remove"></i>';
            // uuuund fügen wir das ganze zu unserer existierenden todo liste hinzu.
            bindRemove(new_li);
            todoList.appendChild(new_li);
        }
    }

    form.addEventListener('submit', function(event) {
        // Normal übliche Browseraktion verhindern (seite neuladen, formular abschicken...)
        event.preventDefault();
        // Keine leeren todos erlauben!
        if (!todo.value.replace(/\s/g, '')) {
            // ungültige eingaben gleich beseitigen
            todo.value = '';
            return;
        }

        var li = document.createElement('li');
        li.innerText = todo.value;
        li.innerHTML += '<i class="icon-remove"></i>';
        bindRemove(li);
        todoList.appendChild(li);
        localStorage.setItem('todo:'+count, todo.value);
        console.log('SET', 'todo:'+count, 'to', todo.value);
        count++;
        localStorage.setItem('todo:count', count);

        todo.value = '';
    });

    function bindRemove(li) {
        var itag = li.querySelector('.icon-remove');
        itag.addEventListener('click', function(e) {
            todoList.removeChild(li);
            // 1. speicher entleeren
            localStorage.clear();
            // 2. counter neu gesetzt auf die anzahl der kinder in der todoList
            count = todoList.children.length;
            // 3. neuen count abspeichern
            localStorage.setItem('todo:count', count);
            // 4. holen existierenden Todos und speichern sie neu ab.
            for (var i = 0; i < count; i++) {
                var existing_li = todoList.children[i];
                localStorage.setItem('todo:' + i, existing_li.innerText);
                //                    todo:0, todo:1, ...
            }
        });
    }


}();





