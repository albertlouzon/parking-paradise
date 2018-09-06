import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

//Although it is not used at the moment. this component will render an avatar image.  It'll be usefull when you will have many users. 

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

var avatarUrl = "https://risibank.fr/cache/stickers/d178/17866-full.png"


function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>     <Avatar
        alt="Salouuute koman tou vaaaa"
        src={avatarUrl}
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);