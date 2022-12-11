import {region} from "firebase-functions";

import {app} from "./app";

exports.api = region("europe-west1").https.onRequest(app);
