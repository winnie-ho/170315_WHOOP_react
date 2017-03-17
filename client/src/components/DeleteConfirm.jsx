import React from "react";

class DeleteConfirm extends React.Component{

  constructor(props){
    super(props)
    this.setDeleteFunction = this.setDeleteFunction.bind(this);
    this.setResetFunction = this.setResetFunction.bind(this);

    this.state = {
      deleteFunction: null,
      resetFunction: null,
    }
  }

  componentDidMount(){
    this.setDeleteFunction();
    this.setResetFunction();
  }

  setDeleteFunction(){
    this.setState({deleteFunction: this.props.deleteFunction});
  }

  setResetFunction(){
    this.setState({resetFunction: this.props.resetFunction});
  }

  render() {
    return(
      <div className = "delete-confirm">
        Are you sure?
        <div className = "delete-confirm-inner">
          <button onClick = {this.state.deleteFunction} className = "icon-button">✔︎</button>
          <button onClick = {this.state.resetFunction}className = "icon-button">✘</button>
        </div>
      </div>
    )
  }
}

export default DeleteConfirm