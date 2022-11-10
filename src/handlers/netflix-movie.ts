import prisma from "../db";

export const createNetflixMovie = async (req: any, res: any) => {
  const upsert = await prisma.netflixMovie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      isPlayable: req.body.isPlayable,
      searchIndex: req.body.searchIndex,
      orderQuery: req.body.orderQuery,
    },
    create: {
      id: req.body.id,
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      isPlayable: req.body.isPlayable,
      searchIndex: req.body.searchIndex,
      orderQuery: req.body.orderQuery,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getNetflixMovies = async (req: any, res: any) => {
  const get = await prisma.netflixMovie.findMany({});
  res.json({ data: get, errors: [] });
};

export const getNetflixMovie = async (req: any, res: any) => {
  const get = await prisma.netflixMovie.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({ data: get, errors: [] });
};

export const updateNetflixMovie = async (req: any, res: any) => {
  const updated = await prisma.netflixMovie.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      isPlayable: req.body.isPlayable,
      searchIndex: req.body.searchIndex,
      orderQuery: req.body.orderQuery,
    },
  });
  res.json({ data: updated, errors: [] });
};

export const deleteNetflixMovie = async (req: any, res: any) => {
  const deleteRow = await prisma.netflixMovie.delete({
    where: {
      id: parseInt(req.params.id),
    },
  });
  res.json({ data: deleteRow, errors: [] });
};

export const deleteAllNetflixMovies = async (req: any, res: any) => {
  const deleteMany = await prisma.netflixMovie.deleteMany({});
  res.json({ data: deleteMany, errors: [] });
};
