import { addWallet, fetchWalletTokens } from './common';
import { generateKeyPair } from 'quid-wallet/app/services/keystoreService';

import relayerApi from 'quid-wallet/app/services/metaTxService';
import web3Service from 'quid-wallet/app/services/web3Service';


export function createMetaAccount(email) {
    return async (dispatch, getState) => {

	if (!email || email.length < 3) {
	    throw new Error("Please provide your email");
	}
	
	const { address: deviceAddress, privateKey } = await generateKeyPair();

	// create contract through relayer
	const txHash = relayerApi.createAccount({address: deviceAddress, email});

	// wait for tx to be mined
	const web3 = web3Service.getWeb3();
	const tx = await web3.eth.waitForMined(txHash);;


	
	throw new Error("Not implemented")
	
	const payload = {
	    //address, // contract address
	    privateKey, // device address
	    deviceAddress, // 
	    name: email,
	    walletType: "meta",
	    email: email
	};
	
	dispatch(addWallet(payload));
    };
}
