import React from "react"
import ReactDOM from "react-dom"
import MessagesContainer from "./MessagesContainer"
import EventsContainer from "./EventsContainer"
import Members from "./Members"
import { Link, browserHistory, hashHistory } from "react-router";
import dbHandler from "../dbHandler";

class GroupView extends React.Component {

  constructor(props) {
    super(props);
    console.log("HERE", this.props);
    this.groupSelected = this.props.location.state.groupId;
    this.getData = this.getData.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.handleOnChangeMsg = this.handleOnChangeMsg.bind(this);
    this.addEventUpdate = this.addEventUpdate.bind(this);
    this.deleteGroup = this.deleteGroup.bind(this);
    this.editGroup = this.editGroup.bind(this);
    this.handleOnChangeGroupName = this.handleOnChangeGroupName.bind(this);
    this.handleEditGroup = this.handleEditGroup.bind(this);
    this.scrollMsg = this.scrollMsg.bind(this);
    this.jumpRight = this.jumpRight.bind(this);

    this.state = { 
      groupData: [],
      events: [],
      messages: [],
      userId: this.props.location.state.userId,
      userName: this.props.location.state.userName,
      msg: null,
      name: null,
      editGroup: false,
      editedGroupId: null,
      changedName: ""
    }
  }

  componentWillMount(){
    this.getData();
  }

  componentDidMount(){
  }

  getData(){
    var urlSpec = "groups/" + this.groupSelected;
    var word = "GET";
    var callback = function(data){
      this.setState({groupData: data, messages: data.messages, events: data.events}, this.scrollMsg());
    }.bind(this);
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  addMessage(event){
    event.preventDefault();
    var urlSpec = "groups/:id/messages";
    var word = "POST";
    var callback = function(data){
      this.getData() ;
    }.bind(this);
    const data = {
      message: {
        msg: this.state.msg,
        group_id: this.groupSelected,
        userName: this.state.userName,
        user_id: this.state.userId
      }
    }

    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("message added", data);
    ReactDOM.findDOMNode(this.refs.form).value = "";
  }

  scrollMsg(){
    var msgScroll = document.querySelector(".message-list");
    msgScroll.scrollTop = msgScroll.scrollHeight;
  }

  addEventUpdate(event){
    this.getData();
  }

  handleOnChangeMsg(event){
    this.setState({msg: event.target.value});
  }

  deleteGroup(){
    event.preventDefault();
    var urlSpec = "groups/" + this.groupSelected;
    var word = "DELETE";
    var callback = function(data){
      this.props.router.push("/groups");
    }.bind(this);
    var DBQuery = new dbHandler();
    var dataToSend = null;
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
  }

  editGroup(event){
    event.preventDefault();
    var urlSpec = "groups/" + this.groupSelected;
    var word = "PUT";
    var callback = function(data){
      this.setState({editGroup:false},this.getData());
    }.bind(this);
    const data = {
      group: {
        name: this.state.changedName
      }
    }
    var dataToSend = JSON.stringify(data);
    var DBQuery = new dbHandler();
    DBQuery.callDB(urlSpec, word, callback, dataToSend);
    console.log("group updated", data);
  }

  handleEditGroup(){
    this.setState({editGroup: true});
  }

  handleOnChangeGroupName(event){
    var updatedName = event.target.value
    this.setState({changedName: updatedName}) 
  }

  jumpRight(){
    var divScroll = document.querySelector(".group-main");
    divScroll.scrollLeft = divScroll.scrollWidth;
    console.log("jump right");
  }

  jumpLeft(){
    var divScroll = document.querySelector(".group-main");
    divScroll.scrollLeft = 0;
    console.log("jump left");
  }

  render(){
    var groupTitle = this.state.groupData.name
    var upperGroupTitle = `${this.state.groupData.name}`.toUpperCase()
    if (this.state.editGroup===true){
      var header = <div className = "edit-group">
      <input onChange = {this.handleOnChangeGroupName}placeholder = "group name"></input>
      <button onClick = {this.editGroup} >update</button>
      </div>
      } else if (this.state.editGroup === false) {
        header = <div> {upperGroupTitle}</div>
      }
    
    return(
      <div className="group-view">
        <h2>{header}</h2>
        <div className = "top-bar">
          <div>
            <Link to = "/groups">← my groups</Link>
          </div>
          <div className = "top-bar-right">
            <button onClick = {this.deleteGroup} className = "icon-button">✄</button>
            <button onClick = {this.handleEditGroup} className = "icon-button">✎</button>
          </div>
        </div>

        <div className = "members-div">
          <Members 
          router = {this.props.router} 
          groupId = {this.groupSelected}
          userId = {this.state.userId}
          userName = {this.state.userName}/>
        </div>
        <div className = "group-main">

          <div className = "message-board">
            <MessagesContainer 
            userId = {this.state.userId}
            messages = {this.state.messages}
            scrollMsg = {this.scrollMsg}
            />
            <form 
            onSubmit = {this.addMessage} 
            className = "new-message-form">
            <input 
            ref="form" 
            type = "text" 
            onChange = {this.handleOnChangeMsg} 
            placeholder = "✏︎ message" 
            className = "message-box"/> 
            <button onClick = {this.addMessage}>POST</button>
            </form>
          </div>

          <div className = "arrow" onClick = {this.jumpRight}> ▷ </div>
          <div className = "arrow" onClick = {this.jumpLeft}> ◀︎ </div>

          <div className = "events-board">
            <h3>EVENTS</h3>
            <EventsContainer 
            userName = {this.state.userName} 
            userId = {this.state.userId} 
            selectedEvent = {this.state.selectedEvent} 
            router = {this.props.router} 
            addEventUpdate = {this.addEventUpdate} 
            groupId = {this.groupSelected} 
            events = {this.state.events}/>
          </div>
        </div>
          ⦿⦿
      </div>
    )
  }
}

export default GroupView