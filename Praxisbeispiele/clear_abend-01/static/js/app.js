!function(wind) {
    // Vordefinieren aller benötigten app-globalen variablen.
    // diese werden in init() befüllt.
    var todo,
        form,
        todoList,
        todoList_name,
        counter = 0;


    function addTodo(todo) {
        // Fügt ein todo object der todoList hinzu.
        var li = document.createElement('li');
        var wrapper = document.createElement('div');
        wrapper.innerText = todo.text;
        if (todo.done) {
            li.classList.add('done');
        }
        li.setAttribute('data-id', todo.id);
        li.innerHTML += '<i class="icon-ok"></i><i class="icon-remove"></i>';
        li.appendChild(wrapper);
        todoList.appendChild(li);
        // Passend einfärbeln...
        colorize(wrapper);
        if (!todo.done) {
            // TODO: dragright
            Hammer(li).on('touch dragright release', draghandler_done);
        }
        // TODO: dragleft
        Hammer(li).on('touch dragleft release', draghandler_delete);

    }

    function removeTodo(li) {
        // Löscht ein todo-li element, inklusive object
        // und sortiert alles neu.
        todoList.removeChild(li);
        var remaining_objs = [];
        for (var i = 0; i < counter; i++) {
            var obj = JSON.parse(localStorage.getItem('todo:'+todoList_name+':'+i));
            if (obj.id === li.getAttribute('data-id')) {
                continue;
            }
            remaining_objs.push(obj);
        }
        localStorage.clear();
        var new_counter = todoList.children.length;
        counter = new_counter;
        localStorage.setItem('todo:'+todoList_name+':counter', new_counter);
        remaining_objs.forEach(function(obj) {
            new_counter--;
            obj.id = 'todo:' + todoList_name + ':' + new_counter;
            document.querySelector('[data-id="todo:'+todoList_name+':'+(new_counter + 1)+'"]')
                    .setAttribute('data-id', 'todo:'+todoList_name+':'+new_counter);
            localStorage.setItem(obj.id, JSON.stringify(obj));
        });
    }

    function doneTodo(li) {
        var obj = JSON.parse(localStorage.getItem(li.getAttribute('data-id')));
        obj.done = true;
        localStorage.setItem(li.getAttribute('data-id'), JSON.stringify(obj));
    }


    function draghandler_done(event) {
        // Browser vom Scrollen abhalten.
        event.preventDefault();
        var el = event.target;

        switch(event.type) {
            case 'touch':
                el.setAttribute('data-bg', el.style.backgroundColor);
                break;
            case 'dragright':
                // bewegen vom element mit der maus/dem finger.
                el.style.webkitTransform = 'translate3d('+event.gesture.deltaX+'px, 0, 0)';
                // Weit genug bewegt -> als done markieren.
                if (event.gesture.deltaX > 100) {
                    el.style.backgroundColor = 'rgb(0, 125, 0)';
                }
                break;
            case 'release':
                if (event.gesture.deltaX < 100) {
                    el.style.webkitTransform = '';
                    var original_bg = el.getAttribute('data-bg');
                    if (original_bg) {
                        el.style.backgroundColor = original_bg;
                    }
                } else {
                    el.style.webkitTransform = '';
                    el.parentNode.classList.add('done');
                }
                break;
        }
    }

    function draghandler_delete(event) {

    }


    function colorize(el) {
        // Credit to http://clear.evanyou.me/
        var baseH = 354,
            baseS = 100,
            baseL = 46,

            stepH = 7,
            stepL = 2,

            maxColorSpan = 7,

            spanH = stepH * maxColorSpan,
            spanL = stepL * maxColorSpan,

            total = todoList.children.length,
            idx = Array.prototype.indexOf.call(todoList.children,
                                               el.parentNode) + 1;

        if (total > maxColorSpan) {
            stepH = spanH / total;
            stepL = spanL / total;
        }

        el.style.backgroundColor = 'hsl('+ (baseH + idx * stepH) + ','
                                         + (idx ? (baseS - 10) : baseS)  + '%,'
                                         + (baseL + idx * stepL) + '%)';
    }

    function addFormListener() {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            if (!todo.value.replace(/\s+/g, '')) {
                todo.value = '';
                return;
            }

            var todo_object = {id: 'todo:' + todoList_name +':'+ counter,
                               text: todo.value,
                               done: false};
            localStorage.setItem('todo:' + todoList_name + ':' + counter,
                                 JSON.stringify(todo_object));
            addTodo(todo_object);

            counter++;
            localStorage.setItem('todo:'+todoList_name+':counter', counter);

            todo.value = '';
        });
    }

    function init() {
        // Neusetzen der bereits definierten werte.
        // das muss passieren damit etwaige änderungen am ursprungs html
        // auch beim erneuten init() wieder erkannt werden.
        todo = document.forms.todoForm.todo;
        form = document.forms.todoForm;
        todoList = document.getElementById('todo_list');
        todoList_name = todoList.getAttribute('data-name');
        counter = 0;

        var existing_counter = localStorage.getItem('todo:'+todoList_name+':counter');
        if (existing_counter) {
            counter = existing_counter;
            var done_todos = [];
            for (var i = 0; i < counter; i++) {
                var existing_todo = localStorage.getItem('todo:' + todoList_name + ':' + i);
                var todo_obj = JSON.parse(existing_todo);
                if (todo_obj.done) {
                    // Fertige todos werden rausgefiltert...
                    done_todos.push(todo_obj);
                } else {
                    addTodo(todo_obj);
                }
            }
            // ... und am Ende extra angehängt.
            done_todos.forEach(function(done_todo) {
                addTodo(done_todo);
            });
        }
        addFormListener();
    }

    wind.ToDo = {
        init: init,
        list: todoList,
        name: todoList_name,
        length: counter
    }
}(window);
