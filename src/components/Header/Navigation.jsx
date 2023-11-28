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
import { ItemNavigation } from "./ItemNavigation";
import { ArrowButton } from "../Buttons/ArrowButton";

export const Navigation = () => {
  const { isLoggedIn, user } = useAuth();
  const [isOpenCatalog, setIsOpenCatalog] = useState(true);
  const [isOpenOrders, setIsOpenOrders] = useState(true);
  const location = useLocation();

  const changeStateCatalog = () => {
    setIsOpenCatalog((prev) => !prev);
  };

  const changeStateOrders = () => {
    setIsOpenOrders((prev) => !prev);
  };
  return (
    <nav>
      {isLoggedIn && (
        <ul className="flex flex-col gap-xs2 ">
          <li>
            <ul className="flex flex-col gap-xs3">
                       <li>
                <ItemNavigation
                  iconComponent={
                    <ListingViewIcon className="stroke-iconPrimary" />
                  }
                  title="Каталог"
                  changeState={changeStateCatalog}
                  arrowButton={
                    <ArrowButton
                      changeState={changeStateCatalog}
                      isOpen={isOpenCatalog}
                    />
                  }
                />
              </li>
              {isOpenCatalog && (
                <>
                  <li>
                    {" "}
                    <ItemNavigation
                      style="ml-m1"
                      to="/products"
                      title="Товари"
                    />
                  </li>
                  <li>
                    {" "}
                    <ItemNavigation
                      style="ml-m1"
                      to="/"
                      title="Категорії"
                    />
                  </li>
                  <li>
                    {" "}
                    <ItemNavigation
                      style="ml-m1"
                      to="/static"
                      title="Статична інформація"
                    />
                  </li>
                </>
              )}
            </ul>
          </li>
          <li>
            <ItemNavigation
              to="/clients"
              title="Клієнти"
              iconComponent={
                <CustomersIcon
                  className={
                    location.pathname === "/clients"
                      ? "stroke-iconBrandDark"
                      : "stroke-iconPrimary"
                  }
                />
              }
            />
          </li>
          <li>
            <ul>
              <li>
                <ItemNavigation
                  iconComponent={<BellIcon className="stroke-iconPrimary" />}
                  title="Замовлення"
                  changeState={changeStateOrders}
                  arrowButton={
                    <ArrowButton
                      changeState={changeStateOrders}
                      isOpen={isOpenCatalog}
                    />
                  }
                />
              </li>

              {isOpenOrders && (
                <>
                  <li>
                    {" "}
                    <ItemNavigation
                      style="ml-m1"
                      to="/orders/pending"
                      title="Нові"
                    />
                  </li>
                  <li>
                    <ItemNavigation
                      style="ml-m1"
                      to="/orders/processed"
                      title="Опрацьовані"
                    />
                  </li>
                </>
              )}
            </ul>
          </li>

          <li>
            {" "}
            <ItemNavigation
              to="/chatbot"
              title="Чатбот"
              iconComponent={
                <ChatIcon
                  className={
                    location.pathname === "/chatbot"
                      ? "stroke-iconBrandDark"
                      : "stroke-iconPrimary"
                  }
                />
              }
            />
          </li>

          <li>
            {" "}
            <ItemNavigation
              to="/"
              title="Статистика"
              iconComponent={
                <StatisticsIcon
                  className={
                    location.pathname === "/"
                      ? "stroke-iconBrandDark"
                      : "stroke-iconPrimary"
                  }
                />
              }
            />
          </li>

          <li>
            <ItemNavigation
              to="/profile"
              title="Мій профіль"
              iconComponent={
                <ProfileIcon
                  className={
                    location.pathname === "/profile"
                      ? "stroke-iconBrandDark"
                      : "stroke-iconPrimary"
                  }
                />
              }
            />
          </li>

          {user.role === ROLE.superAdmin && (
            <li>
              {" "}
              <ItemNavigation
                style="relative mt-m "
                styleBefore="before:content-[''] before:absolute before:-top-s before:left-0 
            before:block before:w-[226px] before:h-[1px] before:bg-borderDefault"
                to="/manager"
                title="Менеджери"
                iconComponent={
                  <FolderIcon
                    className={
                      location.pathname === "/manager"
                        ? "stroke-iconBrandDark"
                        : "stroke-iconPrimary"
                    }
                  />
                }
              />
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};
