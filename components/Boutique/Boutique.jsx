

import { StyleSheet, View , Text } from 'react-native';
import {MyCard} from "../Card/Card";
const stylesBoutique = StyleSheet.create({
    shop: {
        display: "flex",
        height:"auto",
        

    }

})
function Boutique(props) {
  
    return (
        <View
            style={stylesBoutique.shop}>
            {
                props.articles.map((value, index) => {
                    console.log(value);
                    return (
                        <>
                        
                        <MyCard
                            article={value}
                            key={index}>

                        </MyCard>

                        </>
                    )
                })

            }


        </View>
    )
}


export { Boutique };