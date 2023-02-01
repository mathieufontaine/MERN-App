import React from "react";
import UserList from "../components/UserList";
import { USERS } from "../../data/dummyUsers";

const Users = () => {
  return <UserList items={USERS} />;
};

export default Users;
