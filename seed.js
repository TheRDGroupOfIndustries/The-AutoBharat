const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

async function main() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not set");

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    console.log('Seeding categories...');

    await prisma.category.createMany({
        data: [
            { name: 'Supercars', slug: 'supercars' },
            { name: 'Electric', slug: 'electric' },
            { name: 'Classic', slug: 'classic' },
            { name: 'Motorsport', slug: 'motorsport' },
            { name: 'Reviews', slug: 'reviews' },
            { name: 'Industry', slug: 'industry' }
        ],
        skipDuplicates: true
    });

    console.log('Categories seeded successfully!');
    await prisma.$disconnect();
}

main().catch(console.error);
