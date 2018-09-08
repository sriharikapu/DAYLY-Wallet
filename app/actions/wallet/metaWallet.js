import { addWallet, fetchWalletTokens } from './common';
import { generateKeyPair, sendTx } from 'quid-wallet/app/services/keystoreService';


export function createMetaAccount(email) {
    return async (dispatch, getState) => {

	if (!email || email.length < 3) {
	    throw new Error("Please provide your email");
	}
	
	const { address, privateKey } = await generateKeyPair();
		
	const payload = {
	    address,
	    privateKey,
	    name: email,
	    walletType: "meta",
	};
	
	dispatch(addWallet(payload));
    };
}
