import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { fabars } from '@fortawesome/free-solid-svg-icons/fabars'
const stylesCSS = StyleSheet.create({
  bgMenu: {
    zIndex:1,
    position:"relative",
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:"gray"
  },
  SousMenu: {
    zIndex:2,
    top:0,
    position:"absolute",
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 250
  },
 
});

const NavMenu = () => {
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider >
      <View
        style={stylesCSS.bgMenu}>
        <Menu
          style={stylesCSS.SousMenu}
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} >Show menu</Button>}>
          <Menu.Item onPress={() => { }} title="Boutique" />
          <Menu.Item onPress={() => { }} title="Panier" />
          <Divider />
          <Menu.Item onPress={() => { }} title="Contact" />
        </Menu>
      </View>
    </PaperProvider>
  );
};

export {NavMenu};