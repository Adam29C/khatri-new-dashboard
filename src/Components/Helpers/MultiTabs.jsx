import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MultiTabs = ({ tabs }) => {
  return (
    <div className="mt-3 mb-2">
      <Tabs>
        <TabList >
          {tabs.map((tab, index) => (
            <Tab  key={index}>{tab.title}</Tab>
          ))}
        </TabList>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab.content}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default MultiTabs;
