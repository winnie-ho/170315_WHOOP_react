import React from "react";

class MessagesContainer extends React.Component{

constructor(props){
  super(props)
}

componentDidMount(){
  this.props.scrollMsg();
  console.log ('i scrolled')
}

render() {
  var messageNodes = this.props.messages.map((message, index)=>{
    return(
      <div className = "message-div" key = {index}>
         <p key = {index}> <b>{message.userName} ▻ </b> {message.msg} </p>
      </div>
    )
  })

  return(
    <div className = "message-list">
      {messageNodes}
      <div className = "fake-message-div"></div>
    </div>
    )
  }
}

export default MessagesContainer