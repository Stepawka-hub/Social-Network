/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';

import Profile from './Profile';
import withRouter from '../../utils/withRouter';
import withAuthRedirect from '../../utils/withAuthRedirect';
import { getProfile, getUserStatus, updateUserPhoto, updateUserProfile, updateUserStatus } from '../../redux/profile/thunks';
import { getIsUpdatingPhoto, getProfileSelector, getStatusSelector } from '../../redux/profile/selectors';
import { getCurrentUserId } from '../../redux/auth/selectors';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';

const ProfileContainer = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector(getProfileSelector);
  const status = useSelector(getStatusSelector);
  const currentUserId = useSelector(getCurrentUserId);
  const isUpdatingPhoto = useSelector(getIsUpdatingPhoto);
  const userId = props.router.params.userId || currentUserId; 

  useEffect(() => {
    dispatch(getProfile(userId, navigate));
    dispatch(getUserStatus(userId, navigate));
  }, [props.router.params.userId]);

  useTitle(profile?.fullName, profile);

  const updateStatus = (status) => {
    dispatch(updateUserStatus(status));
  }

  const updatePhoto = (photo) => {
    dispatch(updateUserPhoto(photo));
  }

  const updateProfile = (profileData) => {
    dispatch(updateUserProfile(profileData));
  }

  return (
    <Profile
      isOwner={!props.router.params.userId}
      profile={profile}
      status={status}
      isUpdatingPhoto={isUpdatingPhoto}
      updateUserStatus={updateStatus}
      updateUserPhoto={updatePhoto}
      updateUserProfile={updateProfile}
    />
  );
}

export default compose(
  withRouter,
  withAuthRedirect
)(ProfileContainer);