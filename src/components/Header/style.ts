import { Badge, Typography } from 'antd';
import styled from 'styled-components';
import { StyledLayoutContent } from '../../layoults/Default/style';

const { Header } = StyledLayoutContent;
const { Title } = Typography;

export const StyledHeader = styled(Header)`
  background: #efefef;
  /* padding: 28px 22px; */
  padding: 0;
  width: 100%;
  margin-bottom: 36px;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  height: fit-content;
  /* min-height: 80px; */

  .right-content {
    height: 100%;
    display: flex;
    align-items: center;
  }
`;

export const StyledPageTitle = styled(Title)`
  font-size: 28px !important;
  font-family: 'Gilroy-Medium', sans-serif;
  margin: 0 !important;
`;

export const StyledBadgeUser = styled(Badge)`
  button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  sup {
    top: 5px;
    right: 5px;
  }
`;

export const StyledBadgeNotification = styled(Badge)`
  margin-right: 35px;

  sup {
    top: 4px;
    right: 4px;
  }
`;
