import { IonInput, IonBackButton, IonButtons, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonImg, IonContent, IonButton, IonHeader, IonPage, IonTitle, IonToolbar, IonApp, IonInfiniteScrollContent, IonAlert } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useIonAlert } from '@ionic/react';
import { firebaseConfig } from '../database/Config';

const Login: React.FC = () => {
    const [correo, setCorreo] = useState('')
    const [contra, setContra] = useState('')
    const history = useHistory();
    const [presentAlert] = useIonAlert();

    function loginUser() {
        console.log(correo, contra)
        if (correo == 'luis@gmail.com' && contra == '12345') {
            console.log('Ingreso al sistema')
          
        } else {
            presentAlert({
                header: 'Alerta',
                subHeader: 'Usuario Incorrecto',
                message: 'Intente de nuevo',
                buttons: ['Listo'],
            })
        }
    }

    return (

        <IonApp>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="home" />
                </IonButtons>
            </IonToolbar>
            <center>
                <IonCard >
                    <IonToolbar>
                        <IonTitle>Iniciar sesion</IonTitle>
                    </IonToolbar>
                    <p>Ingrese su correo Electronico</p>
                    <IonInput placeholder='Correo Electronico'
                        type='email'
                        onIonChange={(e: any) => setCorreo(e.target.value)}>

                    </IonInput>

                    <p>Ingrese su Contraseña</p>
                    <IonInput placeholder='Contraseña'
                        type='password'
                        onIonChange={(e: any) => setContra(e.target.value)}></IonInput>

                </IonCard>

            </center>

            <IonContent fullscreen>
                <center>
                    <IonButton routerLink='/tab1'  onClick={loginUser}>Iniciar sesión</IonButton>
                </center>
            </IonContent>

        </IonApp >
    );
};

export default Login;


