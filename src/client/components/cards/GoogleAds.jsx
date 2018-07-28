import React, { Component } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

// components
const Ads = styled.ins`
  display: "block";
  margin: 30px 0;
`

class GoogleAds extends Component {
  static propTypes = {
    adClient: PropTypes.string.isRequired,
    adSlot: PropTypes.number.isRequired,
    adTest: PropTypes.bool.isRequired,
    dummy: PropTypes.bool.isRequired,
    style: PropTypes.bool
  }

  static defaultProps = {
    adTest: false,
    dummy: false,
    adSlot: 0,
    adClient: '',
    style: {}
  }

  componentDidMount() {
    // render new Google Ads
  }

  componentWillUnmount() {
    // destory Google Ads
  }

  render() {
    if (this.props.dummy) {
      return <Ads className="col-md-12" style={this.props.style} />
    } else {
      return (
        <Ads
          className="adsbygoogle"
          style={this.props.style}
          data-ad-client="ca-pub-4468477322781117"
          data-ad-slot={this.props.ad}
          data-ad-format="auto"
          data-full-width-responsive="true"
          data-adtest={adTest ? "on" : "off"}
        />
      )
    }
  }
}

export default GoogleAds
