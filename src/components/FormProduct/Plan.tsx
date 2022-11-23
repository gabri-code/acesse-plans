import { Formik, FormikFormProps, FormikProps } from 'formik';
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { RcFile } from 'antd/lib/upload';
import * as yup from 'yup';
import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
  useSubscription,
} from '@apollo/client';
import { MdAdd, MdDeleteOutline } from 'react-icons/md';
import { isEqual } from 'lodash';
import {
  Button,
  Flex,
  IconButton,
  Image,
  Input,
  Checkbox,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useCheckboxGroup,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { InputMask } from '../InputMask';
import { NEW_ADDITIONAL_SUBSCRIPTION } from '../../graphql/subscriptions/newAdditional';
import { AdditionalItem, Product } from '../../types';
import { CREATE_PRODUCT_MUTATION } from '../../graphql/mutations/product/createProduct';
import { ADDITIONAL_ITEM_MUTATION } from '../../graphql/mutations/product/additionalItem';
import { UPDATE_PRODUCT_MUTATION } from '../../graphql/mutations/product/updateProduct';
import { DELETE_PRODUCT_MUTATION } from '../../graphql/mutations/product/deleteProduct';
import { OnNewAdditionalData } from '../../types/queries/Product';
import { FormControl } from '../FormControl';
import { CreateProductData } from '../../types/mutations/Product';
import CustomCheckbox from '../CustomCheckbox';

interface IFormProduct extends FormikFormProps {
  loading?: boolean;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleEditing?: (value: boolean) => void;
  additionalItems?: AdditionalItem[];
  isEditing?: boolean;
  productToEdit?: Product;
  refetchProducts: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<any>>;
}

interface PlanValues {
  title: string;
  price: string;
  promotionalPrice?: string;
  active: boolean;
  additionalItems: number[];
  installationNormal: string;
  installationFidelity: string;
  type: 'internet' | 'tv' | 'others';
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

interface FormPlanValues extends PlanValues {
  id?: number;
}

interface AdditionalValues {
  icon: string;
  name: string;
}

const FormPlan: FC<IFormProduct> = ({
  isModalOpen,
  openModal,
  closeModal,
  additionalItems = [],
  isEditing,
  handleEditing,
  productToEdit,
  refetchProducts,
  ...props
}) => {
  const [childKey, setChildKey] = useState(1);

  useEffect(() => {
    setChildKey((prev) => prev + 1);
  }, []);

  const [productChanged, setProductChanged] = useState(false);

  const [updatePlan, { loading: loadingUpdate }] = useMutation(
    UPDATE_PRODUCT_MUTATION
  );
  const [deletePlan, { loading: loadingDelete }] = useMutation(
    DELETE_PRODUCT_MUTATION
  );

  const [addItem, { loading: newItemLoading }] = useMutation(
    ADDITIONAL_ITEM_MUTATION
  );

  const [additionalServices, setAdditionalServices] =
    useState<AdditionalItem[]>(additionalItems);

  const { data } = useSubscription<OnNewAdditionalData>(
    NEW_ADDITIONAL_SUBSCRIPTION
  );

  useEffect(() => {
    if (data) {
      const {
        newAdditional: { data: items },
      } = data;
      setAdditionalServices(items);
    }
  }, [data]);

  const additionalFormRef =
    useRef<FormikProps<{ icon: string; name: string }>>(null);

  const handleNewAdditional = async (values: AdditionalValues) => {
    const {
      data: {
        createAdditionalItem: { error },
      },
    } = await addItem({
      variables: {
        data: values,
      },
    });

    if (error) {
      additionalFormRef.current?.setFieldError(error.field, error.message);
      return;
    }

    additionalFormRef.current?.resetForm();
  };

  const {
    isOpen: isOpenNewAdditional,
    onOpen: openModalNewAdditional,
    onClose: closeModalNewAdditional,
  } = useDisclosure();

  const handleOpenNewAdditionalModal = () => openModalNewAdditional();
  const handleCloseNewAdditionalModal = () => closeModalNewAdditional();

  let normalizedProductToEdit: FormPlanValues | null = null;

  const formRef = useRef<FormikProps<FormPlanValues>>(null);

  if (productToEdit) {
    normalizedProductToEdit = {
      ...productToEdit,
      price: productToEdit.price.toFixed(2),
      promotionalPrice: productToEdit.promotionalPrice?.toFixed(2),
      installationNormal: productToEdit.installationNormal?.toFixed(2) ?? '',
      installationFidelity:
        productToEdit.installationFidelity?.toFixed(2) ?? '',
      additionalItems:
        productToEdit.additionalItems?.map((item) => item.id) ?? [],
    };
  }

  const defaultInitialValues: FormPlanValues = {
    title: '',
    active: true,
    additionalItems: [],
    price: '',
    promotionalPrice: '',
    installationNormal: '',
    installationFidelity: '',
    type: 'internet',
  };

  const initialValues = (
    isEditing ? normalizedProductToEdit : defaultInitialValues
  ) as FormPlanValues;

  const Schema = yup.object({
    title: yup.string().required('Campo obrigatório.'),
    price: yup.string().required('Campo obrigatório.'),
    promotionalPrice: yup
      .string()
      .test(
        'priceValue',
        'Preço promocional deve ser menor que o preço normal.',
        (value) => {
          if (value && value.length >= 4) {
            return (
              Number(value.replaceAll(' ', '')) <
              Number(formRef.current?.values.price.replaceAll(' ', ''))
            );
          }
          return true;
        }
      ),
    installationNormal: yup.string().required('Campo obrigatório.'),
    installationFidelity: yup.string(),
  });

  const [createProduct, { loading: loadingCreate }] =
    useMutation<CreateProductData>(CREATE_PRODUCT_MUTATION);

  const normalizeProduct = (data: FormPlanValues) => {
    const { id, ...normalized }: { [key: string]: any } = {
      ...data,
      price: Number(data.price),
      promotionalPrice: Number(data.promotionalPrice),
      installationNormal: Number(data.installationNormal),
      installationFidelity: Number(data.installationFidelity),
      additionalItems: {
        connect: data.additionalItems.map((item) => ({
          id: item,
        })),
      },
    };

    if (isEditing) {
      Object.keys(normalized).map((key) =>
        Object.defineProperty(normalized, key, {
          value:
            key === 'additionalItems'
              ? { set: normalized[key as string]['connect'] }
              : { set: normalized[key as string] },
        })
      );
    }

    return { id, ...normalized };
  };

  const { getCheckboxProps } = useCheckboxGroup({
    defaultValue: initialValues.additionalItems,
    onChange: (value) => {
      const form = formRef.current;
      const parsedValue = value.map((item) => Number(item));
      form?.setFieldValue('additionalItems', parsedValue);
    },
  });

  const toast = useToast();

  const handleSubmit = async (values: FormPlanValues) => {
    if (isEditing) {
      const { id, ...updateValues } = normalizeProduct(values);
      console.log(id, updateValues);
      const {
        data: {
          updateProduct: { data },
        },
      } = await updatePlan({
        variables: {
          id: Number(id),
          data: {
            ...updateValues,
          },
        },
      });

      if (data) {
        refetchProducts();
        handleCancel();
      }

      return;
    }

    const { data } = await createProduct({
      variables: {
        data: normalizeProduct(values),
      },
    });

    if (data?.createProduct.error) {
      formRef.current?.setFieldError(
        data.createProduct.error.field as string,
        data.createProduct.error.message
      );
      return;
    }

    if (data?.createProduct.data) {
      formRef.current?.resetForm();
      toast({
        title: 'Perfeito!',
        description: 'Plano cadastrado com sucesso.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      refetchProducts();
    }
  };

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    formRef.current?.setFieldTouched(e.target.name, true);
    formRef.current?.setFieldValue(e.target.name, e.target.value);
  }, []);

  const handleCancel = () => {
    formRef.current?.resetForm();
    closeModal();

    if (isEditing && handleEditing) handleEditing(false);
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

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleChangeAdditionalForm = (e: ChangeEvent<HTMLInputElement>) => {
    additionalFormRef.current?.setFieldValue('name', e.target.value);
    additionalFormRef.current?.setFieldTouched('name', true);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      scrollBehavior="inside"
      key={childKey}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cadastrar novo plano de internet</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={Schema}
            validateOnBlur
            innerRef={formRef}
          >
            {({
              values,
              errors,
              touched,
              setFieldValue,
              setFieldTouched,
              submitForm,
            }) => {
              if (isEditing) {
                if (!isEqual(normalizedProductToEdit, values)) {
                  setProductChanged(true);
                } else {
                  setProductChanged(false);
                }
              }

              return (
                <>
                  <FormControl
                    name="title"
                    label="Título"
                    onChange={handleChange}
                    defaultValue=""
                    value={values.title}
                    error={errors.title}
                    touched={touched.title}
                    onBlur={() =>
                      setFieldValue(
                        'title',
                        values.title
                          .replace(/\s+/g, ' ')
                          .trim()
                          .replaceAll('.', '')
                      )
                    }
                    isRequired
                  />
                  <Flex gap="10px">
                    <FormControl
                      name="price"
                      label="Preço"
                      error={errors.price}
                      touched={touched.price}
                      isRequired
                    >
                      <InputMask
                        onChange={handleChange}
                        placeholder="0.00"
                        mask="currency"
                        name="price"
                        value={values.price}
                      />
                    </FormControl>
                    <FormControl
                      name="promotionalPrice"
                      label="Preço promocional"
                      error={errors.promotionalPrice}
                      touched={touched.promotionalPrice}
                    >
                      <InputMask
                        placeholder="0.00"
                        mask="currency"
                        name="promotionalPrice"
                        value={values.promotionalPrice}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Flex>
                  <FormControl name="additional" label="Serviços Inclusos">
                    <Button
                      leftIcon={<MdAdd />}
                      size="xs"
                      colorScheme="cyan"
                      onClick={handleOpenNewAdditionalModal}
                    >
                      Novo serviço
                    </Button>
                    <Flex
                      wrap="wrap"
                      gap="10px"
                      basis="200px"
                      w="100%"
                      p="10px 0"
                    >
                      {additionalServices &&
                        additionalServices.map((value) => {
                          const checkbox = getCheckboxProps({
                            value: value.id,
                          });
                          return (
                            <CustomCheckbox
                              key={value.id}
                              {...checkbox}
                              borderRadius="full"
                            >
                              <Image
                                src={value.icon}
                                alt={value.name}
                                w="25px"
                                mr="5px"
                              />{' '}
                              <Text fontSize="sm" fontFamily="Gilroy-Medium">
                                {value.name}
                              </Text>
                            </CustomCheckbox>
                          );
                        })}
                    </Flex>
                    <Modal
                      isCentered
                      onClose={handleCloseNewAdditionalModal}
                      isOpen={isOpenNewAdditional}
                      motionPreset="slideInBottom"
                      closeOnOverlayClick={false}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Cadastrar novo serviço</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Formik
                            initialValues={{ icon: '', name: '' }}
                            innerRef={additionalFormRef}
                            onSubmit={handleNewAdditional}
                            validationSchema={yup.object().shape({
                              icon: yup.string().required('Campo obrigatório.'),
                              name: yup.string().required('Campo obrigatório.'),
                            })}
                          >
                            {({
                              submitForm: additionalSubmitForm,
                              errors: additionalErrors,
                              values: additionalValues,
                              touched: additionalTouched,
                              setFieldValue: setAdditionalFieldValue,
                              setFieldTouched: setAdditionalFieldTouched,
                              resetForm: resetAdditional,
                            }) => {
                              return (
                                <Flex>
                                  <Input
                                    type="file"
                                    accept="image/*"
                                    display="none"
                                    ref={inputFileRef}
                                    onChange={(e) => {
                                      if (e.target.files) {
                                        //   // Get this url from response in real world.
                                        getBase64(
                                          e.target.files[0] as RcFile,
                                          (url) => {
                                            setAdditionalFieldValue(
                                              'icon',
                                              url
                                            );
                                          }
                                        );
                                        setAdditionalFieldTouched('icon', true);
                                      }
                                    }}
                                  />
                                  <FormControl
                                    name="icon"
                                    label="Ícone"
                                    w="auto"
                                    error={additionalErrors.icon}
                                    touched={additionalTouched.icon}
                                    isRequired
                                  >
                                    <IconButton
                                      aria-label="service icon"
                                      {...(additionalValues.icon
                                        ? {
                                            bgImage: additionalValues.icon,
                                            bgSize: 'cover',
                                            bgPos: 'center',
                                            _hover: {
                                              bg: '',
                                            },
                                          }
                                        : {
                                            icon: <MdAdd size={20} />,
                                            colorScheme: additionalErrors.icon
                                              ? 'red'
                                              : 'gray',
                                          })}
                                      onClick={() => {
                                        inputFileRef.current?.click();
                                      }}
                                    />
                                  </FormControl>
                                  <FormControl
                                    name="name"
                                    label="Título"
                                    error={additionalErrors.name}
                                    touched={additionalTouched.name}
                                    onChange={handleChangeAdditionalForm}
                                    value={additionalValues.name}
                                    isRequired
                                  />
                                </Flex>
                              );
                            }}
                          </Formik>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                              additionalFormRef.current?.resetForm();
                              closeModalNewAdditional();
                            }}
                            size="sm"
                          >
                            Cancelar
                          </Button>
                          <Button
                            size="sm"
                            onClick={additionalFormRef.current?.submitForm}
                            variant="ghost"
                            isLoading={newItemLoading}
                            loadingText="Cadastrando..."
                          >
                            Cadastrar
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </FormControl>
                  <VStack gap="10px">
                    <Text alignSelf="self-start" as="b">
                      Custo de instalação
                    </Text>
                    <Flex gap="10px">
                      <FormControl
                        name="installationNormal"
                        label="Preço sem fidelidade"
                        error={errors.installationNormal}
                        touched={touched.installationNormal}
                        isRequired
                      >
                        <InputMask
                          onChange={handleChange}
                          placeholder="0.00"
                          mask="currency"
                          name="installationNormal"
                          value={values.installationNormal}
                        />
                      </FormControl>
                      <FormControl
                        name="installationFidelity"
                        label="Preço com fidelidade"
                        error={errors.installationFidelity}
                        touched={touched.installationFidelity}
                      >
                        <InputMask
                          onChange={handleChange}
                          placeholder="0.00"
                          mask="currency"
                          name="installationFidelity"
                          value={values.installationFidelity}
                        />
                      </FormControl>
                    </Flex>
                  </VStack>
                  <Checkbox
                    size="md"
                    colorScheme="orange"
                    defaultChecked={values.active}
                    name="active"
                    onChange={({ target }) => {
                      setFieldValue('active', target.checked);
                      setFieldTouched('active', true);
                    }}
                  >
                    Marcar plano como ativo
                  </Checkbox>
                </>
              );
            }}
          </Formik>
        </ModalBody>
        <ModalFooter justifyContent="space-between">
          {isEditing && (
            <Button
              leftIcon={<MdDeleteOutline size={15} />}
              size="sm"
              colorScheme="red"
              onClick={handleDelete}
              isLoading={loadingDelete}
              loadingText="Removendo..."
            >
              Remover
            </Button>
          )}
          <Flex gap="5px">
            <Button colorScheme="gray" onClick={handleCancel} size="sm">
              Cancelar
            </Button>
            <Button
              isLoading={isEditing ? loadingUpdate : loadingCreate}
              loadingText={isEditing ? 'Salvando...' : 'Cadastrando...'}
              onClick={formRef.current?.submitForm}
              colorScheme="green"
              size="sm"
              disabled={isEditing && !productChanged}
            >
              {isEditing ? 'Salvar' : 'Cadastrar'}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormPlan;
