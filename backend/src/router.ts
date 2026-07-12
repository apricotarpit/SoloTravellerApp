import { Router } from "express";
import { registerHandler } from "./auth/registration";
import { loginHandler } from "./auth/login";
import { activeUserHandler } from "./auth/activeUser";
import { changePasswordHandler } from "./auth/changePassword";

const router = Router();

router.get("/", (_req, res) => {
    res.json({
        success: true,
        message: "Solo Traveler API Running 🚀"
    });
});

router.post("/traveller/register", registerHandler);
router.post("/traveller/login", loginHandler);
router.get("/traveller/activeUser", activeUserHandler);
router.post("/traveller/change-password", changePasswordHandler);

export default router;