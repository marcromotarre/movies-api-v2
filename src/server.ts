import express from "express";
import cors from "cors";
import router from "./router";
import morgan from "morgan";
import { protect } from "./modules/auth";
import { createNewUser, signin } from "./handlers/user";
import { sign } from "crypto";
import { handleInputErrors } from "./modules/middleware";
import { body } from "express-validator";
import {
  createMovie,
  deleteAllMovies,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie,
} from "./handlers/movie";
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
import { createMoviePlatforms } from "./handlers/platforms";
import { getMoviesInGallery } from "./handlers/movie-gallery";
import {
  createCastCredit,
  createCrewCredit,
  createMovieCredit,
} from "./handlers/movie-credit";
import { createFilmaffinityMovie, getFilmaffinityMovie } from "./handlers/filmaffinity-movie";
import { getFilmaffinityScrapperMovies, getNotFoundFilmaffinityScrapperMovies } from "./handlers/filmaffinity-scrapper";
import { createRottenTomatoes } from "./handlers/rotten-tomatoes";

const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: any, res: any) => {
  res.status(200);
  res.json({ message: "Filmotek API 1.9" });
});

app.use("/api", protect, router);

app.post("/user", async (req: any, res: any) => {
  createNewUser(req, res);
});

app.post("/signin", async (req: any, res: any) => {
  signin(req, res);
});

/**
 * Movie
 */
app.get("/movie", async (req: any, res: any) => {
  getMovies(req, res);
});
app.get("/movie/:id", (req: any, res: any) => {
  getMovie(req, res);
});
app.put(
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
app.post(
  "/movie",
  [body("id").isNumeric(), body("name").isString()],
  handleInputErrors,
  async (req: any, res: any) => {
    createMovie(req, res);
  }
);
app.delete("/movie/:id", (req: any, res: any) => {
  deleteMovie(req, res);
});
app.delete("/movie", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllMovies(req, res);
  };
});

/**
 * Netflix Movie
 */
app.get("/netflix", async (req: any, res: any) => {
  getNetflixMovies(req, res);
});
app.get("/netflix/:id", (req: any, res: any) => {
  getNetflixMovie(req, res);
});
app.put(
  "/netflix/:id",
  [body("title").optional(), body("releaseYear").optional()],
  handleInputErrors,
  (req: any, res: any) => {
    updateNetflixMovie(req, res);
  }
);
app.post(
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
app.delete("/netflix/:id", (req: any, res: any) => {
  deleteNetflixMovie(req, res);
});

app.delete("/netflix", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllNetflixMovies(req, res);
  };
});

/**
 * IMDB Movie
 */
app.get("/imdb", async (req: any, res: any) => {
  getIMDBMovies(req, res);
});
app.get("/imdb/:id", (req: any, res: any) => {
  getIMDBMovie(req, res);
});
app.put(
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
app.post(
  "/imdb",
  [body("id").isString()],
  handleInputErrors,
  async (req: any, res: any) => {
    createIMDBMovie(req, res);
  }
);
app.delete("/imdb/:id", (req: any, res: any) => {
  deleteIMDBMovie(req, res);
});
app.delete("/imdb", (req: any, res: any) => {
  async (req: any, res: any) => {
    deleteAllIMDBMovies(req, res);
  };
});

/**
 * Filmaffinity
 */
 app.get(
  "/filmaffinity/:id",
  [],
  handleInputErrors,
  async (req: any, res: any) => {
    getFilmaffinityMovie(req, res);
  }
);

app.post(
  "/filmaffinity",
  [body("id").isNumeric()],
  handleInputErrors,
  async (req: any, res: any) => {
    createFilmaffinityMovie(req, res);
  }
);

/**
 * Rotten Tomatoes
 */

 app.post(
  "/rotten-tomatoes",
  [],
  handleInputErrors,
  async (req: any, res: any) => {
    createRottenTomatoes(req, res);
  }
);

/**
 * Movie Platforms
 */

app.post("/platforms", [], handleInputErrors, async (req: any, res: any) => {
  createMoviePlatforms(req, res);
});

/**
 * Movie Gallery
 */
app.get("/movie-gallery", (req: any, res: any) => {
  getMoviesInGallery(req, res);
});

app.post("/movie-credit", (req: any, res: any) => {
  createMovieCredit(req, res);
});

app.post("/cast-credit", (req: any, res: any) => {
  createCastCredit(req, res);
});

app.post("/crew-credit", (req: any, res: any) => {
  createCrewCredit(req, res);
});

/**
 * Scrapper
 *
 */

app.get("/scrapper-left-filmaffinity", (req: any, res: any) => {
  getFilmaffinityScrapperMovies(req, res);
});

app.get("/filmaffinity-not-found", (req: any, res: any) => {
  getNotFoundFilmaffinityScrapperMovies(req, res);
});


export default app;
