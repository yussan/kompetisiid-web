import React, { Component } from 'react'
import * as BeritaActions from './actions'
import Host from '../../../config/host'
import { pushScript } from '../../helpers/DomEvents'
import { connect } from 'react-redux'
import { topLoading } from '../../components/preloaders'
import { epochToRelativeTime } from '../../helpers/DateTime'
import { truncate } from 'string-manager'
import { textParser } from '../../helpers/String'

// components
import { Link } from 'react-router-dom'
import Helmet from '../../components/Helmet'
import Author from '../../components/cards/NewsAuthorCard'
import NewsBox from '../../components/boxs/NewsBox'
import ErrorCard from '../../components/cards/ErrorCard'
import Preloader from '../../components/preloaders/NewsDetail'
export default class Index extends Component {
  // static fetchData({params, store})
  // {
  //     return store.dispatch(BeritaActions.fetchBeritaDetail(params.encid))
  // }

  componentDidMount() {
    window.scrollTo(0, 0)
    pushScript('https://kompetisiindonesia.disqus.com/embed.js')
    this.reqData(this.props)
  }

  componentWillReceiveProps(np) {
    const { encid } = np.match.params
    if (
      encid != this.props.match.params.encid ||
      np.berita.detail[encid].meta
    ) {
      window.scrollTo(0, 0)
      this.resetDisquss(np)
    }
    this.reqData(np)
  }

  resetDisquss(props) {
    const url = `${Host[process.env.NODE_ENV].front}/news/${
      props.match.params.encid
    }/${props.match.params.title}`
    // disquss reset after 1000ms
    if (window.DISQUS)
      DISQUS.reset({
        reload: true,
        config: function() {
          this.page.identifier = url
          this.page.url = url
        }
      })
  }

  reqData(props) {
    const { encid } = props.match.params
    if (!this.props.berita.detail[encid]) {
      topLoading(true)
      this.props.dispatch(BeritaActions.fetchBeritaDetail(encid))
    }
    // if (!this.props.berita.data[`related_${ encid }`]) {
    //   this.props.dispatch(BeritaActions.relatedBerita(encid))
    // }
  }

  generateTags(tags = []) {
    tags = tags.split(',')
    if (tags && tags.length > 0) {
      return tags.map((n, key) => {
        return (
          <span key={key}>
            <Link className="btn btn-white" to={`/news/tag/${n}`}>
              {n}
            </Link>{' '}
          </span>
        )
      })
    }

    return null
  }

  render() {
    const { encid, title } = this.props.match.params
    const { detail, data } = this.props.berita
    let helmetdata = {
      title: 'Kabar Kompetisi',
      description: 'Kabar Kompetisi dari Kompetisi.id',
      url: `${Host[process.env.NODE_ENV].front}/news/${encid}/${title}`,
      script: []
    }

    if (
      detail[encid] &&
      detail[encid].meta &&
      detail[encid].meta.code === 200
    ) {
      helmetdata = Object.assign(helmetdata, {
        title: detail[encid].data.title,
        description: detail[encid].data.contenttext,
        url: `https://kompetisi.id/news/${detail[encid].data.id}/${
          detail[encid].data.nospace_title
        }`,
        image: detail[encid].data.image.original
      })

      //add jsonld
      helmetdata.script.push({
        type: 'application/ld+json',
        innerHTML: generateJsonld(detail[encid].data, helmetdata.url)
      })
    }

    if (typeof window !== 'undefined' && detail[encid] && detail[encid].meta)
      topLoading(false)

    return (
      <div>
        <Helmet {...helmetdata} />
        {detail[encid] && detail[encid].status ? (
          parseInt(detail[encid].status) === 200 ? (
            <div>
              <div className="col-md-6 col-md-push-3 col-md-pull-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="news-detail">
                      <Author data={detail[encid].data.author} />
                      <div className="content">
                        <article>
                          <h1>{detail[encid].data.title}</h1>
                          <p className="meta text-muted">
                            <span className="meta--item">
                              <i className="fa fa-calendar-o" />{' '}
                              {epochToRelativeTime(
                                detail[encid].data.created_at
                              )}
                            </span>
                            <span className="meta--item">
                              <a
                                href="javascript:;"
                                title="komentar"
                                onClick={() => {
                                  document
                                    .getElementById('comments')
                                    .scrollIntoView({ behavior: 'smooth' })
                                }}
                              >
                                <i className="fa fa-comment-o" />{' '}
                                <span
                                  className="fb-comments-count"
                                  data-href={helmetdata.url}
                                >
                                  0
                                </span>
                              </a>
                            </span>
                          </p>
                        </article>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="row">
                  <div className="news-detail">
                    <div className="image">
                      <figure>
                        <img src={detail[encid].data.image.original} />
                      </figure>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-md-push-3 col-md-pull-3">
                <div className="row">
                  <div className="col-md-12">
                    <div className="news-detail">
                      <article className="content">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: textParser(detail[encid].data.content)
                          }}
                        />
                        <div style={{ margin: '1em 0' }}>
                          {this.generateTags(detail[encid].data.tag)}
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>

              {/* related news */}
              <div className="col-md-12 bg-gray-soft">
                <NewsBox
                  subtitle={false}
                  data={detail[encid].related}
                  status={detail[encid].status}
                />
              </div>
            </div>
          ) : (
            <ErrorCard
              code={detail[encid].status}
              message={detail[encid].message}
            />
          )
        ) : (
          <div className="fullheight">
            <Preloader />
          </div>
        )}
        {detail[encid] && detail[encid].status && detail[encid].is_loading ? (
          <Preloader />
        ) : null}
        {/* comment section */}
        <div
          style={{
            display:
              detail[encid] &&
              detail[encid].status &&
              detail[encid].status === 200
                ? 'block'
                : 'hidden'
          }}
          className="col-md-6 col-md-push-3 col-md-pull-3"
        >
          <div
            style={{ padding: '50px 0' }}
            className="row comments"
            id="disqus_thread"
          />
        </div>
        {/* end of comment section */}
      </div>
    )
  }
}

function generateJsonld(n, url) {
  const created_at = n.created_at.split(' ')
  const updated_at = n.updated_at.split(' ')
  return `{
        "@context": "https://schema.org",
        "@type": "Article",
        "publisher": {
            "@type": "Organization",
            "name": "Id+More",
            "logo": {
                "@type": "ImageObject",
                "url": "https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-9/21529_1680281178877316_3989323526762937427_n.png?oh=30d4cacd082cb9b7bffbd9abf01c1cb0&oe=5A01639C",
                "height": "500",
                "width": "500"
            }
        },
        "author": {
            "@type": "Person",
            "name": "${n.author.username}",
            "image": "http://kompetisi.id/assets/4.2/img/default-avatar.jpg",
            "url": "http://kompetisi.id/${n.author.username}",
            "sameAs": [
                ""
            ],
            "description": "${n.author.moto}"
        },
        "headline": "${n.title}",
        "url": "${url}",
        "datePublished": "${created_at[0]}T${created_at[1]}.000Z",
        "dateModified": "${updated_at[0]}T${updated_at[1]}.000Z",
        "image": {
            "@type": "ImageObject",
            "url": "${n.image.original}",
            "height": "500",
            "width": "500"
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${url}"
        },
        "keywords": "${n.tags}",
        "description": "${truncate(n.contenttext, 300)}"
    }`
}

function mapStateToProps(state) {
  const { Berita } = state
  return {
    berita: Berita
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Index)
