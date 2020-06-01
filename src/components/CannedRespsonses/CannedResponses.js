import React from "react";
import { connect } from "react-redux";
import { Actions, withTheme } from "@twilio/flex-ui";
import Select from "react-select";

import { CannedResponsesStyles } from "./CannedResponses.Styles";

class CannedResponsesSelect extends React.Component {
  constructor(props) {
    super();
    this.state = {
      "response": "",
    };
    this.props = props;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.label]: event.value });
    Actions.invokeAction("SendMessage", {
      channelSid: this.props.channelSid,
      body: event.value,
    });
  }

  render() {
    const options = [
      { label: "Anything Else?", value: "Is there anything else I can help you with?" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
      { label: "Closing", value: "Thanks for contacting Cricket Wireless!  Have a great day!" },
    ];

    return (
      <CannedResponsesStyles>
        <Select options={options} onChange={this.handleChange} value={this.state.response} className="react-select-container" classNamePrefix="react-select" maxMenuHeight="500" menuPlacement="auto" />
      </CannedResponsesStyles>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let currentTask = false;
  state.flex.worker.tasks.forEach((task) => {
    if (ownProps.channelSid === task.attributes.channelSid) {
      currentTask = task;
    }
  });

  return {
    state,
    currentTask,
  };
};

export default connect(mapStateToProps)(withTheme(CannedResponsesSelect));
