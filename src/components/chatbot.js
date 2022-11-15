import React, { Component } from 'react'

export class Chatbot extends Component {
    componentDidMount() {
        (function(d, m){
            var kommunicateSettings = 
                {"appId":"3c5c0fd9401a22672df93b85b26acbe32","popupWidget":true,"automaticChatOpenOnNavigation":true};
            var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
            window.kommunicate = m; m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
        }
    
  render() {
    return (
      <div>Chatbot</div>
    );
  }
}

export default Chatbot