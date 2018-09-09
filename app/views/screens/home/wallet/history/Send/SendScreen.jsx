import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Clipboard,
    Alert,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';
import QRCode from 'react-native-qrcode';

import TransparentNavBar from 'quid-wallet/app/views/components/TransparentNavBar';
import styles from './../Receive/styles';
import { shortAddress } from 'quid-wallet/app/utils';
import {
    getActiveWalletTotalBalance,
    getActiveWallet,
    getSelectedCurrency
} from 'quid-wallet/app/data/selectors';
import { formatToCurrency } from 'quid-wallet/app/utils';


class SendScreen extends React.Component {    
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',	
	navBarHidden: true,	
	screenBackgroundColor: '#fff'
    }

    state = {
	amount: 0
    }
    
    async _fetchData() {	
	const { fetchWalletTokens,
		wallet, navigator } = this.props;

	try { 	    
	    await fetchWalletTokens(wallet.address);
	} catch(err){
	    navigator.showInAppNotification({
		screen: "quidwallet.components.Notification", // unique ID registered with Navigation.registerScreen
		passProps: { amount: this.state.amount}, // simple serializable object that will pass as props to the lightbox (optional)
		autoDismissTimerSec: 3 // auto dismiss notification in seconds
	    });		
	};
    }

    
    _copy(value, alertText) {
	Clipboard.setString(value);
	Alert.alert(
	    '',
	    alertText,
	);
    }

    render() {
	return (
	    <View style={styles.container}>
	      <View style={styles.androidBottomMargin}>
		<TransparentNavBar navigator={this.props.navigator} title="Wallet" />
	      </View>
	      { this._renderContent() }
	    </View>
	)
    }

    _renderInfo() {
	return (
	    <View style={{backgroundColor: '#B1F1B8'}}>
	      <Text style={{fontSize: 18, padding: 15}}>
		To receive money from someone, copy and send the address below or scan this QR code.
	      </Text>
	    </View>	    
	);
    }


    onSubmit() {
	this.props.navigator.push({
	    screen: "quidwallet.home.wallet.send.WalletSendConfirmScreen",
	    title: "Settings",
	    navigatorStyle: {		      
		tabBarHidden: true
	    }
	})
    }
    
    _renderContent() {
	const component = this;
	const { wallet } = this.props;
	const address = wallet.address;
	return (
	    <View style={{
		      flex: 1,
		      backgroundColor: '#fff'
		  }}>
	      
		<TextInput
		   style={{	       
		       paddingTop: 10,
		       paddingBottom: 10,
		       paddingLeft: 15,
		       paddingRight: 15,
		       color: '#242836',
		       borderWidth: 1,
		       marginTop: 200,
		       marginBottom: 2,
		       marginLeft: 15,
		       marginRight: 15,
		       fontSize: 16,
		       borderColor: '#242836',
		       textAlign: 'center'
		   }}
	    placeholder="Amount of $ to send"
	    onChangeText={(amount) => this.setState({amount})}/>
	  	  <TouchableOpacity onPress={() => this.onSubmit()} style={{marginTop: 10, flexDirection: 'row', width: 250, marginLeft: 10}}>
		    <View>
		      <Text style={{ borderColor: "#242836", borderWidth: 1, backgroundColor: '#242836', color: 'white', padding: 5, fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Send</Text>
		    </View>
		  </TouchableOpacity>		  	    
	    </View>
	);
    }
}


const mapStateToProps = (state) => ({
    wallet: getActiveWallet(state),
    totalBalance: getActiveWalletTotalBalance(state),
    currency: getSelectedCurrency(state),    
});


export default connect(mapStateToProps)(SendScreen);
