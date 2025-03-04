import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            {/* Characters Section */}
            <div className="card p-3 my-4 shadow-sm">
                <h1 className="text-danger text-center">Characters</h1>
                <div className="scroll-container">
                    <div className="scroll-content d-flex">
                        {store.people?.map((person, index) => (
                            <div key={index} className="card mx-2 p-2 shadow-sm" style={{ width: "22rem" }}>
                                <div className="text-center">
                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                        style={{ width: "100%", height: "150px", borderRadius: "8px" }}>
                                        Image Placeholder
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{person?.properties?.name || "Unknown Name"}</h5>
                                    <p className="card-text">Gender: {person?.properties?.gender || "N/A"}</p>
                                    <p className="card-text">Hair Color: {person?.properties?.hair_color || "N/A"}</p>
                                    <p className="card-text">Eye Color: {person?.properties?.eye_color || "N/A"}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/single/${person.uid}?type=characters`} className="btn btn-primary">
                                            Learn more!
                                        </Link>
                                        <button 
                                            className={`btn ${store.favorites.some(fav => fav.id === `characters-${person.uid}`) ? "btn-warning" : "btn-outline-warning"}`}
                                            onClick={() => actions.toggleFavorite(person, "characters")}
                                        >
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Planets Section */}
            <div className="card p-3 my-4 shadow-sm">
                <h1 className="text-danger text-center">Planets</h1>
                <div className="scroll-container">
                    <div className="scroll-content d-flex">
                        {store.planets?.map((planet, index) => (
                            <div key={index} className="card mx-2 p-2 shadow-sm" style={{ width: "22rem" }}>
                                <div className="text-center">
                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                        style={{ width: "100%", height: "150px", borderRadius: "8px" }}>
                                        Image Placeholder
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{planet?.properties?.name || "Unknown Planet"}</h5>
                                    <p className="card-text">Climate: {planet?.properties?.climate || "Unknown"}</p>
                                    <p className="card-text">Terrain: {planet?.properties?.terrain || "Unknown"}</p>
                                    <p className="card-text">Population: {planet?.properties?.population || "Unknown"}</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/single/${planet.uid}?type=planets`} className="btn btn-primary">
                                            Learn more!
                                        </Link>
                                        <button 
                                            className={`btn ${store.favorites.some(fav => fav.id === `planets-${planet.uid}`) ? "btn-warning" : "btn-outline-warning"}`}
                                            onClick={() => actions.toggleFavorite(planet, "planets")}
                                        >
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vehicles Section */}
            <div className="card p-3 my-4 shadow-sm">
                <h1 className="text-danger text-center">Vehicles</h1>
                <div className="scroll-container">
                    <div className="scroll-content d-flex">
                        {store.vehicles?.map((vehicle, index) => (
                            <div key={index} className="card mx-2 p-2 shadow-sm" style={{ width: "22rem" }}>
                                <div className="text-center">
                                    <div className="bg-secondary text-white d-flex align-items-center justify-content-center"
                                        style={{ width: "100%", height: "150px", borderRadius: "8px" }}>
                                        Image Placeholder
                                    </div>
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{vehicle?.properties?.name || "Unknown Vehicle"}</h5>
                                    <p className="card-text">Model: {vehicle?.properties?.model || "Unknown"}</p>
                                    <p className="card-text">Manufacturer: {vehicle?.properties?.manufacturer || "Unknown"}</p>
                                    <p className="card-text">Cost: {vehicle?.properties?.cost_in_credits || "N/A"} credits</p>
                                    <div className="d-flex justify-content-between">
                                        <Link to={`/single/${vehicle.uid}?type=vehicles`} className="btn btn-primary">
                                            Learn more!
                                        </Link>
                                        <button 
                                            className={`btn ${store.favorites.some(fav => fav.id === `vehicles-${vehicle.uid}`) ? "btn-warning" : "btn-outline-warning"}`}
                                            onClick={() => actions.toggleFavorite(vehicle, "vehicles")}
                                        >
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};