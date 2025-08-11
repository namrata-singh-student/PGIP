const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("../models/User");
const Scheme = require("../models/Scheme");
const Notification = require("../models/Notification");

// Load environment variables
dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB for seeding"))
  .catch(err => console.error("MongoDB connection error:", err));

// Sample schemes data
const sampleSchemes = [
  {
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support of Rs. 6000 per year to all farmer families across the country in three equal installments of Rs. 2000 each.",
    category: "agriculture",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 0, max: 200000 },
      occupation: ["farmer", "agricultural laborer"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Direct cash transfer of Rs. 6000 per year",
      "Three installments of Rs. 2000 each",
      "No middlemen involved",
      "Direct bank transfer"
    ],
    documents: [
      "Aadhaar Card",
      "Land records",
      "Bank account details",
      "Income certificate"
    ],
    applicationProcess: [
      "Visit nearest Common Service Centre (CSC)",
      "Submit required documents",
      "Fill application form",
      "Get verification done"
    ],
    status: "active",
    website: "https://pmkisan.gov.in",
    contactInfo: {
      phone: "1800-180-1551",
      email: "pmkisan@gov.in",
      address: "Ministry of Agriculture, New Delhi"
    },
    budget: 75000000000
  },
  {
    title: "Ayushman Bharat Yojana",
    description: "Health insurance scheme providing coverage up to Rs. 5 lakhs per family per year for secondary and tertiary care hospitalization.",
    category: "health",
    eligibility: {
      age: { min: 0, max: 100 },
      income: { min: 0, max: 250000 },
      occupation: ["all"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Health coverage up to Rs. 5 lakhs per family",
      "Covers pre and post hospitalization expenses",
      "No restriction on family size",
      "Cashless treatment at empaneled hospitals"
    ],
    documents: [
      "Aadhaar Card",
      "Income certificate",
      "Caste certificate (if applicable)",
      "Family photo"
    ],
    applicationProcess: [
      "Visit nearest Ayushman Mitra",
      "Submit required documents",
      "Get eligibility verified",
      "Receive Golden Card"
    ],
    status: "active",
    website: "https://pmjay.gov.in",
    contactInfo: {
      phone: "14555",
      email: "support@pmjay.gov.in",
      address: "National Health Authority, New Delhi"
    },
    budget: 64000000000
  },
  {
    title: "Beti Bachao Beti Padhao",
    description: "Comprehensive scheme to address the declining Child Sex Ratio and related issues of empowerment of girls and women.",
    category: "women",
    eligibility: {
      age: { min: 0, max: 18 },
      income: { min: 0, max: 800000 },
      occupation: ["all"],
      states: ["all"],
      gender: "female",
      education: "any"
    },
    benefits: [
      "Financial support for girl child education",
      "Awareness campaigns for gender equality",
      "Skill development programs",
      "Healthcare facilities for girls"
    ],
    documents: [
      "Birth certificate",
      "Aadhaar Card",
      "Bank account details",
      "Income certificate"
    ],
    applicationProcess: [
      "Register at Anganwadi Centre",
      "Submit required documents",
      "Get verification done",
      "Receive benefits"
    ],
    status: "active",
    website: "https://wcd.nic.in/bbbp-schemes",
    contactInfo: {
      phone: "1800-111-111",
      email: "bbbp@gov.in",
      address: "Ministry of Women and Child Development"
    },
    budget: 20000000000
  },
  {
    title: "PM Fasal Bima Yojana",
    description: "Crop insurance scheme to provide financial support to farmers in case of crop failure due to natural calamities.",
    category: "agriculture",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 0, max: 500000 },
      occupation: ["farmer"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Comprehensive crop insurance coverage",
      "Low premium rates",
      "Quick claim settlement",
      "Coverage for natural calamities"
    ],
    documents: [
      "Land records",
      "Aadhaar Card",
      "Bank account details",
      "Crop details"
    ],
    applicationProcess: [
      "Contact nearest insurance company",
      "Submit application form",
      "Pay premium",
      "Get insurance certificate"
    ],
    status: "active",
    website: "https://pmfby.gov.in",
    contactInfo: {
      phone: "1800-180-1551",
      email: "pmfby@gov.in",
      address: "Ministry of Agriculture"
    },
    budget: 15000000000
  },
  {
    title: "Skill India Mission",
    description: "National campaign to train over 40 crore people in India in different skills by 2022.",
    category: "employment",
    eligibility: {
      age: { min: 15, max: 45 },
      income: { min: 0, max: 300000 },
      occupation: ["student", "unemployed", "all"],
      states: ["all"],
      gender: "all",
      education: "secondary"
    },
    benefits: [
      "Free skill training",
      "Placement assistance",
      "Industry-recognized certificates",
      "Stipend during training"
    ],
    documents: [
      "Aadhaar Card",
      "Educational certificates",
      "Income certificate",
      "Passport size photos"
    ],
    applicationProcess: [
      "Visit nearest training center",
      "Choose skill course",
      "Submit application",
      "Start training"
    ],
    status: "active",
    website: "https://www.msde.gov.in",
    contactInfo: {
      phone: "1800-102-6000",
      email: "skillindia@gov.in",
      address: "Ministry of Skill Development"
    },
    budget: 17000000000
  },
  {
    title: "Aadhaar Services",
    description: "Comprehensive Aadhaar services including enrollment, updates, and verification for all citizens.",
    category: "documents",
    eligibility: {
      age: { min: 0, max: 100 },
      income: { min: 0, max: 1000000 },
      occupation: ["all"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Unique identification number",
      "Access to government services",
      "Digital identity verification",
      "Financial inclusion"
    ],
    documents: [
      "Birth certificate",
      "Address proof",
      "Identity proof",
      "Passport size photo"
    ],
    applicationProcess: [
      "Visit Aadhaar enrollment center",
      "Submit required documents",
      "Biometric verification",
      "Receive Aadhaar number"
    ],
    status: "active",
    website: "https://uidai.gov.in",
    contactInfo: {
      phone: "1947",
      email: "help@uidai.gov.in",
      address: "UIDAI, New Delhi"
    },
    budget: 50000000000
  },
  {
    title: "PAN Card Services",
    description: "Permanent Account Number services for tax identification and financial transactions.",
    category: "documents",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 0, max: 1000000 },
      occupation: ["all"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Tax identification number",
      "Required for financial transactions",
      "Digital signature capability",
      "Government service access"
    ],
    documents: [
      "Aadhaar Card",
      "Address proof",
      "Identity proof",
      "Passport size photo"
    ],
    applicationProcess: [
      "Apply online through NSDL/UTIITSL",
      "Submit required documents",
      "Pay application fee",
      "Receive PAN card"
    ],
    status: "active",
    website: "https://www.nsdl.co.in",
    contactInfo: {
      phone: "1800-222-990",
      email: "support@nsdl.co.in",
      address: "NSDL, Mumbai"
    },
    budget: 20000000000
  },
  {
    title: "Passport Services",
    description: "Indian passport application and renewal services for international travel.",
    category: "documents",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 0, max: 1000000 },
      occupation: ["all"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "International travel document",
      "Government identity proof",
      "Visa application requirement",
      "Global recognition"
    ],
    documents: [
      "Aadhaar Card",
      "PAN Card",
      "Address proof",
      "Birth certificate",
      "Passport size photos"
    ],
    applicationProcess: [
      "Apply online through Passport Seva",
      "Book appointment",
      "Submit documents at PSK",
      "Receive passport"
    ],
    status: "active",
    website: "https://passportindia.gov.in",
    contactInfo: {
      phone: "1800-258-1800",
      email: "support@passportindia.gov.in",
      address: "Passport Seva Kendra"
    },
    budget: 15000000000
  },
  {
    title: "Income Tax Filing Services",
    description: "Comprehensive income tax filing and consultation services for individuals and businesses.",
    category: "tax",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 250000, max: 1000000 },
      occupation: ["all"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "Professional tax filing assistance",
      "Tax optimization advice",
      "Compliance support",
      "Refund tracking"
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Form 16/16A",
      "Bank statements",
      "Investment proofs"
    ],
    applicationProcess: [
      "Consult tax professional",
      "Gather required documents",
      "File tax return",
      "Track refund status"
    ],
    status: "active",
    website: "https://www.incometax.gov.in",
    contactInfo: {
      phone: "1800-425-2229",
      email: "support@incometax.gov.in",
      address: "Income Tax Department"
    },
    budget: 10000000000
  },
  {
    title: "GST Registration Services",
    description: "Goods and Services Tax registration and compliance services for businesses.",
    category: "tax",
    eligibility: {
      age: { min: 18, max: 100 },
      income: { min: 20000000, max: 100000000 },
      occupation: ["business-owner", "self-employed"],
      states: ["all"],
      gender: "all",
      education: "any"
    },
    benefits: [
      "GST registration certificate",
      "Input tax credit benefits",
      "Business compliance",
      "Digital invoice generation"
    ],
    documents: [
      "PAN Card",
      "Aadhaar Card",
      "Business registration",
      "Bank account details",
      "Address proof"
    ],
    applicationProcess: [
      "Apply online through GST portal",
      "Submit required documents",
      "Verification process",
      "Receive GST certificate"
    ],
    status: "active",
    website: "https://www.gst.gov.in",
    contactInfo: {
      phone: "1800-103-4786",
      email: "support@gst.gov.in",
      address: "GST Department"
    },
    budget: 8000000000
  }
];

// Sample users data
const sampleUsers = [
  {
    name: "Rahul Kumar",
    email: "rahul@example.com",
    password: "password123",
    phone: "9876543210",
    age: 28,
    gender: "male",
    state: "Delhi",
    city: "New Delhi",
    occupation: "employed",
    education: "graduate",
    income: 800000,
    interests: ["technology", "education"]
  },
  {
    name: "Priya Sharma",
    email: "priya@example.com",
    password: "password123",
    phone: "9876543211",
    age: 25,
    gender: "female",
    state: "Maharashtra",
    city: "Mumbai",
    occupation: "employed",
    education: "post-graduate",
    income: 500000,
    interests: ["education", "women"]
  },
  {
    name: "Amit Patel",
    email: "amit@example.com",
    password: "password123",
    phone: "9876543212",
    age: 45,
    gender: "male",
    state: "Gujarat",
    city: "Ahmedabad",
    occupation: "self-employed",
    education: "secondary",
    income: 300000,
    interests: ["agriculture", "health"]
  }
];

// Seed function
async function seedData() {
  try {
    console.log("🌱 Starting database seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Scheme.deleteMany({});
    await Notification.deleteMany({});
    console.log("🗑️ Cleared existing data");

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      await user.save();
      createdUsers.push(user);
      console.log(`👤 Created user: ${user.name}`);
    }

    // Create schemes
    const createdSchemes = [];
    for (const schemeData of sampleSchemes) {
      const scheme = new Scheme(schemeData);
      await scheme.save();
      createdSchemes.push(scheme);
      console.log(`📋 Created scheme: ${scheme.title}`);
    }

    // Create sample notifications
    const notifications = [
      {
        user: createdUsers[0]._id,
        title: "New Scheme Available",
        message: "PM Kisan Samman Nidhi scheme is now available for farmers in your area.",
        type: "scheme",
        priority: "high",
        relatedScheme: createdSchemes[0]._id
      },
      {
        user: createdUsers[1]._id,
        title: "Application Deadline Reminder",
        message: "Don't forget to apply for Beti Bachao Beti Padhao scheme before the deadline.",
        type: "reminder",
        priority: "medium",
        relatedScheme: createdSchemes[2]._id
      },
      {
        user: createdUsers[2]._id,
        title: "Welcome to PGIP",
        message: "Welcome to the Portal for Government Information and Programs! Explore schemes tailored for you.",
        type: "general",
        priority: "low"
      }
    ];

    // Create public tax notifications
    const publicTaxNotifications = [
      {
        user: createdUsers[0]._id,
        title: "Income Tax Filing Deadline Extended",
        message: "The deadline for filing income tax returns for FY 2023-24 has been extended to December 31, 2024.",
        type: "tax",
        priority: "urgent",
        isPublic: true,
        actionUrl: "https://www.incometax.gov.in"
      },
      {
        user: createdUsers[1]._id,
        title: "New Tax Deductions for Education",
        message: "Additional tax deductions of up to Rs. 50,000 for education expenses under Section 80C.",
        type: "tax",
        priority: "high",
        isPublic: true,
        actionUrl: "https://www.incometax.gov.in"
      },
      {
        user: createdUsers[2]._id,
        title: "GST Rate Changes Effective",
        message: "New GST rates effective from January 1, 2024. Check updated rates for your business category.",
        type: "tax",
        priority: "high",
        isPublic: true,
        actionUrl: "https://www.gst.gov.in"
      },
      {
        user: createdUsers[0]._id,
        title: "Property Tax Payment Due",
        message: "Last date for property tax payment without penalty is March 31, 2024.",
        type: "tax",
        priority: "medium",
        isPublic: true,
        actionUrl: "https://municipal.gov.in"
      },
      {
        user: createdUsers[1]._id,
        title: "TDS Rate Updates",
        message: "Updated TDS rates for FY 2024-25. Check new rates for salary, interest, and other payments.",
        type: "tax",
        priority: "high",
        isPublic: true,
        actionUrl: "https://www.incometax.gov.in"
      },
      {
        user: createdUsers[2]._id,
        title: "Digital Payment Incentives",
        message: "Additional tax benefits for digital payments. Get 2% cashback on digital transactions.",
        type: "tax",
        priority: "medium",
        isPublic: true,
        actionUrl: "https://www.digitalindia.gov.in"
      }
    ];

    for (const notificationData of notifications) {
      const notification = new Notification(notificationData);
      await notification.save();
      console.log(`🔔 Created notification: ${notification.title}`);
    }

    for (const notificationData of publicTaxNotifications) {
      const notification = new Notification(notificationData);
      await notification.save();
      console.log(`💰 Created tax notification: ${notification.title}`);
    }

    console.log("✅ Database seeding completed successfully!");
    console.log(`📊 Created ${createdUsers.length} users, ${createdSchemes.length} schemes, and ${notifications.length + publicTaxNotifications.length} notifications`);

    // Display sample data
    console.log("\n📋 Sample Schemes:");
    createdSchemes.forEach(scheme => {
      console.log(`  - ${scheme.title} (${scheme.category})`);
    });

    console.log("\n👥 Sample Users:");
    createdUsers.forEach(user => {
      console.log(`  - ${user.name} (${user.email}) - ${user.occupation}`);
    });

    console.log("\n🔗 Test Credentials:");
    console.log("  Email: rahul@example.com, Password: password123");
    console.log("  Email: priya@example.com, Password: password123");
    console.log("  Email: amit@example.com, Password: password123");

  } catch (error) {
    console.error("❌ Seeding error:", error);
  } finally {
    mongoose.connection.close();
    console.log("🔌 Database connection closed");
  }
}

// Run seeding
seedData(); 