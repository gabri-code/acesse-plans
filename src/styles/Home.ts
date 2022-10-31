import { Card, Layout, Menu, Typography } from 'antd';

import styled from 'styled-components';

const { Title } = Typography;

export const StyledOverviewContainer = styled(Layout)`
  .title-container {
    display: flex;
    justify-content: space-between;
  }

  .cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .period-value {
    font-family: 'Gilroy-Medium';
  }
`;

export const StyledOverviewCard = styled(Card)`
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.15);
`;

const { Meta } = StyledOverviewCard;

export const StyledMeta = styled(Meta)`
  .anticon {
    background-color: #e36a19;
    border-radius: 3px;
    padding: 3px;
    color: #fff;
  }

  .ant-card-meta-title {
    font-family: 'Gilroy-Light';
    font-size: 14px;
    /* line-height: 12px; */
    color: #4f4f4f;
  }

  .ant-card-meta-description {
    font-family: 'Gilroy-Medium';
    font-size: 32px;
    line-height: 38px;

    color: #4f4f4f;
  }
`;

export const StyledContentTitle = styled(Title)`
  font-family: 'Gilroy-Medium';
  font-size: 20px !important;
  line-height: 23px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #333333;
`;

export const StyledMenuFilter = styled(Menu)`
  max-width: 270px;
  width: 100%;
`;

export const StyledFilterItem = styled(StyledMenuFilter.Item)`
  :hover {
    background-color: #fa8c48;
    color: #fff;
  }
`;
