import theme from '../../../presets';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  deleteProductById,
  fetchProducts,
} from '../../redux/products/operations';
import { ProductsNavigation } from '../../components/Products/ProductsNavigation';
import { Input } from 'universal-components-frontend/src/components/inputs';
import { Dropdown } from 'universal-components-frontend/src/components/select';
import { Button } from 'universal-components-frontend/src/components/buttons';
import SearchIcon from 'universal-components-frontend/src/components/icons/universalComponents/SearchIcon';
import EditIcon from 'universal-components-frontend/src/components/icons/universalComponents/EditIcon';
import PlusIcon from 'universal-components-frontend/src/components/icons/universalComponents/PlusIcon';
import CheckCircleIcon from 'universal-components-frontend/src/components/icons/universalComponents/CheckCircleIcon';
import TrashIcon from 'universal-components-frontend/src/components/icons/universalComponents/TrashIcon';

import { selectProductsStatusesBigLetter } from '@/redux/options/selectors';
import { getGridHeight } from '@/utils/grid';
import { columns } from './columns';
import Grid from '@/components/Grid/Grid';
import { debounce } from '@/utils/throttle';
import { fetchProductOptions } from '@/redux/options/operations';
import { useNavigate } from 'react-router-dom';
import ModalDeleteProduct from './ModalWindow/ModalDeleteProduct';
import ModalUpdatePrice from './ModalWindow/ModalUpdatePrice';
import { Loader } from '@/components/Loader';

const VERTICAL_PADDINGS = 24;
const FILTERS_HEIGHT = 48;
const BUTTONS_HEIGHT = 116;
const PAGINATION = 31;

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef();
  const { products } = useSelector((state) => state.products);
  const statuses = useSelector(selectProductsStatusesBigLetter);
  const isLoading = useSelector((state) => state.products.isLoading);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [statusId, setStatusId] = useState('');
  const [chooseProducts, setChooseProducts] = useState([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdatePrice, setShowModalUpdatePrice] = useState(false);

  const gridContainerHeight = getGridHeight(
    5 * VERTICAL_PADDINGS + FILTERS_HEIGHT + BUTTONS_HEIGHT + PAGINATION
  );

  const fetchData = useCallback((data) => {
    dispatch(fetchProducts(data));
  }, []);

  useEffect(() => {
    fetchData({ page, limit, query, statusId });
    dispatch(fetchProductOptions());
  }, []);

  const debounceFetch = useMemo(() => debounce(fetchData, 500), []);
  useEffect(() => {
    debounceFetch({ page, limit, query, statusId });
  }, [page, limit, query, statusId, debounceFetch]);

  const options = {
    onGridReady: (event) => event.api.sizeColumnsToFit(),
    rowSelection: 'multiple',
  };

  // Dot Items
  const handleEditClick = useCallback((products) => {
    const firstProductId = products[0]._id;
    navigate(`/products/${firstProductId}`);
  }, []);
  const handleAddToOrder = useCallback((product) => {
    const products = { productId: product[0]._id, quantity: 1 };
    console.log(products);
    return products;
  }, []);
  const handleCheckPrice = useCallback(
    (prod) => console.log('prodId', prod[0]._id),
    // dispatch(
    //   deleteProductById({
    //     productIds,
    //     notifications: {
    //       success: 'Ціну товару успішно підтверджено, як перевірену.',
    //       fail: 'Виникла помилка при перевірці товару',
    //     },
    //   })
    //   );
    []
  );
  const handleUpdatePrice = useCallback((prod) => {
    console.log('prodId', prod[0]);
    setShowModalUpdatePrice(true);
    setChooseProducts(prod);
  }, []);
  const handleDeleteProduct = useCallback((prod) => {
    setShowModalDelete(true);
    setChooseProducts(prod);
  }, []);

  const menuSingleProduct = useMemo(() => {
    return [
      {
        title: 'Редагувати',
        icon: EditIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleEditClick,
      },
      {
        title: 'Додати у замовлення',
        icon: PlusIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleAddToOrder,
      },
      { type: 'divider' },
      {
        title: 'Ціну перевірено',
        icon: CheckCircleIcon,
        iconProps: { color: theme.extend.colors.iconSuccess },
        onClick: handleCheckPrice,
      },
      {
        title: 'Актуалізувати ціну',
        icon: CheckCircleIcon,
        iconProps: { color: theme.extend.colors.iconBrand },
        onClick: handleUpdatePrice,
      },
      { type: 'divider' },
      {
        title: 'Видалити',
        icon: TrashIcon,
        iconProps: { color: theme.extend.colors.iconError },
        onClick: handleDeleteProduct,
      },
    ];
  }, []);

  const updatedColumns = useMemo(() => {
    return columns.map((col) => {
      if (col.field === 'settings') {
        col.cellRendererParams = { dotsItems: menuSingleProduct };
      }
      return col;
    });
  }, [menuSingleProduct]);

  const onGridReady = useCallback(() => {
    setTimeout(() => {
      gridRef.current.api.sizeColumnsToFit({
        defaultMinWidth: 100,
      });
    }, 500);
  }, [gridRef.current]);

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

  const onSelectionChanged = useCallback((event) => {
    const products = event.api.getSelectedNodes().map((row) => row.data);
    setChooseProducts(products);
  }, []);

  const handleSearchChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleStatusChangeHeader = useCallback((value) => {
    setStatusId(value);
  }, []);

  // Modal
  const handleCloseModal = useCallback(() => {
    setShowModalDelete(false);
    setShowModalUpdatePrice(false);
  }, []);
  const handleConfirmDelete = useCallback(() => {
    setShowModalDelete(false);
    const productIds = chooseProducts.map((prod) => prod._id);
    // dispatch(
    //   deleteProductById({
    //     productIds,
    //     notifications: {
    //       success: 'Товар успішно видалений.',
    //       fail: 'Виникла помилка при видаленні товару',
    //     },
    //   })
    // );
  }, [chooseProducts]);
  const handleSavePrice = useCallback((newPrice) => {
    handleCloseModal();
    const productIds = chooseProducts.map((prod) => prod._id);
    console.log('newPrice', newPrice, productIds);
    const price = {
      value: newPrice,
    };
    // dispatch(
    //   updateProduct({
    //     productIds[0],
    //      price,
    //     notifications: {
    //       success: 'Товар успішно видалений.',
    //       fail: 'Виникла помилка при видаленні товару',
    //     },
    //   })
    // );
  }, []);

  return (
    <div className="flex flex-col gap-m">
      <ProductsNavigation />
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
          options={statuses}
          placeholder="Всі статуси"
          onChange={handleStatusChangeHeader}
          className="w-full tablet600:w-[290px] "
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div style={{ height: gridContainerHeight }}>
          <Grid
            gridRef={gridRef}
            columns={updatedColumns}
            data={products}
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
      {showModalDelete && (
        <ModalDeleteProduct
          isOpen={showModalDelete}
          handleCloseModal={handleCloseModal}
          handleConfirmDelete={handleConfirmDelete}
        />
      )}
      {showModalUpdatePrice && (
        <ModalUpdatePrice
          isOpen={showModalUpdatePrice}
          handleCloseModal={handleCloseModal}
          handleSavePrice={handleSavePrice}
          product={chooseProducts}
        />
      )}
    </div>
  );
};
export default Products;
