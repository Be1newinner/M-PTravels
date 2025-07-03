/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, Model } from "mongoose";

export function mongooseModelToSwagger<T>(model: Model<T>): any[] {
  const modelName = model.modelName;
  const schema: Schema<T> = model.schema;

  const swaggerSchema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  } = {
    type: "object",
    properties: {},
  };

  Object.entries(schema.paths).forEach(([key, path]) => {
    const schemaType = path as any;

    let swaggerType: string | undefined;
    switch (schemaType.instance) {
      case "String":
        swaggerType = "string";
        break;
      case "Number":
        swaggerType = "number";
        break;
      case "Boolean":
        swaggerType = "boolean";
        break;
      case "Date":
        swaggerType = "string";
        swaggerSchema.properties[key] = {
          type: swaggerType,
          format: "date-time",
        };
        return;
      case "Array":
        swaggerType = "array";
        swaggerSchema.properties[key] = {
          type: "array",
          items: { type: "string" }, 
        };
        return;
      case "ObjectId":
        swaggerType = "string"; 
        break;
      case "Embedded":
        const embeddedSchema = schemaType.schema as Schema;
        if (embeddedSchema) {
          swaggerSchema.properties[key] = {
            type: "object",
            properties: mongooseModelToSwagger({
              modelName: key,
              schema: embeddedSchema,
            } as Model<any>)[1].properties,
          };
        }
        return;
    }

    if (swaggerType) {
      swaggerSchema.properties[key] = { type: swaggerType };
    }

    if (schema.requiredPaths().includes(key)) {
      swaggerSchema.required = swaggerSchema.required || [];
      swaggerSchema.required.push(key);
    }
  });

  return [modelName, swaggerSchema];
}
