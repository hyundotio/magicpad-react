import React from "react";

import { TabSwitcher, TabHeader, TabContent } from "../../components/Universal/Tabs";
import { KEYSPOPUPTYPES } from "../../@types/KeysPopupTypes";

import PopupContentsKeysBrowseSearch from "./Contents/Keys/BrowseSearch";
import PopupContentsKeysBrowseUpload from "./Contents/Keys/BrowseUpload";
import PopupContentsKeysConvert from "./Contents/Keys/Convert";
import PopupContentsKeysNewKeys from "./Contents/Keys/NewKeys"
import PopupContentsKeysPaste from "./Contents/Keys/Paste";

interface Props {
  popupPage: KEYSPOPUPTYPES;
}

const PopupContainerKeys : React.FunctionComponent<Props> = props => {
  switch (props.popupPage){
    case KEYSPOPUPTYPES.PASTE:
      return <PopupContentsKeysPaste />
    case KEYSPOPUPTYPES.NEWKEYS:
      return <PopupContentsKeysNewKeys />
    case KEYSPOPUPTYPES.CONVERT:
      return <PopupContentsKeysConvert />
    case KEYSPOPUPTYPES.BROWSE_SEARCH:
      return <PopupContentsKeysBrowseSearch />
    case KEYSPOPUPTYPES.BROWSE_UPLOAD:
      return <PopupContentsKeysBrowseUpload />
    default:
      return null
  }
}

export default PopupContainerKeys;
