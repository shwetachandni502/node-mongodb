const Provider = require('../models/provider');

exports.createProvider = async (req, res) => {
  const { name } = req.body;
  const providerExists = await Provider.find({ name: name });
  if(providerExists.length) {
    return res.status(400).json({
      message: 'This provider already exists.',
      success: false
    });
  }

  const provider = new Provider(req.body);
  provider.save((err, provider) => {
    if (err) {
      return res.status(400).json({
        message: "something went wrong!",
        success: false
      });
    }
    res.status(200).json({
      provider,
      success: 'Provider created successfully',
      success: true
    });
  });
}

exports.getProvider = async (req, res) => {
  const providers = await Provider.find()
  
  res.status(200).json({
    providers,
    success: 'Provider get successfully',
    success: true
  });
}