# custom-mfa

## Vite, Vue3 web-component *`custom-mfa`*

(standalone web-component for multi factor authentication)

<hr>

## Usage

### Import component

#### in HTML header in `structure.vm` velocity template

```html
  <script type="module" crossorigin src="/scripts/path/to/mfa.js"></script>

```

### Place component

#### in velocity templates `profile.vm` and `mfa_activate_login.vm`

```html
  <custom-mfa></custom-mfa>
```

## Passing data to component

### Some sessions keys are required for optional/mandatory mfa:

##### in `mfa_activate_login.vm` template:
```html
  #set( $mfalogin = ${session.getAttribute($constants.get('SESSION_KEY_MULTIFACTOR_AUTHENTICATION_ACTIVATION_REQUIRED'))} )
```

##### in `profile.vm` template:
```html
  #set( $mfalogin = ${session.getAttribute($constants.get('SESSION_KEY_MULTIFACTOR_AUTHENTICATION_ACTIVATION_AFTER_LOGIN'))} )
```

### We can use helper function to pass all the attributes

```js
  function setAttributes(el, attrs) {
    for (var key in attrs) {
      const attr =
        typeof attrs[key] !== "string"
          ? JSON.stringify(attrs[key])
          : attrs[key];
      el.setAttribute(key, attr);
    }
  }
```

### passing data example (`profile.vm` velocity template):

```js
  const mfa = document.querySelector('custom-mfa')

  const mfaProps = {
    translations: {
      #foreach($resource i $(messages.getResourcesWithPrefix('cips.mfa')))
        '$!{resource.getKey()' : '$!{resource.getValue().replace("'", "")}',
      #end
    },
    "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
    font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
    "logo-url": getComputedStyle(document.querySelector('.customer-logo-frame > a')).backgroundImage,
    "mfa-status-url": "${link.getAction('/myprofile/mfa/checkStatus')}",
    "mfa-generate-qr-code-url": "${link.getAction('/myprofile/mfa/generateQrCode')}",
    "mfa-check-verification-code-url": "${link.getAction('/myprofile/mfa/checkVerificationCode')}",
    "mfa-activate-url": "${link.getAction('/myprofile/mfa/activate')}",
    "mfa-download-backup-codes-url": "${link.getAction('/myprofile/mfa/downloadBackupCodes')}",
    "mfa-deactivate-url": "${link.getAction('/myprofile/mfa/deactivate')}",
    "mfa-generate-new-backup-codes-url": "${link.getAction('/myprofile/mfa/generateNewBackupCodes')}",
    "from-mfa-hint": document.querySelector('#islogin').innerText
  }

  setAttributes(mfa, mfaProps)
```

### passing data example (`mfa_activate_login.vm` velocity template):

```js
  const mfa = document.querySelector("custom-mfa");

  const mfaProps = {
    translations: {
      #foreach($resource in ${messages.getResourcesWithPrefix('cips.mfa')})
        '$!{resource.getKey()}': '$!{resource.getValue().replace("'", "")}',
      #end
    },
    "primary-color": getComputedStyle(document.querySelector('.site-title')).color,
    font: getComputedStyle(document.querySelector('.site-title')).fontFamily,
    "logo-url": getComputedStyle(document.querySelector('.customer-logo-frame > a')).backgroundImage,
    "mfa-status-url": "${link.getAction('/myprofile/mfa/checkStatus')}",
    "mfa-activate-url": "${link.getAction('/login/mfa/activate')}",
    "mfa-deactivate-url": "${link.getAction('/myprofile/mfa/deactivate')}",
    "mfa-download-backup-codes-url": "${link.getAction('/login/mfa/downloadBackupCodes')}",
    "mfa-generate-qr-code-url": "${link.getAction('/login/mfa/generateQrCode')}",
    "mfa-check-verification-code-url": "${link.getAction('/login/mfa/checkVerificationCode')}",
    "mfa-generate-new-backup-codes-url": "${link.getAction('/myprofile/mfa/generateNewBackupCodes')}",
    "from-mfa-login": document.querySelector('#islogin').innerText
  };
  setAttributes(mfa, mfaProps);
```

<hr>

### Props

#### There is 3 types of props:

- #### ***Translations are recived from velocity action as object, need to use `JSON.parse`:***

  ### **`translations`**

    - Type: String

<br/>

- #### ***Styles are received from site elements:***

  ### **`primaryColor`**

    - Type: String
    - Default: "#000"

  ### **`font`**

    - Type: String
    - Default: "'Open Sans', sans-serif"

  ### **`logoUrl`**

  - Type: String
  - Default: ""

<br/>

- #### ***Actions url's are received from velocity actions:***

  ### **`mfaStatusUrl`**

    - Type: String
    - Default: ""

  ### **`mfaGenerateQrCodeUrl`**

    - Type: String
    - Default: ""

  ### **`mfaCheckVerificationCodeUrl`**

    - Type: String
    - Default: ""

  ### **`mfaActivateUrl`**

    - Type: String
    - Default: ""

  ### **`mfaDownloadBackupCodesUrl`**

    - Type: String
    - Default: ""

  ### **`mfaDeactivateUrl`**

    - Type: String
    - Default: ""

  ### **`mfaGenerateNewBackupCodesUrl`**

    - Type: String
    - Default: ""

<br/>

- #### ***Session keys if user comes form mfa login/hint page:***

  ### **`fromMfaHint`**

    - Type: String
    - Default: ""

  ### **`fromMfaLogin`**

    - Type: String
    - Default: ""
    
<br/>
<hr>

## Deployment

- build app
- rename compiled file to **`mfa.js`**
- upload file to **`Doocroot-Explorer -> scripts/path/for/app`**

<hr>

### Project setup

```
npm install
```

#### Compiles and hot-reloads for development

```
npm run serve
```

#### Compiles and minifies for production

```
npm run build
```
