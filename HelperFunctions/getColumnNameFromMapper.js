function getColumnNameFromMapper(mapper, column) {
    const mapperObject = parseMapperStringToObject(mapper);
    console.log("mapperObject",mapperObject)
    let returnValue= column;
    if(mapperObject)
     {returnValue= mapperObject[column] || returnValue;}
    console.log("returnValue",returnValue)
    return returnValue; // Use bracket notation to dynamically retrieve the value
  }
  
  module.exports = getColumnNameFromMapper;
  
  function parseMapperStringToObject(mapperString) {
    try {
        // Replace single quotes with double quotes to make it JSON compatible
        const jsonCompatibleString = mapperString.replace(/'/g, '"');

        // Parse the JSON string into a JavaScript object
        const parsedObject = JSON.parse(jsonCompatibleString);

        return parsedObject;
    } catch (error) {
        console.error("Failed to parse mapper string:", error.message);
        return null;
    }
}