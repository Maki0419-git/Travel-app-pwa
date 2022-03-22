import dayjs from 'dayjs';
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../Config/firebase';


const getArrangements = (userID, setArrangements) => {
    const q = query(collection(db, `user_info/${userID}/travels`), where("progress", "==", "arrangement"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(
                {
                    id: doc.id,
                    title: doc.data().title,
                    day: dayjs(doc.data().day),
                }
            );
        });
        setArrangements(data);
    });
}

const getSpots = async (userID, travelID) => {
    const querySnapshot = await getDocs(collection(db, `user_info/${userID}/travels/${travelID}/spots`));
    let data = [];
    querySnapshot.forEach((doc) => {
        data.push({
            city: doc.data().city,
            location: doc.data().location,
            address: doc.data().address,
            clock: doc.data().clock,
            memo: doc.data().memo,
            save: true
        })

    });
    return data;
}

const addArrangement = async (userID, data) => {
    const docRef = await addDoc(collection(db, `user_info/${userID}/travels`), data);
    return docRef.id;
}

const addSpots = async (userID, travelID, data) => {
    let promiseArray = [];
    data.forEach((item, index) => promiseArray.push(
        addDoc(collection(db, `user_info/${userID}/travels/${travelID}/spots`),
            {
                order: index + 1,
                location: item.location,
                address: item.address,
                clock: item.clock,
                memo: item.memo,
                city: item.city,
            }
        )));
    await Promise.all(promiseArray);
}

const deleteSpots = async (userID, travelID) => {
    const querySnapshot = await getDocs(collection(db, `user_info/${userID}/travels/${travelID}/spots`));
    let promiseArray = [];
    querySnapshot.forEach((docRef) => promiseArray.push(
        deleteDoc(doc(db, `user_info/${userID}/travels/${travelID}/spots`, docRef.id)))
    );
    await Promise.all(promiseArray);
}

export { getSpots, addSpots, deleteSpots, getArrangements, addArrangement }