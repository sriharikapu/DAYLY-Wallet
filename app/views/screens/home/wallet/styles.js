import { StyleSheet, Platform } from 'react-native';


const styles = StyleSheet.create({
    container: {	
	height: 193,
	backgroundColor: '#242836'
    },
    titlesContainer: {
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'space-between',
	height: 44
    },
    totalBalanceSectionContainer: {
	height: 80,
	paddingTop: 10,
	paddingRight: 12,
	paddingBottom: 13,
	flexDirection: 'column',
	justifyContent: 'space-between'
    },
    totalBalanceValue: {
	textAlign: 'right',
	lineHeight: 20
    },	
    tableTitle: {
	fontSize: 13,
	color: '#7C7E86',
	lineHeight: 13,
	paddingTop: 13,
	paddingBottom: 18,
	textAlign: 'right'
    },
    androidBottomMargin: {...Platform.select({
	android: {
	    marginBottom: 20
	}
    })}    
});

export default styles;
