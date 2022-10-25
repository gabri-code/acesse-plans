import { Layout, Menu } from 'antd';

import styled from 'styled-components';

import LogoAcesse from '../../assets/logo.svg';

export const StyledLayout = styled(Layout)`
  height: 100vh;
`;

const { Sider } = StyledLayout;

export const StyledSider = styled(Sider)`
  min-width: 126px !important;
  height: 100vh !important;
`;

export const StyledLogo = styled(LogoAcesse)`
  padding: 16px;
  height: 60px;
  width: 100%;
`;

export const StyledLayoutContent = styled(Layout)`
  background: #efefef;
  padding: 28px 15px 0px 22px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const StyledSiderMenu = styled(Menu)`
  width: 78px !important;
  margin: 0 auto;
  margin-top: 0;
  margin-bottom: 0;

  .ant-menu-title-content {
    display: none !important;
  }
`;

interface IProps {
  home?: boolean;
}

export const StyledSiderMenuItem = styled(StyledSiderMenu.Item)<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 0 !important;
  margin-bottom: ${({ home }) => (home ? '90px !important' : '0 !important')};
  width: 100%;
  border-radius: 8px;
  height: 70px !important;
  padding: 0px !important;
`;
