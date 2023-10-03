export const selectUserOptions = (state) => state.options.userOptions;
export const selectCategoryOptions = (state) => state.options.categoryOptions;
export const selectProductOptions = (state) => state.options.productOptions;
export const selectAddProductOptions = (state) => state.options.productOptions?.addProducts?.options;
export const selectIsLoading = (state) => state.options.isLoading;
export const selectError = (state) => state.options.error;
