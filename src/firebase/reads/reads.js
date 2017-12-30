import { db } from '../db';

export const fetchBuys = async (dispatch) => {
  db.collection("buys").onSnapshot((snapshot) => {
    const data = {};

    snapshot.docs.forEach((doc) => {
      data[doc.id] = { ...doc.data(), id: doc.id };
    });
  
    dispatch(data);
  });
}