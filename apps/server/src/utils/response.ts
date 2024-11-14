import type { ResourceConfig, SendResponseOptions } from "@/@types/FieldConfig";

export function sendResponse({
  fastify,
  statusCode = 200,
  status = "success",
  message = null,
  data = null,
  config = {},
}: SendResponseOptions) {
  const response: Record<string, any> = { status };

  if (message || !data) {
    response.message = message ?? (statusCode < 400 ? "Request successful" : "An error occurred");
  }

  if (data) {
    if (Object.keys(config).length === 0) {
      response.data = data;
    } else {
      response.data = transformData(data, config);
    }
  }

  return fastify.code(statusCode).send(response);
}

function transformData(data: any, config: ResourceConfig) {
  if (Array.isArray(data)) {
    return data.map(item => transformItem(item, config));
  }
  return transformItem(data, config);
}

function transformItem(item: any, config: ResourceConfig) {
  const transformed: Record<string, any> = {};

  Object.keys(config).forEach(key => {
    const fieldConfig = config[key];

    if (Array.isArray(fieldConfig)) {
      transformed[key] = fieldConfig.map(field => item[field.field] || null);
    } else {
      const field = fieldConfig.field;
      const alias = fieldConfig.alias || key;

      if (fieldConfig.children) {
        transformed[alias] = processChildren(item[field], fieldConfig.children);
      } else if (fieldConfig === true) {
        transformed[alias] = item[field] || null;
      } else {
        transformed[alias] = item[field] || null;
      }
    }
  });

  return transformed;
}

function processChildren(nestedData: any, childrenConfig: Record<string, any>) {
  if (!nestedData) return null;

  const nestedTransformed: Record<string, any> = {};

  Object.keys(childrenConfig).forEach(childKey => {
    const childConfig = childrenConfig[childKey];

    if (childConfig === true) {
      nestedTransformed[childKey] = nestedData[childKey] || null;
    } else if (typeof childConfig === 'object' && childConfig.field) {
      nestedTransformed[childKey] = nestedData[childConfig.field] || null;
    }
  });

  return nestedTransformed;
}
