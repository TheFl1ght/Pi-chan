export interface OverridesData {
  fields: Record<string, string>;
  addedItems: Record<string, unknown[]>;
  deletedItems: Record<string, string[]>;
}

export const EMPTY_OVERRIDES: OverridesData = {
  fields: {},
  addedItems: {},
  deletedItems: {},
};
