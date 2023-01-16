import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  useIonViewWillEnter,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonList,
  IonLabel,
  IonItem,
  IonIcon,
  IonBackButton
  ,

} from '@ionic/react';

import { IonButton, IonLoading, IonToast } from '@ionic/react';
import React, { useState } from 'react';
import { firebaseConfig } from '../database/Config'
import { registro } from '../modelo/registro';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


const Tab1: React.FC = () => {
  const [listaregistro, setListaregistro] = useState<registro[]>([]);
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [cedula, setCedula] = useState('');
  const [nfamilia, setNfamiliae] = useState('');
  const [mensaje, setMensaje] = useState(false);

  const [bandera, setBandera] = useState(true);
  const listar = async () => {
    try {
      let lista: registro[] = []
      const res = await firebase.firestore().collection('registro').get();
      res.forEach((doc) => {
        let obj = {
          id: doc.id,
          nombre: doc.data().nombre,
          apellido: doc.data().apellido,
          cedula: doc.data().cedula,
          nfamilia: doc.data().nfamilia,
        };
        lista.push(obj)

      });
      setListaregistro(lista)
    } catch (error) { }
  }

  const crear = async () => {
    try {
      if (bandera) {
        await firebase.firestore().collection('registro').add(
          { nombre, apellido, cedula, nfamilia });

      } else {
        await firebase.firestore().collection('registro').doc(id).set(
          { nombre, apellido, cedula, nfamilia });
        setBandera(true);
      }

    } catch (error) { }
    setId('');
    setNombre('');
    setApellido('');
    setCedula('');
    setNfamiliae('');
    setMensaje(true);

    listar();
  }

  const eliminar = async (id: string) => {
    try {
      console.log(id)
      await firebase.firestore().collection('registro').doc(id).delete();
      listar();
    } catch (error) { }
  }

  const editar = (id: string, nombre: string, apellido: string, cedula: string, nfamilia: string) => {
    setId(id);
    setNombre(nombre);
    setApellido(apellido);
    setCedula(cedula);
    setNfamiliae(nfamilia);
    setBandera(false);
  }

  useIonViewWillEnter(() => {
    listar();
  })



  return (
    <IonPage>

      <IonButtons slot="start">
        <IonBackButton defaultHref="login" />
      </IonButtons>

      <IonToast
        isOpen={mensaje}
        onDidDismiss={() => setMensaje(false)}
        message="registro guardado"
        duration={500}
      />
      <IonContent>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registro</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          {/*  Ingreso de datos */}
          <h1>Datos Personales</h1>
          <IonItem>

            <IonInput value={nombre}
              placeholder="Nombre "
              onIonChange={e => setNombre(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={apellido}
              placeholder="Apellido"
              onIonChange={e => setApellido(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={cedula}
              placeholder="Cedula"
              onIonChange={e => setCedula(e.detail.value!)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonInput value={nfamilia}
              placeholder="Integrantes de la familia"
              onIonChange={e => setNfamiliae(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <center>
            <IonButton color="success"
              onClick={() => crear()}>
              <IonIcon >
              </IonIcon>{bandera ? 'registro' : 'Editar'}
            </IonButton>
          </center>

        </IonCard>
        <IonList> {
          listaregistro.map(registro => (
            <IonCard key={registro.id} >
              <IonCardHeader>
                <h1>Usuario</h1>
                <IonCardTitle>
                  {registro.nombre}
                  {registro.apellido}
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>

                Cedula: {registro.cedula}
                <br />
                Numero de integrantes de la familia: {registro.nfamilia} <br />


                <center>
                  <IonButton color="danger"
                    style={{ padding: '1px', fontWeight: 'monospace' }}

                    onClick={() => eliminar('' + registro.id)}>
                    <IonIcon ></IonIcon>
                    Eliminar</IonButton>
                </center>

                <center>
                  <IonButton color="tertiary"
                    onClick={
                      () => editar(
                        '' + registro.id,
                        '' + registro.nombre,
                        '' + registro.apellido,
                        '' + registro.cedula, ''
                      + registro.nfamilia)}>
                    <IonIcon ></IonIcon>Editar</IonButton>
                </center>

              </IonCardContent>

            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage >
  );
};
export default Tab1;
