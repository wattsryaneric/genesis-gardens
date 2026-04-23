// Simplified app parameters for standalone mode
const getAppParams = () => {
  return {
    appId: '',
    token: null,
    fromUrl: window.location.href,
    functionsVersion: '',
    appBaseUrl: ''
  }
};

export const appParams = {
  ...getAppParams()
}
