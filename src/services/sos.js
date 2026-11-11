
export function createSOSRequest(userId, location, message) {
  return {
    id: crypto.randomUUID(),
    userId,
    type: "emergency",
    message,
    latitude: location.latitude,
    longitude: location.longitude,
    status: "active",
    acknowledgedBy: null,
    createdAt: Date.now()
  };
}

export function acknowledgeSOS(request, volunteerId) {
  if (request.status !== "active") {
    throw new Error("SOS request is no longer active");
  }

  return {
    ...request,
    status: "acknowledged",
    acknowledgedBy: volunteerId
  };
}

export function cancelSOS(request, requesterId) {
  if (request.userId !== requesterId) {
    throw new Error("Only the requester can cancel this SOS");
  }

  return {
    ...request,
    status: "cancelled"
  };
}
