Vue.component('todo', {
    'props': ['todo'],
    'template': '\
        <transition name="fade">\
            <li v-on:click="switch_status">{{ todo.message }}</li>\
        </transition>',
    'methods': {
        'switch_status': function() {
            this.todo.done = !this.todo.done;
            this.$parent.save_todos();
        }
    }
});

var sample_data = {"todos": [
    {"message": "Tap me to make me completed.", "done": false},
    {"message": "Now, tap me to make me incomplete.", "done": true},
    {"message": "Add a new task to the list from the bottom of the page.", "done": false},
    {"message": "Check all tasks as done.", "done": false},
    {"message": "Tap 'Clean Up' to remove completed items from the list.", "done": false},
    ]}

app = new Vue({
    'el': '#app',
    'data': {
        'message': '',
        'todos': []
    },
    'created': function () {
        data = localStorage.getItem('todos');
        if(!data) {
            console.log('nothing found.')
            localStorage.setItem('todos', JSON.stringify(sample_data));
        } else {
            console.log(data);
            this.todos = JSON.parse(data).todos;
        }
    },
    'computed': {
        'open_todo_count': function () {
            counter = 0;
            for (var i = this.todos.length - 1; i >= 0; i--) {
                counter += !this.todos[i].done;
            }
            return counter;
        }
    },
    'methods': {
        'add_todo': function () {
            if(this.message) {
                this.todos.push({'message': this.message, 'done': false});
                this.message = '';
                this.save_todos();
            }
        },
        'save_todos': function () {
            localStorage.setItem('todos', JSON.stringify({'todos': this.todos}));
        },
        'clear_done': function () {
            data = localStorage.getItem('todos')
            if(!data) {
                console.log('naber');
                localStorage.setItem('todos', '{"todos": []}');
            } else {
                this.todos = JSON.parse(data).todos;
                new_list = [];
                for (var i = 0; i < this.todos.length; i++) {
                    if(!this.todos[i].done) {
                        new_list.push(this.todos[i]);
                    }
                }
                this.todos = new_list;
            }
            this.save_todos();
        }
    }
})