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
		You're sending 5 dollars. 
	      </Text>
	    </View>	    
	);
    }


    onSubmit() {
	const url = 'commieapp://http://localhost:3000/#/r?v=28&r=0xe19c17b8a5d3c21232be574d40455cea90fe4fe614adbc8545eff07274400bde&s=0x3e9a46175ee362b17fee448d80bc7a52b26dbfd29ef97592680a5ab963c3a895&pk=028d4b3f796ef8a458a53f61ba572ec96efccd4bd4d55b4d878e854f7e863881&c=0x8812948b5a967cf33013f3fd83da9250d3968e78';
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
