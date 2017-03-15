import React from "react";
import {Link} from "react-router";

class EventListing extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    //sorting the events by date
    this.props.events.sort(function(a,b){
      return new Date(a.date).getTime() - new Date(b.date).getTime() 
    });

    return(
      <div className = "events-scroll">
        {
          this.props.events.filter((event) => `${event.name}`.toUpperCase().indexOf(this.props.searchQuery.toUpperCase()) >= 0)
                .map((event) => (
            <div className = "event-list" key = {event.id}>
 
              <div className = "event-box" onClick = {this.props.setEventView}>
              <h4>{event.name}</h4>
              <p>{event.date.slice(0,10)}</p>
              <p>{event.time.slice(11,16)}</p>
              </div>
                <Link className = "more" to = {
                  {
                    "pathname": "/groups/:id/showEvent",
                    "query":{
                      "userName": this.props.userName,
                      "userId": this.props.userId,
                      "event": JSON.stringify(event)
                    }
                  }
                }>more▷</Link>
            </div>
          ))
        }
      </div>
    )
  }

}

export default EventListing
