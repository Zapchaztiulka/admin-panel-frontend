import { ThreeDots } from  'react-loader-spinner'

export const Loader = () => {
    return (
        <div className='z-[1000] fixed top-[0] left-[0]
        w-[100%] h-[100%] bg-bgGreyLigth'>
        <ThreeDots 
height="16" 
width="64" 
radius="9"
color="#53B1FD" 
ariaLabel="three-dots-loading"
wrapperStyle={{position: "absolute", bottom: "50%", right: "44.5%" }}
visible={true}
            />
            </div>
    )
}