export default function parseParams(baseObject, params = new URLSearchParams(window.location.search), arrSeparator = ',') {
  if(!baseObject || typeof(baseObject) !== 'object') throw new Error('baseObject property must be declared and a object');
  if(!params?.get) throw new Error('search params must be initialized like "new URLSearchParams(query)"');
  if(!arrSeparator) throw new Error('arr separator must not be empty');

  const obj = {};

  for(const key in baseObject) {    
    const param = params.get(key);

    if(param !== null)  
      obj[key] = parseByType(param, baseObject[key], arrSeparator);
    else 
      obj[key] = null;
  }

  return obj;
}

export function parseByType (variable, property, arrSeparator) {
  if (typeof(variable) !== 'string') throw new Error('variable and type must be strings');

  let result;

  switch(typeof(property)){
    case 'string':
      result = variable;
      break;
    case 'number':
      result = +variable;
      break;
    case 'object':
      if(Array.isArray(property))
        result = variable.split(arrSeparator);
      break;
    case 'boolean':
      result = stringToBoolean(variable);
      break;
    default:
      console.log(`type ${typeof(property)} not mapped`)
  }

  return result;
}


export function stringToBoolean (stringValue) {
  switch(stringValue?.toLowerCase()?.trim()){
      case "true": 
      case "yes": 
      case "1": 
        return true;

      case "false": 
      case "no": 
      case "0": 
      case null: 
      case undefined:
        return false;

      default: 
        return false;
  }
}