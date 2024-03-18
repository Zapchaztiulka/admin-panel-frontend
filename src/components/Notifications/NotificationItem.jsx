import { dismissNotification } from "@/redux/notifications/notificationsSlice"
import { useDispatch } from "react-redux"
import { useTimeoutFn } from "react-use"

import theme from "../../../presets";
import CheckCircleIcon from 'universal-components-frontend/src/components/icons/universalComponents/CheckCircleIcon';
import CloseIcon from 'universal-components-frontend/src/components/icons/universalComponents/CloseIcon';

export const NotificationItem = ({
  notification: { id, autoHideDuration = 3000, message, onClose = () => {}, type = 'success' },
}) => {
  const dispatch = useDispatch()

  const handleDismiss = () => {
    onClose();
    dispatch(dismissNotification(id))
  }

  const [, cancel, reset] = useTimeoutFn(
    handleDismiss,
    autoHideDuration
  )

  const onMouseEnter = () => cancel()
  const onMouseLeave = () => reset()

  
  let sizeStyle = "w-[600px]";
  let textColor = 'textSuccess';
  let borderColor = 'borderSuccess';
  let bgColor = 'bgSuccessLight';
  let iconColor = theme.extend.colors.iconSuccess;

  if (type == 'error') {
      textColor = 'textError';
      borderColor = 'borderError';
      bgColor = 'bgErrorLight';
      iconColor = theme.extend.colors.iconError;
  }

  return (
      <div className="max-w-xs "
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={`my-xs2`}>
            <div className={`flex items-center ${sizeStyle} border-1 border-${borderColor} bg-${bgColor} text-${textColor} rounded-medium px-s py-xs`}>
                <p className="flex items-center">
                    <CheckCircleIcon color={iconColor} className="inline-block mr-[3px]" />
                    <span>{message}</span>
                </p>

                <div className="pl-4 ml-auto">
                  <button
                    onClick={handleDismiss}
                    className='p-1 rounded transition-colors duration-100'
                  >
                    <CloseIcon color={iconColor}/>
                  </button>
                </div>
            </div>
            
        </div>
      </div>
  )
}