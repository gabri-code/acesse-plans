import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MdArrowForwardIos, MdHome } from 'react-icons/md';
import { CustomNextLink } from '../NextLink';

export default function NextBreadcrumbs() {
  // Gives us ability to load the current route details
  const router = useRouter();

  const textByPath: { [key: string]: string } = {
    '/': 'Mercadão',
    '/painel': 'Painel de Controle',
    '/gerenciamento-usuarios': 'Gerenciamento de Usuários',
    '/gerenciamento-clientes': 'Gerenciamento de Clientes',
    '/gerenciamento-produtos': 'Gerenciamento de Produtos',
  };

  function generateBreadcrumbs() {
    // Remove any query parameters, as those aren't included in breadcrumbs
    const asPathWithoutQuery = router.asPath.split('?')[0];

    // Break down the path between "/"s, removing empty entities
    // Ex:"/my/nested/path" --> ["my", "nested", "path"]
    const asPathNestedRoutes = asPathWithoutQuery
      .split('/')
      .filter((v) => v.length > 0);

    // Iterate over the list of nested route parts and build
    // a "crumb" object for each one.
    const crumbList = asPathNestedRoutes.map((subpath, idx) => {
      // We can get the partial nested route for the crumb
      // by joining together the path parts up to this point.
      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');
      // The title will just be the route string for now
      const title = subpath;

      return { href, text: textByPath[href] };
    });

    // Add in a default "Home" crumb for the top-level
    return [{ href: '/', text: <MdHome /> }, ...crumbList];
  }

  // Call the function to generate the breadcrumbs list
  const breadcrumbs = generateBreadcrumbs();

  return (
    <Breadcrumb separator={<MdArrowForwardIos size={10} color="gray.500" />}>
      {breadcrumbs.map((breadcrumb, i) => (
        <BreadcrumbItem key={breadcrumb.href}>
          <BreadcrumbLink
            as={CustomNextLink}
            href={breadcrumb.href}
            linkProps={{
              fontFamily:
                i + 1 === breadcrumbs.length
                  ? 'Gilroy-SemiBold'
                  : 'Gilroy-Regular',
            }}
          >
            {breadcrumb.text}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
