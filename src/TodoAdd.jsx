import React, { Component } from 'react';

class TodoAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputText: props.todoList.text,
            priority: props.todoList.priority
        }

        this.onInputChange = this.onInputChange.bind(this);
        this.save = this.save.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.editTodo = this.editTodo.bind(this);
    }

    onInputChange(e) {
        this.setState({ inputText: e.target.value });
    };

    onSelectChange(e) {
        this.setState({ priority: e.target.value });
    }
    save(e) {
        this.props.save(this.state.inputText, this.state.priority);
    }
    editTodo(e) {
        this.props.edit(e);
    }

    render() {
        // alerts and the 3 types(colors included)
        let alert = {
            3: "alert-danger no margin",
            2: "alert-warning no margin",
            1: "alert-success no margin",
            0: "aler-primary no margin"
        };

        return (

            <div>

                {<label className='checkbox-inline pull-left'><input type='checkbox' value='' id='check' /></label>}

                <li className={alert[this.props.todoList.priority]} >


                    {!this.props.todoList.editable ? this.props.todoList.text : <textarea onChange={this.onInputChange} defaultValue={this.props.todoList.text} />}

                    <button className='pull-right active' onClick={this.props.delete}>
                        <i className='glyphicon glyphicon-trash'></i>
                    </button>

                    {!this.props.todoList.editable ?
                        <button className='pull-right active' id={this.props.id} onClick={this.editTodo}>
                            <i className='glyphicon glyphicon-pencil'></i>
                        </button>

                        : <div> <button className='pull-right active' onClick={this.save}>Save</button>
                            <select defaultValue={alert[this.props.todoList.priority]} name='priority' className="form-control mb-5 create-todo-priority" onChange={this.onSelectChange}>
                                <option value={0} hidden>Select a priority</option>
                                <option id='priority-1' value={1} className='form-control' >Low Priority</option>
                                <option id='priority-2' value={2} className='form-control' >Mid Priority</option>
                                <option id='priority-3' value={3} className='form-control' >High Priority</option>
                            </select>
                        </div>
                    }
                </li>
            </div>
        );
    }
}


export default TodoAdd;