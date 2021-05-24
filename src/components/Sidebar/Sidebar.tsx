import { FunctionComponent } from 'react';

import './Sidebar.css';

interface Props {}

const Sidebar: FunctionComponent<Props> = (props: Props) => {
  return (
    <section className="sidebar">
      <ul className="links">
        <li className="active">
          Appointments
        </li>
        <li>
          Settings
        </li>
      </ul>
    </section>
  );
};

export default Sidebar;
