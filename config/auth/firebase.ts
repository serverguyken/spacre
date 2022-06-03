import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, deleteDoc, onSnapshot, orderBy, query, limit, startAfter, collection, setDoc, getDocs, addDoc, } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    databaseURL: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
}

const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(firebaseApp);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const OnAuthStateChanged = (callback: (user: any) => void) => {
    onAuthStateChanged(auth, (user: any) => {
        callback(user);
    });
};
export const collectionRef = (name: string) => collection(db, name);
export const docRef = (name: string, id: string) => doc(db, name, id);
export const GetDocs = async (collection: any) => await getDocs(collection);
export const GetDoc = async (collection: any) => await getDoc(collection);
export const SetDoc = async (collection: any, data: any) => await setDoc(collection, data);
export const AddDoc = async (collection: any, data: any) => await addDoc(collection, data);
export const UpdateDoc = async (collection: any, data: any) => await updateDoc(collection, data);
export const DeleteDoc = async (collection: any) => await deleteDoc(collection);
export const createDocRef = (name: string, id: string) => {
    return docRef(name, id)
}
export const createCollectionRef = (name: string) => {
    return collectionRef(name)
}

export const OnSnapshot = onSnapshot
export const Query = (ref: any, orderByQ: {field: string, order: 'asc' | 'desc'}, limitQ: any, lastDocQ?: any) => {
if (lastDocQ) {
    return query(ref, orderBy(orderByQ.field, orderByQ.order), limit(limitQ),  startAfter(lastDocQ))
} else {
    return query(ref, orderBy(orderByQ.field, orderByQ.order), limit(limitQ))
}
}
