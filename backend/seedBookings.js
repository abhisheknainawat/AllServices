require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const seedBookings = async () => {
  try {
    // Clear existing bookings
    await Booking.deleteMany({});
    console.log('🧹 Cleared existing bookings');

    // Get first client user (we'll create one if doesn't exist)
    let client = await User.findOne({ role: 'client' });
    
    if (!client) {
      const bcryptjs = require('bcryptjs');
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash('password123', salt);
      
      client = await User.create({
        name: 'John Doe',
        email: 'client@example.com',
        password: hashedPassword,
        phone: '9876543220',
        role: 'client',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA'
        },
        isVerified: true,
        isActive: true
      });
      console.log(`✅ Created client: ${client.name}`);
    }

    // Get all services and providers
    const services = await Service.find().limit(10);
    
    if (services.length === 0) {
      console.log('❌ No services found. Please run seed.js first');
      process.exit(1);
    }

    let bookingsCreated = 0;

    // Create multiple bookings
    const bookingStatuses = ['pending', 'confirmed', 'completed'];
    const dates = [
      new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Tomorrow
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // In 3 days
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // In 7 days
      new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    ];

    for (let i = 0; i < services.length && i < 5; i++) {
      const service = services[i];
      const status = bookingStatuses[i % bookingStatuses.length];
      const date = dates[i];

      const booking = await Booking.create({
        serviceId: service._id,
        clientId: client._id,
        providerId: service.providerId,
        date: date.toISOString().split('T')[0],
        startTime: '10:00 AM',
        endTime: '12:00 PM',
        location: 'Client Location',
        description: `Booking for ${service.name}`,
        totalPrice: service.price * 2, // Assuming 2 units
        status: status,
        paymentStatus: 'completed',
        paymentMethod: 'card',
        isActive: true
      });

      bookingsCreated++;
      console.log(`✅ Created booking: ${service.name} - Status: ${status}`);
    }

    console.log('\n✨ Bookings seeded successfully!');
    console.log(`📊 Total bookings created: ${bookingsCreated}`);
    console.log(`\n🔐 Client credentials:`);
    console.log(`   Email: ${client.email}`);
    console.log(`   Password: password123`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding bookings:', error.message);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await seedBookings();
};

main();
