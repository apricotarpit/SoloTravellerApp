import { Router } from "express";
import { registerHandler } from "./auth/registration";
import { loginHandler } from "./auth/login";
import { activeUserHandler } from "./auth/activeUser";
import { changePasswordHandler } from "./auth/changePassword";
import { profileHandler } from "./user/profile";
import { updateProfileHandler } from "./user/updateprofile";
import { otherUserHandler } from "./user/otheruser";
import { allUsersHandler } from "./user/allusers";
import { filterUsersHandler } from "./user/filterusers";
import { createPackingListHandler } from "./packing/createPackingList";
import { getPackingListsHandler } from "./packing/getPackingLists";
import { getPackingListHandler } from "./packing/getPackingList";
import { updatePackingListHandler } from "./packing/updatePackingList";
import { deletePackingListHandler } from "./packing/deletePackingList";
import { createTripHandler } from "./trip/createTrip";
import { getTripsHandler } from "./trip/getTrips";
import { getTripHandler } from "./trip/getTrip";
import { updateTripHandler } from "./trip/updateTrip";
import { deleteTripHandler } from "./trip/deleteTrip";
import { getUserTripsHandler } from "./trip/getUserTrips";
import { createMatchRequestHandler } from "./matching/createMatchRequest";
import { getMatchRequestsHandler } from "./matching/getMatchRequests";
import { getReceivedMatchRequestsHandler } from "./matching/getReceivedMatchRequests";
import { respondMatchRequestHandler } from "./matching/respondMatchRequest";
import { createTripInviteHandler } from "./invite/createTripInvite";
import { getTripInvitesHandler } from "./invite/getTripInvites";
import { getReceivedInvitesHandler } from "./invite/getReceivedInvites";
import { respondTripInviteHandler } from "./invite/respondTripInvite";
import {
    submitVerificationHandler,
    getVerificationStatusHandler,
    getPendingVerificationsHandler,
    reviewVerificationHandler,
} from "./verification/handlers";
import {
    sendFriendRequestHandler,
    getReceivedFriendRequestsHandler,
    getSentFriendRequestsHandler,
    respondFriendRequestHandler,
    cancelFriendRequestHandler,
} from "./friend/handlers";
import {
    createChatHandler,
    getUserChatsHandler,
    getChatMessagesHandler,
    sendMessageHandler,
    updateMessageStatusHandler,
    deleteMessageHandler,
} from "./chat/handlers";
import {
    createEmergencyContactHandler,
    getEmergencyContactsHandler,
    updateEmergencyContactHandler,
    deleteEmergencyContactHandler,
} from "./emergency/handlers";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Solo Traveler API Running 🚀"
    });
});


//Authentication API --done
router.post("/traveller/auth/register", registerHandler);
router.post("/traveller/auth/login", loginHandler);
router.get("/traveller/auth/activeUser", activeUserHandler);
router.post("/traveller/auth/change-password", changePasswordHandler);

//User API  --done
router.get("/traveller/user/Users", allUsersHandler);
router.get("/traveller/user", filterUsersHandler);
router.get("/traveller/user/profile", profileHandler);
router.patch("/traveller/user/updateProfile", updateProfileHandler);
router.get("/traveller/user/:id", otherUserHandler);

// Packing routes --done
router.post("/traveller/packing/lists", createPackingListHandler);
router.get("/traveller/packing/lists", getPackingListsHandler);
router.get("/traveller/packing/lists/:id", getPackingListHandler);
router.patch("/traveller/packing/lists/:id", updatePackingListHandler);
router.delete("/traveller/packing/lists/:id", deletePackingListHandler);

// Trip routes --done
router.post("/traveller/trips", createTripHandler);
router.get("/traveller/trips", getTripsHandler);
router.get("/traveller/trips/:id", getTripHandler);
router.patch("/traveller/trips/:id", updateTripHandler);
router.delete("/traveller/trips/:id", deleteTripHandler);
router.get("/traveller/trips/user/:Userid", getUserTripsHandler);

// Matching / Match requests --done
router.post("/traveller/trips/:tripId/match-requests", createMatchRequestHandler);
router.get("/traveller/trips/:tripId/match-requests", getMatchRequestsHandler);
router.get("/traveller/match-requests", getReceivedMatchRequestsHandler);
router.patch("/traveller/match-requests/:tripId", respondMatchRequestHandler);
// trip request by the sender

// Trip Invites --done
router.post("/traveller/trips/:tripId/invites", createTripInviteHandler);
router.get("/traveller/trips/:tripId/invites", getTripInvitesHandler);
router.get("/traveller/invites", getReceivedInvitesHandler);
router.patch("/traveller/invites/:id", respondTripInviteHandler);

// Verification
router.post("/traveller/verification/submit", submitVerificationHandler);
router.get("/traveller/verification/status", getVerificationStatusHandler);
router.get("/traveller/verification/pending", getPendingVerificationsHandler);
router.patch("/traveller/verification/:id", reviewVerificationHandler);

// Friends
router.post("/traveller/friends/request", sendFriendRequestHandler);
router.get("/traveller/friends/requests/received", getReceivedFriendRequestsHandler);
router.get("/traveller/friends/requests/sent", getSentFriendRequestsHandler);
router.patch("/traveller/friends/requests/:id", respondFriendRequestHandler);
router.delete("/traveller/friends/requests/:id", cancelFriendRequestHandler);

// Chat
router.post("/traveller/chats", createChatHandler);
router.get("/traveller/chats", getUserChatsHandler);
router.get("/traveller/chats/:id/messages", getChatMessagesHandler);
router.post("/traveller/chats/:id/messages", sendMessageHandler);
router.patch("/traveller/messages/:id", updateMessageStatusHandler);
router.delete("/traveller/messages/:id", deleteMessageHandler);

// Emergency contacts
router.post("/traveller/emergency-contacts", createEmergencyContactHandler);
router.get("/traveller/emergency-contacts", getEmergencyContactsHandler);
router.patch("/traveller/emergency-contacts/:id", updateEmergencyContactHandler);
router.delete("/traveller/emergency-contacts/:id", deleteEmergencyContactHandler);


export default router;