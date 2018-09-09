import React from 'react';
import { WebView } from 'react-native';
import { Navigation } from 'react-native-navigation';


class WebviewScreen extends React.Component {

    static navigatorButtons = {
	rightButtons: [
	    {
		title: 'done', // for a textual button, provide the button title (label)
		id: 'done', // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
		systemItem: 'done'
	    },
	]
    }

    onNavigatorEvent(event) {
	if (event.type === 'NavBarButtonPress') { 
	    if (event.id === 'done') {
		Navigation.dismissAllModals({
		    animationType: 'slide-down' 
		});;
	    }
	}	
    }

    constructor(props) {
	super(props);
    	this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    
    render() { 
	return (
            <WebView
               source={this.props.source}
	       style={{flex: 1}} />
	);
    }
}

export default WebviewScreen;
