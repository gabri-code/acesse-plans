import { Formik, FormikFormProps, FormikHelpers, FormikProps } from 'formik';
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { Checkbox, Select } from 'formik-antd';
import {
  Avatar,
  Button,
  Col,
  Divider,
  message,
  Modal,
  Row,
  Space,
  UploadProps,
} from 'antd';
import {
  ArrowDownOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import * as yup from 'yup';
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { MdDeleteOutline } from 'react-icons/md';
import { isEqual } from 'lodash';
import { Container, StyledInput, StyledTextField, StyledUpload } from './style';
import { InputMask } from '../InputMask';
import { NEW_ADDITIONAL_SUBSCRIPTION } from '../../graphql/subscriptions/newAdditional';
import { AdditionalItem, Product } from '../../types';
import { CREATE_PRODUCT_MUTATION } from '../../graphql/mutations/product/createProduct';
import { ADDITIONAL_ITEM_MUTATION } from '../../graphql/mutations/product/additionalItem';
import { UPDATE_PRODUCT_MUTATION } from '../../graphql/mutations/product/updateProduct';
import { DELETE_PRODUCT_MUTATION } from '../../graphql/mutations/product/deleteProduct';

interface IFormProduct extends FormikFormProps {
  loading?: boolean;
  isModalOpen: boolean;
  handleModalOpen: (value: boolean) => void;
  handleEditing: (value: boolean) => void;
  additionalItems: AdditionalItem[];
  isEditing?: boolean;
  productToEdit?: Product;
  refetchProducts: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

interface PlanValues {
  plan: string;
  price: string;
  promotionalPrice?: string;
  active: boolean;
  additionalItems: number[];
  installationNormal: string;
  installationFidelity: string;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const AdditionalItem = ({
  additionalItems,
  setFieldValue,
  defaultSelected,
}: {
  additionalItems: AdditionalItem[];
  defaultSelected?: number[];
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [options, setOptions] = useState(additionalItems);
  const [productAdditional, setProductAdditional] = useState<
    { additionalId: number }[]
  >([]);

  interface AdditionalValues {
    icon: string;
    name: string;
  }

  const initialValues = {
    icon: '',
    name: '',
  };

  const Schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    icon: yup.string().required('Campo obrigatório'),
  });

  const { data } = useSubscription(NEW_ADDITIONAL_SUBSCRIPTION);

  const [addItem, { loading: newItemLoading }] = useMutation(
    ADDITIONAL_ITEM_MUTATION
  );

  useEffect(() => {
    if (data) {
      const {
        newAdditional: { data: items },
      } = data;
      setOptions(items);
    }
  }, [data]);

  const additionalRef = useRef<FormikProps<AdditionalValues>>(null);

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        setDropdownOpen(true);
        additionalRef.current?.setFieldValue('icon', url);
      });
    }
  };

  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  const handleNewAdditional = async (values: AdditionalValues) => {
    const {
      data: {
        createAdditionalItem: { data, error },
      },
    } = await addItem({
      variables: {
        data: values,
      },
    });

    if (error) {
      additionalRef.current?.setFieldError(error.field, error.message);
      return;
    }
  };

  const selectRef = useRef<HTMLDivElement>(null);
  const selectBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (selectRef && selectBodyRef) {
        if (
          selectBodyRef.current &&
          !selectBodyRef?.current?.contains(event.target) &&
          selectRef.current &&
          !selectRef.current.contains(event.target)
        ) {
          setDropdownOpen(false);
        }
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef}>
      <Select
        name="additionalItems"
        mode="multiple"
        filterOption={(input, option) => {
          const label = option?.label as ReactElement;
          return label.props.children[1]
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
        style={{ width: '100%' }}
        size="large"
        placeholder="Selecione os adicionais desse plano, se houver."
        notFoundContent="Adicione um item"
        suffixIcon={<ArrowDownOutlined />}
        onClick={() => setDropdownOpen(true)}
        defaultValue={defaultSelected}
        open={dropdownOpen}
        dropdownRender={(menu) => (
          <div ref={selectBodyRef}>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Formik
              initialValues={initialValues}
              onSubmit={handleNewAdditional}
              innerRef={additionalRef}
              validationSchema={Schema}
            >
              {({ submitForm }) => (
                <Row
                  gutter={8}
                  onClick={() => {
                    // setDropdownOpen(true);
                  }}
                  style={{
                    // height: '40px',
                    width: '100%',
                    padding: '0 10px',
                  }}
                >
                  <Col
                    style={{
                      height: '100%',
                    }}
                  >
                    <Container.Item name="icon" label="Ícone">
                      <StyledUpload
                        name="icon"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        onChange={handleChange}
                      >
                        {imageUrl ? (
                          <Avatar shape="square" src={imageUrl} alt="avatar" />
                        ) : (
                          uploadButton
                        )}
                      </StyledUpload>
                    </Container.Item>
                  </Col>
                  <Col
                    style={{
                      height: '100%',
                      flex: 1,
                    }}
                  >
                    <Container.Item name="name" label="Título">
                      <StyledInput name="name" />
                    </Container.Item>
                  </Col>
                  <Col
                    style={
                      {
                        // height: '100%',
                      }
                    }
                  >
                    <Container.Item name="ad">
                      <Button
                        icon={<PlusOutlined />}
                        onClick={submitForm}
                        loading={newItemLoading}
                        type="primary"
                        style={{
                          height: 40,
                          width: 40,
                        }}
                      />
                    </Container.Item>
                  </Col>
                </Row>
              )}
            </Formik>
          </div>
        )}
        options={options.map((item) => ({
          label: (
            <Space>
              <Avatar src={item.icon} size={25} shape="square" />
              {item.name}
            </Space>
          ),
          value: item.id,
        }))}
      />
    </div>
  );
};

const onRegisterSuccess = (messageValue: string) => {
  message.success(messageValue);
};

interface NormalizedProduct {}

interface FormPlanValues extends PlanValues {
  id?: number;
}

const FormPlan: FC<IFormProduct> = ({
  isModalOpen,
  handleModalOpen,
  additionalItems,
  isEditing,
  handleEditing,
  productToEdit,
  refetchProducts,
  ...props
}) => {
  const [updatePlan, { loading: loadingUpdate }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );
  const [deletePlan, { loading: loadingDelete }] = useMutation(
    DELETE_PRODUCT_MUTATION
  );

  let normalizedProductToEdit: FormPlanValues | null;

  const formRef = useRef<FormikProps<FormPlanValues>>(null);

  if (productToEdit) {
    const { __typename: _, ...rest } = productToEdit;

    normalizedProductToEdit = {
      ...rest,
      price: productToEdit.price.toFixed(2),
      promotionalPrice: productToEdit.promotionalPrice.toFixed(2),
      installationNormal: productToEdit.installationNormal.toFixed(2),
      installationFidelity: productToEdit.installationFidelity.toFixed(2),
      additionalItems: productToEdit.additionalItems.map((item) => item.id),
    };

    console.log(productToEdit);

    formRef.current?.setValues(normalizedProductToEdit);
  }

  const initialValues: FormPlanValues = {
    plan: '',
    active: true,
    additionalItems: [],
    price: '',
    promotionalPrice: '',
    installationNormal: '',
    installationFidelity: '',
  };

  const Schema = yup.object({
    plan: yup.string().required('Campo obrigatório.'),
    price: yup.string().required('Campo obrigatório.'),
    promotionalPrice: yup
      .string()
      .test(
        'priceValue',
        'Preço promocional deve ser menor que o preço normal.',
        (value) => {
          if (value) {
            return Number(value) < Number(formRef.current?.values.price);
          }
          return true;
        }
      ),
    installationNormal: yup.string().required('Campo obrigatório.'),
    installationFidelity: yup.string(),
  });

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT_MUTATION);

  const normalizeProduct = (data: FormPlanValues) => {
    return {
      ...data,
      id: Number(data.id),
      price: Number(data.price),
      promotionalPrice: Number(data.promotionalPrice),
      installationNormal: Number(data.installationNormal),
      installationFidelity: Number(data.installationFidelity),
    };
  };

  const handleCancel = () => {
    formRef.current?.resetForm();
    handleModalOpen(false);

    if (isEditing) handleEditing(false);
  };

  const handleSubmit = async (
    values: FormPlanValues,
    formikHelpers: FormikHelpers<PlanValues>
  ) => {
    if (isEditing) {
      const { id, ...updateValues } = normalizeProduct(values);
      const {
        data: {
          updateProduct: { data, error },
        },
      } = await updatePlan({
        variables: { id: Number(id), data: updateValues },
      });

      if (data) {
        refetchProducts();
        handleCancel();
      }

      return;
    }

    const {
      data: {
        createProduct: { data, error },
      },
    } = await createProduct({
      variables: {
        data: {
          ...values,
          price: Number(values.price),
          promotionalPrice: Number(values.promotionalPrice),
          installationNormal: Number(values.installationNormal),
          installationFidelity: Number(values.installationFidelity),
        },
      },
    });

    if (error) {
      formRef.current?.setFieldError(error.field, error.message);
      return;
    }

    if (data) {
      formRef.current?.resetForm();
      onRegisterSuccess('Plano cadastrado com sucesso.');
      refetchProducts();
    }
  };

  const handleDelete = async () => {
    const {
      data: {
        deleteProduct: { data },
      },
    } = await deletePlan({
      variables: { id: Number(formRef.current?.values.id) },
    });

    if (data) {
      handleCancel();
      refetchProducts();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={Schema}
      validateOnBlur
      innerRef={formRef}
    >
      {({ values, resetForm, setFieldValue, errors, submitForm }) => {
        return (
          <Modal
            width={'100%'}
            centered
            closable
            open={isModalOpen}
            title="Cadastrar novo plano"
            onCancel={handleCancel}
            style={{
              padding: '20px 0',
              minWidth: 500,
              maxWidth: 700,
            }}
            footer={null}
            bodyStyle={{
              overflowY: 'auto',
              height: '100%',
              maxHeight: '80vh',
            }}
          >
            <Container {...props} layout="vertical">
              <Container.Item name="plan" label="Plano">
                <StyledInput name="plan" prefix={<span />} />
              </Container.Item>
              <Row gutter={8}>
                <Col style={{ width: '50%' }}>
                  <Container.Item name="price" label="Preço">
                    <InputMask
                      setFieldValue={setFieldValue}
                      placeholder="0,00"
                      mask="currency"
                      name="price"
                      prefix={<span />}
                    />
                  </Container.Item>
                </Col>
                <Col style={{ width: '50%' }}>
                  <Container.Item
                    name="promotionalPrice"
                    label="Preço promocional"
                  >
                    <InputMask
                      setFieldValue={setFieldValue}
                      placeholder="0,00"
                      mask="currency"
                      name="promotionalPrice"
                      prefix={<span />}
                    />
                  </Container.Item>
                </Col>
              </Row>
              <StyledTextField
                style={{
                  marginBottom: 10,
                }}
              >
                <legend>Itens inclusos</legend>
                <AdditionalItem
                  additionalItems={additionalItems}
                  setFieldValue={setFieldValue}
                  defaultSelected={values.additionalItems}
                />
              </StyledTextField>
              <StyledTextField>
                <legend>Custo de instalação</legend>
                <Row gutter={8}>
                  <Col style={{ width: '50%' }}>
                    <Container.Item
                      name="installationNormal"
                      label="Preço sem fidelidade"
                    >
                      <InputMask
                        setFieldValue={setFieldValue}
                        placeholder="0,00"
                        mask="currency"
                        name="installationNormal"
                        prefix={<span />}
                      />
                    </Container.Item>
                  </Col>
                  <Col style={{ width: '50%' }}>
                    <Container.Item
                      name="installationFidelity"
                      label="Preço com fidelidade"
                    >
                      <InputMask
                        setFieldValue={setFieldValue}
                        placeholder="0,00"
                        mask="currency"
                        name="installationFidelity"
                        prefix={<span />}
                      />
                    </Container.Item>
                  </Col>
                </Row>
              </StyledTextField>
              <Checkbox name="active">Marcar plano como ativo</Checkbox>
            </Container>
            <div
              style={{
                display: 'flex',
                justifyContent: isEditing ? 'space-between' : 'flex-end',
                marginTop: 20,
              }}
            >
              {isEditing && (
                <Button
                  type="primary"
                  icon={<MdDeleteOutline size={15} />}
                  size="middle"
                  style={{
                    background: '#aa3838',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onClick={handleDelete}
                  loading={loadingDelete}
                >
                  Remover
                </Button>
              )}
              <Space>
                {/* <Button
                  key="cancel"
                  danger
                  onClick={handleCancel}
                >
                  Cancelar
                </Button> */}
                <Button
                  key="submit"
                  loading={loading}
                  onClick={submitForm}
                  disabled={
                    isEditing && isEqual(normalizedProductToEdit, values)
                  }
                >
                  {isEditing ? 'Salvar' : 'Cadastrar'}
                </Button>
              </Space>
            </div>
          </Modal>
        );
      }}
    </Formik>
  );
};

export default FormPlan;
