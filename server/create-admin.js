const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: "admin" }
    });

    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin);
      return;
    }

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: "admin@portfolio.com",
        name: "Admin User",
        role: "admin",
      }
    });

    console.log("Admin user created successfully:", admin);
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

