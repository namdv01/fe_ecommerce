const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, $data: true });
addFormats(ajv);
require('ajv-errors')(ajv, { singleError: true });

const validation = (schema, data) => {
  const valid = ajv.compile(schema);
  return {
    result: valid(data),
    errors: valid.errors,
  };
};

const checkError = (schema, data) => {
  const result = validation(schema, data);
  return (
    result.errors?.map((item) => {
      const obj = {};
      obj[item.instancePath.split('/')[1]] = item.message;
      return obj;
    }) || 'Không có lỗi'
  );
};

export default checkError;
