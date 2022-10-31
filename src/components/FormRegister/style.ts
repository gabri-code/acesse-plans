import { Avatar, Button, Space, Typography, Upload } from 'antd';
import { Form, Input, Select } from 'formik-antd';
// import { Form } from 'formik';
import styled from 'styled-components';

export const Container = styled(Form)`
  width: 600px;
  min-width: 340px;
  border-radius: 10px;
  padding: 55px 55px 37px 55px;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  top: 0;
  position: relative;
  gap: 25px;

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }

  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

  .logo {
    width: 200px;
    margin-bottom: 30px;
  }
`;

export const StyledNextButton = styled(Button)`
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
  align-self: flex-end;
  padding: 0 20px;
  min-width: 120px;
  height: 50px;
  border-radius: 25px;
  background: #2fcc3e;
  border: none;
`;

export const WraperButtons = styled(Space)<{ otpRegisterValidated?: boolean }>`
  width: 100%;
  justify-content: ${({ otpRegisterValidated }) =>
    otpRegisterValidated ? 'space-between' : 'flex-end'};
`;

export const StyleRefreshCodeButton = styled(Button)`
  font-size: 16px;
  /* color: #fff; */
  line-height: 1.2;

  align-self: flex-start;
  padding: 0 20px;
  min-width: 120px;
  height: 50px;
`;

export const WraperUploadField = styled(Space)``;

export const StyledUpload = styled(Upload)`
  display: flex;
  justify-content: center;

  .ant-upload {
    border-radius: 50% !important;
  }
`;

export const WrapInput = styled(Container.Item)`
  width: 100%;
`;

export const StyledInput = styled(Input)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledInputPassword = styled(StyledInput.Password)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const StyledFieldSet = styled.fieldset`
  width: 100%;
`;
