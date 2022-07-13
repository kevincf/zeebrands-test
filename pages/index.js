import { useEffect, useState } from "react";
import { getUser } from './api/index'
import Header from "./components/header";

import 'bootstrap/dist/css/bootstrap.min.css';
import Users from "./users";

export const Home = () => {
  return (
    <Users />)
}


export default Home;