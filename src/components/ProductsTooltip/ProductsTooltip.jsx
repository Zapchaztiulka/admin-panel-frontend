
const ProductsTooltip = ({value}) => {
  return (
    <div
      className="w-[180px] mobile375:w-[364px] bg-bgWhite flex gap-xs2 p-xs rounded-medium2 shadow-tooltip">
      <div className='flex flex-col gap-xs2 overflow-hidden'>
      {value.map(item => (
          <p className='text-textInputActive truncate' key={item.name}>{item.name}</p>
      )
      )}</div>
    </div>
  );
};
export default ProductsTooltip