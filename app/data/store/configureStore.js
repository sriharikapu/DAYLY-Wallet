import { changeAppRoot } from 'quid-wallet/app/actions/app';
import { checkPendingTxsInCache } from 'quid-wallet/app/actions/wallet/keystoreWallet';


function configureStore(store) {  
    return () => {
	const state = store.getState();		


	// if there are pending txs in cache wait for mined
	store.dispatch(checkPendingTxsInCache());

	
	// set root screen (add wallet screen or home screen with tabs)
	let root;
 	if (state.orm.Wallet.items.length > 0) {
	    root = 'HomeTab';
	} else {
	    root = 'AddWallet';	    
	}
	store.dispatch(changeAppRoot(root));
   };
}

export default configureStore;
