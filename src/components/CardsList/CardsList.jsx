
export const CardsList = ({data, cardComponent: CardComponent, cardComponentProps}) => {
  return (
    <div className='grid grid-cols-1 gap-xs tablet600:grid-cols-2'>
        {data.map(item => {
            return(<CardComponent item={item} {...cardComponentProps} key={item._id}/>)
        })}
    </div>
  )
}
