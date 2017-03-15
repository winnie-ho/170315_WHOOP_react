import React from "react";
import {Link} from "react-router";

const Group = (props) => (
  <div className="group">
    <Link to = {
      {
        "pathname": "/groups/"+ props.groupId,
        "state": {
          "groupId": props.groupId,
          "userName": props.userName,
          "userId": props.userId
        }
      }
    }>{props.group.name}
    </Link>
  </div>
)

export default Group
