import React from "react";

import { TabSwitcher, TabHeader, TabContent } from "../../components/Universal/Tabs";
import { KEYSPOPUPTYPES } from "../../@types/KeysPopupTypes";

import PopupContentsKeysBrowseSearch from "../../components/PageContents/PopupContents/Keys/BrowseSearch";
import PopupContentsKeysBrowseUpload from "../../components/PageContents/PopupContents/Keys/BrowseUpload";
import PopupContentsKeysConvert from "../../components/PageContents/PopupContents/Keys/Convert";
import PopupContentsKeysNewKeys from "../../components/PageContents/PopupContents/Keys/NewKeys"
import PopupContentsKeysPaste from "../../components/PageContents/PopupContents/Keys/Paste";

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
