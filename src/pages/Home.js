import React from "react";

import { Header, Footer } from "../components/Layouts";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <header>
          <Header />
        </header>
        <main>HomePage</main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
