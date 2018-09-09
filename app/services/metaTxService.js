import Config from 'react-native-config';
import axios from 'axios';

/* 
 Apis for setting notifications settings
 */
const MetaTxApiService = function() {
    const host = 'http://10.0.4.247/';
    
    function createAccount({email, address}) {
	const url = `${host}/newuser/${email}/${address}`;	
	return axios.get(url).then((response) => response.data);
    }

    function sendTx({email, to, amount, address, signature}) {
	const url = `${host}/http://10.0.4.247/send/${email}/${to}/${amount}/${address}/${signature}`;
	return axios.get(url).then((response) => response.data);
    }
    
    // api
    return {
	createAccount,
	sendTx
    };
};


export default MetaTxApiService();
