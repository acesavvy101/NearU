import {
    collection,
    addDoc,
    doc,
    updateDoc,
    increment,
    onSnapshot,
    query,
    where,
    serverTimestamp,
  } from "firebase/firestore";
  import { db } from "./config";
  

  export async function createSOS(senderId, lat, lng) {
    const ref = await addDoc(collection(db, "sosAlerts"), {
      senderId,
      lat,
      lng,
      status: "active",
      acknowledgedBy: null,
      createdAt: serverTimestamp(),
    });
    return ref.id;
  }
  
  // Live listener: the callback receives an array of active alerts
  export function listenToSOS(callback) {
    const q = query(collection(db, "sosAlerts"), where("status", "==", "active"));
    return onSnapshot(q, (snap) => {
      callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }
  
  // Helper taps "I'm coming": mark acknowledged and give them +10 points
  export async function acknowledgeSOS(alertId, helperId) {
    await updateDoc(doc(db, "sosAlerts", alertId), {
      status: "acknowledged",
      acknowledgedBy: helperId,
    });
    await updateDoc(doc(db, "users", helperId), { points: increment(10) });
  }
  
  // Sender cancels their own alert
  export async function cancelSOS(alertId) {
    await updateDoc(doc(db, "sosAlerts", alertId), { status: "cancelled" });
  }