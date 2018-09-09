import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { human } from 'react-native-typography';
import CurrencySwitcherIcon from 'quid-wallet/app/views/components/currency-switcher/CurrencySwitcherIcon';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import { getActiveWallet } from 'quid-wallet/app/data/selectors';


const styles = StyleSheet.create({
    navbarContainer: {
	height: 69,
	backgroundColor: '#242836',

	...Platform.select({
	    ios: {
		...ifIphoneX({
		    marginTop: 30
		}, {
		})
	    },
	    android: {
		marginTop: 0,
	    },	    
	}),
    },
    navbar: {
	flex: 1,
	flexDirection: 'row',
        justifyContent: 'space-between',
	height: 90,
	paddingTop: 20	
    },
    title: {
	marginLeft: -4,
	paddingTop: 17,
	lineHeight: 20
    },
    walletIcon: {
	marginLeft: 14,
	marginTop: 15,	
	width: 28,
	height: 28,
	borderColor: "#fff",
	borderWidth: 2,
	borderRadius: 14
    },
});

const SettingsIcon = ({navigator}) => {
    return (
	<TouchableOpacity
	   onPress={() => navigator.push({
	       screen: "quidwallet.home.wallet.WalletSettingsScreen",
	       title: "Settings",
	       navigatorStyle: {		      
		   tabBarHidden: true
	       }
	  })}
	  style={{paddingRight: 14, paddingTop: 23, paddingLeft: 14}}>
	  <Image source={require("quid-wallet/app/views/assets/icons/settings.png")} />
	</TouchableOpacity>
    );
}


class TransparentNavBar extends React.PureComponent {    
    render() {
	const { title, navigator } = this.props;
	return (
	    <View style={styles.navbarContainer}>
	      <View style={styles.navbar}>
		<SettingsIcon navigator={navigator}/>
		<Text style={[human.bodyWhite, styles.title]}>{title}</Text>
		<View/>
	      </View>
	    </View>
	);
    }
}


export default connect(state => ({
    walletIcon: getActiveWallet(state).icon
}))(TransparentNavBar);
