"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registration_1 = require("./auth/registration");
const login_1 = require("./auth/login");
const activeUser_1 = require("./auth/activeUser");
const changePassword_1 = require("./auth/changePassword");
const profile_1 = require("./user/profile");
const updateprofile_1 = require("./user/updateprofile");
const otheruser_1 = require("./user/otheruser");
const allusers_1 = require("./user/allusers");
const filterusers_1 = require("./user/filterusers");
const createPackingList_1 = require("./packing/createPackingList");
const getPackingLists_1 = require("./packing/getPackingLists");
const getPackingList_1 = require("./packing/getPackingList");
const updatePackingList_1 = require("./packing/updatePackingList");
const deletePackingList_1 = require("./packing/deletePackingList");
const createTrip_1 = require("./trip/createTrip");
const getTrips_1 = require("./trip/getTrips");
const getTrip_1 = require("./trip/getTrip");
const updateTrip_1 = require("./trip/updateTrip");
const deleteTrip_1 = require("./trip/deleteTrip");
const getUserTrips_1 = require("./trip/getUserTrips");
const createMatchRequest_1 = require("./matching/createMatchRequest");
const getMatchRequests_1 = require("./matching/getMatchRequests");
const getReceivedMatchRequests_1 = require("./matching/getReceivedMatchRequests");
const respondMatchRequest_1 = require("./matching/respondMatchRequest");
const createTripInvite_1 = require("./invite/createTripInvite");
const getTripInvites_1 = require("./invite/getTripInvites");
const getReceivedInvites_1 = require("./invite/getReceivedInvites");
const respondTripInvite_1 = require("./invite/respondTripInvite");
const handlers_1 = require("./verification/handlers");
const handlers_2 = require("./friend/handlers");
const handlers_3 = require("./chat/handlers");
const handlers_4 = require("./emergency/handlers");
const router = (0, express_1.Router)();
router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Solo Traveler API Running 🚀"
    });
});
//Authentication API
router.post("/traveller/auth/register", registration_1.registerHandler);
router.post("/traveller/auth/login", login_1.loginHandler);
router.get("/traveller/auth/activeUser", activeUser_1.activeUserHandler);
router.post("/traveller/auth/change-password", changePassword_1.changePasswordHandler);
//User API
router.get("/traveller/user/Users", allusers_1.allUsersHandler);
router.get("/traveller/user", filterusers_1.filterUsersHandler);
router.get("/traveller/user/profile", profile_1.profileHandler);
router.patch("/traveller/user/updateProfile", updateprofile_1.updateProfileHandler);
router.get("/traveller/user/:id", otheruser_1.otherUserHandler);
// Packing routes
router.post("/traveller/packing/lists", createPackingList_1.createPackingListHandler);
router.get("/traveller/packing/lists", getPackingLists_1.getPackingListsHandler);
router.get("/traveller/packing/lists/:id", getPackingList_1.getPackingListHandler);
router.patch("/traveller/packing/lists/:id", updatePackingList_1.updatePackingListHandler);
router.delete("/traveller/packing/lists/:id", deletePackingList_1.deletePackingListHandler);
// Trip routes
router.post("/traveller/trips", createTrip_1.createTripHandler);
router.get("/traveller/trips", getTrips_1.getTripsHandler);
router.get("/traveller/trips/:id", getTrip_1.getTripHandler);
router.patch("/traveller/trips/:id", updateTrip_1.updateTripHandler);
router.delete("/traveller/trips/:id", deleteTrip_1.deleteTripHandler);
router.get("/traveller/trips/user/:userId", getUserTrips_1.getUserTripsHandler);
// Matching / Match requests
router.post("/traveller/trips/:tripId/match-requests", createMatchRequest_1.createMatchRequestHandler);
router.get("/traveller/trips/:tripId/match-requests", getMatchRequests_1.getMatchRequestsHandler);
router.get("/traveller/match-requests", getReceivedMatchRequests_1.getReceivedMatchRequestsHandler);
router.patch("/traveller/match-requests/:id", respondMatchRequest_1.respondMatchRequestHandler);
// Trip Invites
router.post("/traveller/trips/:tripId/invites", createTripInvite_1.createTripInviteHandler);
router.get("/traveller/trips/:tripId/invites", getTripInvites_1.getTripInvitesHandler);
router.get("/traveller/invites", getReceivedInvites_1.getReceivedInvitesHandler);
router.patch("/traveller/invites/:id", respondTripInvite_1.respondTripInviteHandler);
// Verification
router.post("/traveller/verification/submit", handlers_1.submitVerificationHandler);
router.get("/traveller/verification/status", handlers_1.getVerificationStatusHandler);
router.get("/traveller/verification/pending", handlers_1.getPendingVerificationsHandler);
router.patch("/traveller/verification/:id", handlers_1.reviewVerificationHandler);
// Friends
router.post("/traveller/friends/request", handlers_2.sendFriendRequestHandler);
router.get("/traveller/friends/requests/received", handlers_2.getReceivedFriendRequestsHandler);
router.get("/traveller/friends/requests/sent", handlers_2.getSentFriendRequestsHandler);
router.patch("/traveller/friends/requests/:id", handlers_2.respondFriendRequestHandler);
router.delete("/traveller/friends/requests/:id", handlers_2.cancelFriendRequestHandler);
// Chat
router.post("/traveller/chats", handlers_3.createChatHandler);
router.get("/traveller/chats", handlers_3.getUserChatsHandler);
router.get("/traveller/chats/:id/messages", handlers_3.getChatMessagesHandler);
router.post("/traveller/chats/:id/messages", handlers_3.sendMessageHandler);
router.patch("/traveller/messages/:id", handlers_3.updateMessageStatusHandler);
router.delete("/traveller/messages/:id", handlers_3.deleteMessageHandler);
// Emergency contacts
router.post("/traveller/emergency-contacts", handlers_4.createEmergencyContactHandler);
router.get("/traveller/emergency-contacts", handlers_4.getEmergencyContactsHandler);
router.patch("/traveller/emergency-contacts/:id", handlers_4.updateEmergencyContactHandler);
router.delete("/traveller/emergency-contacts/:id", handlers_4.deleteEmergencyContactHandler);
exports.default = router;
//# sourceMappingURL=router.js.map