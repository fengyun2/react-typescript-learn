import React, { useState } from 'react';
import qs from 'qs';
import type { TableProps } from 'antd/es/table';
import { useRequest } from 'ahooks';
import QueryFilter from './QueryFilter';
import TableList from './TableList';
import type { DataType, TableParams, ResponseData } from './interface';

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const getUserList = (params: TableParams): Promise<ResponseData> => {
  return fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(params))}`).then((res) => res.json());
};

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  // const [loading, setLoading] = useState<TableProps<DataType>['loading']>(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const { loading } = useRequest(() => getUserList(tableParams), {
    // manual: true,
    onSuccess: (result) => {
      setData(result.results);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: 200,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });
    },
    refreshDeps: [JSON.stringify(tableParams)],
  });

  // const fetchData = () => {
  //   setLoading(true);
  //   fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
  //     .then((res) => res.json())
  //     .then(({ results }) => {
  //       setData(results);
  //       setLoading(false);
  //       setTableParams({
  //         ...tableParams,
  //         pagination: {
  //           ...tableParams.pagination,
  //           total: 200,
  //           // 200 is mock data, you should read it from server
  //           // total: data.totalCount,
  //         },
  //       });
  //     });
  // };

  const onSearch = (searchParams: TableParams) => {
    setTableParams({
      ...tableParams,
      ...searchParams,
    });
  };

  // useEffect(() => {
  //   fetchData();
  // }, [JSON.stringify(tableParams)]);

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      ...filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const tableProps = {
    data,
    loading,
    pagination: tableParams.pagination,
    onChange: handleTableChange,
  };
  return (
    <div style={{ width: '100%' }}>
      <QueryFilter onSearch={onSearch} />
      <TableList {...tableProps} />
    </div>
  );
};

export default App;
