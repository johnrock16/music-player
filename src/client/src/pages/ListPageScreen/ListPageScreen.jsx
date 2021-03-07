import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { list } from 'ionicons/icons';
import './ListPageScreen.css';

const ListPageScreen = (props) => {

  const {listMusics,onSelect,name} = props;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {
            (listMusics.length>0 && listMusics.map((item,index)=>(
              <IonItem key={`${item.title}${item.band}${index}`} onClick={()=>{onSelect(item,index)}} routerLink="/player">
                <IonThumbnail style={{alignItems:'center'}} slot="start">
                    <img className="banner" src={item.image}/>      
                </IonThumbnail>
                <IonRow style={{flexDirection:'column'}}>
                  <IonLabel className="music-title">{item.title}</IonLabel>
                  <IonLabel className="music-band">{item.band}</IonLabel>
                </IonRow>
              </IonItem>
            )))
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ListPageScreen;
