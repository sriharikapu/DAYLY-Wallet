import { addWallet } from './common';
import { generateKeyPair, signTx } from 'quid-wallet/app/services/keystoreService';
import relayerApi from 'quid-wallet/app/services/metaTxService';
import web3Service from 'quid-wallet/app/services/web3Service';
import { deployContract, approveContract } from 'quid-wallet/app/services/linkAirdropService';


async function deployAirdropContract({ devicePrivateKey, deviceAddress, email }) {
    const tokenAddress = '0x0566c17c5e65d760243b9c57717031c708f13d26'; // test DAI

    const web3 = web3Service.getWeb3();
    console.log("before getting data")
    
    const airdropContractData = deployContract({
	claimAmount: 10,
	tokenAddress,
	decimals: 18,
	claimAmountEth: '0x0',
	linksNumber: '0x0',
	web3,
	from: deviceAddress,
	airdropTransitAddress: deviceAddress
    });

    console.log({airdropContractData});

    const to = null;
    const input = airdropContractData;
    const etherAmount = '0x0';

    const txParams = {
	from: deviceAddress,
	gas: 1600967,
	gasPrice: (10 * 1e9),
	to,
	input,
	value: etherAmount
    };

    const signature = signTx({txParams, privateKey: devicePrivateKey});
    const txHash = await relayerApi.sendTx({email, to, amount: 0, address: deviceAddress, signature});

    console.log(txHash);
    const tx = await web3.eth.waitForMined(txHash);;

    console.log({tx})
}


async function approveContractToUseDai({ devicePrivateKey, deviceAddress, email }) {
    const tokenAddress = '0x0566c17c5e65d760243b9c57717031c708f13d26'; // test DAI

    const web3 = web3Service.getWeb3();
    console.log("before getting data")
    
    const approveData = approveContract({
	claimAmount: 10,
	tokenAddress,
	decimals: 18,
	claimAmountEth: '0x0',
	linksNumber: '0x0',
	web3
    });

    console.log({approveData});

    const to = tokenAddress;
    const input = approveData;
    const etherAmount = '0x0';

    const txParams = {
	from: deviceAddress,
	gas: 2000967,
	gasPrice: (10 * 1e9),
	to,
	input,
	value: etherAmount
    };

    const signature = signTx({txParams, privateKey: devicePrivateKey});
    const txHash = await relayerApi.sendTx({email, to, amount: 0, address: deviceAddress, signature});

    console.log({txHash});
}


export function createMetaAccount(email) {
    return async (dispatch, getState) => {

	if (!email || email.length < 3) {
	    throw new Error("Please provide your email");
	}
	
	// const { address: deviceAddress, privateKey: devicePrivateKey } = await generateKeyPair();
	const deviceAddress = '0xBCC45D65FeBB8E2A6f274C214c2394C08460bb28';
	const devicePrivateKey = 'c4a3ea6b1964bb36211b05e41bd42fbf08d2f0f099ed7329a3e75559fcac2480';	
	
	// create contract through relayer
	// const txHash = await relayerApi.createAccount({address: deviceAddress, email});

	// wait for tx to be mined
	// const web3 = web3Service.getWeb3();
	// const tx = await web3.eth.waitForMined(txHash);;
	
	// console.log({tx});
	
	// const identityContractAddress = tx.contractAddress; 
		
	// setup links distribution contract
	// const airdropContract = await deployAirdropContract({devicePrivateKey, deviceAddress, email});
	
	// await approveContractToUseDai({ devicePrivateKey, deviceAddress, email });
	
	
	// throw new Error("Not implemented")

	
	const payload = {
	    address: '0xf695e673d7d159cbfc119b53d8928ceca4efe99e', // contract address
	    privateKey: devicePrivateKey, // device address
	    deviceAddress, // 
	    name: email,
	    walletType: "meta",
	    email: email,
	    airdropContract: null
	};
	
	dispatch(addWallet(payload));
    };
}
