import React, { Component } from "react";
class Todo extends Component{

    render(){
        return(
            <div id = "content">
                <form onSubmit ={(event)=>{
                    event.preventDefault()
                    this.props.addtask(this.task.value)
                }}>
          <label>
            To do </label>

            <input id ="newTask"
            ref={(input)=>{
                this.task =input
            }}
            type ="text"  name ="title" placeholder ="Add task" required/>
            <input type ="submit" hidden ={true}
            // value ="Submit" onChange ={addtask}
             ></input>
            
            
          </form>
          {/* <div className ="list"> */}
              <ul id ="tasklist" className ="list-unstyled" >{this.props.tasks.map((tasks)=>{
                  return(

                    <div className="taskTemplate" className="checkbox" 
                    // key={key}
                    >
                    <label>
                      <input
                      type="checkbox"
                      name={tasks.id}
                      defaultChecked={task.completed}
                      ref={(input) => {
                        this.checkbox = input
                      }}
                      onClick={(event) => {
                        this.props.toggleCompleted(this.checkbox.name) }}/>
                      <span className="content" >{tasks.content} </span>
                    </label>

                  </div>
                )
              })}
              </ul>
          {/* </div> */}
          {/* <h2 class ="Heading">
            List
          </h2>
        <div id ="Listwrapper">
          </div>
          <div class ="Card" id ="ListTemplate">
              
        <div class = "details">

          
          <h5>  Owner :<span class="contractowner"> address</span></h5>

          <h4> <span class ="Title"> Title:  */}
          {/* {this.state.test[0]} */}
            {/* </span>  </h4>

            <p>Details:<span class="Details"> </span> </p>
            <button type ="button"  
            // onClick = {this.runExample.handlesubmit}
             name ="button"  class ="Completed">Completed</button>

        </div> */}
        {/* </div> */}

            </div>

        )

    }
}

export default Todo;