import { Navigation } from 'react-native-navigation';
import AddMetaWalletScreen from './start/AddWalletScreen/AddMetaWalletScreen';

import UnlinkWalletScreen from './home/wallet/settings/unlink/UnlinkWalletScreen';

import WalletReceiveScreen from './home/wallet/history/Receive/ReceiveScreen';
import WalletSendScreen from './home/wallet/history/Send/SendScreen';
import WalletSendConfirmScreen from './home/wallet/history/Send/ConfirmScreen';

import WalletSettingsScreen from './home/wallet/settings/SettingsScreen';

import WebviewScreen from './home/wallet/settings/WebviewScreen';
import NotificationComponent from 'quid-wallet/app/views/components/Notification';
import CurrencySwitcherIcon from 'quid-wallet/app/views/components/currency-switcher/CurrencySwitcherIcon';



export default (store, Provider) => {
    // SCREENS
    Navigation.registerComponent('quidwallet.start.AddWallet', () => AddMetaWalletScreen, store, Provider);

    Navigation.registerComponent('quidwallet.home.wallet.WalletScreen', () => WalletReceiveScreen, store, Provider);

    Navigation.registerComponent('quidwallet.home.wallet.WalletSettingsScreen', () => WalletSettingsScreen, store, Provider);            
    Navigation.registerComponent('quidwallet.home.wallet.settings.UnlinkWalletScreen', () => UnlinkWalletScreen, store, Provider);            
    
    Navigation.registerComponent('quidwallet.home.wallet.receive.WalletReceiveScreen', () => WalletReceiveScreen, store, Provider);
    Navigation.registerComponent('quidwallet.home.wallet.send.WalletSendScreen', () => WalletSendScreen, store, Provider);
    Navigation.registerComponent('quidwallet.home.wallet.send.WalletSendConfirmScreen', () => WalletSendConfirmScreen, store, Provider);                            
   

    Navigation.registerComponent('quidwallet.home.wallet.settings.WebviewScreen', () => WebviewScreen, store, Provider);

    
    // COMPONENTS
    Navigation.registerComponent('quidwallet.components.Notification', () => NotificationComponent);
    Navigation.registerComponent('quidwallet.components.CurrencySwitcherIcon', () => CurrencySwitcherIcon, store, Provider);    
};
