import prisma from "../db";

export const createIMDBMovie = async (req: any, res: any) => {
  console.log(req.body.id, req.body.rating, req.body.votes)
  const upsert = await prisma.iMDBMovie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
    },
    create: {
      id: req.body.id,
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getIMDBMovies = async (req: any, res: any) => {
  const get = await prisma.iMDBMovie.findMany({
    where: {
      votes: null
    }
  });
  res.json({ data: get, errors: [] });
};

export const getIMDBMovie = async (req: any, res: any) => {
  const get = await prisma.iMDBMovie.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: get, errors: [] });
};

export const updateIMDBMovie = async (req: any, res: any) => {
  const updated = await prisma.iMDBMovie.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
      rating: req.body.rating,
      votes: req.body.votes,
    },
  });
  res.json({ data: updated, errors: [] });
};

export const deleteIMDBMovie = async (req: any, res: any) => {
  const deleteRow = await prisma.iMDBMovie.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleteRow, errors: [] });
};

export const deleteAllIMDBMovies = async (req: any, res: any) => {
  const deleteMany = await prisma.iMDBMovie.deleteMany({});
  res.json({ data: deleteMany, errors: [] });
};
