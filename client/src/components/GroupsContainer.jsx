import React from "react";
import { Link, browserHistory } from "react-router";
import GroupsListing from "./GroupsListing";
import dbHandler from "../dbHandler";

class GroupsContainer extends React.Component {

  constructor(props) {
    super(props)
    this.getUser = this.getUser.bind(this);
    this.getGroups = this.getGroups.bind(this);
    this.addGroup = this.addGroup.bind(this);
    this.getLastGroup = this.getLastGroup.bind(this);
    this.addMembership = this.addMembership.bind(this);
    this.handleNewGroup = this.handleNewGroup.bind(this);
    this.setAddedGroup = this.setAddedGroup.bind(this);
    // this.getUpdates = this.getUpdates.bind(this);


    this.state = {
      groups: [],
      addedGroup: null,
      newGroup: false,
      userId: null,
      userTime: null,
      userName: null,
      recentGroup: null,
      groupUpdates: null
    }
  }

  componentDidMount(){
    this.getGroups();
    this.getUser();
  }

  getUser(){
    var urlSpec = "users/1";
    var word = "GET";
    var callback = function(data){
      this.setState({
        userId: data.id,
        userName: data.name,
        userTime: data.updated_at
      })
        console.log("setting userId:", this.state.userId);
        console.log("setting userName:", this.state.userName);
        console.log("setting userTime:", this.state.userTime);
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  getGroups(){
    var urlSpec = "memberships/1";
    var word = "GET";
    var callback = function(data){
      this.setState({groups: data})
        console.log("setting groups:", this.state.groups);
      // this.getUpdates();
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  // getUpdates(){
  //   var numberUpdates = 0;
  //   var groups = this.state.groups;
  //   console.log("UserTime", this.state.userTime);
  //   for(var group of groups){
  //     console.log("SAMPLE", group.group.updated_at);
  //     if (group.group.updated_at >= this.state.userTime){
  //       numberUpdates ++;
  //     }
  //   }

  //   console.log("updates", numberUpdates);
  //   this.setState({groupUpdates: numberUpdates});
  // }

  addGroup(event){
    event.preventDefault();
    var urlSpec = "groups";
    var word = "POST";
    var callback = function(data){
      this.setState({ newGroup:false}, this.getLastGroup());
    }.bind(this);
    const data = {
      group: {
        name: this.state.addedGroup
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("group added", data);
  }

  getLastGroup(){
    var urlSpec = "groups";
    var word = "GET";
    var callback = function(data){
      var lastGroupId = data[data.length-1].id
      this.setState({recentGroup: lastGroupId})
      this.addMembership()
      console.log("recentGroup:", this.state.recentGroup)
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  addMembership(event){
    var urlSpec = "memberships";
    var word = "POST";
    var callback = function(data){
      this.setState({ newGroup:false },this.getGroups())
    }.bind(this);
    const data = {
      membership: {
        user_id: this.state.userId,
        userName: this.state.userName,
        group_id: this.state.recentGroup
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("membership added", data);
  }

  handleNewGroup(){
    this.setState({newGroup:true});
  }

  setAddedGroup(addedGroup){
    this.setState({addedGroup: addedGroup});
  }

  render(){

    console.log("TIME",this.state.userTime);
    console.log("GROUPS",this.state.groups);
    return(
      <div className="listing">
        <GroupsListing 
        userId = {this.state.userId} 
        userName = {this.state.userName} 
        userTime = {this.state.userTime}
        newGroup = {this.state.newGroup} 
        setGroup = {this.setAddedGroup} 
        addGroup = {this.addGroup} 
        groups = {this.state.groups} 
        handleNewGroup = {this.handleNewGroup}/>
      </div>
    )
  }
}

export default GroupsContainer
