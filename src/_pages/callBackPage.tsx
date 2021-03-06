import * as React from 'react';
import { connect } from 'react-redux';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { push } from 'connected-react-router';
import userManager from '../_Auth/_services/userManger';

import { RouteComponentProps } from 'react-router';

class CallbackPage extends React.Component<
  RouteComponentProps<{}> & { dispatch: any },
  {}
> {
  successCallback = (user: User) => {
    // get the user's previous location, passed during signinRedirect()
    var redirectPath = user.state.path as string;
    console.log(user.state.path);
    this.props.dispatch(push(redirectPath));
  };

  errorCallback = (error: Error) => {
    console.error(error);
    this.props.dispatch(push('/'));
  };

  render() {
    return (
      <CallbackComponent
        userManager={userManager}
        successCallback={this.successCallback}
        errorCallback={this.errorCallback}
      >
        <div>Loading...</div>
      </CallbackComponent>
    );
  }
}

export default connect()(CallbackPage);
