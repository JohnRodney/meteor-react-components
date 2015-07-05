var Formaldehyde,
    ThemeManager = new MaterialUI.Styles.ThemeManager(),
    searchTerm;

AppUtils.searchType = 'git';
Meteor.searchResults = [];
App = React.createClass({

  componentDidMount: function(){
    var that = this;
    Formaldehyde.register('q', function(value){
      searchTerm = value;
      AppUtils.searchType = Formaldehyde.get('t');
      that._queryGitHub();
    });
    Formaldehyde.register('t', function(value){
      AppUtils.searchType = value;
      searchTerm = Formaldehyde.get('q');
      that._queryGitHub();
    });
  },

  getInitialState: function() {
      return {
          textFieldValue: ''
      };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  handleClick: function(event) {
    Formaldehyde.set('q', searchTerm);
    Formaldehyde.set('t', AppUtils.searchType);
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  _changeSearchType: function(e){
    if($(e.currentTarget).val().toLowerCase().indexOf('stack') > -1){
      AppUtils.searchType = 'stack';
    } else {
      AppUtils.searchType = 'git';
    }
  },

  _handleTextFieldChange: function(e){
    searchTerm = $(e.currentTarget).val();
  },

  _queryGitHub: function(){
    var that = this;
    var url;
    var stack = "https://api.stackexchange.com/2.2/search/excerpts?body="+searchTerm+"&site=stackoverflow";
    var git = 'https://api.github.com/search/repositories?q='+ searchTerm +'&order=asc';
    if(AppUtils.searchType === "stack"){
      url = stack;
    } else {
      url = git;
    }
    $.get(url, function(data){
      if(AppUtils.searchType === "stack"){
        Meteor.searchResults = AppUtils.sortByScore(data.items);
      } else {
        Meteor.searchResults = AppUtils.sortByStars(data.items);
      }
      that.forceUpdate();
    });
  },
  handleEnter: function(){
    this.handleClick();
  },

  render: function() {

    return (
        <div>
          <MaterialUI.AppBar title='Git Search' iconClassNameRight="muidocs-icon-navigation-expand-more"/>
            <MaterialUI.Toolbar>
              <MaterialUI.ToolbarGroup key={0} float="left">
                <MaterialUI.TextField
                  style={{marginLeft: '10px'}}
                  onEnterKeyDown ={this.handleClick}
                  onChange={this._handleTextFieldChange}
                  hintText="Click Here To Search" />
              <MaterialUI.ToolbarSeparator/>
              </MaterialUI.ToolbarGroup>
              <MaterialUI.ToolbarGroup key={1} float="left">
                <MaterialUI.ToolbarSeparator/>
                <MaterialUI.TextField
                  style={{marginLeft: '10px'}}
                  onEnterKeyDown ={this.handleEnter}
                  onChange={this._changeSearchType}
                  hintText="Enter Github or Stackoverflow" />
              </MaterialUI.ToolbarGroup>

              <MaterialUI.ToolbarGroup key={2} float="right">
                <MaterialUI.ToolbarTitle text="Click or press Enter" />
                <MaterialUI.ToolbarSeparator/>
                <div onClick={this.handleClick} style={{margin: '10px', float: 'left'}}>
                  <MaterialUI.RaisedButton label="Search" secondary={true} />
                </div>
              </MaterialUI.ToolbarGroup>
            </MaterialUI.Toolbar>
          <Results />
        </div>
    );
  }
});

if (Meteor.isClient) {
  Formaldehyde = Meteor.Poetic.Formaldehyde;
  Meteor.startup(function () {
    React.render(<App />, document.getElementById('root'));
  });
}

