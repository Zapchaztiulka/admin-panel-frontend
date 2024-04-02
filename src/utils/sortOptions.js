export const sortOptions = (options) => options?.sort((a, b) => {
    if (a?.render?.position < b?.render?.position) return -1;
    if (a?.render?.position > b?.render?.position) return 1;
    return 0;
})