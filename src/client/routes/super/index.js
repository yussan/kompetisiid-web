import Loadable from "react-loadable"

// layouts
import SuperLayout from "../../layouts/SuperLayoutV5"

// components
import Loading from "../../components/preloaders/GlobalLoader"
import ContentLoading from "../../components/preloaders/FullContentLoader"

// containers
const SuperDashboard = Loadable({
  loader: () => import("../../containers/_super/index"),
  loading: ContentLoading
})
const NotFound = Loadable({
  loader: () => import("../../containers/error/index"),
  loading: Loading
})
// request containers
const Request = Loadable({
  loader: () => import("../../containers/_super/requests/index"),
  loading: Loading
})
// competition containers
const CompetitionList = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionList"),
  loading: Loading
})
const CompetitionFormLayout = Loadable({
  loader: () =>
    import("../../containers/_super/competitions/CompetitionFormLayout"),
  loading: Loading
})
const CompetitionForm = Loadable({
  loader: () => import("../../containers/_super/competitions/CompetitionForm"),
  loading: Loading
})
const CompetitionAnnouncementForm = Loadable({
  loader: () =>
    import("../../containers/_super/competitions/CompetitionAnnouncement"),
  loading: Loading
})
const NewsList = Loadable({
  loader: () => import("../../containers/_super/news/NewsList"),
  loading: Loading
})
const NewsForm = Loadable({
  loader: () => import("../../containers/_super/news/NewsForm"),
  loading: Loading
})
const UserList = Loadable({
  loader: () => import("../../containers/_super/users/index"),
  loading: Loading
})

export default {
  path: "/_super",
  component: SuperLayout,
  routes: [
    {
      path: "/_super/_dashboard",
      exact: true,
      type: "super",
      component: SuperDashboard
    },

    // data competition
    {
      path: "/_super/competition",
      exact: true,
      tab_active: 2,
      status: "active",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/_super/competition/waiting",
      exact: true,
      tab_active: 1,
      // status to request api
      status: "waiting",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/_super/competition/live",
      exact: true,
      tab_active: 2,
      // status to request api
      status: "active",
      type: "super",
      component: CompetitionList
    },
    {
      path: "/_super/competition/posted",
      exact: true,
      tab_active: 3,
      // status to request api
      status: "all",
      type: "super",
      component: CompetitionList
    },

    // form competition
    {
      path: "/_super/competition/create",
      exact: true,
      type: "super",
      component: CompetitionForm
    },
    {
      path: "/_super/competition/update/:id",
      component: CompetitionFormLayout,
      routes: [
        {
          path: "/_super/competition/update/:id",
          exact: true,
          type: "super",
          component: CompetitionForm
        },
        {
          path: "/_super/competition/update/:id/announcements",
          exact: true,
          type: "super",
          component: CompetitionAnnouncementForm
        }
      ]
    },

    // request send competition
    {
      path: "/_super/requests",
      status: "waiting",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/_super/requests/waiting",
      status: "waiting",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/_super/requests/posted",
      status: "posted",
      exact: true,
      type: "super",
      component: Request
    },
    {
      path: "/_super/requests/reject",
      status: "reject",
      exact: true,
      type: "super",
      component: Request
    },

    // news routes
    {
      path: "/_super/news",
      exact: true,
      type: "super",
      component: NewsList
    },
    {
      path: "/_super/news/create",
      exact: true,
      type: "super",
      component: NewsForm
    },
    {
      path: "/_super/news/:id",
      exact: true,
      type: "super",
      component: NewsForm
    },

    // user routes
    {
      path: "/_super/users/:type",
      exact: true,
      component: UserList
    },

    // 404
    {
      path: "/_super/*",
      fullscreen: true,
      exact: true,
      type: "super",
      error_code: 404,
      error_msg: "Halaman yang anda kunjungi tidak ditemukan",
      component: NotFound
    }
  ]
}
