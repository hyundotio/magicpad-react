import React from "react";
import { createPortal } from "react-dom";

interface Props {
  closePopup: Function;
  title: string;
  visible: boolean;
}

class Popup extends React.Component<Props> {
  public render() {
    const popupRootEl = document.getElementById('popup-root');
    if(popupRootEl && this.props.closePopup && this.props.visible) {
      return createPortal(
        <div className="popup-container">
          <div className="popup">
           <header className="popup-header">
            <h2>{this.props.title}</h2>
            <button onClick={() => this.props.closePopup()}>X</button>
           </header>
           <div className="popup-content">
            {this.props.children}
           </div>
          </div>
        </div>,
        popupRootEl
      )
    }
    return null
  }
}

export default Popup;
