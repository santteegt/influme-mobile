# Influme Mobile

Influme Mobile application written in NativeScript

## Setup instructions

### Prerequisite

* [NativeScript CLI](https://docs.nativescript.org/start/quick-setup)

### Run APP

* Source Code

```
git clone https://github.com/santteegt/influme-mobile.git
```

* Install dependencies

```
$ npm install
$ tns platform add ios
```

* Run in Development mode

```
$ tns run ios
```

### Useful commands

* `tns create influme-mobile --template tns-template-enterprise-auth-ng`
* `tns platform list`
* `tns platform add <ios|android>`
* `tns device`
* `tns run <ios|android>`
* `tns plugin add <plugin-name>`

* `ng generate module <module-name> --routing`
* `ng generate component <component-name> --module <module-name>`
* `ng generate service <service-name>`


### Production deployment

* `tns prepare ios --release --log trace`

## Arquitectura APP

El codigo fuente como tal se encuentra dentro del directorio `src/app`, y esta extructurado de la siguiente manera:

* `<componente>/` Los componentes son creados bajo el directorio `src/app`. Cada componente debe contar con su modulo general (`x.module.ts`) y archivo de rutas (`x.routing.ts`).

* `shared/` Contiene los servicios utilizados `api/` y las clases para el modelo de datos `models/`. Ademas especifica el archivo `config.ts` donde se configura la URL de conexion con mongoDB.

* El archivo `app-routing.module.ts` contiene todas las rutas para navegacion de la APP.

* `fonts/` Contiene las fuentes utilizadas: FontAwesome, San Francisco.

* `i18n/` Contiene los archivos de traduccion, que trabajan con el plugin [nativescript-localize](https://market.nativescript.org/plugins/nativescript-localize).

## Plugins Configurables

### nativescript-google-maps-sdk

Create Google Maps API Key in [Google Developers Console](https://console.developers.google.com), create a project, and enable the `Google Maps Android API` and `Google Maps SDK for iOS` APIs. Then under credentials, create an API key. The KEY API is used in the component **viewmap**, file `viewmap.module.ts`.[See more](https://www.npmjs.com/package/nativescript-google-maps-sdk).

### nativescript-google-maps-sdk

Para su correcto funcionamiento es necesario configurar una aplicacion en el dashboard de [AUTH0](https://auth0.com/) que permita autenticarse con Instagram, generando una client ID y un dominio. En este proyecto el clientID y dominio de AUTH0 es insertado en los componentes **login y profile**, archivos `login.component.ts` linea 50, `profile.component.ts` linea 240 respectivamente. 

**API Instagram**

1. Acceder en [Instagram Developer](https://www.instagram.com/developer/).
2. En el menú *Manage Clients*, registrar nuevo cliente.
3. Ingresar la información respectiva y en la propiedad *Valid redirect URIs * colocar la siguiente URL `{YOUR_AUTH0_DOMAIN}/login/callback`, por ejemplo `https://devappmobile.auth0.com/login/callback`. Para que otros usuarios puedan interactuar con este cliente es importante agregarlos sobre el menú *Sandbox*.

**Creación de aplicación en Auth0 Dashbord**

1. Crear aplicación de tipo **Native**. Y tener en cuenta el siguiente campo:
    - **Allowed Callback URLs**: Tiene el siguiente formato `{YOUR_BUNDLE_IDENTIFIER}://${YOUR_AUTH0_DOMAIN}/ios/{YOUR_BUNDLE_IDENTIFIER}/callback`. El valor de {YOUR_BUNDLE_IDENTIFIER} est definido en el archivo del proyecto *package.json* propiedad *nativescript.id*.

2. Dentro del dashboard en el menu *connections/social* activar Instagram y configurarlo con el clientID y clientSecret de la API de Instagram previamente configurado, además de seleccionar la propiedad **Basic Profile**. Finalmente seleccionar la aplicación auth0 creada en el punto 1.

La documentacion de configuracion del plugin puede ser encontrado [aqui](https://www.npmjs.com/package/nativescript-auth0).






