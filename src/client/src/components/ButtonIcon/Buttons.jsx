import { IonIcon } from '@ionic/react';
import {heartOutline,heart} from 'ionicons/icons';
import { useState } from 'react';


export const ButtonIcon=(props)=>{
  const {icon,size,action} = props;
  return(
    <button style={{backgroundColor:"#00000000"}} onClick={()=>{console.log('aqui');action()}}>
      <IonIcon class="icons" slot="icon-only" style={{fontSize:size}} icon={icon}/>
    </button>
  )
}
  
export const ButtonFavorite=(props)=>{
  const [isFavorite,setFavorite] = useState(false)
  const {size} = props;
  return(
    <ButtonIcon action={()=>{setFavorite(!isFavorite)}} icon={isFavorite?heart:heartOutline} size={size}/>
  )
}