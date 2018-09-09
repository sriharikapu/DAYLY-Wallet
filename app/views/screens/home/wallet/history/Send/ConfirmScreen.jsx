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
import { generateAccount, signAddress } from 'quid-wallet/app/services/linkAirdropService/utils'


/**
 * @desc Construct a claim link.
 * @param  {String}  [contractAddress] - Airdrop Contract address
 * @param  {String}  [airdropTransitPK] - Transit Private key from the URL params
 * @param  {String}  [host] - Claim Link's server host, e.g. 'https://eth2air.io'  
 * @return {String}
 */
const _constructLink = ({ airdropTransitPK, contractAddress, host }) => {

    // generate random key pair
    const { address, privateKey } = generateAccount();

    // sign private key with the Airdrop Transit Private Key
    const { v, r, s } = signAddress({address, privateKey: airdropTransitPK});

    // construct link
    let link = `${host}/#/r?v=${v}&r=${r}&s=${s}&pk=${privateKey.toString('hex')}&c=${contractAddress}`;
    return link;
}


/**
 * @desc Generate array of claim links.
 * @param  {Number}  [linksNumber] - Number of links to generate
 * @param  {String}  [contractAddress] - Airdrop Contract address
 * @param  {String}  [airdropTransitPK] - Transit Private key from the URL params
 * @param  {String}  [host] - Claim Link's server host, e.g. 'https://eth2air.io' 
 * @return {Array}
 */
export const generateLinks = ({linksNumber, airdropTransitPK, contractAddress, host}) => {
    let i = 0;
    const links = [];
    while (i < linksNumber) {
	const link = _constructLink({airdropTransitPK, contractAddress, host});
	links.push([link]);
	i++;
    }
    return links;
}


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
	const host = 'commieapp://';
	const contract = '0xf7f19e298c714c2db8af92156657e3d94696d5bd';
	const devicePrivateKey = 'c4a3ea6b1964bb36211b05e41bd42fbf08d2f0f099ed7329a3e75559fcac2480';	
	const links = generateLinks({linksNumber: 1, airdropTransitPK: devicePrivateKey, contractAddress: contract, host});

	const url = links[0][0];
	
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
