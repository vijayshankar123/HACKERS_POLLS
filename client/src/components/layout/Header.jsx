import React from "react";
import { connect } from "react-redux";

//notifying whether the user has voted or not
const Header = ({ auth: { user, loading }, home }) => {
  return (
    <div>
      {user && user.votes === 0 && !loading ? (
        <h5 className="new-font">Start Voting Now !</h5>
      ) : (
        <h5 className="new-font">You have already voted once!</h5>
      )}

      <small>
        <div className="new-font text-muted">
          {home && home.candidates.length} candidates found
        </div>
      </small>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  home: state.home,
});

export default connect(mapStateToProps, {})(Header);
