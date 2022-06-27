import { FaceSDK } from '@face/sdk';
import { selector } from 'recoil';

const faceSdkState = selector({
  key: 'faceSdkState',
  get: () =>
    new FaceSDK(
      'https://ropsten.infura.io/v3/2a4f59ea8b174fb7ae9ed6fae1137e59'
    ),
});

export default faceSdkState;
