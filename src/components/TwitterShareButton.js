import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ExecutionEnvironment from 'exenv'
import twitter_widget_js from './twitter-widget-url'
import debounce from 'lodash/debounce'

export default class TwitterShareButton extends Component {
  static propTypes = {
    /**
     * Url for sharing
     */
    url: PropTypes.string.isRequired,
    /**
     * Additional options for overriding config. Details at : https://dev.twitter.com/web/tweet-button/parameters
     */
    options: PropTypes.object
  }

  componentDidMount() {
    this.initializeTwitter()
  }

  initializeTwitter = () => {
    if (ExecutionEnvironment.canUseDOM) {
      let script = require('scriptjs')
      script(twitter_widget_js, 'twitter-embed', () => {
        if (!window.twttr) {
          console.error(
            'Failure to load window.twttr in TwitterShareButton, aborting load.'
          )
          return
        }

        if (!this.isMountCanceled) {
          this.createButtonDebounced()
        }
      })
    }
  }

  createButton = async () => {
    if (this.button) {
      this.button.remove()
    }
    this.button = await window.twttr.widgets.createShareButton(
      this.props.url,
      this.embedContainer,
      this.props.options
    )
  }

  createButtonDebounced = debounce(this.createButton, 500)

  componentDidUpdate() {
    if (!window.twttr) {
      this.initializeTwitter()
    } else if (!this.isMountCanceled) {
      this.createButtonDebounced()
    }
  }

  componentWillUnmount() {
    this.isMountCanceled = true
    this.embedContainer.innerHTML = ''
  }

  render() {
    return <div ref={ref => (this.embedContainer = ref)} />
  }
}
