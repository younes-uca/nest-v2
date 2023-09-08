import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import ProductsList from 'app/component/admin/view/commun/product/list/product-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const Products: NextPageWithLayout = () => {
    return <ProductsList />
}

Products.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default Products;
