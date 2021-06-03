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
    }
     function getaskno() public   view returns(uint256 )   {
        return taskcount;}

    function gettask(uint id) public view returns(string memory , uint256, bool){
        return (tasks[id].title, tasks[id].id,tasks[id].completed);
        
    }
    function markcompletedtask(uint id) public  {
        tasks[id].completed = true;
        
    }
}