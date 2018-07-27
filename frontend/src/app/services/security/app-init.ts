import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: 'http://localhost:8080/auth',
            realm: 'cookbook',
            clientId: 'cookbook-frontend'
          },
          initOptions: {
            //onLoad: 'login-required',
            onLoad: 'check-sso',
            checkLoginIframe: false
          },
          bearerExcludedUrls: ['home']
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
