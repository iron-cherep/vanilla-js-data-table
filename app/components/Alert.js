import esc from '../helpers/escape';

const Alert = ({ message }) => `
  <aside class="alert">
    ${esc(message)}
  </aside>
`;

export default Alert;
