import styled from 'styled-components';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import { Button, Space, Typography } from 'antd';

export const Container = styled(Form)`
  max-width: 500px;
`;

export const FormTitle = styled(Typography.Title)``;

export const WraperInput = styled(Container.Item);

export const StyledInput = styled(Input)`
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const StyledSelect = styled(Select)`
  .ant-select-selector {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    height: fit-content !important;

    .ant-select-selection-item {
      height: fit-content !important;
      /* padding-top: 10px !important;
      padding-bottom: 10px !important; */
      line-height: none !important;
    }
  }

  /* .ant-select-selection-search {
    height: auto !important;
    padding-top: 10px !important;
    padding-bottom: 10px !important;

    input {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    } */
  /* } */
`;

export const StyledSaveButton = styled(SubmitButton)`
  padding: 10px 20px;
  height: auto;
`;

export const StyledCancelButton = styled(Button)`
  padding: 10px 20px;
  height: auto;
`;

export const StyledButtonGroup = styled(Space)`
  gap: 10px;
`;
