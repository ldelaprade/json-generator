import Ajv from 'ajv';
import configSchema from './schema_model.json';


export const getArinc429Labels = (): string[] => {
  return Object.keys(configSchema.properties.arinc429.properties.labels.properties);
};

//export const getArinc429LabelEnumValues = (label: string): number[] => {
//  return configSchema.properties.arinc429.properties.labels.properties[label].enum;
//};

// Export the schema if needed elsewhere
export { configSchema };
