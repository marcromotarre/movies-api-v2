import prisma from "../db";

export const createHBOMovie = async (req: any, res: any) => {
  const upsert = await prisma.hBOMovie.upsert({
    where: {
      id: req.body.id,
    },
    update: {
      information: req.body.information,
      releaseYear: req.body.releaseYear,
    },
    create: {
      id: req.body.id,
      information: req.body.information,
      releaseYear: req.body.releaseYear,
    },
  });
  res.status(200)
  res.json({ data: upsert, errors: [] });
};

export const getHBOMovies = async (req: any, res: any) => {
  const get = await prisma.hBOMovie.findMany({});
  res.json({ data: get, errors: [] });
};

export const getHBOMovie = async (req: any, res: any) => {
  const get = await prisma.hBOMovie.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: get, errors: [] });
};

/*export const updateHBOMovie = async (req: any, res: any) => {
  const updated = await prisma.netflixMovie.update({
    where: {
      id: req.params.id,
    },
    data: {
      information: req.body.information,
      releaseYear: req.body.releaseYear,
    },
  });
  res.json({ data: updated, errors: [] });
};*/

export const deleteHBOMovie = async (req: any, res: any) => {
  const deleteRow = await prisma.hBOMovie.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleteRow, errors: [] });
};

export const deleteAllHBOMovies = async (req: any, res: any) => {
  const deleteMany = await prisma.hBOMovie.deleteMany({});
  res.json({ data: deleteMany, errors: [] });
};
