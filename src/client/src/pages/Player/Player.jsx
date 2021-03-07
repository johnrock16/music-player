import { IonContent, IonHeader, IonImg, IonPage, IonProgressBar, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/react';
import {playCircle, pauseCircle, playSkipBack, playSkipForward,shareSocialOutline, image} from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { ButtonFavorite, ButtonIcon } from '../../components/ButtonIcon/Buttons';
import { MusicContext } from '../../context/MusicContext';
import useAudio from '../../hooks/UseAudio';
import './Player.css';

const initialState={
  currentTime:0
}

const PlayerScreen = () => {
  const [state,setState] = useState(initialState)
  const musicContext = useContext(MusicContext);
  const [audio,playing, toggle] = useAudio(musicContext.selectedMusic.music);
  const {title,band,image,index} = musicContext.selectedMusic;
  const {currentTime} = state;

  useEffect(()=>{
    audio.addEventListener('timeupdate',()=>{
      setState((pv)=>({...pv,currentTime:audio.currentTime}))
    })
    return(()=>{
      audio.removeEventListener('timeupdate',()=>{})
    })
  },[audio])

  const changeMusic=(jump)=>{
    console.log(musicContext.listMusic)
    if(index+jump<musicContext.listMusic.length && index+jump>-1){
      musicContext.setSelectedMusic(musicContext.listMusic[index+jump])
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRow className="container-center">
          <IonImg className="music-image" src={image}/>
        </IonRow>
        <IonRow className="info-container">
          <IonRow className="container-center">
            <IonText className="music-title">{title}</IonText>
          </IonRow>
          <IonRow className="container-center">
            <IonText className="music-band">{band}</IonText>
          </IonRow>

          <IonRow className="container-progress">
          <IonProgressBar color="primary" value={currentTime/audio.duration}></IonProgressBar>
          </IonRow>
          <IonRow className="tools-container">
            <ButtonFavorite size={'24px'}/>
            <ButtonIcon icon={playSkipBack} size={'24px'} action={()=>{changeMusic(-1)}}/>
            <ButtonIcon icon={playing?pauseCircle:playCircle} size={'64px'} action={toggle}/>
            <ButtonIcon icon={playSkipForward} size={'24px'} action={()=>{changeMusic(1)}}/>
            <ButtonIcon icon={shareSocialOutline} size={'24px'}/>
          </IonRow>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default PlayerScreen;
