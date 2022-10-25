import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { ReactElement, useContext, useEffect } from 'react';
import { StyledLayout } from './style';
import { AuthContext } from '../../contexts/AuthContext';

const PageLoader: React.FC<{
  children?: ReactElement;
}> = ({ children }) => {
  const router = useRouter();
  const { isLoading, setPageLoading } = useContext(AuthContext);

  const setLoadingOff = () =>
    setTimeout(() => {
      setPageLoading(false);
    }, 100);

  useEffect(() => {
    const handleStart = (url: string) =>
      url !== router.asPath && setPageLoading(true);
    const handleComplete = (url: string) =>
      url === router.asPath && setLoadingOff();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return (
    <>
      {isLoading && (
        <StyledLayout>
          <Spin size="large" />
        </StyledLayout>
      )}
      {children}
    </>
  );
};

export default PageLoader;
