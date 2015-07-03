var mui = MaterialUI,
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton;

var cx = React.addons.classSet;

var App = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }

});

if (Meteor.isClient) {
  Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
  });
}
