import React, { useContext } from 'react';
import BoutiqueContext from '../../BoutiqueContext';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function MyCard(props) {
  const boutiqueContext = useContext(BoutiqueContext);
  
  let isActive = boutiqueContext.articles[props.article.id].qte === 0 ? true : false
  return (
    <>
      <Card style={stylesCard.bgcard}>
        <Card.Cover
          source={props.article.url}
          style={stylesCard.imgcard}
        />

        <Card.Content
        >
          <Text variant="titleLarge">{props.article.name}</Text>
          <Text variant="bodyMedium">{props.article.description}</Text>
          <Text variant="bodyMedium">{props.article.price}€ /u</Text>
          <Text variant="bodyMedium">{props.article.qte}quantité restante</Text>
          <Text variant="bodyMedium">{props.article.promo}</Text>
        </Card.Content>

        <Card.Actions>
          <Button onPress={() => {
            boutiqueContext.decrementQte(props.article.id);
          }} disabled={isActive}>Add to cart</Button>
        </Card.Actions>
      </Card>
    </>
  )
};
const stylesCard = StyleSheet.create({
  bgcard: {
    position: 'relative',
    paddingTop: 30,
    height: 450,
    zIndex: -1,
  },
  imgcard: {
    resizeMode: 'contain',

  },
  poscard: {
    zIndex: -1,

  },
});
export default MyCard;






