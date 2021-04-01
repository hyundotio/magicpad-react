import React, {useState} from "react";

import {TabSwitcher, TabHeader, TabContent} from "../Universal/Tabs";

import GuideUsage from "./Guide/Usage";
import GuideKeyManagement from "./Guide/KeyManagement";
import GuideKeyServer from "./Guide/KeyServer";
import GuideWrite from "./Guide/Write";
import GuideRead from "./Guide/Read"
import GuideAttachments from "./Guide/Attachments";
import GuideTips from "./Guide/Tips";

const GuidePageContent : React.FunctionComponent = () => {
  return (
    <div className="page-content guide-page">
      <TabSwitcher
        classNames={`guide-tabs`}
        initialActive={'Using MagicPad offline'}
        tabs={
          <>
            <TabHeader name="Using MagicPad offline" />
            <TabHeader name="Generate and share keys" />
            <TabHeader name="Search public keys" />
            <TabHeader name="Write a message" />
            <TabHeader name="Read a message" />
            <TabHeader name="Processing attachments" />
            <TabHeader name="Tips" />
          </>
        }
      >
        <TabContent name="Using MagicPad offline">
          <GuideUsage />
        </TabContent>
        <TabContent name="Generate and share keys">
          <GuideKeyManagement />
        </TabContent>
        <TabContent name="Search public keys">
          <GuideKeyServer />
        </TabContent>
        <TabContent name="Write a message">
          <GuideWrite />
        </TabContent>
        <TabContent name="Read a message">
          <GuideRead />
        </TabContent>
        <TabContent name="Processing attachments">
          <GuideAttachments />
        </TabContent>
        <TabContent name="Tips">
          <GuideTips />
        </TabContent>
      </TabSwitcher>
    </div>
  )
}

export default GuidePageContent
