import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextPage,
} from 'next';
import 'moment/locale/pt-br';
import locale from 'antd/lib/locale/pt_BR';
import DatePicker, { RangePickerProps } from 'antd/lib/date-picker';
import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ConfigProvider,
  Dropdown,
  MenuProps,
  notification,
  Space,
  Typography,
} from 'antd';
import moment from 'moment';
import {
  DownOutlined,
  HistoryOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  ApolloClient,
  NormalizedCacheObject,
  useSubscription,
} from '@apollo/client';
import { requireAuthentication } from '../../utils/requireAuthentication';
import { UserResponse } from '../../types';
import DefaultLayoult from '../../layouts/Default';
import {
  StyledContentTitle,
  StyledFilterItem,
  StyledMenuFilter,
  StyledMeta,
  StyledOverviewCard,
  StyledOverviewContainer,
} from '../../styles/Home';
import { AuthContext } from '../../contexts/AuthContext';
import { NEW_REGISTER_SUBSCRIPTION } from '../../graphql/subscriptions/registerNotification';

const { Text } = Typography;

export interface IPageProps {
  title: string;
  user: UserResponse;
}

const Home: NextPage<IPageProps> = ({ title, user }) => {
  const { setUser } = useContext(AuthContext);
  const [period, setPeriod] = useState({
    value: 'all',
    name: 'Todo o período',
  });
  const [customPeriod, setCustomPeriod] = useState({
    start: '',
    end: '',
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user) {
      setUser(user);
    }
  }, [setUser, user]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    if (customPeriod.start) {
      setCustomPeriod({
        start: '',
        end: '',
      });
    }

    setPeriod({ value: e.key, name: e.domEvent.currentTarget.innerText });
    if (e.key !== 'custom_period') {
      setOpen(false);
    }
  };

  const handleOpenChange = (flag: boolean) => {
    setOpen(flag);
  };

  const onChange: RangePickerProps['onChange'] = (dates, dateStrings) => {
    if (dates) {
      setCustomPeriod({
        start: dateStrings[0],
        end: dateStrings[1],
      });
    } else {
      console.log('Clear');
    }
  };

  const filterMenu = (
    <StyledMenuFilter
      style={{ maxWidth: 270, width: '100%' }}
      onClick={handleMenuClick}
      selectable
    >
      <StyledFilterItem key="all" title="Todo o período">
        Todo o período
      </StyledFilterItem>
      <StyledFilterItem key="current" title="Hoje">
        Hoje
      </StyledFilterItem>
      <StyledFilterItem key="yesterday" title="Ontem">
        Ontem
      </StyledFilterItem>
      <StyledFilterItem key="seven_days_last" title="Últimos 7 dias">
        Últimos 7 dias
      </StyledFilterItem>
      <StyledFilterItem key="fifteen_days_last" title="Últimos 15 dias">
        Últimos 15 dias
      </StyledFilterItem>
      <StyledFilterItem key="current_month" title="Este mês">
        Este mês
      </StyledFilterItem>
      <StyledFilterItem key="custom_period" title="Período Personalizado">
        Período Personalizado
        {period.value === 'custom_period' && (
          // <StyledFilterItem style={{ width: 'fit-content' }} key="date_picker">
          <Space direction="vertical" size={12} style={{ width: '100%' }}>
            <ConfigProvider locale={locale}>
              <DatePicker.RangePicker
                format="DD-MM-YYYY"
                style={{ width: '100%' }}
                ranges={{
                  Hoje: [moment(), moment()],
                  'Este mês': [
                    moment().startOf('month'),
                    moment().endOf('month'),
                  ],
                }}
                onChange={onChange}
              />
            </ConfigProvider>
          </Space>
          // </StyledFilterItem>
        )}
      </StyledFilterItem>
    </StyledMenuFilter>
  );

  return (
    <DefaultLayoult title={title}>
      <StyledOverviewContainer>
        <div className="title-container">
          <StyledContentTitle level={2}>OVERVIEW</StyledContentTitle>
          <Dropdown
            overlay={filterMenu}
            trigger={['click']}
            open={open}
            onOpenChange={handleOpenChange}
          >
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                width: 270,
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              <Space
                direction="vertical"
                style={{
                  margin: 0,
                  rowGap: 0,
                }}
              >
                <Space>
                  {period.name}
                  <DownOutlined />
                </Space>
                <Text className="period-value">
                  {period.value === 'custom_period' &&
                    customPeriod.start &&
                    `${customPeriod.start} - ${customPeriod.end}`}
                </Text>
              </Space>
            </a>
          </Dropdown>
        </div>
        <div className="cards-container">
          <StyledOverviewCard>
            <StyledMeta
              avatar={<UsergroupAddOutlined style={{ fontSize: 16 }} />}
              title="Indicações"
              description="15"
            />
          </StyledOverviewCard>
          <StyledOverviewCard>
            <StyledMeta
              avatar={<SolutionOutlined style={{ fontSize: 16 }} />}
              title="Convertidos"
              description="5"
            />
          </StyledOverviewCard>
          <StyledOverviewCard>
            <StyledMeta
              avatar={<HistoryOutlined style={{ fontSize: 16 }} />}
              title="Aguardando"
              description="5"
            />
          </StyledOverviewCard>
        </div>
      </StyledOverviewContainer>
    </DefaultLayoult>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  return await requireAuthentication(
    context,
    async (
      _client: ApolloClient<NormalizedCacheObject>,
      user: UserResponse
    ) => {
      return {
        props: {
          user,
          title: 'Painel de Controle',
        },
      };
    }
  );
};

export default Home;
