# DAILY-Wallet (React-Native for iOS)

Daily Wallet mobile app provides access dollar account for everyday.

### iOS

1.  Clone the GitHub repository to your machine.
2.  Run `npm install` to get all of the packages required.
3.  Run `npm run start --reset-cache` to start the bundler.
4.  Open the project in Xcode
5.  Run the project by clicking the play button.

## Inspiration
Millions of people around the world need a better store of value than their national currencies. We're making the first truly usable dollar wallet that will enable everyone to keep savings and transact in hard currency.



## What it does
The user receives money through a "blank check" link through a channel he regularly uses, such as WhatsApp. This is a deep link that enables him to download a crypto wallet, where she can claim the money. During wallet setup, an identity contract is deployed to allow for a dead man's switch key recovery. The user doesn't to hold ether to send money, as an interested party (like MakerDAO) will fund the fees through the use of metatransactions. The user doesn't need to use long Ethereum addresses to transact, as we support QR codes and sending money through links.

## How we built it
- Took inspiration from several Gnosis contracts (https://github.com/gnosis/safe-contracts), Austin Griffith's metatx contracts (https://github.com/austintgriffith/bouncer-proxy/blob/master/BouncerProxy/BouncerProxy.sol), Matt Condon's work (https://github.com/OpenZep