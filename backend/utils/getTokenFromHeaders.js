const getTokenFromHeaders = (req) => {
    // const token = req.headers.authorization.split(" ")[1];
    const token =req.cookies.jwtoken;
    if (token !== undefined) {
      return token;
    } else {
      return false;
    }
  };
  
  module.exports = getTokenFromHeaders;
  