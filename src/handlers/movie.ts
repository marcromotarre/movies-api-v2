import prisma from "../db";

export const createMovie = async (req: any, res: any) => {
  const upsert = await prisma.movie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      name: req.body.name,
      image: req.body.image,
      year: req.body.year,
      releaseDate: req.body.year,
    },
    create: {
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      year: req.body.year,
      releaseDate: req.body.year,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getMovies = async (req: any, res: any) => {
  const get = await prisma.movie.findMany({});
  res.json({ data: get, errors: [] });
};

export const getMovie = async (req: any, res: any) => {
  const get = await prisma.movie.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({ data: get, errors: [] });
};

export const updateMovie = async (req: any, res: any) => {
  const updated = await prisma.movie.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      name: req.body.name,
      image: req.body.image,
      year: req.body.year,
      releaseDate: req.body.year,
    },
  });
  res.json({ data: updated, errors: [] });
};

export const deleteMovie = async (req: any, res: any) => {
  const deleteRow = await prisma.movie.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({ data: deleteRow, errors: [] });
};

export const deleteAllMovies = async (req: any, res: any) => {
  const deleteMany = await prisma.movie.deleteMany({});
  res.json({ data: deleteMany, errors: [] });
};
