import { Layout, Space, Typography } from 'antd';
import { Field } from 'formik';
import styled from 'styled-components';

const { Text } = Typography;

export const Container = styled(Space)`
  width: 100%;
`;

export const InputLabel = styled(Text)`
  color: #fff;
`;

export const StyledField = styled(Field)<{ transparent: boolean }>`
  font-size: 16px;
  color: #fff;
  line-height: 1.2;

  display: block;
  width: 100% !important;
  height: 45px;
  background: ${({ transparent }) => (transparent ? 'transparent' : '#fff')};
  padding: 0 5px 0 38px;
  outline: none;
  border: none;

  ::placeholder {
    color: #4c4c4c;
  }

  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px rgb(255, 255, 255) inset;
  }

  :-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 50px white inset;
    -webkit-text-fill-color: #333;
  }
`;

export const WrapInput = styled(Layout)<{
  transparent?: boolean;
  bordered?: boolean;
}>`
  width: 100%;
  height: 100%;
  position: relative;
  border: ${({ bordered }) => (!bordered ? 'none' : '1px solid gray')};
  border-bottom: 2px solid rgba(255, 255, 255, 0.24);
  background: ${({ transparent }) => (transparent ? 'transparent' : '#fff')};
  flex-direction: row;
  align-items: center;

  svg {
    color: #fff;
  }
`;

export const StyledErrorMessage = styled(Text)`
  color: #d53535 !important;
`;
