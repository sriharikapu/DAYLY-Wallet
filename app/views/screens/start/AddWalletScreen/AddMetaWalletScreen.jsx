import React from 'react';
import { connect } from 'react-redux';
import { View, TextInput, Image, Text, ActivityIndicator } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { createMetaAccount } from 'quid-wallet/app/actions/wallet';
import styles from './styles';


class AddWalletScreen extends React.Component {
    static navigatorStyle = {
	statusBarTextColorSchemeSingleScreen: 'light',
	statusBarColor: '#242836'
    }
    
    state = {
	email: "",
	error: "",
	isDeployingAccount: false
    };
    
    async submit() {
	// strip spaces from input string	
	const email = this.state.email.replace(/\s/g, '');	
	try {
	    this.setState({ isDeployingAccount: true });

	    // stub for waiting till tx is deployed
	    setTimeout(async () => {
		this.setState({ isDeployingAccount: true });
		await this.props.createMetaAccount(email);
	    }, 3000);
	    
	} catch (error) {
	    this.setState({ error: error.message });		
	}
    }
   
    
    _onEmailChange(email) {
	this.setState({email, inputTheme: "bordered", error: ""});
    }
    
    _renderForm() {	
	return (
	    <View>
	      <View style={styles.header}>
		<Image style={styles.image} source={require('quid-wallet/app/views/assets/images/dai_start.png')}/>
	      </View>
		<View style={styles.content}>
		  
		    <TextInput
			style={[
			    styles.addressInput,
			    {
				marginTop: 50,
				borderColor: (this.state.error && this.state.error.length > 0 ? '#BD3A52' : '#7C7E86')}
			]}
			onChangeText={(email) => this._onEmailChange(email)}
			autoCapitalize='none'
			autoFocus={false}
			multiline={true}
			blurOnSubmit={true}
			autoGrow={true}		      
			placeholderTextColor="#bcbcbc"
			underlineColorAndroid="#242836"
			placeholder='Your email address'/>
		    <Text style={styles.textRow}>{this.state.error}</Text>
		    <Text style={styles.button} onPress={() => this.submit() }>Get some dollars</Text>
		    
		</View>	      
	    </View>
	);
    }
    
    render() {
	return (
	    <View style={styles.screen}> 	    
	      { this.state.isDeployingAccount ?
	      this._renderDeployingAccount() :
	      this._renderForm() }
	    </View>	      
    );
    }

    _renderDeployingAccount() {
	return (
	    <View style={{marginTop: 250}}>
	      <ActivityIndicator size="large" color="#fff" />
	      <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 80, marginTop: 30}}>Setting up your account...</Text>
	    </View>
	);
    }
}


export default connect(null, {createMetaAccount})(AddWalletScreen);
