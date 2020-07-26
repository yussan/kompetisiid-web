import React from "react"
import Loadable from "react-loadable"
import { alert } from "../components/Alert"
import { logout } from "../../store/user/actions"
import { fullPageLoader } from "../components/preloaders/FullPage"
import { connect } from "react-redux"
import { fetchCountDashboardSidebar } from "../../store/user/actions"

// components
import Loading from "../components/preloaders/FullContentLoader"
import { renderRoutes } from "react-router-config"

const Sidebar = Loadable({
  loader: () => import("../components/navigations/_dashboard/Sidebar"),
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

  componentDidMount() {
    // request count data of _super sidebar
    this.props.dispatch(fetchCountDashboardSidebar())
  }

  render = () => {
    return (
      <div className="row m-t-2em">
        <div className="col-md-2 col-md-push-1">
          <Sidebar
            handleLogout={() => this.handleLogout()}
            stats={this.props.stats}
          />
        </div>
        <div className="col-md-7 col-md-push-1">
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stats: state.Others.count_super_sidebar || {}
  }
}

export default connect(mapStateToProps)(DasboardLayoutV5)
