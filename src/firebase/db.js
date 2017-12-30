import Firebase from 'firebase';
import 'firebase/firestore';
import { config } from './config';

Firebase.initializeApp(config);

export const db = Firebase.firestore();
export const timestamp = Firebase.firestore.FieldValue.serverTimestamp();
export const generateId = () => {
  
}