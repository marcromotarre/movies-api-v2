import prisma from "../db";

/*
  id        Int        @id
  createdAt DateTime   @default(now())
  name      String?
  rating    Float?
  votes     Int?
  movieId   Int?
*/

export const createFilmaffinityMovie = async (req: any, res: any) => {
  console.log(req.body.id, req.body.name, req.body.rating, req.body.votes);
  const upsert = await prisma.filmaffinityMovie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
      movieId: req.body.movieId,
    },
    create: {
      id: req.body.id,
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
      movieId: req.body.movieId,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getFilmaffinityMovies = async (req: any, res: any) => {
  const get = await prisma.filmaffinityMovie.findMany({
    where: {
      votes: null,
    },
  });
  res.json({ data: get, errors: [] });
};

export const getFilmaffinityMovie = async (req: any, res: any) => {
  const get = await prisma.filmaffinityMovie.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: get, errors: [] });
};

export const updateFilmaffinityMovie = async (req: any, res: any) => {
  const updated = await prisma.filmaffinityMovie.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
      movieId: req.body.movieId,
    },
  });
  res.json({ data: updated, errors: [] });
};

export const deleteFilmaffinityMovie = async (req: any, res: any) => {
  const deleteRow = await prisma.filmaffinityMovie.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleteRow, errors: [] });
};

export const deleteAllFilmaffinityMovies = async (req: any, res: any) => {
  const deleteMany = await prisma.filmaffinityMovie.deleteMany({});
  res.json({ data: deleteMany, errors: [] });
};
