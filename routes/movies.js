import express from "express";
const router =express.Router()
import { getMovieById, getAllMovies, updateMovieById, deleteMovieById, deleteAllMovies, createMovies } from "../helper.js";
import { auth } from "../middleware/auth.js";

router.get("/", auth,async (req, res) => {
    try {
        let result = await getAllMovies();

        res.send(result)

    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})


router.get("/:id", async (req, res) => {
    let { id } = req.params
    try {
        let movie = await getMovieById(id)
        if (!movie) {
            res.status(404).send("No movie found with the given id.")

        } else {
            res.send(movie)
        }
    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})

router.post('/', async function (req, res) {
    let data = req.body;
    const result = await createMovies(data)
    res.send(result)
})


router.delete("/", async (req, res) => {

    let result = await deleteAllMovies()
    if (result) {
        res.send(result)
    } else {
        res.send(result, { data: "deleted" })
    }


})

router.delete("/:id", async (req, res) => {
    let { id } = req.params
    let result = await deleteMovieById(id)
    if (result) {
        res.send(result)
    } else {
        res.send(result, { data: "deleted" })
    }


})


router.put("/:id", async (req, res) => {
    let { id } = req.params
    let data = req.body
    try {
        let result = await updateMovieById(id, data);
        if (!result) {
            res.status(404).send("No movie found with the given id.")

        } else {
            res.send(result)
        }
    } catch (error) {
        console.error("Error occurred while fetching movie:", error);
    }
})

export const moviesRouter =router;
