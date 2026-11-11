
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  where,
  runTransaction
} from "firebase/firestore";

// db will come from Grace's Firebase setup.

export async function publishSOS(db, request) {
  const { id, ...data } = request;

  const result = await addDoc(
    collection(db, "sosAlerts"),
    data
  );

  return result.id;
}

export function listenToActiveSOS(db, callback, onError) {
  const q = query(
    collection(db, "sosAlerts"),
    where("status", "==", "active")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const alerts = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data()
      }));

      callback(alerts);
    },
    onError
  );
}

export async function acknowledgeRemoteSOS(
  db,
  alertId,
  volunteerId
) {
  const ref = doc(db, "sosAlerts", alertId);

  await runTransaction(db, async (transaction) => {
    const snapshot = await transaction.get(ref);

    if (!snapshot.exists()) {
      throw new Error("SOS not found");
    }

    if (snapshot.data().status !== "active") {
      throw new Error("SOS is no longer active");
    }

    transaction.update(ref, {
      status: "acknowledged",
      acknowledgedBy: volunteerId
    });
  });
}

export async function cancelRemoteSOS(db, alertId) {
  await updateDoc(doc(db, "sosAlerts", alertId), {
    status: "cancelled"
  });
}
