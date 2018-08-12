const SquadState = {};

SquadState.create = function(
{
   id,
   name,
   year,
   description,
   points,

   pilots
})
{
   return Immutable(
   {
      id: id,
      name: name,
      year: year,
      description: description,
      points: points,

      pilots: Immutable(pilots)
   });
};

Object.freeze(SquadState);

export default SquadState;