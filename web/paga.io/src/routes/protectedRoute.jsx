// import React, { Fragment } from 'react';
// import { Redirect } from 'react-router-dom';
// import { connect } from "react-redux";
// import { compose } from "redux";

// const protectedRoute = (props) => {
//   const { children, auth } = props;
//   return (
//     <div>
//     {
//       auth.isLogin && auth.accessToken ?
//       <Fragment>
//         {children}
//       </Fragment> :
//       <Redirect to={"/login"} />
//     }
//   </div>
//   );
// };

// const mapStateToProps = state => {
//   return {
//     auth: state.auth,
//   };
// };

// export default compose(
//   connect(mapStateToProps, null)
// )(protectedRoute);
