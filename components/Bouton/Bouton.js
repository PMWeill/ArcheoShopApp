import React, { useContext } from 'react';
import {BoutiqueContext} from '../../BoutiqueContext';
import './Bouton.css';




const Bouton = (props)=> {
    const boutiqueContext = useContext(BoutiqueContext)
    function handleClick() {
        
        boutiqueContext.decrementQte(props.id)

        //pour appeler la qte associer à mon bouton je vais devoir passer par:
        // console.log(boutiqueContext[0][props.id].qte);
       
    }
    let isActive = boutiqueContext.articles[props.id].qte === 0? true : false
    return (
      <button onClick={()=>{handleClick()}} className='bouton'
      disabled = {isActive}
      >Acheter</button>
      
    )
  }
  export default Bouton