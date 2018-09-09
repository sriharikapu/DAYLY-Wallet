import React from 'react';
import { connect } from 'react-redux';
import {
    Text,
    View,
    Clipboard,
    Alert,
    TouchableOpacity,
    TextInput,
    Button,
    Share
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


class ConfirmScreen extends React.Component {    
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',	
	navBarHidden: true,	
	screenBackgroundColor: '#fff'
    }
   
    render() {
	return (
	    <View style={styles.container}>
	      <View style={styles.androidBottomMargin}>
		<TransparentNavBar navigator={this.props.navigator} title="Wallet" />
	      </View>
	      { this._renderContent() }
	    </View>
	);
    }

    _renderInfo() {
	return (
	    <View style={{backgroundColor: '#B1F1B8'}}>
	      <Text style={{fontSize: 18, padding: 15}}>
		You're sending {this.props.amount} dollars. 
	      </Text>
	    </View>	    
	);
    }


    onSubmit() {


	const host = 'commieapp://http://localhost:3000';
	const contract = '0xf7f19e298c714c2db8af92156657e3d94696d5bd';

	// 
	const r = '0x225680976828ee777473af939008137bec18c4db6f442a0e09b157149815975d';
	const s = '0x7ecc565d63599aad0efd6777db98dadaa9db9080ca54ad7679887d753a9e4b1e';
	const pk = '90e4b5bd53b4fbe048a2efc45ce1437ec4833d51403af2750cb940dd5b7a9779';
	const v = 28;
	
	const url =  `${host}}/#/r?v=${v}&r=${r}&s=${s}&pk=${pk}&c=${contract}`;
	Share.share({url});	
    }
    
    _renderContent() {
	const component = this
	const { wallet } = this.props;
	const address = wallet.address;

	
	return (
	    <View style={{
		flex: 1,
		backgroundColor: '#fff'
		  }}>

	      { this._renderInfo() } 
	      
	      <TouchableOpacity onPress={() => this.onSubmit()} style={{marginTop: 10, flexDirection: 'row', width: 250, marginLeft: 10, marginTop: 200}}>
		<View>
		  <Text style={{ borderColor: "#242836", borderWidth: 1, backgroundColor: '#242836', color: 'white', padding: 5, fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>Share Link</Text>
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


export default connect(mapStateToProps)(ConfirmScreen);
