import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
  ProFormDatePicker,
  ProFormRadio,
} from '@ant-design/pro-components';
import { useRef } from 'react';
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
}

interface GithubIssueFormData extends Omit<GithubIssueItem, 'labels'> {
  labels: string[];
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
  // const { id } = useParams();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || undefined;
  const current = searchParams.get('current') || undefined;
  const pageSize = searchParams.get('pageSize') || undefined;
  const [issue, setIssue] = useState<GithubIssueFormData>();
  // 表单 label 固定宽度
  const labelWidth = 100;
  const wrapperWidth = `calc(100% - ${labelWidth})`;

  return (
    <div>
      <h2>Detail</h2>
      <ProCard title='基础信息' bordered={false} headerBordered>
        <ProForm<GithubIssueFormData>
          name='issue-base-form'
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
            console.log(res);
            const data = {
              ...res[0],
              labels: res[0].labels.map((item) => item.name),
            };
            setIssue(data);
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
        {/* <ProFormText colProps={{ sm: 24 }} name='body' label='详情' /> */}
      </ProCard>
    </div>
  );
};

export default Detail;
