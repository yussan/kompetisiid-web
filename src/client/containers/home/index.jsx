// react components
import React, {Component} from 'react'
import CompetitionBox from '../../components/boxs/CompetitionBox'
import MediapartnerBox from '../../components/boxs/MediapartnerBox'
import NewsBox from '../../components/boxs/NewsBox'
import Helmet from '../../components/Helmet'
import {Link} from 'react-router-dom'
import StatsCount from '../../components/cards/HomeCount'
import Slider from '../../components/sliders/HomeSlider'
import Categories from '../../components/cards/HomeCategories'
import SubHeader from "../../components/headers/SubHeader"
import {topLoading} from "../../components/preloaders"

// modules
import {getStorage, setStorage} from '../../../store/helpers/LocalStorage'
import {
  fetchJelajah,
  getCategories,
  setCategories,
  getStats
} from '../competition/actions'
import {fetchBerita} from '../../../store/berita/actions'
import {connect} from 'react-redux'

class Index extends Component {
  // static fetchData({store})
  // {
  //   // load latest competitions
  //   const getLatestC = store.dispatch(fetchJelajah({limit:9}, 'home_latest'))
  //   // const getMediaPartnerC = store.dispatch(fetchJelajah({limit:4,mediapartner:1}, 'home_mediapartner'))
  //   const getPopularC = store.dispatch(fetchJelajah({limit:4, popular: 1}, 'home_popular'))
  //   // const getB = store.dispatch(fetchBerita({limit:6}, 'home_latest'))
  //   const getS = store.dispatch(getStats())

  //   return Promise.all([getLatestC,getPopularC, getS])
  // }

  componentDidMount() {
    window.scroll(0, 0)

    if (!this.props.kompetisi.data.home_latest)
      this.props.dispatch(fetchJelajah({limit: 9}, 'home_latest'))

    if (!this.props.kompetisi.data.home_popular)
      topLoading(true)
      this.props.dispatch(
        fetchJelajah({limit: 4, popular: 1}, 'home_popular')
      )

    if (!this.props.kompetisi.data.home_mediapartner)
      this.props.dispatch(
        fetchJelajah({limit: 4, mediapartner: 1}, 'home_mediapartner')
      )

    if (!this.props.berita.data.home_latest)
      this.props.dispatch(fetchBerita({limit: 6}, 'home_latest'))

    this.reqCategories()
    this.props.dispatch(getStats())
  }

  componentWillReceiveProps(np) {
    if (
      np.kompetisi.categories.meta &&
      np.kompetisi.categories.meta.code == 200
    ) {
      // save categories to local storage
      setStorage('categories', JSON.stringify(np.kompetisi.categories))
    }
  }

  reqCategories() {
    const Categories = getStorage('categories')
    if (Categories) {
      this.props.dispatch(setCategories(JSON.parse(Categories)))
    } else {
      this.props.dispatch(getCategories())
    }
  }

  render() {
    const {kompetisi, berita} = this.props

    if (typeof  window !== "undefined" && kompetisi.data['home_popular'] && kompetisi.data['home_popular'].meta ) {
      topLoading(false)
    }

    return (
      <div>
        <Helmet/>
        {/*competition stats  */}
        <StatsCount {...kompetisi.stats} />

        {/* popular competitions slider */}
        <Slider {...kompetisi.data['home_popular']} />

        {/*categories  */}
        <Categories {...kompetisi.categories} />

        {/*latest competitions*/}
        <div className="col-md-12">
          <SubHeader
            title="Kompetisi Baru"
            text="Ikuti beragam kompetisi disini sesuai dengan minat kamu."
          />
          <CompetitionBox subtitle={false} {...kompetisi.data['home_latest']} />
          <div className="container">
            <div className="row align-center">
              <Link className="btn btn-bordergray" to="/browse">
                JELAJAH KOMPETISI
              </Link>
              <div className="m-50"/>
            </div>
          </div>
        </div>
        {/*end of latest competitions*/}

        {/*news*/}
        <div className="col-md-12">
          <SubHeader
            title="Kabar Baru"
            text="Update dengan kabar baru seputar kompetisi di Indonesia."
          />
          <NewsBox subtitle={false} {...berita.data['home_latest']} />
          <div className="container">
            <div className="row align-center">
              <Link className="btn btn-bordergray" to="/browse">
                BERITA BERIKUTNYA
              </Link>
              <div className="m-50"/>
            </div>
          </div>
        </div>
        {/*end of news*/}

        {/*media partners*/}
        <MediapartnerBox {...kompetisi.data['home_mediapartner']} />
        {/*end of media partners*/}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {Kompetisi, Berita} = state
  return {
    kompetisi: Kompetisi,
    berita: Berita
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
