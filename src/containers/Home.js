import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, computed, autorun } from 'mobx'

export class Todo {
  id = Math.random();
  @observable title = "";
  @observable finished = false;
  constructor(title) {
    this.title = title;
  }
}

export class TodoList {
  @observable todos = [];
  @computed get unfinishedTodoCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }
  x = this.todos.length

}

@observer
class TodoListView extends Component {
  render() {
    console.warn('this.props.todoList', this.props)
    return <div>
      <ul>
        {this.props.todoList.todos.map(todo =>
          <TodoView todo={todo} key={todo.id} />
        )}
        Tasks left: {this.props.todoList.unfinishedTodoCount}
      </ul>

    </div>
  }
}

const TodoView = observer(({ todo }) =>
  <li>
    <input
      type="checkbox"
      checked={todo.finished}
      onChange={(e) => { todo.finished = !todo.finished }}
    />{todo.title}
  </li>
)

export default TodoListView