import React from "react";
class Message extends React.Component {

  // Constructor
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <title>Spring Boot WebSocket Chat Application</title>
        <link rel="stylesheet" href="/css/main.css" />
        <div id="chat-page">
          <div className="chat-container">
            <div className="connecting">
              Connecting...
            </div>
            <ul id="messageArea">
            </ul>
            <form id="messageForm" name="messageForm">
              <div className="form-group">
                <div className="input-group clearfix">
                  <input type="text" id="message" placeholder="Type a message..." autoComplete="off" className="form-control" />
                  <button type="submit" className="primary">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Message;