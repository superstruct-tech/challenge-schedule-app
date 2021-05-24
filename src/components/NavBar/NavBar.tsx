import { FunctionComponent } from 'react';

import './NavBar.css';

interface Props {}

const NavBar: FunctionComponent<Props> = (props: Props) => {
  return (
    <nav>
      <ul className="links">
        <li>
          <a href="/">
            <h1>
              <img src="/heal-ball.png" alt="" />
              Pokémon Center Admin Panel
            </h1>
          </a>
        </li>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
