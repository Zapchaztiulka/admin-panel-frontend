export const selectUserOptions = (state) => state.options.userOptions;
export const selectCategoryOptions = (state) => state.options.categoryOptions;
export const selectProductOptions = (state) => state.options.productOptions;
export const selectAddProductOptions = (state) =>
  state.options.productOptions?.addProducts?.options;
export const selectPatterns = (state) => state.options.patterns;
export const selectPatternsStatuses = (state) =>
  state.options.patterns.orderStatus;

export const selectIsLoading = (state) => state.options.isLoading;
export const selectError = (state) => state.options.error;
export const selectPatternsStatusesOptionsList = (state) => {
  const statuses = state.options.patterns.orderStatus;
  return statuses.map((item, index) => ({
    value: String(index),
    label: item.charAt(0).toUpperCase() + item.slice(1),
  }));
};
