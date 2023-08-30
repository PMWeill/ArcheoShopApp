import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { fabars } from '@fortawesome/free-solid-svg-icons/fabars'
const stylesCSS = StyleSheet.create({
  bgMenu: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    height: 250,
    backgroundColor:"gray"
  }
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
          style={stylesCSS.bgMenu}
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

export default NavMenu;