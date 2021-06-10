//SPDX-License-Identifier:MIT
pragma solidity ^0.8.4;
contract Todo{
    address owner;
    struct task{
        uint id;
        string title;
        // string details;
        bool completed;
        
    }
    uint taskcount;
    mapping(uint =>task) public tasks;
    constructor() {
        owner = msg.sender;
        taskcount =0;
        
    } 
    event taskadded(string title,uint id);
    event gettaskdetail(string title,uint id);
    event taskcompleted(uint id, bool completed);
    modifier onlyowner{
        require(msg.sender == owner,"Only owner can call this function");
        _;
    }
    function addtask(string memory _name) public {
        taskcount ++;
        tasks[taskcount].title =_name;
        tasks[taskcount].id = taskcount;
        // tasks[taskcount].details =_details;
        tasks[taskcount].completed = false;
        emit taskadded(_name,taskcount);
    }
     function getaskno() public   view returns(uint256 )   {
        return taskcount;}

    function gettask(uint Id) public  view returns(string memory title, uint256 id , bool completed){
        return (tasks[Id].title, tasks[Id].id,tasks[Id].completed);
        // emit gettaskdetail(tasks[id].title, id);
        
    }
    function markcompletedtask(uint id) public  {
        tasks[id].completed = true;
        emit taskcompleted(id, tasks[id].completed);
        
    }
}