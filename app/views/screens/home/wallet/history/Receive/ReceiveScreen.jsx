import React from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Text,
    View,
    Clipboard,
    Alert,
    TouchableOpacity
} from 'react-native';
import QRCode from 'react-native-qrcode';

import TransparentNavBar from 'quid-wallet/app/views/components/TransparentNavBar';
import styles from './styles';
import { shortAddress } from 'quid-wallet/app/utils';
import {
    getActiveWalletTotalBalance,
    getActiveWallet,
    getSelectedCurrency
} from 'quid-wallet/app/data/selectors';
import { formatToCurrency } from 'quid-wallet/app/utils';


class ReceiveScreen extends React.Component {    
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',	
	navBarHidden: true,	
	screenBackgroundColor: '#fff'
    }

    state = {
	balanceHidden: true
    }
    
    async _fetchData() {	
	const { fetchWalletTokens,
		wallet, navigator } = this.props;

	try { 	    
	    await fetchWalletTokens(wallet.address);
	} catch(err){
	    navigator.showInAppNotification({
		screen: "quidwallet.components.Notification", // unique ID registered with Navigation.registerScreen
		passProps: {}, // simple serializable object that will pass as props to the lightbox (optional)
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

    _renderBalanceRow() {
	return (
	    <TouchableOpacity onPress={() => this.setState({balanceHidden: !this.state.balanceHidden})}
	      style={{
		      flexDirection: 'row',
		      justifyContent: 'center',
		      marginTop: 30
		  }}>

	      { this.state.balanceHidden ? 
		  this._renderBalanceButton() :
		  this._renderBalanceDigit()
	      }
	    </TouchableOpacity>
	)
    }

    _renderBalanceButton() {
	return (
	      <Text style={{ color: '#232836', borderColor: "#232836", borderWidth: 1, padding: 10, fontSize: 20, fontWeight: 'bold' }}>View balance</Text>
	);
    }

    _renderBalanceDigit() {
	const balance  = formatToCurrency(this.props.totalBalance, this.props.currency);	
	return (
	    <Text style={{ color: '#02BF19', padding: 10, fontSize: 20, fontWeight: 'bold' }}>{balance}</Text>
	)
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
	      { this._renderInfo() }
	      
		<View style={{
		    flexDirection: 'row',
		    justifyContent: 'center',
		    marginTop: 50
		      }}>

		  		  
		  <QRCode
		     value={ `ethereum:${address}`}
		     bgColor='#02BF19'
		     size={240} />
		</View>
		<TouchableOpacity onPress={() => component._copy(address, "Address Copied")} style={{marginTop: 10, flexDirection: 'row', width: 250, marginLeft: 80}}>
		  <Text style={{color: '#02BF19', fontSize: 20, fontWeight: 'bold', marginTop: 5}}>{ shortAddress(address, 5) }</Text>
		  <View>
		    <Text style={{ color: '#02BF19', borderColor: "#02BF19", borderWidth: 1, padding: 5, fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Copy</Text>
		  </View>
	    </TouchableOpacity>


		{ this._renderBalanceRow() }
	    
	    </View>
	);
    }
}


const mapStateToProps = (state) => ({
    wallet: getActiveWallet(state),
    totalBalance: getActiveWalletTotalBalance(state),
    currency: getSelectedCurrency(state),    
});


export default connect(mapStateToProps)(ReceiveScreen);
