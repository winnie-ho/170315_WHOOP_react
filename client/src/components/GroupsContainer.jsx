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

    this.state = { 
      groups: [],
      addedGroup: null,
      newGroup: false,
      userId: null,
      userName: null,
      recentGroup: null
    }
  }

  componentWillMount(){
    this.getGroups();
    this.getUser();
  }

  getUser(){
    var urlSpec = "users/1";
    var word = "GET";
    var callback = function(data){
      this.setState({
        userId: data.id,
        userName: data.name
      })
        console.log("setting userId:", this.state.userId);
        console.log("setting userName:", this.state.userName);
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
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

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
    return(
      <div className="listing">
        <GroupsListing 
        userId = {this.state.userId} 
        userName = {this.state.userName} 
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
