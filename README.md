# Influme Mobile

Influme Mobile application built in [NativeScript](https://www.nativescript.org/)

## Architecture Overview

The App is mainly written using NativeScript 6.1.x and Angular TypeScript 8.x, allowing to deploy the App in both iOS and Android (**not tested**) devices. Source code is structured as follows:

* `src/app/<component_name>/` Define (sub-)components in the form of a general module (`<component>.module.ts`) & a route (`<component>.routing.ts`).

* `src/app/shared/` Contains shared libraries for access the DB schema `models/` and perform API calls (`api/`). The folder also contains the `config.ts` file that is in change on configuring the URL to the backend server.

* `src/app/app-routing.module.ts` configures the routes to navigate to the different screens within the App

* `src/i18n/` contains the localization files to support different languages (using the [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize) plugin)

## System Requirements

* Node v10+
* [NativeScript CLI](https://docs.nativescript.org/start/quick-setup)
* [Influme backend](https://github.com/santteegt/influme-backend)

### Setup Instructions

* Download the source code:

```
git clone https://github.com/santteegt/influme-mobile.git
cd influme-mobile
```

* To install the project dependencies:

```
$ npm install
$ tns platform add ios
```

* Plugin Configuration

The following plugins need to be configured prior running/deploying the App

#### nativescript-google-maps-sdk

* Create Google Maps API Key in [Google Developers Console](https://console.developers.google.com), create a project, and enable the `Google Maps Android API` and `Google Maps SDK for iOS` APIs. Then, under credentials create an API key. This KEY API is finally set in the **src/app/viewmap/viewmap.module.ts** component. For more in-depth info about this plugin see the [package docs](https://www.npmjs.com/package/nativescript-google-maps-sdk).

#### nativescript-auth0

* In order for the app to support authentication through Instagram, you need to create an [AUTH0](https://auth0.com/) account and configure the [API through the dashboard](https://auth0.com/docs/connections/social/instagram). Then, the `domain` and generated `client ID`must be set in the `login/login.component.ts` and `profile/profile.component.ts` components (`this.auth0 = new Auth0(CLIENT_ID, YOUR_AUTH0_DOMAIN)`). To achieve this check the following instructions:

**Configure the Instagram API**

1. Access the [Instagram Developer Portal](https://www.instagram.com/developer/)
2. Register a new client App wihitn the **Manage Clients** menu
3. Set the **Valid redirect URIs** field with the URL value  `{YOUR_AUTH0_DOMAIN}/login/callback` (e.g. `https://devappmobile.auth0.com/login/callback`)
4. Add tester users in the **Sandbox** menu (for development purposes only)
5. Copy the CLIENT_ID & CLIENT_SECRET values to be used later

**Create an App through the Auth0 Dashbord**

1. Create a **Native** App with the following settings:
    - **Allowed Callback URLs**: in the form `{BUNDLE_IDENTIFIER}://${YOUR_AUTH0_DOMAIN}/ios/{BUNDLE_IDENTIFIER}/callback`, where the {BUNDLE_IDENTIFIER} is defined in the `package.json` file within this repo
2. Activate the Instagram authentication in the *connections/social* menu by setting the CLIENT_ID & CLIENT_SECRET obtained from the Instragram Developer Portal, and check the **Basic Profile** property
3. Finally, choose the app created in step 1

For more in-depth info about the plugin check the [package docs](https://www.npmjs.com/package/nativescript-auth0).

### Running the App in Development mode

* iOS
```
$ tns run ios
```
* Android (Not fully tested yet)

### Production deployment

* iOS

* `tns prepare ios --release --log trace`
* To archive and submit the App to the Apple App Store, ppen the `platforms/ios/influmemobile.xcworkspace` using Xcode.

* Android (Not fully tested yet)

## Misc: Useful commands

* NativeScript
    * `tns create influme-mobile --template tns-template-enterprise-auth-ng`: create a new App from template
    * `tns platform list`: List App supported platforms
    * `tns platform add <ios|android>`: Add support for a platform
    * `tns device`: List connected devices
    * `tns run <ios|android>`: Run the App in the specified device platrom
    * `tns plugin add <plugin-name>`: Install a new plugin

* Angular
    * `ng generate module <module-name> --routing`: Generates a new module boilerplate code
    * `ng generate component <component-name> --module <module-name>`: Generates a new component boilerplate code
    * `ng generate service <service-name>`: Generate a new service boilerplate code
