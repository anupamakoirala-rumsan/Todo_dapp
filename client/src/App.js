import React, { Component } from "react";
import TodoContract from "./contracts/Todo.json";
import getWeb3 from "./getWeb3";
// import Todo from "./Todo";

import "./App.css";

class App extends Component {
  constructor(props){

  super(props)
  this.handlesubmit = this.handlesubmit.bind(this)
  this.addtask = this.addtask.bind(this)
  this.toggleCompleted = this.toggleCompleted.bind(this)
  this.state = { tasknumber:0, tasks:[], web3: null, accounts: null, contract: null };}
  
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TodoContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TodoContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;
    // this.getalltask();
    // const getalltask = async()=>{
      const result = await contract.methods.getaskno().call();
      this.setState({tasknumber: result})
      
      console.log(result);
    // } 
       
    for (var i =1; i<= result;i++){

      const task = await contract.methods.gettask(i).call();
      
      console.log(task);
      this.setState({tasks:[...this.state.tasks, task]});
      
      // console.log(this.state.tasks);
      }
  };
getalltask(){
  const result =  this.state.contract.methods.getaskno().call();
      this.setState({tasknumber: result})
      
      console.log(result);
    // } 
       
    for (var i =1; i<=this.state.tasknumber;i++){

      let task =  this.state.contract.methods.gettask(i).call();
      
      console.log(task);
      this.setState({tasks:[...this.state.tasks, task]});
}}
handlesubmit(event){
  event.preventDefault();
      try{
         this.addtask(this.task.value);
         this.runExample()    }
      catch(error){
        console.log(error);
      }
} 


addtask(content){
  const response = this.state.contract.methods.addtask(content).send({from:this.state.accounts[0]});
  
  console.log(response);
}
toggleCompleted(taskId){
  console.log(taskId);
  this.state.contract.methods.markcompletedtask(taskId).send({from:this.state.accounts[0]})
  
}

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>To do list</h1>
        <h2>Smart Contract Example</h2>
        <p>
          Your contract is compiled and migrated successfully
        </p>
        <div id ="content" >
          <h5> Add your work here</h5>
          <form  onSubmit= {this.handlesubmit}>
          <input id ="newTask"
            ref={(input)=>
                this.task =input
            }
            type ="text"  className ="form-control" placeholder ="Add task" required/>
            <input type ="submit" />
            {/* // value ="Submit" onChange ={addtask} */}
            </form>
        
        
        
        {/* <div>{this.state.tasks[0]}</div> */}
        
        
        

              <ul id ="taskList" className ="list-unstyled" >{this.state.tasks.map((task,key)=>{
                  return(

                    <div className="taskTemplate" className="checkbox"
                     key={key}>
                    <label>
                      <input
                      type="checkbox"
                      name={task.id}
                      defaultChecked={task.completed}
                      ref={(input) => {
                        this.checkbox = input
                      }}
                      onClick={(event) => {
                        this.toggleCompleted(this.checkbox.name) }}/>
                      <span className="title" >{task.title} </span>
                    </label>

                  </div>
                )
              })}
              </ul>
              </div>
          

      </div>

    );
  }
}

export default App;
