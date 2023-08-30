import React, { useContext } from 'react';
// import Bouton from '../Bouton/Bouton';
import BoutiqueContext from '../../BoutiqueContext';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

function MyCard(props) {
  return (
    <>
      <Card style={stylesCard.bgcard}>
        <Card.Cover 
        source={props.article.url}
        style={stylesCard.imgcard}
        />

        <Card.Content>
          <Text variant="titleLarge">{props.article.name}</Text>
          <Text variant="bodyMedium">{props.article.description}</Text>
          <Text variant="bodyMedium">{props.article.price}€ /u</Text>
          <Text variant="bodyMedium">{props.article.qte}/u restante</Text>
          <Text variant="bodyMedium">{props.article.promo}</Text>
        </Card.Content>

        <Card.Actions>
          <Button>Add to cart</Button>
        </Card.Actions>
      </Card>
    </>
  )
};
const stylesCard = StyleSheet.create({
  bgcard: {
    paddingTop: 30,
    height: 450,

  },
  imgcard: {
    resizeMode:'contain',

  },

});
export default MyCard;








// const Card = (props) => {
//   const boutiqueContext =useContext(BoutiqueContext)
//   return (

//     <div className="card">
//       <div className="nom-article">{props.article.name}</div >
//       <div className='produit'>
//       <div className="img-article"><img src={props.article.url} alt='mon image'></img></div>
//       <div className='prdDetail'>
//       <div className="prix">
//         Prix : {props.article.price}€</div >
//       { props.article.promo ? <div className= "promo">Promo</div > : <></>
//       }
//       <div className="qte">
//        Quantité restante :  {props.article.qte} </div >
//         </div>
//         </div>
//       <div className="cp">{props.article.description}</div >

//       <Bouton id={props.article.id}></Bouton>
//     </div >

//   )
// }

// ancienne nomenclature  et identique a la const Card au-dessus
// function Card(props){
//   return (
//     <div className={styles.Card}>
//     Card Component
//   </div>
//   )
// }

// Card.propTypes = {};

// Card.defaultProps = {};

// export default Card;
