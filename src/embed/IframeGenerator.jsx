import React from "react";
import ReactDOM from "react-dom";

import RealisasiAnggaran from "../pages/pnbp/sie-pnbp-realisasi-anggaran";
import PaguMp from "../pages/pnbp/sie-pnbp-pagu-mp.js";

class IframeGenerator extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var embed = this.props.match.params.view;

    switch (embed) {
      case "sie-pnbp-realisasi-anggaran":
        ReactDOM.render(
          <RealisasiAnggaran />,
          document.getElementById("replace-tag")
        );
        break;
      case "sie-pnbp-pagu-mp":
        ReactDOM.render(<PaguMp />, document.getElementById("replace-tag"));
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div id="replace-tag"></div>
      </div>
    );
  }
}

export default IframeGenerator;
