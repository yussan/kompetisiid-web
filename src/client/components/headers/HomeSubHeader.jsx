import React, { Component } from "react"
import Styled from "styled-components"
import { nominalToText } from "../../helpers/Number"
import * as Colors from "../../../style/colors"

// components
import { Link } from "react-router-dom"
import Slider from "../sliders"
import Count from "../cards/HomeCount"
// import Navbar from "../navigations/TransparentNavbar"

const DotsStyled = Styled.div`
  position: absolute;
  margin: auto;
  bottom: 0;
`

const SubHeader = Styled.div`
  padding-bottom: 100px;
  transition: all .5s ease;
  height: 100vh;
  min-height: 750px;
  

  &.bg-red {
    background-color: ${Colors.mainRed};
  }

  &.bg-blue {
    background-color: ${Colors.mainBlue};
  }

  .home-slider {
    color: #FFF;
    padding: 2em 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100%;
    h1 {
      color: #ffffffd9;
      font-size: 3em;
      font-family: raleway, sans-serif;
      text-transform: uppercase;
      letter-spacing: 4px;
      line-height: 1.1;
      padding: 1em 0 0.5em;
      margin: 0;
    }
    h2 {
      font-family: raleway, sans-serif;
    }
    .text{
      padding: 3em 0;
      font-size: .8em;
    }

    /* responsiveness */

    /* small */
    @media only screen and (max-width: 543px) {
      h1 {
        font-size: 2em;
      }
    }

    /* medium screen */
    @media only screen and (min-width: 544px) and (max-width: 767px) {
      h1 {
        font-size: 2.5em;
      }
    }
  }
`

// const HomeSlider = Styled.div`

// `

const Static = [
  // {
  //   url: "http://res.cloudinary.com/dhjkktmal/image/upload/v1526547300/kompetisi-id/Screen_Shot_2018-05-17_at_15.54.33.png",
  //   title: "Ramadhan Kareem for kompetisi.id"
  // }
]

class HomeSubHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      totalSliders: 1 + Static.length
    }
  }

  UNSAFE_componentWillReceiveProps(np) {
    if (np.slider.status && np.slider.status === 200) {
      this.setState({
        totalSliders: 1 + np.slider.data.length + Static.length
      })
    }
  }

  // componentDidMount() {
  //   this.sliderInterval = setInterval(() => {
  //     this.setActive()
  //   }, 5000)
  // }

  // setActive() {
  //   let { active } = this.state
  //   if (this.state.active < this.state.totalSliders - 1) {
  //     active++
  //   } else {
  //     active = 0
  //   }
  //   this.setState({ active })
  // }

  // componentWillUnmount() {
  //   clearInterval(this.sliderInterval)
  // }

  render() {
    const { data, status, message } = this.props.slider

    return (
      <SubHeader
        id="homepage-subheader"
      >
        {/* <div className="container">
          <Navbar />
        </div> */}

        <Slider className="container subheader-content home-slider">
          <WelcomeStaticSlider stats={this.props.stats} />
          {status && status === 200
            ? data.map((n, key) => <CompetitionSlider key={key} {...n} />)
            : null}
        </Slider>
      </SubHeader>
    )
  }
}

const WelcomeStaticSlider = props => (
  <div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <h1>Setiap Hari Ada Hadiah Disini.</h1>
      </div>
    </div>
    <div className="row">
      <Count {...props.stats} />
    </div>
    <div className="row">
      <Link
        to="/browse"
        className="btn btn-white btn-rounded btn-lg"
        style={{ borderColor: "#FFF", color: Colors.mainRed }}
      >
        Jelajah Kompetisi
      </Link>
      <Link to="/add" className="btn btn-borderwhite btn-rounded btn-lg">
        Pasang Kompetisi
      </Link>
    </div>
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="text">
          Kompetisi.id membuka kesempatan untuk para penyelenggara kompetisi ini
          memasang kompetisi disini atau pun bekerja dengan Kompetisi.id.
          Sebagai peserta kamu juga bisa menemukan beragam kompetisi keren
          dengan hadiah menari yang sesuai dengan interest kamu.
        </div>
      </div>
    </div>
  </div>
)

const CompetitionSlider = props => (
  <div>
    <div className="col-md-12">
      <div className="col-md-8 col-md-offset-2">
        <h1 style={{ paddingBottom: 0 }}>{props.title}</h1>
        <h2 style={{ paddingBottom: "1em" }}>
          Hadiah senilai {nominalToText(props.prize.total)}
        </h2>
      </div>
    </div>
    <div className="col-md-12">
      <Link
        to={`/competition/${props.id}/regulations/${props.nospace_title}`}
        style={{ width: "150px" }}
        className="btn btn-borderwhite btn-rounded btn-lg"
      >
        Selengkapnya
      </Link>
    </div>
    <div className="col-md-12">
      <div className="col-md-8 col-md-offset-2">
        <div className="text">{props.sort}</div>
      </div>
    </div>
  </div>
)

export default HomeSubHeader
