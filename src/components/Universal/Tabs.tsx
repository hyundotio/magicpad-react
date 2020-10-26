import React, { createContext, useContext, useState } from "react";

const TabContext = createContext({} as { activeTab: string; setActiveTab: Function });

export const TabContent = ({ name, children }: { name: string; children: React.ReactNode; }) => {
  const { activeTab } = useContext(TabContext);
  return name === activeTab ? <div className={`tab-contents`}>{children}</div> : null;
}

export const TabHeader = ({ name }: { name: string; }) => {
  const { activeTab, setActiveTab } = useContext(TabContext);

  const handleTabClick = () => {
    setActiveTab(name);
  }

  return (
    <li>
      <button onClick={handleTabClick}
              className={`${activeTab === name ? "tab active" : "tab"}`}
      >{name}</button>
   </li>
  )
}

export const TabSwitcher = ({ initialActive, tabs, children, classNames } :
                            { initialActive: string;
                              tabs: React.ReactNode;
                              children: React.ReactNode;
                              classNames: string;
                            }) => {
                              const [activeTab, setActiveTab] = useState(initialActive);
                              return (
                                <TabContext.Provider value={{ activeTab, setActiveTab }}>
                                  <div className={classNames + ' tab-panel'}>
                                    <ul className={'tabs'}>
                                     {tabs}
                                    </ul>
                                    {children}
                                  </div>
                                </TabContext.Provider>
                              )
                            }
