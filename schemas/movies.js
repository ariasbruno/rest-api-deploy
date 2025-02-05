const z = require("zod");

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Movie title must be a string",
    required_error: "Movie title is required",
  }),
  year: z.number().int().min(1900).max(2026),
  direction: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5), // o .optional()
  poster: z.string().url({
    message: "Poster must be a valid URL",
  }),
  genre: z.array(
    z.enum([
      "Action",
      "Adventure",
      "Comedy",
      "Crime",
      "Drama",
      "Fantasy",
      "Horror",
      "Thriller",
      "Romance",
      "Sci-fi",
    ]),
    {
      required_error: "Movie genre is required.",
      invalid_type_error: "Movie genre must be an array of enum Genre",
    }
  ),
});

function validateMovie(input) {
  return movieSchema.safeParse(input);
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input); // .partial() vuelve a todas las propiedades opcionales pero las que esten las valida como las tiene que validar
}

module.exports = {
  validateMovie,
  validatePartialMovie
};
