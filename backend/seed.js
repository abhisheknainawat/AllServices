require('dotenv').config();
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('./models/User');
const Service = require('./models/Service');

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

const seedData = async () => {
  try {
    // Clear existing providers and their services
    const existingProviders = await User.find({ role: 'provider' });
    for (const provider of existingProviders) {
      await Service.deleteMany({ providerId: provider._id });
    }
    await User.deleteMany({ role: 'provider' });
    console.log('🧹 Cleared existing providers and services');

    // Define 10 providers with their services
    const providersData = [
      {
        name: 'Woodcraft Studio',
        email: 'woodcraft@example.com',
        password: 'password123',
        phone: '9876543210',
        role: 'provider',
        bio: 'Expert custom carpentry and furniture design',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA'
        },
        services: [
          {
            name: 'Custom Furniture Making',
            category: 'carpenter',
            description: 'Expert custom carpentry and furniture design. We create bespoke pieces tailored to your needs.',
            price: 75,
            priceType: 'hourly'
          },
          {
            name: 'Home Renovation & Repairs',
            category: 'carpenter',
            description: 'Professional home renovation, wall installations, and structural repairs.',
            price: 65,
            priceType: 'hourly'
          },
          {
            name: 'Cabinet & Wardrobe Installation',
            category: 'carpenter',
            description: 'Custom cabinets, wardrobes, and storage solutions for modern homes.',
            price: 80,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'Guitar Masters',
        email: 'guitar@example.com',
        password: 'password123',
        phone: '9876543211',
        role: 'provider',
        bio: 'Professional guitar lessons and training',
        address: {
          city: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        },
        services: [
          {
            name: 'Guitar Lessons - Beginner',
            category: 'guitarist',
            description: 'Perfect for beginners. Learn guitar basics, chords, and simple songs.',
            price: 40,
            priceType: 'hourly'
          },
          {
            name: 'Advanced Guitar Training',
            category: 'guitarist',
            description: 'Advanced techniques, music theory, and professional-level instruction.',
            price: 80,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'Glamour Wedding Studio',
        email: 'glamour@example.com',
        password: 'password123',
        phone: '9876543212',
        role: 'provider',
        bio: 'Professional salon and makeup services',
        address: {
          city: 'Miami',
          state: 'FL',
          country: 'USA'
        },
        services: [
          {
            name: 'Hair Cut & Styling',
            category: 'salon',
            description: 'Professional haircut and styling for all hair types.',
            price: 30,
            priceType: 'fixed'
          },
          {
            name: 'Bridal Makeup & Hair',
            category: 'salon',
            description: 'Complete bridal packages with makeup, hair, and consultation.',
            price: 150,
            priceType: 'fixed'
          },
          {
            name: 'Hair Coloring & Treatment',
            category: 'salon',
            description: 'Professional hair coloring, highlights, and deep conditioning treatments.',
            price: 80,
            priceType: 'fixed'
          }
        ]
      },
      {
        name: 'ElectroFix Services',
        email: 'electro@example.com',
        password: 'password123',
        phone: '9876543213',
        role: 'provider',
        bio: 'Licensed electrician for all home electrical needs',
        address: {
          city: 'Chicago',
          state: 'IL',
          country: 'USA'
        },
        services: [
          {
            name: 'Residential Electrical Repair',
            category: 'electrician',
            description: 'Licensed electrician for all home electrical repairs and maintenance.',
            price: 60,
            priceType: 'hourly'
          },
          {
            name: 'Home Wiring & Installation',
            category: 'electrician',
            description: 'Complete electrical wiring, new installations, and upgrades.',
            price: 75,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'ClimateControl Tech',
        email: 'climate@example.com',
        password: 'password123',
        phone: '9876543214',
        role: 'provider',
        bio: 'HVAC and air conditioning specialist',
        address: {
          city: 'Houston',
          state: 'TX',
          country: 'USA'
        },
        services: [
          {
            name: 'AC Installation & Repair',
            category: 'technician',
            description: 'Air conditioning installation, repair, and maintenance services.',
            price: 70,
            priceType: 'hourly'
          },
          {
            name: 'HVAC System Maintenance',
            category: 'technician',
            description: 'Regular HVAC system maintenance and inspection.',
            price: 65,
            priceType: 'hourly'
          },
          {
            name: 'Refrigeration Services',
            category: 'technician',
            description: 'Commercial and residential refrigeration repair and maintenance.',
            price: 80,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'Clean Homes Pro',
        email: 'cleaning@example.com',
        password: 'password123',
        phone: '9876543215',
        role: 'provider',
        bio: 'Professional house cleaning and maintenance',
        address: {
          city: 'Phoenix',
          state: 'AZ',
          country: 'USA'
        },
        services: [
          {
            name: 'Deep House Cleaning',
            category: 'house_keeping',
            description: 'Complete deep cleaning of your entire home with eco-friendly products.',
            price: 40,
            priceType: 'hourly'
          },
          {
            name: 'Regular Maintenance Cleaning',
            category: 'house_keeping',
            description: 'Weekly or bi-weekly cleaning service for a tidy home.',
            price: 30,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'LaundryPro Services',
        email: 'laundry@example.com',
        password: 'password123',
        phone: '9876543216',
        role: 'provider',
        bio: 'Professional laundry and clothing care',
        address: {
          city: 'Philadelphia',
          state: 'PA',
          country: 'USA'
        },
        services: [
          {
            name: 'Regular Laundry Service',
            category: 'laundry',
            description: 'Wash, dry, and fold service for everyday laundry.',
            price: 20,
            priceType: 'fixed'
          },
          {
            name: 'Dry Cleaning',
            category: 'laundry',
            description: 'Professional dry cleaning for formal wear and delicate fabrics.',
            price: 50,
            priceType: 'fixed'
          },
          {
            name: 'Ironing & Pressing Service',
            category: 'laundry',
            description: 'Professional ironing and pressing for perfect results.',
            price: 30,
            priceType: 'fixed'
          }
        ]
      },
      {
        name: 'CodeMasters Academy',
        email: 'code@example.com',
        password: 'password123',
        phone: '9876543217',
        role: 'provider',
        bio: 'Programming and web development courses',
        address: {
          city: 'San Francisco',
          state: 'CA',
          country: 'USA'
        },
        services: [
          {
            name: 'Web Development Course',
            category: 'courses',
            description: 'Learn HTML, CSS, JavaScript, and modern web frameworks.',
            price: 50,
            priceType: 'hourly'
          },
          {
            name: 'Python Programming',
            category: 'courses',
            description: 'Complete Python programming from basics to advanced.',
            price: 45,
            priceType: 'hourly'
          }
        ]
      },
      {
        name: 'Bride\'s Beauty Studio',
        email: 'bride@example.com',
        password: 'password123',
        phone: '9876543218',
        role: 'provider',
        bio: 'Expert makeup artist for special occasions',
        address: {
          city: 'Boston',
          state: 'MA',
          country: 'USA'
        },
        services: [
          {
            name: 'Bridal Makeup Package',
            category: 'mua',
            description: 'Complete bridal makeup with trials and touch-ups included.',
            price: 150,
            priceType: 'fixed'
          },
          {
            name: 'Party Makeup & Styling',
            category: 'mua',
            description: 'Professional makeup for parties, events, and gatherings.',
            price: 60,
            priceType: 'fixed'
          },
          {
            name: 'Eyebrow Threading & Design',
            category: 'mua',
            description: 'Perfect eyebrow threading and design services.',
            price: 25,
            priceType: 'fixed'
          }
        ]
      },
      {
        name: 'AutoCare Mechanics',
        email: 'auto@example.com',
        password: 'password123',
        phone: '9876543219',
        role: 'provider',
        bio: 'Professional automotive repair and maintenance',
        address: {
          city: 'Seattle',
          state: 'WA',
          country: 'USA'
        },
        services: [
          {
            name: 'General Car Servicing',
            category: 'mechanic',
            description: 'Regular maintenance, oil changes, and system checks.',
            price: 80,
            priceType: 'fixed'
          },
          {
            name: 'Engine Repair & Overhaul',
            category: 'mechanic',
            description: 'Expert engine repair and complete overhaul services.',
            price: 120,
            priceType: 'hourly'
          },
          {
            name: 'Brake & Suspension Service',
            category: 'mechanic',
            description: 'Brake inspection, repair, and suspension alignment.',
            price: 100,
            priceType: 'fixed'
          }
        ]
      }
    ];

    let totalServicesAdded = 0;

    // Create providers and their services
    for (const providerData of providersData) {
      const { services, ...userData } = providerData;

      // Hash password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(userData.password, salt);

      // Create user
      const user = await User.create({
        ...userData,
        password: hashedPassword,
        isVerified: true,
        isActive: true,
        rating: 4.5 + Math.random() * 0.5 // Random rating between 4.5 and 5
      });

      console.log(`✅ Created provider: ${user.name} (${user.email})`);

      // Create services for this provider
      for (const serviceData of services) {
        const service = await Service.create({
          ...serviceData,
          providerId: user._id,
          rating: 4.5 + Math.random() * 0.5,
          totalReviews: Math.floor(Math.random() * 200) + 50,
          isActive: true
        });
        totalServicesAdded++;
        console.log(`  📌 Service: ${service.name} - $${service.price}/${service.priceType}`);
      }
    }

    console.log('\n✨ Seed data created successfully!');
    console.log(`📊 Total providers created: ${providersData.length}`);
    console.log(`📊 Total services created: ${totalServicesAdded}`);
    console.log('\n🔐 Default credentials for providers:');
    console.log('   Password: password123');
    console.log('\nProvider emails:');
    providersData.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.email}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

const main = async () => {
  await connectDB();
  await seedData();
};

main();
