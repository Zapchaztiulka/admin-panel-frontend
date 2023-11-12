import PropTypes from "prop-types";
import theme from "../../../../presets";

const AttachIcon = ({ isChatRoomInProgress }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M14.8287 7.7574L9.1718 13.4143C8.78127 13.8048 8.78127 14.4379 9.1718 14.8285C9.56232 15.219 10.1955 15.219 10.586 14.8285L16.2429 9.17161C17.4144 8.00004 17.4144 6.10055 16.2429 4.92897C15.0713 3.7574 13.1718 3.7574 12.0002 4.92897L6.34337 10.5858C4.39075 12.5384 4.39075 15.7043 6.34337 17.6569C8.29599 19.6095 11.4618 19.6095 13.4144 17.6569L19.0713 12L20.4855 13.4143L14.8287 19.0711C12.095 21.8048 7.66283 21.8048 4.92916 19.0711C2.19549 16.3374 2.19549 11.9053 4.92916 9.17161L10.586 3.51476C12.5386 1.56214 15.7045 1.56214 17.6571 3.51476C19.6097 5.46738 19.6097 8.63321 17.6571 10.5858L12.0002 16.2427C10.8287 17.4143 8.92916 17.4143 7.75759 16.2427C6.58601 15.0711 6.58601 13.1716 7.75759 12L13.4144 6.34319L14.8287 7.7574Z"
      fill={
        !isChatRoomInProgress
          ? theme.colors.iconDisabled
          : theme.colors.iconPrimary
      }
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.1718 14.8285C8.78127 14.4379 8.78127 13.8048 9.1718 13.4143L14.8287 7.7574L13.4144 6.34319L7.75759 12C6.58601 13.1716 6.58601 15.0711 7.75759 16.2427C8.92916 17.4143 10.8287 17.4143 12.0002 16.2427L17.6571 10.5858C19.6097 8.63321 19.6097 5.46738 17.6571 3.51476C15.7045 1.56214 12.5386 1.56214 10.586 3.51476L4.92916 9.17161C2.19549 11.9053 2.19549 16.3374 4.92916 19.0711C7.66283 21.8048 12.095 21.8048 14.8287 19.0711L20.4855 13.4143L19.0713 12L13.4144 17.6569C11.4618 19.6095 8.29599 19.6095 6.34337 17.6569C4.39075 15.7043 4.39075 12.5384 6.34337 10.5858L12.0002 4.92897C13.1718 3.7574 15.0713 3.7574 16.2429 4.92897C17.4144 6.10055 17.4144 8.00004 16.2429 9.17161L10.586 14.8285C10.1955 15.219 9.56232 15.219 9.1718 14.8285ZM19.0713 12.5657L13.6972 17.9397C11.5884 20.0486 8.16936 20.0485 6.06053 17.9397C3.9517 15.8309 3.9517 12.4118 6.06053 10.303L11.7174 4.64613C13.0452 3.31835 15.1979 3.31835 16.5257 4.64612C17.8534 5.97391 17.8535 8.12666 16.5258 9.45444L10.8688 15.1113C10.3221 15.6581 9.43569 15.658 8.88896 15.1113C8.34228 14.5646 8.34219 13.6782 8.88896 13.1315C8.88895 13.1315 8.88896 13.1315 8.88896 13.1315L14.263 7.75741L13.4144 6.90886L8.04043 12.2828C7.02506 13.2982 7.02506 14.9445 8.04043 15.9599C9.0558 16.9753 10.7021 16.9752 11.7173 15.9599L17.3743 10.303C19.1706 8.50658 19.1706 5.59401 17.3743 3.7976C15.5779 2.00119 12.6652 2.00119 10.8688 3.7976L5.212 9.45445C2.63454 12.0319 2.63454 16.2108 5.212 18.7883C7.78946 21.3657 11.9684 21.3657 14.5459 18.7883L19.9198 13.4143L19.0713 12.5657Z"
      fill="white"
    />
  </svg>
);

export default AttachIcon;

AttachIcon.propTypes = {
  isChatRoomInProgress: PropTypes.bool.isRequired,
};
