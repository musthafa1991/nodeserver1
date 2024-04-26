import { client } from "./index.js";

export async function getMovieById(id) {
    return await client.db("trailDb").collection("movies").findOne({ id: id });
}
export async function getAllMovies() {
    return await client.db("trailDb").collection("movies").find({}).toArray();
}
export async function updateMovieById(id, data) {
    return await client.db("trailDb").collection("movies").updateOne({ id: id }, { $set: data });
}
export async function deleteMovieById(id) {
    return await client.db("trailDb").collection("movies").deleteOne({ id: id });
}
export async function deleteAllMovies() {
    return await client.db("trailDb").collection("movies").deleteMany({});
}
export async function createMovies(data) {
    return await client.db("trailDb").collection("movies").insertMany(data);
}
export async function createUser(data) {
    return await client.db("trailDb").collection("users").insertOne(data);
}
export async function getUserByName(username) {
    return await client.db("trailDb").collection("users").findOne({name:username});
}