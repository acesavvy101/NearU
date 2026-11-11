import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config";

// use this for the live points number on the wallet screen
export function listenToUser(userId, callback) {
  return onSnapshot(doc(db, "users", userId), (snap) =>
    callback({ id: snap.id, ...snap.data() })
  );
}

// use this to show the coupon list
export async function getCoupons() {
  const snap = await getDocs(collection(db, "coupons"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}