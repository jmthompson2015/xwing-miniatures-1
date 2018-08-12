import ReactUtils from "../ReactUtilities.js";

import EntityUI from "./EntityUI.js";

class AbilityChooser extends React.Component
{
   constructor(props)
   {
      super(props);

      this.state = {
         selected: this.props.initialAbility
      };

      this.handleChange = this.handleChangeFunction.bind(this);
   }

   render()
   {
      const abilities = this.props.abilities;
      const inputProps = R.merge(
      {
         name: "chooseAbility", // needed for radio
         onChange: this.handleChange,
         type: "radio"
      }, this.props.clientProps);

      let i = 0;
      const selected = this.state.selected;
      const mapFunction = ability =>
      {
         const input = ReactDOMFactories.input(R.merge(inputProps,
         {
            id: i,
            defaultChecked: (ability === selected)
         }));
         const label = labelFunction(ability);
         const cells = [];
         cells.push(ReactUtils.createCell(input, cells.length, "pa1 v-mid"));
         cells.push(ReactUtils.createCell(label, cells.length, "pa1 v-mid"));

         return ReactUtils.createRow(cells, "row" + ability.sourceName + ability.sourceKey + i++);
      };
      const rows = R.map(mapFunction, abilities);

      return ReactUtils.createTable(rows, undefined, this.props.panelClass);
   }
}

AbilityChooser.prototype.handleChangeFunction = function(event)
{
   const id = event.target.id;
   const selected = this.props.abilities[id];

   this.setState(
      {
         selected: selected,
      },
      this.props.onChange(selected));
};

const labelFunction = function(ability)
{
   return React.createElement(EntityUI,
   {
      sourceName: ability.sourceName,
      sourceKey: ability.sourceKey
   });
};

AbilityChooser.propTypes = {
   onChange: PropTypes.func.isRequired,
   abilities: PropTypes.array.isRequired,

   clientProps: PropTypes.object,
   initialAbility: PropTypes.object,
   panelClass: PropTypes.string,
};

AbilityChooser.defaultProps = {
   clientProps:
   {},
   panelClass: "bg-xw-light f6"
};

export default AbilityChooser;