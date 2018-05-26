import Browse from '../containers/browse/index'
import Error from '../containers/error/index'

import EmptyLayout from '../layouts/4.2/Empty'

export default {
    path: '/browse',
    component: EmptyLayout,
    routes: [
        {
            path: '/browse',
            exact: true,
            component: Browse
        },
        {
            path: '/browse/tag',
            exact: true,
            error_code: 404,
            error_msg: 'Halaman yang anda kunjungi tidak ditemukan',
            component: Error
        },
        {
            path: '/browse/tag/:tag',
            exact: true,
            component: Browse
        },
        {
            path: '/browse/:mainkat',
            exact: true,
            component: Browse
        },
        {
            path: '/browse/:mainkat/:subkat',
            exact: true,
            component: Browse
        }
    ]
}
