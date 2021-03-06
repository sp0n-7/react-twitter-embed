import _classCallCheck from '@babel/runtime/helpers/esm/classCallCheck';
import _createClass from '@babel/runtime/helpers/esm/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/esm/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/esm/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/esm/inherits';
import _defineProperty from '@babel/runtime/helpers/esm/defineProperty';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isRequiredIf from 'react-proptype-conditional-require';
import ExecutionEnvironment from 'exenv';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/esm/asyncToGenerator';
import _assertThisInitialized from '@babel/runtime/helpers/esm/assertThisInitialized';
import debounce from 'lodash/debounce';

var twitter_widget_js = 'https://platform.twitter.com/widgets.js';

var TwitterTimelineEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterTimelineEmbed, _Component);

  function TwitterTimelineEmbed() {
    _classCallCheck(this, TwitterTimelineEmbed);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterTimelineEmbed).apply(this, arguments));
  }

  _createClass(TwitterTimelineEmbed, [{
    key: "buildChromeOptions",
    value: function buildChromeOptions(options) {
      options.chrome = '';

      if (this.props.noHeader) {
        options.chrome = options.chrome + ' noheader';
      }

      if (this.props.noFooter) {
        options.chrome = options.chrome + ' nofooter';
      }

      if (this.props.noBorders) {
        options.chrome = options.chrome + ' noborders';
      }

      if (this.props.noScrollbar) {
        options.chrome = options.chrome + ' noscrollbar';
      }

      if (this.props.transparent) {
        options.chrome = options.chrome + ' transparent';
      }

      return options;
    }
  }, {
    key: "buildOptions",
    value: function buildOptions() {
      var options = Object.assign({}, this.props.options);

      if (this.props.autoHeight) {
        options.height = this.refs.embedContainer.parentNode.offsetHeight;
      }

      options = Object.assign({}, options, {
        theme: this.props.theme,
        linkColor: this.props.linkColor,
        borderColor: this.props.borderColor,
        lang: this.props.lang
      });
      return options;
    }
  }, {
    key: "renderWidget",
    value: function renderWidget(options) {
      if (!this.isMountCanceled) {
        window.twttr.widgets.createTimeline({
          sourceType: this.props.sourceType,
          screenName: this.props.screenName,
          userId: this.props.userId,
          ownerScreenName: this.props.ownerScreenName,
          slug: this.props.slug,
          id: this.props.id || this.props.widgetId,
          url: this.props.url
        }, this.refs.embedContainer, options);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterTimelineEmbed, aborting load.');
            return;
          }

          var options = _this.buildOptions();
          /** Append chrome options */


          options = _this.buildChromeOptions(options);

          _this.renderWidget(options);
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterTimelineEmbed;
}(Component);

_defineProperty(TwitterTimelineEmbed, "propTypes", {
  /**
       * This can be either of profile, likes, list, collection, URL, widget
       */
  sourceType: PropTypes.oneOf(['profile', 'likes', 'list', 'collection', 'URL', 'widget']).isRequired,

  /**
       * username of twitter handle as String
       */
  screenName: isRequiredIf(PropTypes.string, function (props) {
    return !props.hasOwnProperty('userId') && (props.sourceType === 'profile' || props.sourceType === 'likes');
  }),

  /**
       * UserId of twitter handle as number
       */
  userId: isRequiredIf(PropTypes.number, function (props) {
    return !props.hasOwnProperty('screenName') && (props.sourceType === 'profile' || props.sourceType === 'likes');
  }),

  /**
       * To show list, used along with slug
       */
  ownerScreenName: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('id');
  }),

  /**
       * To show list, used along with ownerScreenName
       */
  slug: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('id');
  }),

  /**
       * To show list, unique list id
       * Also used with collections, in that case its valid collection id
       */
  id: isRequiredIf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]), function (props) {
    return props.sourceType === 'list' && !props.hasOwnProperty('ownerScreenName') && !props.hasOwnProperty('slug') || props.sourceType === 'collection';
  }),

  /**
       * To show twitter content with url.
       * Supported content includes profiles, likes, lists, and collections.
       */
  url: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'url';
  }),

  /**
       * To show custom widget
       */
  widgetId: isRequiredIf(PropTypes.string, function (props) {
    return props.sourceType === 'widget';
  }),

  /**
       * Additional options to pass to twitter widget plugin
       */
  options: PropTypes.object,

  /**
       * Automatically fit into parent container height
       */
  autoHeight: PropTypes.bool,

  /**
       * With dark or light theme
       */
  theme: PropTypes.oneOf(['dark', 'light']),

  /**
       * With custom link colors. Note: Only Hex colors are supported.
       */
  linkColor: PropTypes.string,

  /**
       * With custom border colors. Note: Only Hex colors are supported.
       */
  borderColor: PropTypes.string,

  /**
       * Hide the header from timeline
       */
  noHeader: PropTypes.bool,

  /**
       * Hide the footer from timeline
       */
  noFooter: PropTypes.bool,

  /**
       * Hide the border from timeline
       */
  noBorders: PropTypes.bool,

  /**
       * Hide the scrollbars
       */
  noScrollbar: PropTypes.bool,

  /**
       * Enable Transparancy
       */
  transparent: PropTypes.bool,

  /**
       * Custom language code. Supported codes here: https://developer.twitter.com/en/docs/twitter-for-websites/twitter-for-websites-supported-languages/overview.html
       */
  lang: PropTypes.string
});

var TwitterShareButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterShareButton, _Component);

  function TwitterShareButton() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, TwitterShareButton);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(TwitterShareButton)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "initializeTwitter", function () {
      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterShareButton, aborting load.');
            return;
          }

          _this.createButtonDebounced();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createButton",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this.button) {
                _this.button.remove();
              }

              if (_this.isMountCanceled) {
                _context.next = 5;
                break;
              }

              _context.next = 4;
              return window.twttr.widgets.createShareButton(_this.props.url, _this.embedContainer, _this.props.options);

            case 4:
              _this.button = _context.sent;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "createButtonDebounced", debounce(_this.createButton, 500));

    return _this;
  }

  _createClass(TwitterShareButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.initializeTwitter();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (!window.twttr) {
        this.initializeTwitter();
      } else {
        this.createButtonDebounced();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;

      if (this.button) {
        this.button.remove();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        ref: function ref(_ref2) {
          return _this2.embedContainer = _ref2;
        }
      });
    }
  }]);

  return TwitterShareButton;
}(Component);

_defineProperty(TwitterShareButton, "propTypes", {
  /**
   * Url for sharing
   */
  url: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config. Details at : https://dev.twitter.com/web/tweet-button/parameters
   */
  options: PropTypes.object
});

var TwitterFollowButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterFollowButton, _Component);

  function TwitterFollowButton() {
    _classCallCheck(this, TwitterFollowButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterFollowButton).apply(this, arguments));
  }

  _createClass(TwitterFollowButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterFollowButton, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createFollowButton(_this.props.screenName, _this.refs.embedContainer, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterFollowButton;
}(Component);

_defineProperty(TwitterFollowButton, "propTypes", {
  /**
       * Username of twitter user which will be followed on click
       */
  screenName: PropTypes.string.isRequired,

  /**
       * Additional options to be added to the button
       */
  options: PropTypes.object
});

var TwitterHashtagButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterHashtagButton, _Component);

  function TwitterHashtagButton() {
    _classCallCheck(this, TwitterHashtagButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterHashtagButton).apply(this, arguments));
  }

  _createClass(TwitterHashtagButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterHashtagButton, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createHashtagButton(_this.props.tag, _this.refs.embedContainer, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterHashtagButton;
}(Component);

_defineProperty(TwitterHashtagButton, "propTypes", {
  /**
       * Tag name for hashtag button
       */
  tag: PropTypes.string.isRequired,

  /**
       * Additional options to be added to the button
       */
  options: PropTypes.object
});

var TwitterMentionButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterMentionButton, _Component);

  function TwitterMentionButton() {
    _classCallCheck(this, TwitterMentionButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterMentionButton).apply(this, arguments));
  }

  _createClass(TwitterMentionButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterMentionButton, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createMentionButton(_this.props.screenName, _this.refs.embedContainer, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterMentionButton;
}(Component);

_defineProperty(TwitterMentionButton, "propTypes", {
  /**
   * Username to which you will need to tweet
   */
  screenName: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object
});

var TwitterTweetEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterTweetEmbed, _Component);

  function TwitterTweetEmbed() {
    _classCallCheck(this, TwitterTweetEmbed);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterTweetEmbed).apply(this, arguments));
  }

  _createClass(TwitterTweetEmbed, [{
    key: "renderWidget",
    value: function renderWidget() {
      if (!window.twttr) {
        console.error('Failure to load window.twttr in TwitterTweetEmbed, aborting load.');
        return;
      }

      if (!this.isMountCanceled) {
        window.twttr.widgets.createTweet(this.props.tweetId, this.refs.embedContainer, this.props.options);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          _this.renderWidget();
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterTweetEmbed;
}(Component);

_defineProperty(TwitterTweetEmbed, "propTypes", {
  /**
       * Tweet id that needs to be shown
       */
  tweetId: PropTypes.string.isRequired,

  /**
       * Additional options to pass to twitter widget plugin
       */
  options: PropTypes.object
});

var TwitterMomentShare =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterMomentShare, _Component);

  function TwitterMomentShare() {
    _classCallCheck(this, TwitterMomentShare);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterMomentShare).apply(this, arguments));
  }

  _createClass(TwitterMomentShare, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterMomentShare, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createMoment(_this.props.momentId, _this.refs.shareMoment, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "shareMoment"
      });
    }
  }]);

  return TwitterMomentShare;
}(Component);

_defineProperty(TwitterMomentShare, "propTypes", {
  /**
   * id of Twitter moment to show
   */
  momentId: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object
});

var TwitterDMButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterDMButton, _Component);

  function TwitterDMButton() {
    _classCallCheck(this, TwitterDMButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterDMButton).apply(this, arguments));
  }

  _createClass(TwitterDMButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterDMButton, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createDMButton(_this.props.id, _this.refs.embedContainer, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterDMButton;
}(Component);

_defineProperty(TwitterDMButton, "propTypes", {
  /**
  * Twitter user id for DM button
  */
  id: PropTypes.number.isRequired,

  /**
  * Additional options to be added to the button
  */
  options: PropTypes.object
});

var TwitterVideoEmbed =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterVideoEmbed, _Component);

  function TwitterVideoEmbed() {
    _classCallCheck(this, TwitterVideoEmbed);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterVideoEmbed).apply(this, arguments));
  }

  _createClass(TwitterVideoEmbed, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterVideoEmbed, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createVideo(_this.props.id, _this.refs.embedContainer);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterVideoEmbed;
}(Component);

_defineProperty(TwitterVideoEmbed, "propTypes", {
  /**
       * Id of video tweet.
       */
  id: PropTypes.string.isRequired
});

var TwitterOnAirButton =
/*#__PURE__*/
function (_Component) {
  _inherits(TwitterOnAirButton, _Component);

  function TwitterOnAirButton() {
    _classCallCheck(this, TwitterOnAirButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(TwitterOnAirButton).apply(this, arguments));
  }

  _createClass(TwitterOnAirButton, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      if (ExecutionEnvironment.canUseDOM) {
        var script = require('scriptjs');

        script(twitter_widget_js, 'twitter-embed', function () {
          if (!window.twttr) {
            console.error('Failure to load window.twttr in TwitterOnAirButton, aborting load.');
            return;
          }

          if (!_this.isMountCanceled) {
            window.twttr.widgets.createPeriscopeOnAirButton(_this.props.username, _this.refs.embedContainer, _this.props.options);
          }
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isMountCanceled = true;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        ref: "embedContainer"
      });
    }
  }]);

  return TwitterOnAirButton;
}(Component);

_defineProperty(TwitterOnAirButton, "propTypes", {
  /**
   * Username for which you require periscope on air button
   */
  username: PropTypes.string.isRequired,

  /**
   * Additional options for overriding config.
   */
  options: PropTypes.object
});

export { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton };
//# sourceMappingURL=index.es.js.map
