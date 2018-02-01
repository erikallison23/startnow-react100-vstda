import React, { Component } from 'react';
import TodoAdd from './TodoAdd';

var count = 0;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priority: '0',
      inputText: '',
      todoList: [],
    }
    this.onClick = this.onClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.selectOnChange = this.selectOnChange.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
  };

  onClick() {
    let todoListCopy = this.state.todoList.slice();
    count++;
    todoListCopy.push({
      text: this.state.inputText,
      priority: this.state.priority,
      editable: false,
      id: count,
    });

    this.setState({ todoList: todoListCopy });
  };

  onInputChange(e) {
    this.setState({ inputText: e.target.value });
  };

  selectOnChange(event) {
    this.setState({ priority: event.target.value });
  };

  deleteTodo(i) {
    let todoListCopy = this.state.todoList.slice();

    todoListCopy.splice(i, 1);

    this.setState({ todoList: todoListCopy });
  };

  editTodo(e) {
    let index = parseInt(e.currentTarget.id);
    let newList = this.state.todoList.slice();
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id === index) {
        newList[i].editable = true;
      }
    };
    this.setState({
      todoList: newList,
    })
  };

  saveTodo(i, id, text, priority) {
    let todoListCopy = this.state.todoList.slice();

    let newTodo = {
      text,
      priority,
      editable: false,
      id: ++count
    }
    todoListCopy.splice(i, 1, newTodo);

    this.setState({ todoList: todoListCopy });

  };

  render() {
    let bulletedtodoList = this.state.todoList.map((e, i) => {
      return (
        <TodoAdd key={i} id={e.id} todoList={e} delete={() => this.deleteTodo(i)} edit={this.editTodo} save={(text, priority) => this.saveTodo(i, e.id, text, priority)} />
      );
    });

    return (
      <div className='container'>
        <h1>Very Simple Todo App</h1>
        <p>Track all of the things</p>
        <hr></hr>
        <div className='row'>

          <div className='col-md-4'>

            <div className='card' id='card-1'>
              <div className='card-header' id='header-1'>Add New Todo</div>

              <label className='label'> I want to.. </label>
              <div className='control'>
                <textarea id='want-to' placeholder='Enter Todo Here' className='form-control' defaultValue={this.state.inputText} onChange={this.onInputChange} />
              </div>

              <label className='label'> How much of a priority is this? </label>
              <div className='control'>
                <select name='priority' className="form-control mb-5 create-todo-priority" onChange={this.selectOnChange}>
                  <option value={0} hidden>Select a priority</option>
                  <option id='priority-1' value={1} className='form-control' >Low Priority</option>
                  <option id='priority-2' value={2} className='form-control' >Mid Priority</option>
                  <option id='priority-3' value={3} className='form-control' >High Priority</option>
                </select>
              </div>
              <div className='card-footer' id='footer'>
                <button className='btn btn-primary btn-block' onClick={this.onClick} type='button' id='input-button'>Add</button>
              </div>
            </div>
          </div>

          <div className='col-md-8'>
            <div className='card' id='card-2'>
              <div className='card-header' id='header-2'>View Todos</div>
              {/*  <label className='label'>Welcome to Very Simple Todo App!</label>
              <br />
              <label className='label'>Get started now by adding a new todo on the left.</label>
              <br /> */}
              {this.state.todoList.length === 0 ? '  Welcome to Very Simple Todo App! Get started now by adding a new todo on the left. ' : <ul>{bulletedtodoList}</ul>}
            </div>
          </div>
        </div>
      </div>
    );
  }
};



export default App;
