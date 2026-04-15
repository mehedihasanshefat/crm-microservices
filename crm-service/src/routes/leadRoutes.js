const router = require("express").Router();
const ctrl = require("../controllers/leadController");

router.post("/", ctrl.createLead);
router.get("/", ctrl.getLeads);

module.exports = router;
