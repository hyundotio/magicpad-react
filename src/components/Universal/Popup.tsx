import React from "react";
import { createPortal } from "react-dom";

interface Props {
  closePopup: Function;
}

class Popup extends React.Component<Props> {
  public render() {
    const popupRootEl = document.getElementById('popup-root');

    if(popupRootEl) {
      return createPortal(
        <div className="popup-container" onClick={() => { this.props.closePopup(); }}>
          <div className="popup" onClick={(e) => { e.stopPropagation(); }}>
           <div className="popup-content">
            {this.props.children}
           </div>
          </div>
        </div>,
        popupRootEl
      )
    }
  }
}

export default Popup;
