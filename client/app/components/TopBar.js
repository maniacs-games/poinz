import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleBacklog, toggleUserMenu } from '../services/actions';

const TopBar = ({ hideUserMenuToggle, roomId, username, toggleBacklog, toggleUserMenu }) => {
  return (
    <div className='top-bar'>
      <div className='poinz-logo'>PoinZ</div>
      <a className='backlog-toggle clickable' onClick={toggleBacklog}>
        <span className='menu-link-inner'>
          <span></span>
        </span>
      </a>

      {!hideUserMenuToggle &&
      <span className='whoami'>{username + '@' + roomId}</span>
      }

      {!hideUserMenuToggle &&
      <a className='user-menu-toggle clickable' onClick={toggleUserMenu}>
        <i className='fa fa-cog'></i>
      </a>
      }

    </div>
  );
};

TopBar.propTypes = {
  hideUserMenuToggle: React.PropTypes.func,
  roomId: React.PropTypes.string,
  username: React.PropTypes.string,
  toggleBacklog: React.PropTypes.func,
  toggleUserMenu: React.PropTypes.func
};

export default connect(
  state => ({
    roomId: state.get('roomId'),
    username: state.getIn(['users', state.get('userId'), 'username']) || '-'
  }),
  dispatch => bindActionCreators({toggleBacklog, toggleUserMenu}, dispatch)
)(TopBar);


