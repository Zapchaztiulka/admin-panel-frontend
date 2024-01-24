import Grid from '@/components/Grid/Grid';
import {
  createOrderByAny,
  getAllOrders,
  updateOrder,
} from '@/redux/orders/operations';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BigButton } from '../../components/Buttons/BigButton';
import { getGridHeight } from '@/utils/grid';
import { columns } from './columns';

import Input from 'universal-components-frontend/src/components/inputs/universalComponents/Input';
import Dropdown from 'universal-components-frontend/src/components/select/Dropdown/Dropdown';
import Modal from 'universal-components-frontend/src/components/modals/universalComponents/Modal';
import Button, {
  BUTTON_TYPES,
  BUTTON_SIZES,
} from 'universal-components-frontend/src/components/buttons/button';
import SearchIcon from 'universal-components-frontend/src/components/icons/universalComponents/SearchIcon';
import EditIcon from 'universal-components-frontend/src/components/icons/universalComponents/EditIcon';
import PlusIcon from 'universal-components-frontend/src/components/icons/universalComponents/PlusIcon';
import FileIcon from 'universal-components-frontend/src/components/icons/universalComponents/FileIcon';
import LinkIcon from 'universal-components-frontend/src/components/icons/universalComponents/LinkIcon';
import TrashIcon from 'universal-components-frontend/src/components/icons/universalComponents/TrashIcon';
import LightningIcon from 'universal-components-frontend/src/components/icons/universalComponents/LightningIcon';

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
  cleanEmptyFieldsInObject,
  prepareData,
} from '@/utils/preparationDataToUpdateOrder';
import { addNotification } from '@/redux/notifications/notificationsSlice';
import ModalWindowComment from './ModalWindow/ModalWindowComment';

const VERTICAL_PADDINGS = 24;
const FILTERS_HEIGHT = 48;
const BUTTONS_HEIGHT = 116;

const Orders = () => {
  const smallScreen = window.innerWidth < 1200 ? true : false;
  const [isSmallScreen, setIsSmallScreen] = useState(smallScreen);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [query, setQuery] = useState('');
  const [statusId, setStatusId] = useState('');
  const [currentOrderId, setCurrentOrderId] = useState(0);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);
  const [showModalCreateOrder, setShowModalCreateOrder] = useState(false);

  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const gridRef = useRef();
  const navigate = useNavigate();
  const statusOptions = useSelector(selectPatternsStatuses);
  const statusOptionsList = useSelector(selectPatternsStatusesOptionsList);
  const statusOptionsBigFirstLetter = statusOptions.map(
    (item) => item && item.charAt(0).toUpperCase() + item.slice(1)
  );

  const fetchData = useCallback((data) => {
    dispatch(getAllOrders(data));
  }, []);

  const debounceFetch = useCallback(() => debounce(fetchData, 500), []);

  useEffect(() => {
    setData(orders);
  }, [orders]);

  // console.log('orders', orders);

  useEffect(() => {
    fetchData({ page, limit, query, statusId });
  }, []);

  useEffect(() => {
    debounceFetch({ page, limit, query, statusId });
  }, [page, limit, query, statusId]);

  const options = {
    onGridReady: (event) => event.api.sizeColumnsToFit(),
    pagination: true,
    paginationPageSizeSelector: [5, 10, 25, 50, 100],
    rowSelection: 'multiple',
    onSelectionChanged: (event) => {
      //console.log('e', event.api.getSelectedRows());
    },
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

  const onGridReady = useCallback(
    (params) => {
      setTimeout(() => {
        gridRef.current.api.sizeColumnsToFit({
          defaultMinWidth: 100,
        });
      }, 500);
    },
    [gridRef.current]
  );
  const gridContainerHeight = getGridHeight(
    4 * VERTICAL_PADDINGS + FILTERS_HEIGHT + BUTTONS_HEIGHT
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

  const handleStatusChange = useCallback((value) => {
    setStatusId(value);
  }, []);
  const handleSearchChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setShowModalDelete(false);
    const data = { orderIds: [`${currentOrderId}`] };
    console.log('delID', data);
    //dispatch(deleteOrder(data))
  }, []);
  const handleSaveComment = useCallback(
    (comment) => {
      const findedOrder = orders.find((item) => item._id === currentOrderId);
      const mod = { ...findedOrder, ...comment };
      console.log('comm', currentOrderId, mod, prepareData(mod));
      const dis = dispatch(
        updateOrder({ orderId: currentOrderId, orderData: prepareData(mod) })
      );
      console.log('disComm', dis);
      dis.then((res) => {
        console.log('res', res);
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(addNotification({ message: 'Статус змінено.' }));
        } else {
          dispatch(
            addNotification({
              message: 'Виникла помилка при зміні статусу',
              type: 'error',
            })
          );
        }
        handleCloseModal();
      });
    },
    [orders, currentOrderId, dispatch]
  );
  const handleCloseModal = useCallback(() => {
    setShowModalDelete(false);
    setShowModalComment(false);
  }, []);

  // Dot Items
  const handleEditClick = useCallback((id) => {
    navigate(`details/${id}`);
  }, []);

  console.log(orders);

  const handleChangeStatus = useCallback(
    (statusId, orderId) => {
      const findedOrder = orders.find((item) => item._id === orderId);
      const mod = { ...findedOrder, status: statusOptions[statusId] };
      console.log('findedOrder', findedOrder, mod, orderId, data);
      const dis = dispatch(
        updateOrder({
          orderId,
          orderData: prepareData(mod),
          notifications: {
            success: 'Статус змінено.',
            fail: 'Виникла помилка при зміні статусу',
          },
        })
      );
      console.log('dis', dis);
    },
    [statusOptions, orders, dispatch, data]
  );

  const handleAddComment = useCallback((id) => {
    setShowModalComment(true);
    setCurrentOrderId(id);
    console.log('comi', id);
  }, []);

  const handleCreateNewOrder = useCallback(
    (id) => {
      setCurrentOrderId(id);
      const findedOrder = data.find((item) => item._id === id);
      console.log('findedOrder', id, findedOrder);
      const mod = cleanEmptyFieldsInObject(findedOrder);
      const {
        _id,
        createdAt,
        updatedAt,
        status,
        totalTypeOfProducts,
        totalProducts,
        totalPrice,
        ...orderData
      } = mod;
      console.log('orderData', orderData);
      setShowModalCreateOrder(true);
      const dis = dispatch(
        createOrderByAny({
          orderData,
          notifications: { success: 'create done', fail: 'create Error' },
        })
      );
      dis.then((res) => {
        console.log('res', res);
      });
    },
    [data]
  );

  const handleCopyOrder = useCallback(
    (id) => {
      const findedOrder = orders.find((item) => item._id === id);
      console.log(findedOrder, id);

      if (findedOrder) {
        const dataForCreate = prepareData(findedOrder);

        delete dataForCreate['status'];

        dispatch(
          createOrderByAny({
            orderData: dataForCreate,
            notifications: { success: 'Copy done', fail: 'Copy Error' },
          })
        );
      }

      // setCurrentOrderId(id);
    },
    [orders, dispatch]
  );

  const handleDeleteOrder = useCallback((id) => {
    setCurrentOrderId(id);
    setShowModalDelete(true);
  }, []);

  const menuDotsItems = [
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

  const updatedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.field === 'settings') {
        col.cellRendererParams = { dotsItems: menuDotsItems };
      }
      return col;
    });
  }, [columns]);

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
          <Button
            buttonType={BUTTON_TYPES.SEARCH_TYPE}
            icon={SearchIcon}
            size={BUTTON_SIZES.SMALL}
          />
        </div>

        <Dropdown
          width={290}
          options={statusOptionsBigFirstLetter}
          placeholder="Всі статуси"
          onChange={handleStatusChange}
          className="w-full tablet600:w-[290px] "
        />
      </div>
      {isSmallScreen ? (
        <CardsList
          data={data}
          cardComponent={OrderCard}
          cardComponentProps={{ dotsItems: menuDotsItems }}
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
          />
        </div>
      )}

      {showModalDelete && (
        <Modal
          isOpen={showModalDelete}
          onClose={handleCloseModal}
          type="negative"
          title="Видалити замовлення"
          description="Ви впевнені, що хочете видалити замовлення? Відмініти цю дію неможливо."
          icon={<LightningIcon />}
        >
          <div className="flex gap-xs2 mt-xs2">
            <Button
              text="Відмінити"
              buttonType={BUTTON_TYPES.SECONDARY_GRAY}
              onClick={handleCloseModal}
            />
            <Button
              text="Видалити"
              buttonType={BUTTON_TYPES.DESTRUCTIVE}
              onClick={handleConfirmDelete}
            />
          </div>
        </Modal>
      )}
      {showModalComment && (
        <ModalWindowComment
          isOpen={showModalComment}
          handleCloseModal={handleCloseModal}
          handleSaveComment={handleSaveComment}
        />
      )}
    </div>
  );
};

export default Orders;
