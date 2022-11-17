import prisma from "../db";

export const createNetflixMovie = async (req: any, res: any) => {
  console.log(
    req.body.id,
    req.body.title,
    req.body.releaseYear,
    req.body.parsed
  );
  const upsert = await prisma.netflixMovie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      parsed: req.body.parsed,
    },
    create: {
      id: req.body.id,
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      parsed: req.body.parsed,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getNetflixMovies = async (req: any, res: any) => {
  const get = await prisma.netflixMovie.findMany({
    where: {
      platforms: null,
      parsed: false,
    },
    orderBy: {
      title: "desc",
    },
  });
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
  console.log(
    req.body.id,
    req.body.title,
    req.body.releaseYear,
    req.body.parsed
  );
  const updated = await prisma.netflixMovie.update({
    where: {
      id: parseInt(req.params.id),
    },
    data: {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      parsed: req.body.parsed,
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
