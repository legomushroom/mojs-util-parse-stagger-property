/**
 * Function to check whether a property is a stagger `map`.
 * @param {*} prop Property to check.
 * @returns {Boolean} If property is stagger map.
 */
export const isStaggerMap = function (prop) {
  return (prop instanceof Array) && (prop.__mojs__isStaggerMap);
};

/**
 * Function to check whether a property is a stagger `function`.
 * @param {*} prop Property to check.
 * @returns {Boolean} If property is stagger function.
 */
export const isStaggerFunction = function (prop) {
  return typeof prop === 'function' && prop.__mojs__isStaggerFunction;
};

/**
 * Function to parse stagger utility function to a value.
 * @param {*} prop Property to check.
 * @param {Number} index Index of the current item.
 * @param {Number} totalItems Total items in stagger.
 * @returns {*} Parsed property or property itself(if not stagger prop).
 */
export const parseStaggerProperty = function (prop, index, totalItems) {
  // if property is an array map the index to some array item
  if (isStaggerMap(prop)) {
    prop = prop[index % prop.length];
  }
  // if prop is a function, call the it with index and return the result
  if (isStaggerFunction(prop)) {
    prop = prop(index, totalItems);
  }
  // if nested, parse it
  return (isStaggerMap(prop) || isStaggerFunction(prop))
    ? parseStaggerProperty(prop, index, totalItems)
    : prop;
};

export default parseStaggerProperty;
