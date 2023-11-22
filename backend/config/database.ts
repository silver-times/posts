import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
async function createDummyData() {
  const dummyUsers = [
    {
      email: "user1@example.com",
      firstName: "John",
      lastName: "Doe",
      password: "password123",
    },
    {
      email: "user2@example.com",
      firstName: "Jane",
      lastName: "Smith",
      password: "password123",
    },
    {
      email: "user3@example.com",
      firstName: "Alice",
      lastName: "Johnson",
      password: "password123",
    },
    {
      email: "user4@example.com",
      firstName: "Bob",
      lastName: "Johnson",
      password: "password123",
    },
  ];

  const fancyPostTitles = [
    "Whispers of Elegance",
    "Chronicles from the Ether",
    "Serendipity Unveiled",
    "Mystique Reveries",
    "The Enigmatic Odyssey",
  ];

  for (const [index, userData] of dummyUsers.entries()) {
    const user = await prisma.user.create({
      data: {
        ...userData,
        posts: {
          create: [
            {
              title: `${fancyPostTitles[index % fancyPostTitles.length]} `,
              content:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt maiores delectus, asperiores minima dicta modi deserunt odit optio placeat, voluptatem dolorem dolore commodi quod, corrupti numquam? Tempora neque cupiditate consectetur cum cumque! Fugit deleniti ullam temporibus odio, amet corrupti eius, asperiores ratione pariatur voluptate at? Officiis vero fugiat veritatis nostrum?",
              published: true,
            },
            {
              title: `${
                fancyPostTitles[(index + 1) % fancyPostTitles.length]
              } `,
              content:
                "Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.",
              published: false,
            },
          ],
        },
      },
    });

    console.log(`User ${user.firstName} created with 2 posts.`);
  }

  console.log("Dummy data creation complete.");
}

createDummyData()
  .catch((error) => {
    console.error("Error creating dummy data:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
