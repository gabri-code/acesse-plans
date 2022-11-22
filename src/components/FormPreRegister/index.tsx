import {
  ApolloQueryResult,
  OperationVariables,
  useMutation,
} from '@apollo/client';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as yup from 'yup';
import { message } from 'antd';
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useRadioGroup,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, FC, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { PreRegister, Role, RolesPT } from '../../types';
import { PRE_USER_REGISTER_MUTATION } from '../../graphql/mutations/user/preRegister';
import { FormControl } from '../../components/FormControl';
import { RadioCard } from '../../components/RadioCard';
import { rolesPT } from '../../pages/gerenciamento-usuarios';
import { PreUserRegisterData } from '../../types/mutations/User';
import { GetPreUsersData } from '../../types/queries/User';

interface FormPreRegisterProps {
  onClose: () => void;
  isOpen: boolean;
  refetchPreUsers?: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetPreUsersData>>;
}

interface FormValues {
  email: string;
  role: Role;
}

const initialValues: FormValues = {
  email: '',
  role: 'indicator',
};

const FormPreRegister: FC<FormPreRegisterProps> = ({
  isOpen,
  onClose,
  refetchPreUsers,
}) => {
  const [preUserRegister, { loading }] = useMutation<PreUserRegisterData>(
    PRE_USER_REGISTER_MUTATION
  );

  const toast = useToast();

  const router = useRouter();

  const formRef = useRef<FormikProps<FormValues>>(null);

  const handleSubmit = async (
    values: FormValues,
    { setErrors, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      const { data } = await preUserRegister({
        variables: {
          data: values,
        },
      });

      toast({
        title: 'Registro iniciado!',
        status: 'success',
        description: data?.preSignUp.message,
      });

      resetForm();
      if (refetchPreUsers) refetchPreUsers();
    } catch (error: any) {
      setErrors({ email: error.message });
    }
  };

  const schema = yup.object().shape({
    // phone: yup.string().matches(phoneRegExp, 'Telefone inválido.'),
    email: yup
      .string()
      .email('E-mail inválido.')
      .required('E-mail obrigatório.'),
    role: yup.string().required('Insira a função desse usuário.'),
  });

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    formRef.current?.setFieldTouched(e.target.name, true);
    formRef.current?.setFieldValue(e.target.name, e.target.value);
  }, []);

  const handleCancel = () => {
    formRef.current?.resetForm();
    onClose();
  };

  const roles = ['indicator', 'admin'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'role',
    defaultValue: formRef.current?.values.role,
    onChange: (value) => formRef.current?.setFieldValue('role', value),
  });

  const group = getRootProps();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={schema}
      innerRef={formRef}
    >
      {({ errors, touched, submitForm, values }) => (
        <Modal
          isOpen={isOpen}
          onClose={handleCancel}
          closeOnOverlayClick={false}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Iniciar novo cadastro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Form> */}
              {/* <VStack align="flex-start" minW="400px"> */}
              <FormControl
                name="email"
                label="E-mail"
                defaultValue=""
                type="email"
                value={values.email}
                onChange={handleChange}
                error={errors.email}
                touched={touched.email}
              />
              <HStack {...group} w="100%">
                {roles.map((value) => {
                  const radio = getRadioProps({ value });
                  return (
                    <RadioCard
                      key={value}
                      name="role"
                      handleChange={handleChange}
                      {...radio}
                    >
                      {rolesPT[value as keyof RolesPT]}
                    </RadioCard>
                  );
                })}
              </HStack>
              {/* </VStack> */}
              {/* </Form> */}
            </ModalBody>
            <ModalFooter gap="10px">
              {/* <HStack gap="5px" w="100%"> */}
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button
                isLoading={loading}
                colorScheme="green"
                type="submit"
                onClick={submitForm}
              >
                Cadastrar
              </Button>
              {/* </HStack> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Formik>
  );
};

export default FormPreRegister;
