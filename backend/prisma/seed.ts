import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
});

const checkpoints = [
  { id: 1, threshold: 5000, rewardName: 'รางวัล A' },
  { id: 2, threshold: 7500, rewardName: 'รางวัล B' },
  { id: 3, threshold: 10000, rewardName: 'รางวัล C' },
];

async function main() {
  for (const checkpoint of checkpoints) {
    await prisma.checkpoint.upsert({
      where: { id: checkpoint.id },
      update: checkpoint,
      create: checkpoint,
    });
  }
  console.log(`Seeded ${checkpoints.length} checkpoints`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
