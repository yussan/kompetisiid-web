import React from "react"
import Loadable from "react-loadable"
import { alert } from "../components/Alert"
import { logout } from "../containers/user/actions"
import { fullPageLoader } from "../components/preloaders/FullPage"
import { connect } from "react-redux"

// components
import Loading from "../components/preloaders/FullContentLoader"
import { renderRoutes, matchRoutes } from "react-router-config"

const Sidebar = Loadable({
  loader: () => import("../components/navigations/dashboard/Sidebar"),
  loading: Loading
})

class DasboardLayoutV5 extends React.Component {
  handleLogout() {
    fullPageLoader(true)
    this.props.dispatch(logout())
    setTimeout(() => {
      alert(true, "Kamu telah logout", "success")
      location.href = "/super"
    }, 2000)
  }

  render = () => {
    return (
      <div className="col-md-12">
        <div className="row m-t-2em">
          <div className="col-md-3">
            <Sidebar handleLogout={() => this.handleLogout()} />
          </div>
          <div className="col-md-7">
            {renderRoutes(this.props.route.routes)}
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(DasboardLayoutV5)