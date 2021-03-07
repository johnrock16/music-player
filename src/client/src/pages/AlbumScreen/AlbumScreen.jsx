import { IonButton, IonCol, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { MusicContext } from '../../context/MusicContext';
import ListPageScreen from '../ListPageScreen/ListPageScreen';
import './AlbumScreen.css';

const initialState = {
  listMusics:[]
}

const AlbumScreen = (props) => {
  const [state,setState] = useState(initialState);
  const musicContext = useContext(MusicContext);
  const {listMusics} = state;

  const getMusic = async ()=>{
    const resolve = await fetch('http://localhost:3000/getPlaylist?id=0',{
      method:'GET',
      headers:{
        'accept':'application/json',
        'content-type':'application/json'
      }
    });
    if(resolve.status===200){
      return resolve.json();
    }
  }

  useEffect(()=>{
    getMusic().then((result)=>{
      musicContext.setListMusic(result.musics);
      setState((pv)=>({...pv,listMusics:result.musics}));
    })
  },[]);

  return (
   (listMusics) && (<ListPageScreen listMusics={listMusics} name={'Paramore'} onSelect={(item,index)=>{musicContext.setSelectedMusic({id:index,...item})}}/>)
  );
};

export default AlbumScreen;
