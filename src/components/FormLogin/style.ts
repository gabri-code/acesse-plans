import { Button, Typography } from 'antd';
import { Form } from 'formik';
import styled from 'styled-components';

export const Container = styled(Form)`
  width: 500px;
  min-width: 340px;
  border-radius: 10px;
  padding: 55px 55px 37px 55px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  position: relative;
  gap: 25px;

  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

  .logo {
    width: 200px;
    margin-bottom: 30px;
  }
`;

export const StyledLink = styled(Typography.Link)`
  color: #000 !important;
`;

export const ForgotPassword = styled(StyledLink)`
  align-self: flex-end;
  margin-bottom: 20px;
`;

export const FirstAccess = styled(StyledLink)`
  margin: 20px 0;
`;

export const StyledButton = styled(Button)`
  font-size: 16px;
  color: #fff;
  line-height: 1.2;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-width: 120px;
  height: 50px;
  border-radius: 25px;
  background: #f26716;
  border: none;
`;
