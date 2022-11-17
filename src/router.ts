import prisma from "./db";
import { Router } from "express";
import { body, validationResult } from "express-validator";
import { isString } from "util";
import { handleInputErrors } from "./modules/middleware";

import { createUserRankingEngines } from "./handlers/user-ranking-engines";
import {
  createNetflixMovie,
  deleteAllNetflixMovies,
  deleteNetflixMovie,
  getNetflixMovie,
  getNetflixMovies,
  updateNetflixMovie,
} from "./handlers/netflix-movie";
import {
  createIMDBMovie,
  deleteAllIMDBMovies,
  deleteIMDBMovie,
  getIMDBMovie,
  getIMDBMovies,
  updateIMDBMovie,
} from "./handlers/imdb-movie";
import {
  createMovie,
  deleteAllMovies,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "./handlers/movie";
import { createMoviePlatforms } from "./handlers/platforms";
import { getMoviesInGallery } from "./handlers/movie-gallery";
import { createHBOMovie } from "./handlers/hbo-movie";
import { getUserParams, updateUserParams } from "./handlers/user-params";

const router = Router();

/**
 * User Params
 */
router.get("/user-params", async (req: any, res: any) => {
  getUserParams(req, res);
});
router.post("/user-params", async (req: any, res: any) => {
  updateUserParams(req, res);
});

/**
 * Movie
 */
router.get("/movie", async (req: any, res: any) => {
  getMovies(req, res);
});
router.get("/movie/:id", (req: any, res: any) => {
  getMovie(req, res);
});
router.put(
  "/movie/:id",
  [
    body("name").optional(),
    body("votes").optional(),
    body("rating").optional(),
  ],
  handleInputErrors,
  (req: any, res: any) => {
    updateMovie(req, res);
  }
);
router.post(
  "/movie",
  [body("id").isNumeric(), body("title").isString()],
  handleInputErrors,
  async (req: any, res: any) => {
    createMovie(req, res);
  }
);
router.delete("/movie/:id", (req: any, res: any) => {
  deleteMovie(req, res);
});
router.delete("/movie", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllMovies(req, res);
  };
});

/**
 * Movie Gallery
 */
router.get("/movie-gallery", (req: any, res: any) => {
  getMoviesInGallery(req, res);
});

/**
 * Netflix Movie
 */
router.get("/netflix", async (req: any, res: any) => {
  getNetflixMovies(req, res);
});
router.get("/netflix/:id", (req: any, res: any) => {
  getNetflixMovie(req, res);
});
router.put(
  "/netflix/:id",
  [body("title").optional(), body("releaseYear").optional()],
  handleInputErrors,
  (req: any, res: any) => {
    updateNetflixMovie(req, res);
  }
);
router.post(
  "/netflix",
  [
    body("id").isNumeric(),
    body("title").isString(),
    body("releaseYear").isNumeric(),
  ],
  handleInputErrors,
  async (req: any, res: any) => {
    createNetflixMovie(req, res);
  }
);
router.delete("/netflix/:id", (req: any, res: any) => {
  deleteNetflixMovie(req, res);
});
router.delete("/netflix", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllNetflixMovies(req, res);
  };
});

/**
 * HBO Movie
 */
router.get("/hbo", (req: any, res: any) => {});
router.get("/hbo/:id", (req: any, res: any) => {});
router.put("/hbo/:id", (req: any, res: any) => {});
router.post("/hbo", async (req: any, res: any) => {
  createHBOMovie(req, res);
});

router.delete("/hbo/:id", (req: any, res: any) => {});
router.delete("/hbo", (req: any, res: any) => {});

/**
 * Disney Movie
 */
router.get("/disney", (req: any, res: any) => {});
router.get("/disney/:id", (req: any, res: any) => {});
router.put("/disney/:id", (req: any, res: any) => {});
router.post("/disney", (req: any, res: any) => {});
router.delete("/disney/:id", (req: any, res: any) => {});
router.delete("/disney", (req: any, res: any) => {});

/**
 * IMDB Movie
 */
router.get("/imdb", async (req: any, res: any) => {
  getIMDBMovies(req, res);
});
router.get("/imdb/:id", (req: any, res: any) => {
  getIMDBMovie(req, res);
});
router.put(
  "/imdb/:id",
  [
    body("name").optional(),
    body("votes").optional(),
    body("rating").optional(),
  ],
  handleInputErrors,
  (req: any, res: any) => {
    updateIMDBMovie(req, res);
  }
);
router.post(
  "/imdb",
  [body("id").isNumeric(), body("title").isString()],
  handleInputErrors,
  async (req: any, res: any) => {
    createIMDBMovie(req, res);
  }
);
router.delete("/imdb/:id", (req: any, res: any) => {
  deleteIMDBMovie(req, res);
});
router.delete("/imdb", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllIMDBMovies(req, res);
  };
});

/**
 * Filmaffinity Movie
 */
router.get("/filmaffinity", (req, res) => {
  res.json({ message: "these are all the movies you want to request" });
  res.status(200);
  return;
});
router.get("/filmaffinity/:id", (req: any, res: any) => {});
router.put("/filmaffinity/:id", (req: any, res: any) => {});
router.post("/filmaffinity", (req: any, res: any) => {});
router.delete("/filmaffinity/:id", (req: any, res: any) => {});
router.delete("/filmaffinity", (req: any, res: any) => {});

/**
 * Rotten Tomatoes Movie
 */
router.get("/rottentomatoes", (req: any, res: any) => {});
router.get("/rottentomatoes/:id", (req: any, res: any) => {});
router.put("/rottentomatoes/:id", (req: any, res: any) => {});
router.post("/rottentomatoes", (req: any, res: any) => {});
router.delete("/rottentomatoes/:id", (req: any, res: any) => {});
router.delete("/rottentomatoes", (req: any, res: any) => {});

/**
 * Movie Platforms
 */
router.get("/platforms", (req, res) => {
  createMoviePlatforms(req, res);
  return;
});

export default router;
