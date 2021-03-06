import React from 'react';
import { View } from 'react-native';
import SettingsRow from './SettingsRow';


class SettingsScreen extends React.Component {
    render() {
	const { navigator } = this.props;
	return (
	    <View style={{
		      flex: 1, 
		      backgroundColor: '#fff'
		  }}>
	      <View style={{flex: 4}}>
		<View style={{marginTop: 40}}>
		</View>
		<View style={{marginTop: 20}}>
		  <SettingsRow navigator={navigator} title="Unlink Wallet" screen="UnlinkWalletScreen" icon={require('quid-wallet/app/views/assets/icons/settings/icon_unlink_wallet_settings.png')}/>
		    </View>
	      </View>

	      
	    </View>
	);
    }
}


export default SettingsScreen;
