import styled from 'styled-components';
import { Form, Input, Select, SubmitButton } from 'formik-antd';
import { Button, Modal, Space, Typography, Upload } from 'antd';

export const Container = styled(Form)`
  /* max-width: 500px; */
`;

export const FormTitle = styled(Typography.Title)``;

export const WraperInput = styled(Container.Item);

export const StyledTextField = styled.fieldset`
  legend {
    font-size: 16px;
    margin-bottom: 5;
  }
`;

export const StyledModal = styled(Modal)`
  overflow: hidden !important;
  .ant-modal-wrap {
  }
`;

export const StyledItemContainer = styled(Space)`
  /* height: 50px */
`;

export const StyledUpload = styled(Upload)`
  /* width: 50px !important; */
  height: 40px;

  .ant-upload {
    width: 40px;
    height: 40px;
  }
`;

export const StyledInput = styled(Input)`
  padding-top: 10px;
  padding-bottom: 10px;
  height: 40px;
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
