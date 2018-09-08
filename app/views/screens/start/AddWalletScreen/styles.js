import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    addressInput: {
	paddingTop: 10,
	paddingBottom: 10,
	paddingLeft: 15,
	paddingRight: 15,
	color: '#fff',
	borderWidth: 1,
	marginTop: 2,
	marginBottom: 2,
	marginLeft: 15,
	marginRight: 15,
	fontSize: 16,
	borderColor: '#7C7E86',
	textAlign: 'center'
    },
    screen: {
	flex: 1,
	backgroundColor: '#242836' //theme.colors.screen.quid
    },
    image: {

    },
    header: {
    },
    content: {
	justifyContent: 'center',
	padding: 10
    },
    save: {
	marginVertical: 20
    },
    buttons: {
	flexDirection: 'row',
	marginHorizontal: 24,
	justifyContent: 'space-around',
    },
    textRow: {
	flexDirection: 'row',
	justifyContent: 'center',
	textAlign: 'center',
	height: 20,
	color: '#BD3A52', 
	fontSize: 15
    },
    button: {
	textAlign: 'center',	
	backgroundColor: '#fff',
	color: '#232836',
	fontSize: 20,
	lineHeight: 44,
	width: 250,
	marginLeft: 55,
	fontWeight: 'bold'
    },
    input: {
	height: 100
    },
    footer: {}
});

export default styles;
