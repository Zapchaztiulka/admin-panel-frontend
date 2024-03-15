import Select from 'rc-select';
import { useCallback, useMemo, useState } from 'react';

import ArrowLeftIcon from 'universal-components-frontend/src/components/icons/universalComponents/ArrowLeftIcon';
import ArrowRightIcon from 'universal-components-frontend/src/components/icons/universalComponents/ArrowRightIcon';
import ChevronsLeftIcon from 'universal-components-frontend/src/components/icons/universalComponents/ChevronsLeftIcon';
import ChevronsRightIcon from 'universal-components-frontend/src/components/icons/universalComponents/ChevronsRightIcon';
import ArrowDownIcon from 'universal-components-frontend/src/components/icons/universalComponents/ArrowDownIcon';
import theme from '../../../presets';

const options = [
  { value: '5', label: '5' },
  { value: '10', label: '10' },
  { value: '20', label: '20' },
  { value: '50', label: '50' },
  { value: '100', label: '100' },
];

function Pagination({ perPage, page, onChange, totalResult }) {
  const [pageValue, setPageValue] = useState(page);
  const [perPageValue, setPerPageValue] = useState(perPage);
  const totalPage = Math.ceil(totalResult / perPage);

  const handlePageChange = useCallback(
    (e) => {
      let newPage = Number(e.target.value);

      if (newPage < 1) {
        newPage = 1;
      } else if (newPage > totalPage) {
        newPage = totalPage;
      }

      setPageValue(newPage);
      onChange({
        page: newPage,
        perPage: perPageValue,
      });
    },
    [totalPage, onChange, perPageValue]
  );

  const handleClick = useCallback(
    (e) => {
      const targetPage = Number(e.currentTarget.dataset.page);

      if (targetPage > 0 && targetPage <= totalPage) {
        setPageValue(targetPage);

        onChange({
          page: targetPage,
          perPage: perPageValue,
        });
      }
    },
    [onChange, perPageValue, totalPage]
  );

  const handleChangePerPage = useCallback(
    (value) => {
      const newPerPage = Number(value);
      setPerPageValue(newPerPage);
      setPageValue(1);
      onChange({
        page: 1,
        perPage: newPerPage,
      });
    },
    [onChange]
  );

  const paginationButtons = useMemo(() => {
    return {
      first: {
        className:
          pageValue === 1 ? ' disabled fill-textError ' : 'cursor-pointer',
        handleClick: pageValue === 1 ? null : handleClick,
        dataPage: 1,
      },
      prev: {
        className:
          pageValue === 1 ? ' disabled  fill-textError ' : 'cursor-pointer',
        handleClick: pageValue === 1 ? null : handleClick,
        dataPage: pageValue - 1,
      },
      next: {
        className:
          pageValue === totalPage
            ? ' disabled text-textError '
            : 'cursor-pointer',
        handleClick: pageValue === totalPage ? null : handleClick,
        dataPage: pageValue + 1,
      },
      last: {
        className:
          pageValue === totalPage
            ? ' disabled text-textError '
            : 'cursor-pointer',
        handleClick: pageValue === totalPage ? null : handleClick,
        dataPage: totalPage,
      },
    };
  }, [pageValue, totalPage, handleClick]);

  return (
    <div className="flex justify-between items-center flex-wrap gap-[20px] pb-s sm:pb-0">
      <div className="flex items-center">
        <div className="pr-[21px]">Запитів на сторінці</div>
        <div>
          <Select
            defaultValue={options[1]}
            options={options}
            onChange={handleChangePerPage}
            allowClear={{
              clearIcon: (
                <ArrowDownIcon color={theme.extend.colors.iconDisabled} />
              ),
            }}
            dropdownStyle={{ border: '1px solid #C6CACD', width: 65}}
            className="pagination w-xl3 rounded-minimal border border-borderDefault p-xs3 cursor-pointer"
            dropdownClassName="rounded-minimal border  cursor-pointer w-xl3"
          />
        </div>
      </div>
      <div className="flex gap-xs2 order-last sm:gap-s items-center">
        <div
          className={paginationButtons.first.className}
          onClick={paginationButtons.first.handleClick}
          data-page={1}
        >
          {
            <ChevronsLeftIcon
              color={
                pageValue === 1
                  ? theme.extend.colors.iconDisabled
                  : theme.extend.colors.iconPrimary
              }
            />
          }
        </div>
        <div
          className={paginationButtons.prev.className}
          onClick={paginationButtons.prev.handleClick}
          data-page={pageValue - 1}
        >
          {
            <ArrowLeftIcon
              color={
                pageValue === 1
                  ? theme.extend.colors.iconDisabled
                  : theme.extend.colors.iconPrimary
              }
            />
          }
        </div>
        <div className="flex items-center gap-xs justify-center">
          <div>Сторінка</div>
          <div>
            <input
              className="w-m2 rounded-minimal border border-borderDefault p-xs3 text-center"
              type="number"
              onChange={handlePageChange}
              value={pageValue}
            />
          </div>
          <div>з {Math.ceil(totalResult / perPage)}</div>
        </div>
        <div
          className={paginationButtons.next.className}
          onClick={paginationButtons.next.handleClick}
          data-page={pageValue + 1}
        >
          {
            <ArrowRightIcon
              color={
                pageValue === totalPage
                  ? theme.extend.colors.iconDisabled
                  : theme.extend.colors.iconPrimary
              }
            />
          }
        </div>
        <div
          className={paginationButtons.last.className}
          onClick={paginationButtons.last.handleClick}
          data-page={totalPage}
        >
          {
            <ChevronsRightIcon
              color={
                pageValue === totalPage
                  ? theme.extend.colors.iconDisabled
                  : theme.extend.colors.iconPrimary
              }
            />
          }
        </div>
      </div>
      <div>
        {`${perPage * (page - 1) + 1}-${perPage * page} з ${totalResult}`}
      </div>
    </div>
  );
}

export default Pagination;
