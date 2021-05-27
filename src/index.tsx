import * as React from "react";
import { render } from "react-dom";

class Navigation extends React.PureComponent {
  render(): React.ReactElement {
    return (
      <ul>
        <li>
          <a href="/simple-table.html">Simple table example</a>
        </li>
        <li>
          <a href="/first-example.html">First example</a>
        </li>
        <li>
          <a href="/second-example.html">Second example</a>
        </li>
        <li>
          <a href="/third-example.html">Third example</a>
        </li>
        <li>
          <a href="/fourth-example.html">Fourth example</a>
        </li>
        <li>
          <a href="/fifth-example.html">Fifth example</a>
        </li>
      </ul>
    );
  }
}

render(<Navigation />, document.getElementById("root"));
