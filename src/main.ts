// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { AppModule } from "./app/app.module";

// declare var localstorage = require( "nativescript-localstorage" );

/* ***********************************************************
* The {N} Kinvey plugin needs some initialization steps before it is ready
* for use. Check out the initialization script at /shared/kinvey.common.ts
* along with more information about it.
*************************************************************/
// import "./app/shared/kinvey.common";

platformNativeScriptDynamic({ startPageActionBarHidden: true }).bootstrapModule(AppModule);
