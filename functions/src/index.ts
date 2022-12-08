import {region} from "firebase-functions";
import {app} from "./app";

// Expose Express API as a single Cloud Function:
exports.api = region("europe-west1").https.onRequest(app);
