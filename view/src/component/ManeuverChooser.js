import ReactUtils from "../ReactUtilities.js";

const BEARING_TO_FONT = {
  "Turn Left": "turnleft",
  "Turn Right": "turnright",
  "Segnor's Loop Left": "sloopleft",
  "Segnor's Loop Right": "sloopright",
  "Tallon Roll Left": "trollleft",
  "Tallon Roll Right": "trollright",
  "Koiogran Turn": "kturn"
};

const STATIONARY_MANEUVER = XMA.Selector.maneuver(XMA.Maneuver.STATIONARY_0_HARD_0OR);

const regex = cls => new RegExp(`(\\s|^)${cls}(\\s|$)`);

const hasClass = (element, cls) => element.className.match(regex(cls));

const addClass = (element, cls) => element.className + (hasClass(element, cls) ? "" : ` ${cls}`);

const removeClass = (element, cls) =>
  element.className +
  (hasClass(element, cls) ? element.className.replace(regex(cls), " ") : element.className);

const createManeuverIcon = (bearing0, speed0, difficulty) => {
  const defaultSrc = (bearing, speed) =>
    speed === 0
      ? "stop"
      : (speed === -1 ? "reverse" : "") + bearing.toLowerCase().replace(/ /g, "");
  const src = R.defaultTo(defaultSrc(bearing0, speed0), BEARING_TO_FONT[bearing0]);
  let difficultyClass = "";
  if (difficulty === "Easy") {
    difficultyClass = " green";
  } else if (difficulty === "Hard") {
    difficultyClass = " red";
  }
  const className = `xw-f8${difficultyClass}`;

  return ReactDOMFactories.span(
    {
      className
    },
    ReactDOMFactories.i({
      className: `xwing-miniatures-font xwing-miniatures-font-${src}`
    })
  );
};

const maneuverBearing = maneuver =>
  maneuver.bearing.startsWith("Reverse")
    ? maneuver.bearing.substring("Reverse ".length)
    : maneuver.bearing;

const maneuverSpeed = maneuver =>
  (maneuver.bearing.startsWith("Reverse") ? -1 : 1) * maneuver.speed;

const findManeuver = (maneuvers, bearingIn, speedIn) => {
  const isBearing = maneuver => R.equals(maneuverBearing(maneuver), bearingIn);
  const isSpeed = maneuver => R.equals(maneuverSpeed(maneuver), speedIn);

  return R.find(R.both(isBearing, isSpeed), maneuvers);
};

const determineMaximumSpeed = maneuvers =>
  R.reduce(
    (accum, maneuver) => Math.max(accum, maneuverSpeed(maneuver)),
    Number.NEGATIVE_INFINITY,
    maneuvers
  );

const determineMinimumSpeed = maneuvers =>
  R.reduce(
    (accum, maneuver) => Math.min(accum, maneuverSpeed(maneuver)),
    Number.POSITIVE_INFINITY,
    maneuvers
  );

// /////////////////////////////////////////////////////////////////////////////////////////////////
class ManeuverChooser extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      element: undefined
    };

    this.selectionChanged = this.selectionChangedFunction.bind(this);
  }

  bearingFunction0(cells, speed) {
    const { isEditable, pilotId } = this.props;
    const maneuver = STATIONARY_MANEUVER;
    const { difficulty } = maneuver;
    const image = createManeuverIcon(undefined, speed, difficulty);

    cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
    cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
    cells.push(
      ReactUtils.createCell(image, cells.length, "b--xw-medium xw-min-w1-5", {
        onClick: isEditable ? this.selectionChanged : undefined,
        "data-pilotid": pilotId,
        "data-maneuverkey": maneuver.key
      })
    );
    cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
    cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
  }

  bearingFunction(maneuverBearings, cells, speed, bearingValue) {
    if (maneuverBearings.includes(bearingValue)) {
      const { isEditable, maneuvers, pilotId } = this.props;
      const maneuver = findManeuver(maneuvers, bearingValue, speed);

      if (maneuver !== undefined) {
        const { difficulty } = maneuver;
        const image = createManeuverIcon(bearingValue, speed, difficulty);
        cells.push(
          ReactUtils.createCell(image, cells.length, "b--xw-medium tc xw-min-w1-5", {
            onClick: isEditable ? this.selectionChanged : undefined,
            "data-pilotid": pilotId,
            "data-maneuverkey": maneuver.key
          })
        );
      } else {
        cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium xw-min-w1-5"));
      }
    }
  }

  selectionChangedFunction(event) {
    const { element: oldElement } = this.state;

    if (oldElement) {
      oldElement.className = removeClass(oldElement, "bg-xw-medium");
    }

    const element = event.currentTarget;
    const pilotId = element.dataset.pilotid;
    const maneuverKey = element.dataset.maneuverkey;
    this.setState({
      element
    });
    element.className = addClass(element, "bg-xw-medium");

    const { callback } = this.props;

    if (callback) {
      callback({
        pilotId,
        maneuverKey
      });
    }
  }

  render() {
    const { maneuvers, pilotName, shipName } = this.props;
    const minSpeed = determineMinimumSpeed(maneuvers);
    const maxSpeed = determineMaximumSpeed(maneuvers);
    const bearingValues = [
      "Turn Left",
      "Bank Left",
      "Straight",
      "Bank Right",
      "Turn Right",
      "Segnor's Loop Left",
      "Tallon Roll Left",
      "Koiogran Turn",
      "Segnor's Loop Right",
      "Tallon Roll Right"
    ];
    const maneuverBearings = R.map(R.prop("bearing"), maneuvers);
    const rows0 = [];

    if (pilotName !== undefined) {
      rows0.push(
        ReactUtils.createRow(ReactUtils.createCell(pilotName), rows0.length, "bg-xw-light black f6")
      );
    }

    if (shipName !== undefined) {
      rows0.push(
        ReactUtils.createRow(ReactUtils.createCell(shipName), rows0.length, "bg-xw-light black f6")
      );
    }

    const rows = [];

    for (let speed = maxSpeed; speed >= minSpeed; speed -= 1) {
      const cells = [];
      cells.push(ReactUtils.createCell(speed, cells.length, "b--xw-medium center"));

      if (speed === 0 && maneuvers.includes(STATIONARY_MANEUVER)) {
        this.bearingFunction0(cells, speed);
      } else {
        bearingValues.forEach(bearingValue =>
          this.bearingFunction(maneuverBearings, cells, speed, bearingValue)
        );
      }

      rows.push(ReactUtils.createRow(cells, rows.length));
    }

    const table = ReactUtils.createTable(
      rows,
      rows0.length,
      "b--xw-medium ba bg-black bw1 tc w-100 white"
    );
    rows0.push(table);

    return ReactUtils.createTable(rows0, undefined, "b--xw-medium ba bg-black bw1 center tc white");
  }
}

ManeuverChooser.propTypes = {
  maneuvers: PropTypes.arrayOf().isRequired,
  shipName: PropTypes.string.isRequired,

  callback: PropTypes.func,
  isEditable: PropTypes.bool,
  pilotName: PropTypes.string,
  pilotId: PropTypes.number
};

ManeuverChooser.defaultProps = {
  callback: undefined,
  isEditable: true,
  pilotName: undefined,
  pilotId: undefined
};

export default ManeuverChooser;
