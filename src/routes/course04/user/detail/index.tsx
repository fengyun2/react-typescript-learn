import { useSearchParams } from 'react-router-dom';
import type { ActionType, ProFormInstance, ProColumns } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDatePicker,
  ProFormRadio,
  EditableProTable,
} from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import { Button, Form, Space, Tag, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'dayjs';

/**
 * 1. 子路由形式携带参数（如：/detail/:id）,使用 useParams获取
 * 2. 问号(?)形式携带参数（如：/detail?id=xxx&name=xxx），使用 useSearchParams获取）
 */

// type Labels = {
//   label: string;
//   value: string;
// } & {
//   name: string;
//   color: string;
// };

interface GithubIssueItem {
  url?: string;
  id: string;
  number?: number;
  title?: string;
  labels?: {
    name: string;
    color: string;
  }[];
  state?: string;
  comments?: number;
  created_at?: string;
  updated_at?: string;
  closed_at?: string;
}

interface GithubIssueFormData extends Omit<GithubIssueItem, 'labels'> {
  labels?: string[];
}

type GithubIssueParams = {
  pageSize?: string;
  current?: string;
  keyword?: string;
};

const IssueStateOptions = [
  { label: '全部', value: 'all' },
  { label: '未解决', value: 'open' },
  { label: '已解决', value: 'closed' },
  { label: '解决中', value: 'processing' },
];
const IssueLabelsOptions = [
  { label: '缺陷', value: 'bug' },
  { label: '问题', value: 'question' },
  { label: '进行中', value: 'In Progress' },
  { label: '依赖包', value: 'dependencies' },
];

// const LabelsApiMapOptions = [
//   { name: 'bug', color: 'error' },
//   { name: 'question', color: 'success' },
//   { name: 'In Progress', color: 'processing' },
//   { name: 'dependencies', color: 'default' },
// ];

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const getIssues = async (params: GithubIssueParams) => {
  const res = await fetch('https://proapi.azurewebsites.net/github/issues?' + new URLSearchParams(params));
  const data = await res.json();
  return data?.data as GithubIssueItem[];
};

const Detail = () => {
  const formRef = useRef<ProFormInstance<GithubIssueFormData>>();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;
  const current = searchParams.get('current') || undefined;
  const pageSize = searchParams.get('pageSize') || undefined;
  const [issue, setIssue] = useState<GithubIssueFormData>();
  const [totalIssues, setTotalIssues] = useState<GithubIssueItem[]>([]);
  // 表单 label 固定宽度
  const labelWidth = 100;
  const wrapperWidth = `calc(100% - ${labelWidth})`;

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => []);
  const actionRef = useRef<ActionType>();
  // const editableFormRef = useRef<EditableFormInstance>();
  const [editableForm] = Form.useForm();
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
      title: '状态',
      dataIndex: 'state',
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
      title: '标签',
      dataIndex: 'labels',
      valueType: 'select',
      fieldProps: {
        // mode: 'multiple',
        options: IssueLabelsOptions,
        // onChange: (value) => {
        // TODO: 如何设置 value 到 form 里面去
        //   console.warn('labels onChange ======>', value);
        // },
      },
      render: (_, record) => {
        return (
          <Space>
            {record?.labels?.map?.((item) => (
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
      // key: 'showTime',
      key: 'created_at',
      dataIndex: 'created_at',
      valueType: 'date',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, row) => [
        <Button
          key='edit'
          type='link'
          onClick={() => {
            actionRef.current?.startEditable?.(row.id);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          key='delete'
          placement='topRight'
          title='确定删除吗？'
          okText='确认'
          okType='danger'
          cancelText='取消'
          onConfirm={async () => {
            await waitTime(500);
            // const tableDataSource = formRef.current?.getFieldValue?.('table') as GithubIssueItem[];
            // formRef.current?.setFieldsValue({
            //   table: tableDataSource.filter((item) => item.id !== row.id),
            // });
            message.success('删除成功');
            // actionRef.current?.reloadAndRest?.();
            return Promise.resolve();
          }}
        >
          <Button type='link' danger>
            删除
          </Button>
        </Popconfirm>,
      ],
    },
  ];

  return (
    <ProCard>
      <div style={{ maxWidth: 800, margin: 'auto' }}>
        <ProCard title='基础信息' bordered={false} headerBordered>
          <ProForm<GithubIssueFormData>
            name='base-form'
            submitter={false}
            layout='horizontal'
            grid
            labelCol={{ style: { width: labelWidth } }}
            wrapperCol={{ style: { width: wrapperWidth } }}
            colProps={{ sm: 12, md: 8 }}
            labelWrap={true}
            onFinish={async (values) => {
              await waitTime(500);
              console.log(values);
              // formRef.current?.resetFields();
            }}
            initialValues={issue}
            formRef={formRef}
            formKey='issue-base-form'
            request={async () => {
              // await waitTime(2000);
              const res = await getIssues({
                pageSize,
                current,
                keyword,
              });
              // console.log(res);
              const data = {
                ...res[0],
                labels: res?.[0]?.labels?.map((item) => item.name),
              };
              setIssue(data);
              setTotalIssues(res);
              return data;
            }}
          >
            <ProFormTextArea name='title' label='标题' colProps={{ span: 24 }} />
            <ProFormSelect
              name='state'
              label='状态'
              showSearch
              // options={IssueStateOptions}
              request={async () => IssueStateOptions}
            />
            <ProFormSelect
              name='labels'
              label='标签'
              // mode='multiple'
              // showSearch
              // options={IssueLabelsOptions}
              request={async () => IssueLabelsOptions}
              fieldProps={{
                mode: 'multiple',
                // labelInValue: true,
                onChange: (value) => {
                  console.log(value, ' handleChange Labels');
                },
              }}
              // convertValue={(value) => {
              //   console.log(value, 'convertValue Labels');
              //   return value.map((item: Labels) => item?.name || item?.value);
              // }}
              transform={(value) => {
                console.log(value, 'transform Labels');
                return {
                  labels: IssueLabelsOptions.filter((item) => value.includes(item.value)),
                };
              }}
            />
            <ProFormRadio.Group
              name='locked'
              label='锁定'
              // options={[
              //   { label: '否', value: 'false' },
              //   { label: '是', value: 'true' },
              // ]}
              valueEnum={
                new Map([
                  [true, '是'],
                  [false, '否'],
                ])
              }
            />
            <ProFormText readonly name='comments' label='评论数' />
            <ProFormDatePicker
              readonly
              name='created_at'
              label='创建时间'
              transform={(value) => {
                return {
                  date: moment(value).format('YYYY-MM-DD'),
                };
              }}
            />
            <ProFormDatePicker
              readonly
              name='updated_at'
              label='最后更新时间'
              transform={(value) => {
                return {
                  date: moment(value).format('YYYY-MM-DD'),
                };
              }}
            />
            <ProFormText readonly name='user' label='创建人' />
          </ProForm>
        </ProCard>
        <ProCard title='详情' bordered={false} headerBordered>
          <Space>
            <Button
              type='primary'
              onClick={() => {
                // actionRef.current?.addEditRecord?.({
                //   id: (Math.random() * 1000000).toFixed,
                //   title: '新的一行',
                // });
                const row = { id: (Math.random() * 1000000).toFixed(0), title: '新的一行' };
                setTotalIssues([...totalIssues, row]);
                actionRef.current?.startEditable?.(row.id);
              }}
              icon={<PlusOutlined />}
            >
              新建
            </Button>
            <Button
              danger
              disabled={selectedRowKeys.length === 0}
              icon={<DeleteOutlined />}
              onClick={() => {
                setTotalIssues(totalIssues.filter((item) => !selectedRowKeys.includes(item.id)));
                actionRef.current?.clearSelected?.();
              }}
            >
              批量删除
            </Button>
          </Space>
          <EditableProTable<GithubIssueItem>
            // name='table' // 若设置了name该选项，必须要用 ProForm 包裹 EditableProTable 组件
            rowKey='id'
            // scroll={{ x: true }}
            // editableFormRef={editableFormRef}
            actionRef={actionRef}
            controlled
            // maxLength={10}
            columns={columns}
            // recordCreatorProps={{ record: (index) => ({ id: `${index + 1}` }) }}
            value={totalIssues}
            pagination={false}
            // onChange={(value) => {
            //   console.log(value, ' EditableProTable onChange =====>');
            // }}
            rowSelection={rowSelection}
            // 关闭默认的新建按钮
            recordCreatorProps={false}
            editable={{
              form: editableForm, // form实例，方便编辑表格外面操作
              type: 'multiple',
              editableKeys,
              onChange: setEditableRowKeys,
              onSave: async (key, row) => {
                console.log(key, row, 'onSave =====>');
                await waitTime(500);
                const newData = [...totalIssues];
                const index = newData.findIndex((item) => key === item.id);
                if (index > -1) {
                  const item = newData[index];
                  // const labelsValue = (row.labels as Labels[])?.map?.((item) => item?.value || item.name || item);
                  // const labelsOption = LabelsApiMapOptions.filter((item) => labelsValue?.includes?.(item.name));
                  newData.splice(index, 1, {
                    ...item,
                    ...row,
                  });
                }
                setTotalIssues(newData);
              },
            }}
          />
        </ProCard>
      </div>
    </ProCard>
  );
};

export default Detail;
