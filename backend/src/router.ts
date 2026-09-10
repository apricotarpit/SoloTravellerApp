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

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Solo Traveler API Running 🚀"
    });
});


//Authentication API
router.post("/traveller/auth/register", registerHandler);
router.post("/traveller/auth/login", loginHandler);
router.get("/traveller/auth/activeUser", activeUserHandler);
router.post("/traveller/auth/change-password", changePasswordHandler);

//User API
router.get("/traveller/user/Users", allUsersHandler);
router.get("/traveller/user", filterUsersHandler);
router.get("/traveller/user/profile", profileHandler);
router.patch("/traveller/user/updateProfile", updateProfileHandler);
router.get("/traveller/user/:id", otherUserHandler);


export default router;