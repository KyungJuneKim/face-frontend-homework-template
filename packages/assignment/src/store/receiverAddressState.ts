import { atom } from 'recoil';

const receiverAddressState = atom({
  key: 'receiverAddressState',
  default: '',
});

export default receiverAddressState;
