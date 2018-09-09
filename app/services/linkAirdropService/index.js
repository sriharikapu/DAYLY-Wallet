import { BYTECODE, ABI } from './metadata';
import { generateAccount } from './utils';
import Promise from 'bluebird';
import { getToken } from './utils';


/**
 * @desc Send transaction to deploy the Airdrop Smart Contract.
 * @param  {Object}  [airdropParams] - Object wth airdrop params
 * @param  {Number}  [txValue] - Amount of wei to send to contract
 * @param  {Number}  [txGas] - Gas estimate for the deployment transaction
 * @param  {Object}  [web3] - web3 object (from web3.js lib)
 * @param  {Function}  [onTxMined] - Callback to fire after transaction is mined
 * @return {Promise}
 */
const _sendContractDeploymentTx = ({
    airdropParams,
    txGas,
    txValue,
    web3,
    from
}) => {
    const AirdropContract = web3.eth.contract(ABI);
    let { tokenAddress, claimAmountAtomic, claimAmountEthInWei, airdropTransitAddress } = airdropParams;
    
    return AirdropContract.new.getData(tokenAddress, claimAmountAtomic, claimAmountEthInWei, airdropTransitAddress, {
	from,
	data: BYTECODE,
	value: txValue,
	gas: txGas	
    });
}


/**
 * @desc Send transaction to deploy the Airdrop Smart Contract.
 * @param  {Number}  [claimAmount] - Amount of tokens to distribute on claim
 * @param  {String}  [tokenAddress] - Token contract address
 * @param  {Number}  [claimAmountEth] - Amount of wei to distribute on claim
 * @param  {Number}  [decimals] - Token decimals
 * @param  {Number}  [linksNumber] - amount of links
 * @param  {Object}  [web3] - web3 object (from web3.js lib)
 * @param  {Function}  [onTxMined] - Callback to fire after transaction is mined
 * @return {Object}
 */
export const deployContract = ({
    claimAmount,
    tokenAddress,
    decimals,
    claimAmountEth,
    linksNumber,
    web3,
    from,
    airdropTransitAddress
}) => {

    // Generate special key pair (Aidrop Transit Key Pair) for the airdrop.
    // (Ethereum address from the Airdrop Transit Private Key stored to the Airdrop Smart Contract as AIRDROP_TRANSIT_ADDRESS
    //
    // Airdrop Transit Private Key used for signing other transit private keys generated per link.
    //
    // The Airdrop Contract verifies that the private key from the link is signed by the Airdrop Transit Private Key,
    // which means that the claim link was signed by the Airdropper)

    // airdrop contract params
    const claimAmountAtomic = web3.toBigNumber(claimAmount).shift(decimals);
    const claimAmountEthInWei = web3.toBigNumber(claimAmountEth).shift(18);
    const airdropParams = {
	tokenAddress,
	claimAmountAtomic,
	claimAmountEthInWei,
	airdropTransitAddress
    };

    // tx params
    const gasEstimate = 1600967;
    const txGas = gasEstimate + 100000;
    const txValue = claimAmountEthInWei * linksNumber;

    // deploy contract
    const input = _sendContractDeploymentTx({airdropParams, txGas, txValue, web3, from});
    
    return input;
}


/**
 * @desc Approve Smart Contract to Withdraw Token on Sender's behalf.
 * @param  {String}  [tokenAddress] - Token contract address
 * @param  {String}  [contractAddress] - Airdrop contract address
 * @param  {Number}  [amount] - Amount of wei to approve
 * @param  {Object}  [web3] - web3 object (from web3.js lib)
 * @return {Promise} 
 */
export const approveContract = ({ tokenAddress, contractAddress, amount, from, web3 }) => {
    const token = getToken(tokenAddress, web3);
    return token.approve.getData(contractAddress, amount, { from: from });
}
