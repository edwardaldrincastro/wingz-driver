export const deleteKey = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  let tempObject: object = { ...object };
  keys.forEach((eachKey: U) => {
    if (eachKey in tempObject) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [eachKey]: deletedKey, ...rest } = tempObject;
      tempObject = { ...rest };
    }
  });
  return tempObject;
};

export const extractKey = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  let tempObject: object = {};
  keys.forEach((eachKey: U) => {
    if (eachKey in object) {
      // const { [eachKey]: deletedKey, ...rest } = tempObject;
      tempObject = { ...tempObject, [eachKey]: object[eachKey] };
    }
  });
  return tempObject;
};

export const validateObject = <T extends object, U extends keyof T>(object: T, keys: U[]) => {
  const validation = keys.map((eachKey: U) => {
    if (object[eachKey]) {
      return true;
    }
    return false;
  });
  return validation.includes(false) === false;
};
