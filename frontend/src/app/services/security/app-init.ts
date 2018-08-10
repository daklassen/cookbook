import { KeycloakService } from 'keycloak-angular';
import { environment } from '../../../environments/environment';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            url: environment.authorizationServer,
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
