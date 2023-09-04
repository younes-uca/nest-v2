import {NextPageWithLayout} from 'next';
import {ReactNode} from 'react';

import PurchasesList from 'app/component/admin/view/core/purchase/list/purchase-list-admin.component';
import Layout from 'layout/layout';
import AuthGuard from 'app/component/auth/auth-guard.component';

const Purchases: NextPageWithLayout = () => {
    return <PurchasesList />
}

Purchases.getLayout = function getLayout(page: ReactNode) {
    return (
    <AuthGuard>
        <Layout>
            {page}
        </Layout>
    </AuthGuard>
    )
}

export default Purchases;
