import React, {Fragment} from "react";
import { connect } from "react-redux";

const ErrorMsg = ({error})=>(
    <Fragment>
        {error && <div>{error.message}</div>}
    </Fragment>
);

export default connect(store =>({error:store.error}))(ErrorMsg);