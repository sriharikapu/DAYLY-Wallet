import React from 'react';
import { Platform, Linking } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './data/store';
import registerScreens from './views/screens';



registerScreens(store, Provider);


export default class App extends React.Component {
    constructor(props) {
	super(props);
	store.subscribe(this.onStoreUpdate.bind(this));	
	// Linking.getInitialURL().then(url => {		
	//     console.log({url});
	//     if (url) {
	
	//     }
	// });
	
    // 	Linking.addEventListener('url', this.handleOpenURL);
    // 	//this.startApp('WebView');
    // }
    
    // handleOpenURL = (event) => {
    // 	if (event && event.url) {
    // 	    //
    // 	    // redirect here
	    //store.dispatch(redirectToUrl(event.url));
	    //this.startApp('WebView', event);
	}
///}

    
    onStoreUpdate() {
	const state = store.getState();
    	const root = state.appRoot;
    	// handle a root change
    	if (this.currentRoot !== root) {
    	    this.currentRoot = root;
    	    this.startApp(root);
    	}
    }
    
    startApp(root, params=null) {
	switch (root) {
	case 'AddWallet':
	    Navigation.startSingleScreenApp({
		screen: {
		    screen: 'quidwallet.start.AddWallet', // unique ID registered with Navigation.registerScreen
		    navigatorStyle: {
			orientation: 'portrait',
			screenBackgroundColor: '#242836',
			navBarHidden: true,
		    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
		    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
		},
	    });
	    return;
	// case 'WebView':
	//     Navigation.startSingleScreenApp({
	// 	screen: {
	// 	    screen: 'quidwallet.home.wallet.settings.WebviewScreen', // unique ID registered with Navigation.registerScreen
	// 	    navigatorStyle: {
	// 		orientation: 'portrait',
	// 		screenBackgroundColor: '#242836',
	// 		navBarHidden: true,
	// 	    }, // override the navigator style for the screen, see "Styling the navigator" below (optional)
	// 	    navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
	// 	},
	//     });
	//     return;	    
	case 'HomeTab':

	    Navigation.startTabBasedApp({
		tabs: [
		    {
		    	screen: 'quidwallet.home.wallet.WalletScreen', // unique ID registered with Navigation.registerScreen
		    	label: 'Receive', 
		    	icon: require('quid-wallet/app/views/assets/icons/tabbar/icon_wallet.png'),
		    },
		    {
		    	screen: 'quidwallet.home.portfolio.PortfolioScreen', // unique ID registered with Navigation.registerScreen
		    	label: 'Send', 
		    	icon: require('quid-wallet/app/views/assets/icons/tabbar/icon_portfolio.png'),
		    },
		    
		],
		tabsStyle: { // optional, add this if you want to style the tab bar beyond the defaults
		    tabBarButtonColor: '#999999', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
		    tabBarSelectedButtonColor: '#02BF19', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
		    tabBarBackgroundColor: '#f8f8f8', // optional, change the background color of the tab bar
		    tabBarTranslucent: false,
		    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
		},
		appStyle: {
		    orientation: 'portrait',
		    tabBarButtonColor: '#999999', // optional, change the color of the tab icons and text (also unselected). On Android, add this to appStyle
		    tabBarSelectedButtonColor: '#fff', // optional, change the color of the selected tab icon and text (only selected). On Android, add this to appStyle
		    tabBarBackgroundColor: '#242836', // optional, change the background color of the tab bar
		    initialTabIndex: 0, // optional, the default selected bottom tab. Default: 0. On Android, add this to appStyle
		},
		animationType: 'fade'
	    });



	    
	default:
	    // pass



	}
    }
}

