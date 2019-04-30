import React from "react";

const footer = props => {
  return (
    <footer className="page-footer" style={{ backgroundColor: "#3f51b5" }}>
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">MountBlue Technologies</h5>
            <p className="grey-text text-lighten-4">
              MERN stack developement for Propel School.
            </p>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2019 Copyright by cohort8 JavaScript - March 4th Batch Team-2.
          <a className="grey-text text-lighten-4 right" href="#!">
            Resources
          </a>
        </div>
      </div>
    </footer>
  );
};

export default footer;
