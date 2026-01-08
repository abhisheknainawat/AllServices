const Service = require('../models/Service');
const User = require('../models/User');

// Create service (provider only)
const createService = async (req, res) => {
  try {
    const { name, category, description, price, priceType, images, availability } = req.body;

    // Validate user is provider
    const user = await User.findById(req.userId);
    if (!user || user.role !== 'provider') {
      return res.status(403).json({ message: 'Only providers can create services' });
    }

    // Validate required fields
    if (!name || !category || !description || !price) {
      return res.status(400).json({ message: 'Please provide all required fields: name, category, description, price' });
    }

    // Validate price type
    if (priceType && !['hourly', 'fixed', 'daily'].includes(priceType)) {
      return res.status(400).json({ message: 'Invalid priceType. Must be: hourly, fixed, or daily' });
    }

    const service = new Service({
      name,
      category,
      description,
      price: parseFloat(price),
      priceType: priceType || 'fixed',
      images: images || [],
      providerId: req.userId,
      availability: availability || {},
    });

    await service.save();

    res.status(201).json({
      message: 'Service created successfully',
      service,
    });
  } catch (error) {
    console.error('Service creation error:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search, rating } = req.query;
    let filter = { isActive: true };

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (rating) filter.rating = { $gte: rating };

    const services = await Service.find(filter).populate('providerId', 'name rating profilePhoto');
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate('providerId');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Get services by provider
const getServicesByProvider = async (req, res) => {
  try {
    const services = await Service.find({ providerId: req.params.providerId });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Update service (provider only)
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.providerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this service' });
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: 'Service updated successfully',
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete service (provider only)
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.providerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this service' });
    }

    await Service.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

// Get services by category
const getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({
      category: req.params.category,
      isActive: true,
    }).populate('providerId', 'name rating profilePhoto');

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

// Search services
const searchServices = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Please provide search keyword' });
    }

    const services = await Service.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
      ],
      isActive: true,
    }).populate('providerId', 'name rating profilePhoto');

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error searching services', error: error.message });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  getServicesByProvider,
  updateService,
  deleteService,
  getServicesByCategory,
  searchServices,
};
