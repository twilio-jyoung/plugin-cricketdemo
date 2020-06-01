import React from "react";
import { VERSION } from "@twilio/flex-ui";
import { FlexPlugin } from "flex-plugin";

// import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from "./states";
import CricketTheme from "./themes/CricketTheme";
import CannedResponses from "./components/CannedRespsonses/CannedResponses";

const PLUGIN_NAME = "CricketdemoPlugin";

export default class CricketdemoPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  init(flex, manager) {
    this.registerReducers(manager);

    // check to see if only role is agent:
    if (manager.workerClient.attributes.roles.length == 1 && manager.workerClient.attributes.roles[0] == "agent") {
      // disable the ability to send free form messages, replace with canned responses component
      flex.MessageInput.Content.replace(<CannedResponses key="canned-responses" />, { sortOrder: -1 });
    } else {
      //flex.MessageInput.Content.replace(<CannedResponses key="canned-responses" />, { sortOrder: -1 });
      flex.MessageInput.Content.add(<CannedResponses key="canned-responses" />, { sortOrder: -1 });
    }

    // set color theme
    console.log("setting theme");
    const configuration = {
      colorTheme: CricketTheme,
    };
    manager.updateConfig(configuration);

    // remove panel 2 (right hand side of screen)
    flex.AgentDesktopView.defaultProps.showPanel2 = false;

    // set the logo image
    flex.MainHeader.defaultProps.logoUrl = "https://www.cricketwireless.com/uiassets/logo_cricket-green.png"; //60A630, 036B37

    // const options = { sortOrder: -1 };
    // flex.AgentDesktopView
    //   .Panel1
    //   .Content
    //   .add(<CustomTaskListContainer key="demo-component" />, options);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }
    manager.store.addReducer(namespace, reducers);
  }
}
