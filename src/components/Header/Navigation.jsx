import { useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import { ROLE } from "../../utils/constants";
import {
  BellIcon,
  ChatIcon,
  CustomersIcon,
  FolderIcon,
  ListingViewIcon,
  ProfileIcon,
  StatisticsIcon,
} from "../../utils/icons";
import { useState } from "react";
import { ItemNavigationWithoutLink } from "./ItemNavigationWithoutLink";
import { ItemNavigation } from "./ItemNavigation";


export const Navigation = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpenCatalog, setIsOpenCatalog] = useState(true);
  const [isOpenOrders, seIisOpenOrders] = useState(true);
  const location = useLocation();

  const changeStateCatalog = () => {
    setIsOpenCatalog((prev) => !prev);
  };

  const changeStateOrders = () => {
    seIisOpenOrders((prev) => !prev);
  };
  return (
    <nav>
      {isLoggedIn && (
        <ul className="flex flex-col gap-[8px] " >
          <li>
            <ul className="flex flex-col gap-[4px]">
              <ItemNavigationWithoutLink
                component={<ListingViewIcon className="stroke-iconPrimary" />}
                title="Каталог"
                changeState={changeStateCatalog}
                isOpen={isOpenCatalog}
              />
            
              {isOpenCatalog && (
                <>
                  <ItemNavigation  style='ml-[28px]' to="/products" title="Товари" />
                  <ItemNavigation style='ml-[28px]' to="" title="Категорії" />
                  <ItemNavigation style='ml-[28px]' to="" title="Статична інформація" />
                </>
              )}
            </ul>
          </li>

          <ItemNavigation
            to="/clients"
            title="Клієнти"
            component={<CustomersIcon className={ location.pathname === "/clients" ? "stroke-currentColor":"stroke-iconPrimary"} />}
          />
          <li>
            <ul>
              <ItemNavigationWithoutLink
                component={<BellIcon className="stroke-iconPrimary" />}
                title="Замовлення"
                changeState={changeStateOrders}
                isOpen={isOpenOrders}
              />
              {isOpenOrders && (
                <>
                  <ItemNavigation style='ml-[28px]' to="/orders/pending" title="Нові" />
                  <ItemNavigation style='ml-[28px]' to="/orders/processed" title="Опрацьовані" />
                </>
              )}
            </ul>
          </li>

          <ItemNavigation
            to="/chatbot"
            title="Чатбот"
            component={<ChatIcon className={ location.pathname === "/chatbot" ? "stroke-currentColor":"stroke-iconPrimary"} />}
          />

          <ItemNavigation
            to="/"
            title="Статистика"
            component={<StatisticsIcon className={ location.pathname === "/" ? "stroke-currentColor":"stroke-iconPrimary"}/>}
          />
          <ItemNavigation
            to="/profile"
            title="Мій профіль"
            component={<ProfileIcon className={ location.pathname === "/profile" ? "stroke-currentColor":"stroke-iconPrimary"} />}
          />

          {user.role === ROLE.superAdmin && (
            <ItemNavigation style="relative mt-[24px] "
              styleBefore="before:content-[''] before:absolute before:top-[-16px] before:left-0 
            before:block before:w-[226px] before:h-[1px] before:bg-borderDefault" 
              to="/manager"
              title="Менеджери"
              component={<FolderIcon className={ location.pathname === "/manager" ? "stroke-currentColor":"stroke-iconPrimary"} />}
            />
          )}
        </ul>
      )}
    </nav>
  );
};
