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
import { Navigation } from 'react-native-navigation';


class ReceiveScreen extends React.Component {    
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',	
	navBarHidden: true,	
	screenBackgroundColor: '#fff'
    }

    state = {
	balanceHidden: true
    }

    componentDidMount() {
	const uri = 'http://localhost:3000/#/receive?v=28&r=0x25b7034e8abf2cf65b8917e3fdaaa5959ae0fc3ec75e02914848dab16626cb4b&s=0x62bd223b5d8873741b2ae882fff909039dba5193715d94c36d655bf56573ea14&pk=752b318b57a2f670595e16212f5918187a184498542a809425ef74f3aa5f084a&c=0xc1ffa607abf1e4028bec558591d21efaefa521fe&claimAmount=4&tokenSymbol=DAI&tokenAddress=0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359&claimAddress=0x0234234';
	Navigation.showModal({
	    screen: 'quidwallet.home.wallet.settings.WebviewScreen', // unique ID registered with Navigation.registerScreen
	    title: 'Claim Dollars', // title of the screen as appears in the nav bar (optional)
	    passProps: { source: { uri }},
	    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
	    animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
	});	    
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
