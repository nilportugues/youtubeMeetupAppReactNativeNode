import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center'
  },
  container: {
    width: '90%',
    flex: 1
  },
  item: {
    marginVertical: '2%'
  },
  buttonCreate: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '10%'
  },
  iconClose: {
    marginLeft: '3%'
  }
});

export default styles;
