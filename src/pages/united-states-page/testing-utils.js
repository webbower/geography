export const createTestMapData = () => [
  { id: "IL", name: "Illinois", path: "M0 0z" },
  { id: "CT", name: "Connecticut", path: "M0 0z" },
  { id: "MO", name: "Missouri", path: "M0 0z" },
];

export const reduceActions = (reducer, actions = []) =>
  actions.reduce(reducer, reducer());
