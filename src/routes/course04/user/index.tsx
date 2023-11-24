import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, Select } from 'antd';
import { useRef } from 'react';

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const LabelsOptions = [
  { label: '缺陷', value: 'bug', color: 'error' },
  { label: '问题', value: 'question', color: 'success' },
  { label: '进行中', value: 'In Progress', color: 'processing' },
  { label: '依赖包', value: 'dependencies', color: 'default' },
];

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tooltip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
    ellipsis: true,
    valueType: 'select',
    valueEnum: {
      all: { text: '全部', status: 'Default' },
      open: {
        text: '未解决',
        status: 'Error',
      },
      closed: {
        text: '已解决',
        status: 'Success',
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    disable: true,
    title: '标签',
    dataIndex: 'labels',
    search: false,
    renderFormItem: (_, { defaultRender, onSelect }, form) => {
      // console.warn(_, form, 'labels defaultRender ======>');

      return defaultRender(_);
    },
    valueType: 'select',
    fieldProps: {
      options: LabelsOptions,
      onChange: (value) => {
        // TODO: 如何设置 value 到 form 里面去
        console.warn('labels onChange ======>', value);
      },
    },
    render: (_, record) => {
      return (
        <Space>
          {record.labels.map((item) => (
            <Tag color={item.color} key={item.name}>
              {item.name}
            </Tag>
          ))}
        </Space>
      );
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    search: false,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key='editable'
        onClick={() => {
          console.log('edit', record);
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target='_blank' rel='noopener noreferrer' key='view'>
        查看
      </a>,
      <TableDropdown
        key='actionGroup'
        onSelect={() => {
          console.log('select', record);
          action?.reload?.();
        }}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'remove', name: '删除' },
        ]}
      />,
    ],
  },
];

const UserList = () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      headerTitle='高级表格'
      actionRef={actionRef}
      rowKey='id'
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      cardBordered
      editable={{
        type: 'multiple',
      }}
      dateFormatter='string'
      columns={columns}
      columnsState={{
        persistenceKey: 'i-user-list',
        persistenceType: 'localStorage',
        onChange: (value) => {
          console.warn('columnsState', value);
        },
      }}
      pagination={{
        showQuickJumper: true,
        showSizeChanger: true,
        // pageSize: 10,
        onChange: (page) => {
          console.warn('pageChange: ', page);
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      toolBarRender={() => [
        <Button type='primary' key='primary' icon={<PlusOutlined />} onClick={() => actionRef.current?.reload()}>
          新建
        </Button>,
        <Dropdown
          key='menu'
          menu={{
            items: [
              { label: '1st item', key: '1' },
              { label: '2nd item', key: '2' },
              { label: '3rd item', key: '3' },
            ],
          }}
        >
          <Button>
            更多操作 <EllipsisOutlined />
          </Button>
        </Dropdown>,
      ]}
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        const result = await fetch(
          'https://proapi.azurewebsites.net/github/issues?' + new URLSearchParams(params)
        ).then((res) => res.json());
        return {
          data: result.data,
          success: true,
          total: result.total,
        };
      }}
    />
  );
};

export default UserList;
