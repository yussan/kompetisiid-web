// pages
import Index from '../pages/careers/index'

// layout
import EmptyLayout from '../layouts/EmptyLayout'

export default {
  path: '/careers',
  component: EmptyLayout,
  routes: [
    {
      path: '/careers',
      exact: true,
      component: Index,
    }
  ]
}
