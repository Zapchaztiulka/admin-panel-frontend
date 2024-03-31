import Grid from '@/components/Grid/Grid';
import {
  createOrderByAny,
  getAllOrders,
  updateOrderByAdmin,
} from '@/redux/orders/operations';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BigButton } from '../../components/Buttons/BigButton';
import { getGridHeight } from '@/utils/grid';
import { columns } from './columns';

import { Input } from 'universal-components-frontend/src/components/inputs';
import { Dropdown } from 'universal-components-frontend/src/components/select';
import { Button } from 'universal-components-frontend/src/components/buttons';
import SearchIcon from 'universal-components-frontend/src/components/icons/universalComponents/SearchIcon';
import EditIcon from 'universal-components-frontend/src/components/icons/universalComponents/EditIcon';
import PlusIcon from 'universal-components-frontend/src/components/icons/universalComponents/PlusIcon';
import FileIcon from 'universal-components-frontend/src/components/icons/universalComponents/FileIcon';
import LinkIcon from 'universal-components-frontend/src/components/icons/universalComponents/LinkIcon';
import TrashIcon from 'universal-components-frontend/src/components/icons/universalComponents/TrashIcon';

import { debounce } from './../../utils/throttle';
import { OrderCard } from '@/components/CardsList/Cards/OrderCard/OrderCard';
import { CardsList } from '@/components/CardsList/CardsList';
import theme from '../../../presets';
import { useNavigate } from 'react-router-dom';
import {
  selectPatternsStatuses,
  selectPatternsStatusesOptionsList,
} from '@/redux/options/selectors';
import { deleteOrder } from './../../redux/orders/operations';
import {
  prepareDataForCopyOrder,
  prepareDataForCreateOrder,
} from '@/utils/preparationDataToUpdateOrder';
import ModalWindowComment from './ModalWindow/ModalWindowComment';
import ModalWindowNewOrder from './ModalWindow/ModalWindowNewOrder';
import ModalDeleteOrder from './ModalWindow/ModalDeleteOrder';
import Menu from '@/components/Menu/Menu';
import { selectUser } from '@/redux/auth/selectors';
import Pagination from '@/components/Pagination/Pagination';
import { Loader } from '@/components/Loader';

const VERTICAL_PADDINGS = 24;
const FILTERS_HEIGHT = 48;
const BUTTONS_HEIGHT = 116;
const PAGINATION = 31;

const Orders = () => {
  const smallScreen = window.innerWidth < 1200 ? true : false;
  const [isSmallScreen, setIsSmallScreen] = useState(smallScreen);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [statusId, setStatusId] = useState('');
  const [chooseOrders, setChooseOrders] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);
  const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);

  const dispatch = useDispatch();
  const { orders, totalCount, isLoading } = useSelector(
    (state) => state.orders
  );
  const gridRef = useRef();
  const navigate = useNavigate();
  const admin = useSelector(selectUser);
  const adminId = admin.id;
  const statusOptions = useSelector(selectPatternsStatuses);
  const statusOptionsList = useSelector(selectPatternsStatusesOptionsList);
  const statusOptionsBigFirstLetter = statusOptions.map(
    (item) => item && item.charAt(0).toUpperCase() + item.slice(1)
  );

  const chooseOrdersIds = chooseOrders.map((i) => i._id);

  const fetchData = useCallback((data) => {
    dispatch(getAllOrders(data));
  }, []);

  const debounceFetch = useMemo(() => debounce(fetchData, 500), []);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  useEffect(() => {
    fetchData({ page, limit, query, statusId });
  }, []);

  useEffect(() => {
    debounceFetch({ page, limit, query, statusId });
  }, [page, limit, query, statusId, debounceFetch]);

  const options = {
    onGridReady: (event) => event.api.sizeColumnsToFit(),
    rowSelection: 'multiple',
  };

  const autoSizeStrategy = useMemo(() => {
    return {
      type: 'fitGridWidth',
      defaultMinWidth: 100,
      columnLimits: [
        {
          colId: 'status',
          minWidth: 200,
        },
      ],
    };
  }, []);

  const onGridReady = useCallback(() => {
    setTimeout(() => {
      gridRef.current.api.sizeColumnsToFit({
        defaultMinWidth: 100,
      });
    }, 500);
  }, [gridRef.current]);
  const gridContainerHeight = getGridHeight(
    5 * VERTICAL_PADDINGS + FILTERS_HEIGHT + BUTTONS_HEIGHT + PAGINATION
  );

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1200) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
      if (gridRef.current) {
        gridRef.current.api?.sizeColumnsToFit();
      }
    }
    const debounceResize = debounce(handleResize, 200);
    window.addEventListener('resize', debounceResize);

    handleResize();
    return () => window.removeEventListener('resize', debounceResize);
  }, []);

  const handleStatusChangeHeader = useCallback((value) => {
    setStatusId(value);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleChangePagination = useCallback(({ page, perPage }) => {
    setPage(page);
    setLimit(perPage);
  }, []);

  // Dot Items
  const handleEditClick = useCallback((orders) => {
    const firstOrderId = orders[0]._id;
    navigate(`details/${firstOrderId}`);
  }, []);

  const handleChangeStatus = useCallback(
    (statusId, orders) => {
      const orderIds = orders.map((order) => order._id);
      const orderData = {
        status: statusOptions[statusId],
        adminTag: 'ok',
        orderIds,
      };

      dispatch(
        updateOrderByAdmin({
          adminId,
          orderData,
          notifications: {
            success: 'Статус змінено.',
            fail: 'Виникла помилка при зміні статусу',
          },
        })
      );
    },
    [statusOptions, adminId, dispatch]
  );

  const handleAddComment = useCallback((orders) => {
    setShowModalComment(true);
    setChooseOrders(orders);
  }, []);

  const handleCreateNewOrder = useCallback((orders) => {
    setShowModalCreateOrder(true);
    setChooseOrders(orders);
  }, []);

  const handleDeleteOrder = useCallback((orders) => {
    setShowModalDelete(true);
    setChooseOrders(orders);
  }, []);

  const handleCopyOrder = useCallback(
    (orders) => {
      const orderForCopy = orders[0];
      if (orderForCopy) {
        const prep = prepareDataForCopyOrder(orderForCopy);

        dispatch(
          createOrderByAny({
            orderData: prep,
            notifications: {
              success: 'Замовлення успішно скопійовано',
              fail: 'Виникла помилка при копіюванні',
            },
          })
        );
      }
    },
    [orders, dispatch]
  );

  const onSelectionChanged = useCallback((event) => {
    const orders = event.api.getSelectedNodes().map((row) => row.data);
    setChooseOrders(orders);
  }, []);

  const menuSingleOrder = useMemo(() => {
    return [
      {
        title: 'Редагувати',
        icon: EditIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleEditClick,
      },
      {
        title: 'Змінити статус',
        type: 'status',
        options: statusOptionsList,
        onChange: handleChangeStatus,
      },
      {
        title: 'Додати коментар',
        icon: PlusIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleAddComment,
      },
      { type: 'divider' },
      {
        title: 'Cтворити нове замовлення',
        icon: FileIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleCreateNewOrder,
      },
      {
        title: 'Скопіювати замовлення',
        icon: LinkIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleCopyOrder,
      },
      { type: 'divider' },
      {
        title: 'Видалити',
        icon: TrashIcon,
        iconProps: { color: theme.extend.colors.iconError },
        onClick: handleDeleteOrder,
      },
    ];
  }, [
    handleEditClick,
    handleChangeStatus,
    handleAddComment,
    handleCreateNewOrder,
    handleCopyOrder,
    handleDeleteOrder,
    statusOptionsList,
  ]);

  const menuMultipleOrders = useMemo(() => {
    return [
      {
        title: 'Змінити статус',
        type: 'status',
        options: statusOptionsList,
        onChange: handleChangeStatus,
      },
      {
        title: 'Додати коментар',
        icon: PlusIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleAddComment,
      },
      {
        title: 'Видалити',
        icon: TrashIcon,
        iconProps: { color: theme.extend.colors.iconError },
        onClick: handleDeleteOrder,
      },
    ];
  }, []);

  const updatedColumns = useMemo(() => {return columns.map((col) => {
      if (col.field === 'settings') {
        col.cellRendererParams = { dotsItems: menuSingleOrder };
      }
      return col;
    });
  }, [menuSingleOrder]);
    

  const handleSelectCard = useCallback(
    (order, selected) => {
      const chooseOrdersIds = chooseOrders.map((i) => i._id);
      if (selected) {
        if (!chooseOrdersIds.includes(order._id)) {
          setChooseOrders((orders) => [...orders, order]);
        }
      } else {
        if (chooseOrdersIds.includes(order._id)) {
          setChooseOrders((orders) =>
            orders.filter((o) => o._id !== order._id)
          );
        }
      }
    },
    [chooseOrders]
  );

  // MODAL WINDOWS START
  const handleCloseModal = useCallback(() => {
    setShowModalDelete(false);
    setShowModalComment(false);
    setShowModalCreateOrder(false);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setShowModalDelete(false);
    const orderIds = chooseOrders.map((order) => order._id);
    const data = { orderIds };
    dispatch(
      deleteOrder({
        data,
        notifications: {
          success: 'Замовлення успішно видалене.',
          fail: 'Виникла помилка при видаленні замовлення',
        },
      })
    );
  }, [chooseOrders, dispatch]);

  const handleSaveComment = useCallback(
    (comment) => {
      const orderIds = chooseOrders.map((order) => order._id);
      const orderData = {
        adminComment: comment,
        adminTag: 'ok',
        orderIds: orderIds,
      };
      dispatch(
        updateOrderByAdmin({
          adminId,
          orderData,
          notifications: {
            success: 'Коментар збережено.',
            fail: 'Виникла помилка. Коментар не збережено',
          },
        })
      );
      handleCloseModal();
    },
    [adminId, chooseOrders, dispatch, handleCloseModal]
  );

  const handleCreateOrder = useCallback(
    (phone) => {
      const firstOrder = chooseOrders[0];
      const mod = prepareDataForCreateOrder(firstOrder);
      const dataForCreate = { ...mod, phone };
      dispatch(
        createOrderByAny({
          orderData: dataForCreate,
          notifications: {
            success: 'Замовлення успішно створено',
            // fail: 'Виникла помилка при створенні замовлення',
          },
        })
      );

      handleCloseModal();
    },
    [chooseOrders, dispatch, handleCloseModal]
  );
  // MODAL WINDOWS END

  return (
    <div className="flex flex-col gap-m">
      <BigButton
        key="Створити замовлення"
        to="add"
        text="Створити замовлення"
        icon={
          <PlusIcon
            className="stroke-iconContrast"
            color={theme.extend.colors.iconWhite}
          />
        }
        linkstyle={'bg-bgBrandLight3 text-textContrast'}
      />
      <div className="h-xl flex flex-col gap-xs tablet600:flex-row">
        <div className=" w-full tablet600:w-[401px] flex ">
          <Input
            inputBoxClassName="w-full"
            inputTypesFigma="SearchField"
            placeholder="Я шукаю..."
            type="text"
            value={query}
            handleChange={handleSearchChange}
          />
          <Button buttonType="search-type" icon={SearchIcon} size="small" />
        </div>

        <Dropdown
          width={290}
          options={statusOptionsBigFirstLetter}
          placeholder="Всі статуси"
          onChange={handleStatusChangeHeader}
          className="w-full tablet600:w-[290px] "
        />
      </div>

      {isLoading ? (
        <div
          className="flex justify-center items-center"
          style={{ height: gridContainerHeight }}
        >
          <Loader />
        </div>
      ) : isSmallScreen ? (
        <CardsList
          data={data}
          cardComponent={OrderCard}
          cardComponentProps={{
            dotsItems: menuSingleOrder,
            onSelect: handleSelectCard,
            selectedIds: chooseOrdersIds,
          }}
        />
      ) : (
        <div style={{ height: gridContainerHeight }}>
          <Grid
            gridRef={gridRef}
            columns={updatedColumns}
            data={data}
            options={options}
            domLayout={'normal'}
            autoSizeStrategy={autoSizeStrategy}
            onGridReady={onGridReady}
            tooltipShowDelay={0}
            tooltipHideDelay={5000}
            onSelectionChanged={onSelectionChanged}
          />
        </div>
      )}

      <Pagination
        perPage={limit}
        page={page}
        totalResult={totalCount}
        onChange={handleChangePagination}
      />

      {showModalDelete && (
        <ModalDeleteOrder
          isOpen={showModalDelete}
          handleCloseModal={handleCloseModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {showModalComment && (
        <ModalWindowComment
          isOpen={showModalComment}
          handleCloseModal={handleCloseModal}
          handleSaveComment={handleSaveComment}
        />
      )}
      {showModalCreateOrder && (
        <ModalWindowNewOrder
          isOpen={showModalCreateOrder}
          handleCloseModal={handleCloseModal}
          handleCreateOrder={handleCreateOrder}
        />
      )}
      {chooseOrders.length >= 2 && (
        <div className="shadow-tooltip bg-bgWhite p-s sm:py-m1 sm:px-m border border-borderDefault50 rounded-medium w-[320px] bottom-0 right-0 sm:w-[350px] fixed sm:bottom-[72px] sm:right-[50px]">
          <Menu
            items={menuMultipleOrders}
            selected={chooseOrders.length}
            value={chooseOrders}
          />
        </div>
      )}
    </div>
  );
};

export default Orders;
