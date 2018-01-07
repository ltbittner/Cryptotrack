import { db } from '../db';

export const addWatch = async (params, dispatch) => {
  const docRef = await db.collection('watches').add({
    ...params
  });

  dispatch(docRef.id);
}

export const addBuy = async ({ symbol, amount, buyPrice, sellTarget1 = '', sellTarget2 = '', sellTarget3 = '' }, dispatch) => {
  const docRef = await db.collection('buys').add({
    symbol,
    amount,
    buyPrice,
    initialAmount: amount,
    sellTargets: {
      sellTarget1,
      sellTarget2,
      sellTarget3
    }
  });

  dispatch(docRef.id);
}

export const addSell = async ({ buyId, amount, sellPrice }, dispatch) => {

  const ref = db.collection('buys').doc(buyId);

  await db.runTransaction(async (transaction) => {
    const doc = await transaction.get(ref);
    const data = doc.data();
    const sells = data.sells || [];

    sells.push({ amount, sellPrice, buyId } )

    const newAmount = data.amount - amount;
    transaction.update(ref, { amount: newAmount, sells });
  })

  dispatch();
}

export const deleteBuy = async (id) => {
  await db.collection('buys').doc(id).delete();
}

export const deleteWatch = async (id) => {
  await db.collection('watches').doc(id).delete();
}

