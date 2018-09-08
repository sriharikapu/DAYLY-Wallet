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
import { getActiveWallet } from 'quid-wallet/app/data/selectors';
import TransparentNavBar from 'quid-wallet/app/views/components/TransparentNavBar';
import styles from './styles';
import { shortAddress } from 'quid-wallet/app/utils';


class ReceiveScreen extends React.Component {
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',	
	navBarHidden: true,	
	screenBackgroundColor: '#fff'
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
		<TransparentNavBar navigator={this.props.navigator} title="Portfolio" />
	      </View>
	      { this._renderContent() }
	    </View>
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
		<View style={{
		    flexDirection: 'row',
		    justifyContent: 'center',
		    marginTop: 100
		}}>
		  <QRCode
		     value={ `ethereum:${address}`}
		     bgColor='#02BF19'
		     size={240} />
		</View>
		<TouchableOpacity onPress={() => component._copy(address, "Address Copied")} style={{marginTop: 10, flexDirection: 'row', width: 250, marginLeft: 90}}>
		  <Text style={{color: '#02BF19', fontSize: 20, fontWeight: 'bold', marginTop: 5}}>{ shortAddress(address, 5) }</Text>
		  <View>
		    <Text style={{ color: '#02BF19', borderColor: "#02BF19", borderWidth: 1, padding: 5, fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Copy</Text>
		  </View>
	    </TouchableOpacity>
		  
	    
	    </View>
	);
    }
}


const mapStateToProps = (state) => ({
    wallet: getActiveWallet(state)
});


export default connect(mapStateToProps)(ReceiveScreen);
