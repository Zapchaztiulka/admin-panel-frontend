import PropTypes from "prop-types";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "../../utils/icons";

const modalContainer = document.getElementById("modal-root");

export const ModalContainer = ({ toggle, children }) => {
  useEffect(() => {
    if (toggle) {
      document.body.style.overflow = "hidden";
    }
  }, [toggle]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        toggle();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [toggle]);

  const onBackdroplOpen = (event) => {
    if (event.target === event.currentTarget) {
      toggle();
    }
  };
  return createPortal(
    <>
      <div onClick={onBackdroplOpen} className="fixed z-40 top-[0] left-[0] w-[100vw] h-[100vh] bg-aditional1">
              <div className="absolute z-30 top-[0] left-[0] pt-[24px] pb-[24px] pr-[16px] pl-[16px] w-[304px] h-[100vh]
               bg-bgGreyLigth rounded-tr-minimal rounded-br-minimal border-r-[1px] border-borderDefault border-solid
               mobile375:w-[347px]
               ">
          <button type="button" onClick={toggle} className="absolute top-[24px] right-[16px]">
           <CloseIcon className='stroke-iconPrimary' />
          </button>
          {children}
        </div>
      </div>
    </>,
    modalContainer
  );
};

ModalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  toggle: PropTypes.func.isRequired,
};
