import React, { Fragment } from "react";
import { connect } from "react-redux";

const ErrorMessage = ({ error }) => (
    <Fragment>
    {console.log("error here",error)}
        {error && error.message && <div className="error">{error.message.message}</div>}
    </Fragment>
);

export default connect(store => ({ error: store.error }))(ErrorMessage);