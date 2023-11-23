import { Table } from 'antd';

import type { ColumnsType, TableProps } from 'antd/es/table';
import type { DataType } from './interface';

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    filters: [
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' },
    ],
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];

interface IProps extends TableProps<DataType> {
  data: TableProps<DataType>['dataSource'];
}

const App = (props: IProps) => {
  const { data, pagination, loading, onChange, ...restProps } = props;

  return (
    <Table
      columns={columns}
      rowKey={(record) => record.login.uuid}
      dataSource={data}
      pagination={pagination}
      loading={loading}
      onChange={onChange}
      {...restProps}
    />
  );
};

export default App;
