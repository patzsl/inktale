/**
 * @license Apache-2.0
 * @copyright 2024 patz
 */

// biome-ignore lint/suspicious/noRedundantUseStrict: <explanation>
"use strict";

/**
 * node modules
 */

const express = require("express");
const createError = require("http-errors");
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

/**
 * custom modules
 */

const register = require("./src/routes/register_route");

/**
 * Initial express
 */

const app = express();

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
	setTimeout(() => {
		liveReloadServer.refresh("/");
	}, 100);
});

app.use(connectLiveReload());

/**
 * setting view engine
 */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Middleware setup
 */

/**
 * Logger middleware
 *
 * Utiliza o middleware de logger para registrar as requisições HTTP recebidas pelo servidor.
 * O formato "dev" indica que será utilizado um layout mais simplificado, adequado para desenvolvimento.
 */
app.use(logger("dev"));

/**
 * JSON parsing middleware
 *
 * Habilita o servidor para interpretar corpos de requisições enviados em formato JSON,
 * permitindo que os dados sejam acessíveis através do objeto req.body.
 */
app.use(express.json());

/**
 * URL-encoded parsing middleware
 *
 * Configura o servidor para interpretar corpos de requisições enviados com o tipo content-type
 * application/x-www-form-urlencoded. O parâmetro { extended: false } especifica que será usado o parser querystring,
 * limitando-se a suportar dados simples e não permitindo o envio de arrays ou objetos complexos.
 */
app.use(express.urlencoded({ extended: false }));

/**
 * Cookie parsing middleware
 *
 * Permite ao servidor interpretar os cookies enviados nas requisições HTTP,
 * tornando-os acessíveis através do objeto req.cookies.
 */
app.use(cookieParser());

/**
 * set public directory
 */
app.use(express.static(path.join(__dirname, "public")));

app.use("/register", register);

// catch 404 and forward to error handler
// biome-ignore lint/complexity/useArrowFunction: <explanation>
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
// biome-ignore lint/complexity/useArrowFunction: <explanation>
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
