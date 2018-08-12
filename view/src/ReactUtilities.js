const ReactUtilities = {};

ReactUtilities.createButton = function(element, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: className
   });

   return ReactDOMFactories.button(newProps, element);
};

ReactUtilities.createCell = function(element, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: "dtc" + (className ? " " + className : "")
   });

   return ReactDOMFactories.div(newProps, element);
};

ReactUtilities.createFlexbox = function(cells, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: "flex" + (className ? " " + className : "")
   });

   return ReactDOMFactories.div(newProps, cells);
};

ReactUtilities.createFlexboxWrap = function(cells, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: "flex flex-wrap" + (className ? " " + className : "")
   });

   return ReactDOMFactories.div(newProps, cells);
};

ReactUtilities.createImg = function(src, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      src: src,
      key: key,
      className: className
   });

   return ReactDOMFactories.img(newProps);
};

ReactUtilities.createRow = function(cells, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: "dt-row" + (className ? " " + className : "")
   });

   return ReactDOMFactories.div(newProps, cells);
};

ReactUtilities.createSpan = function(element, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: className
   });

   return ReactDOMFactories.span(newProps, element);
};

ReactUtilities.createTable = function(rows, key, className, props = {})
{
   const newProps = R.merge(props,
   {
      key: key,
      className: "dt" + (className ? " " + className : "")
   });

   return ReactDOMFactories.div(newProps, rows);
};

export default ReactUtilities;