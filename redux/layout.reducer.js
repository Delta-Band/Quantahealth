export default function reducer(
  state = {
    brand: {},
    seo: {}
  },
  action
) {
  switch (action.type) {
    case countActionTypes.ADD:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    default:
      return state;
  }
}
