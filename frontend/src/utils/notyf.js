import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf({
  duration: 3000,
  position: { x: 'right', y: 'top' },
  dismissible: true,
  ripple: false,
  types: [
    {
      type: 'success',
      background: '#2563eb',
      icon: false,
    },
    {
      type: 'error',
      background: '#dc2626',
      icon: false,
    },
  ],
});

export default notyf;
