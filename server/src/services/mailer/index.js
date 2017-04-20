const mailgunService = require('feathers-mailgun');

module.exports = function(){
  const app = this

  app.use('/mailer', mailgunService({
    apiKey: "key-8c34d6ef4a130e83d47d70ba8ab7b2e2",
    domain: 'sandbox3fee32b91fc24a7caef339caa0d03098.mailgun.org' // ex. your.domain.com
  }));
};
