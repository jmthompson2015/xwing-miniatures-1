import ReactUtils from "../ReactUtilities.js";

class ManeuverChooser extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         element: undefined,
      };

      this.selectionChanged = this.selectionChangedFunction.bind(this);
   }

   render()
   {
      const maneuvers = this.props.maneuvers;
      const minSpeed = determineMinimumSpeed(maneuvers);
      const maxSpeed = determineMaximumSpeed(maneuvers);
      const bearingValues = ["Turn Left", "Bank Left", "Straight", "Bank Right", "Turn Right",
        "Segnor's Loop Left", "Tallon Roll Left", "Koiogran Turn", "Segnor's Loop Right", "Tallon Roll Right"];
      const maneuverBearings = R.map(R.prop("bearing"), maneuvers);
      const self = this;
      const rows0 = [];

      if (this.props.pilotName !== undefined)
      {
         rows0.push(ReactUtils.createRow(ReactUtils.createCell(this.props.pilotName), rows0.length, "bg-xw-light black f6"));
      }

      if (this.props.shipName !== undefined)
      {
         rows0.push(ReactUtils.createRow(ReactUtils.createCell(this.props.shipName), rows0.length, "bg-xw-light black f6"));
      }

      const rows = [];

      for (let speed = maxSpeed; speed >= minSpeed; speed--)
      {
         const cells = [];
         cells.push(ReactUtils.createCell(speed, cells.length, "b--xw-medium center"));

         if (speed === 0 && maneuvers.includes(STATIONARY_MANEUVER))
         {
            bearingFunction0(self)(cells)(speed);
         }
         else
         {
            R.forEach(bearingFunction(maneuverBearings)(self)(cells)(speed), bearingValues);
         }

         rows.push(ReactUtils.createRow(cells, rows.length));
      }

      const table = ReactUtils.createTable(rows, rows0.length, "b--xw-medium bg-black tc w-100 white");
      rows0.push(table);

      return ReactUtils.createTable(rows0, undefined, "b--xw-medium bg-black center tc white");
   }
}

ManeuverChooser.prototype.selectionChangedFunction = function(event)
{
   const oldElement = this.state.element;

   if (oldElement)
   {
      removeClass(oldElement, "bg-xw-medium");
   }

   const element = event.currentTarget;
   const pilotId = element.dataset.pilotid;
   const maneuverKey = element.dataset.maneuverkey;
   this.setState(
   {
      element: element,
   });
   addClass(element, "bg-xw-medium");

   const callback = this.props.callback;

   if (callback)
   {
      callback(
      {
         pilotId: pilotId,
         maneuverKey: maneuverKey
      });
   }
};

////////////////////////////////////////////////////////////////////////////////
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

const addClass = (element, cls) =>
{
   element.className += (hasClass(element, cls) ? "" : " " + cls);
};

const bearingFunction0 = self => cells => speed =>
{
   const isEditable = self.props.isEditable;
   const pilotId = self.props.pilotId;
   const maneuver = STATIONARY_MANEUVER;
   const difficulty = maneuver.difficulty;
   const image = createManeuverIcon(undefined, speed, difficulty);

   cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
   cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
   cells.push(ReactUtils.createCell(image, cells.length, "b--xw-medium xw-min-w1-5",
   {
      onClick: (isEditable ? self.selectionChanged : undefined),
      "data-pilotid": pilotId,
      "data-maneuverkey": maneuver.key,
   }));
   cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
   cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium"));
};

const bearingFunction = maneuverBearings => self => cells => speed => bearingValue =>
{
   if (maneuverBearings.includes(bearingValue))
   {
      const isEditable = self.props.isEditable;
      const pilotId = self.props.pilotId;
      const maneuvers = self.props.maneuvers;
      const maneuver = findManeuver(maneuvers, bearingValue, speed);

      if (maneuver !== undefined)
      {
         const difficulty = maneuver.difficulty;
         const image = createManeuverIcon(bearingValue, speed, difficulty);
         cells.push(ReactUtils.createCell(image, cells.length, "b--xw-medium tc xw-min-w1-5",
         {
            onClick: (isEditable ? self.selectionChanged : undefined),
            "data-pilotid": pilotId,
            "data-maneuverkey": maneuver.key,
         }));
      }
      else
      {
         cells.push(ReactUtils.createCell(" ", cells.length, "b--xw-medium xw-min-w1-5"));
      }
   }
};

const createManeuverIcon = function(bearing, speed, difficulty)
{
   const defaultSrc = (bearing, speed) => (speed === 0 ? "stop" : (speed === -1 ? "reverse" : "") + bearing.toLowerCase().replace(/ /g, ""));
   const src = R.defaultTo(defaultSrc(bearing, speed), BEARING_TO_FONT[bearing]);
   const className = "xw-f8" + (difficulty === "Easy" ? " green" : (difficulty === "Hard" ? " red" : ""));

   return ReactDOMFactories.span(
   {
      className: className,
   }, ReactDOMFactories.i(
   {
      className: "xwing-miniatures-font xwing-miniatures-font-" + src,
   }));
};

const determineMaximumSpeed = maneuvers => R.reduce((accum, maneuver) => Math.max(accum, maneuverSpeed(maneuver)), Number.NEGATIVE_INFINITY, maneuvers);

const determineMinimumSpeed = maneuvers => R.reduce((accum, maneuver) => Math.min(accum, maneuverSpeed(maneuver)), Number.POSITIVE_INFINITY, maneuvers);

const findManeuver = function(maneuvers, bearingIn, speedIn)
{
   const isBearing = maneuver => R.equals(maneuverBearing(maneuver), bearingIn);
   const isSpeed = maneuver => R.equals(maneuverSpeed(maneuver), speedIn);

   return R.find(R.both(isBearing, isSpeed), maneuvers);
};

const hasClass = (element, cls) => element.className.match(regex(cls));

const maneuverBearing = maneuver => (maneuver.bearing.startsWith("Reverse") ? maneuver.bearing.substring("Reverse ".length) : maneuver.bearing);

const maneuverSpeed = maneuver => (maneuver.bearing.startsWith("Reverse") ? -1 : 1) * maneuver.speed;

const regex = cls => new RegExp('(\\s|^)' + cls + '(\\s|$)');

const removeClass = (element, cls) =>
{
   element.className = (hasClass(element, cls) ? element.className.replace(regex(cls), ' ') : element.className);
};

ManeuverChooser.propTypes = {
   maneuvers: PropTypes.array.isRequired,
   shipName: PropTypes.string.isRequired,

   callback: PropTypes.func,
   isEditable: PropTypes.bool,
   pilotName: PropTypes.string,
   pilotId: PropTypes.number,
};

ManeuverChooser.defaultProps = {
   isEditable: true
};

export default ManeuverChooser;