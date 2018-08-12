const ManeuverState = {};

ManeuverState.create = function(
{
   color,
   fromPolygon,
   fromPosition,
   path,
   toPolygon
})
{
   return Immutable(
   {
      color: color,
      fromPolygon: fromPolygon,
      fromPosition: fromPosition,
      path: path,
      toPolygon: toPolygon
   });
};

Object.freeze(ManeuverState);

export default ManeuverState;