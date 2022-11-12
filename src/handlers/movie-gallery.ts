import prisma from "../db";

export const getMoviesInGallery = async (req: any, res: any) => {
  console.log("FIND MOVIE IN GALLERY");
  const get = await prisma.movie.findMany({
    where: {
      platforms: {
        imdbMovie: {
          rating: { gt: 0 },
        },
      },
    },
    select: {
      name: true,
      image: true,
      platforms: {
        select: {
          imdbMovie: {
            select: {
              rating: true,
            },
          },
        },
      },
    },
    orderBy: {
      platforms: {
        imdbMovie: {
          rating: "desc",
        },
      },
    },
  });
  res.json({ data: get, errors: [] });
};
