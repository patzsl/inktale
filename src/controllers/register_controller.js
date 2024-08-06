/**
 * @license Apache-2.0
 * @copyright 2024 patz
 */

// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
"use strict";

/**
 *
 * @param { object } req - The request object.
 * @param { object } res - The response object.
 */
const renderRegister = (req, res) => {
	res.render("./pages/register");
};

module.exports = {
	renderRegister,
};
