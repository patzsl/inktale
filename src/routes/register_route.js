/**
 * @license Apache-2.0
 * @copyright 2024 patz
 */

// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
"use strict";

/**
 * node modules
 */
const router = require("express").Router();

/**
 * custom modules
 */

const { renderRegister } = require("../controllers/register_controller");

//GET route:Render the registration form.
router.get("/", renderRegister);

module.exports = router;
