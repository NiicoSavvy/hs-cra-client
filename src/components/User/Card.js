import React from 'react';

function UserCard(props) {
  const { name } = props.user;
  return <div>{name} card</div>;
}

export default UserCard;
