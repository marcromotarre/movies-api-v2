import prisma from "../db";

export const createMovieCredit = async (req: any, res: any) => {
  const upsert = await prisma.movieCredits.upsert({
    where: {
      movieId: req.body.movieId,
    },
    update: {},
    create: {
      movieId: req.body.movieId,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const createCastCredit = async (req: any, res: any) => {
  const upsert = await prisma.castCredit.upsert({
    where: {
      credit_id: req.body.credit_id,
    },
    update: {
      cast_id: req.body.cast_id,
      adult: req.body.adult,
      gender: req.body.gender,
      person_id: req.body.person_id,
      known_for_department: req.body.known_for_department,
      name: req.body.name,
      original_name: req.body.original_name,
      popularity: req.body.popularity,
      profile_path: req.body.profile_path,
      character: req.body.character,
      department: req.body.department,
      job: req.body.job,
      order: req.body.order,
      movieCreditsId: req.body.movieCreditsId,
    },
    create: {
      credit_id: req.body.credit_id,
      cast_id: req.body.cast_id,
      adult: req.body.adult,
      gender: req.body.gender,
      person_id: req.body.person_id,
      known_for_department: req.body.known_for_department,
      name: req.body.name,
      original_name: req.body.original_name,
      popularity: req.body.popularity,
      profile_path: req.body.profile_path,
      character: req.body.character,
      department: req.body.department,
      job: req.body.job,
      order: req.body.order,
      movieCreditsId: req.body.movieCreditsId,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const createCrewCredit = async (req: any, res: any) => {
  const upsert = await prisma.crewCredit.upsert({
    where: {
      credit_id: req.body.credit_id,
    },
    update: {
      adult: req.body.adult,
      gender: req.body.gender,
      known_for_department: req.body.known_for_department,
      name: req.body.name,
      original_name: req.body.original_name,
      popularity: req.body.popularity,
      profile_path: req.body.profile_path,
      cast_id: req.body.cast_id,
      character: req.body.character,
      order: req.body.order,
      movieCreditsId: req.body.movieCreditsId,
    },
    create: {
      credit_id: req.body.credit_id,
      adult: req.body.adult,
      gender: req.body.gender,
      known_for_department: req.body.known_for_department,
      name: req.body.name,
      original_name: req.body.original_name,
      popularity: req.body.popularity,
      profile_path: req.body.profile_path,
      cast_id: req.body.cast_id,
      character: req.body.character,
      order: req.body.order,
      movieCreditsId: req.body.movieCreditsId,
    },
  });
  res.json({ data: upsert, errors: [] });
};

export const getMovieCredit = async (req: any, res: any) => {
  const get = await prisma.movieCredits.findMany({
    where: {
      movieId: req.body.movieId,
    },
  });
  res.json({ data: get, errors: [] });
};
