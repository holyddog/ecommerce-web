// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    client_id: 'web',
    client_secret: '5GRSFXRn1yI8q5uFwGF53ibYHQyeGPfr',
    payment: {
        version: '7.2',
        merchant_id: '764764000000720',
        secret_key: 'LGL61SBEZ0XZ',
        currency: '764',
        payment_option: 'C'
    }
};

export const Config = {
    AppName: 'E-Commerce',
    PageSize: 24,
    
    ServiceUrl: 'http://localhost:3000',
    FileUrl: 'http://localhost:3000/files',
    PaymentUrl: 'https://demo2.2c2p.com/2C2PFrontEnd/RedirectV3/payment',

    StoragePrefix: 'ecommerce-web_'
};