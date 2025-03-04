import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type"); // ✅ This now correctly reads the "type"
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let url = "";

            if (type === "characters") {
                url = `https://www.swapi.tech/api/people/${theid}`;
            } else if (type === "planets") {
                url = `https://www.swapi.tech/api/planets/${theid}`;
            } else if (type === "vehicles") {
                url = `https://www.swapi.tech/api/vehicles/${theid}`;
            }

            if (url) {
                try {
                    const response = await fetch(url);
                    const result = await response.json();
                    setData(result.result.properties);
                } catch (error) {
                    console.error("Error fetching details:", error);
                }
            }
        };

        fetchData();
    }, [theid, type]); // ✅ Now re-fetches data when "type" changes


    return (
        <div className="container">
            {data ? (
                <div className="row">
                    {/* Left: Image */}
                    <div className="col-md-5 text-center">
					<img 
						src={
							type === "characters"
								? `https://starwars-visualguide.com/assets/img/characters/${theid}.jpg`
								: type === "planets"
								? `https://starwars-visualguide.com/assets/img/planets/${theid}.jpg`
								: `https://starwars-visualguide.com/assets/img/vehicles/${theid}.jpg`
						} 
						className="img-fluid"
						alt={data.name}
						onError={(e) => e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"}
					/>

                    </div>

                    {/* Right: Name and Description */}
                    <div className="col-md-7">
					<div className="text-center p-4 mb-4 mx-auto" style={{ 
						background: "white", 
						borderRadius: "8px", 
						maxWidth: "800px", 
						boxShadow: "0px 4px 10px rgba(0,0,0,0.2)" 
					}}>
						<h1 className="text-danger">{data.name}</h1>
						<p className="text-dark">
							<strong>Description:</strong>{" "}
							{type === "characters"
								? `${data.name} is a well-known individual in the galaxy.`
								: type === "planets"
								? `${data.name} is a planet with diverse terrain and climate conditions.`
								: `${data.name} is a powerful vehicle used throughout the galaxy.`}
						</p>
					</div>

                    </div>

                    {/* Bottom: Organized Details */}
                    <div className="col-12 mt-4">
                        <div className="card p-4">
                            <h3 className="text-center">Details</h3>
                            <div className="row">
                                {type === "characters" && (
                                    <>
                                        <div className="col-md-4"><strong>Gender:</strong> {data.gender}</div>
                                        <div className="col-md-4"><strong>Birth Year:</strong> {data.birth_year}</div>
                                        <div className="col-md-4"><strong>Height:</strong> {data.height} cm</div>
                                        <div className="col-md-4"><strong>Mass:</strong> {data.mass} kg</div>
                                        <div className="col-md-4"><strong>Hair Color:</strong> {data.hair_color}</div>
                                        <div className="col-md-4"><strong>Eye Color:</strong> {data.eye_color}</div>
                                        <div className="col-md-4"><strong>Skin Color:</strong> {data.skin_color}</div>
                                    </>
                                )}
                                {type === "planets" && (
                                    <>
                                        <div className="col-md-4"><strong>Climate:</strong> {data.climate}</div>
                                        <div className="col-md-4"><strong>Terrain:</strong> {data.terrain}</div>
                                        <div className="col-md-4"><strong>Population:</strong> {data.population}</div>
                                        <div className="col-md-4"><strong>Diameter:</strong> {data.diameter} km</div>
                                        <div className="col-md-4"><strong>Gravity:</strong> {data.gravity}</div>
                                        <div className="col-md-4"><strong>Orbital Period:</strong> {data.orbital_period} days</div>
                                    </>
                                )}
                                {type === "vehicles" && (
                                    <>
                                        <div className="col-md-4"><strong>Model:</strong> {data.model}</div>
                                        <div className="col-md-4"><strong>Manufacturer:</strong> {data.manufacturer}</div>
                                        <div className="col-md-4"><strong>Cost:</strong> {data.cost_in_credits} credits</div>
                                        <div className="col-md-4"><strong>Max Speed:</strong> {data.max_atmosphering_speed}</div>
                                        <div className="col-md-4"><strong>Crew:</strong> {data.crew}</div>
                                        <div className="col-md-4"><strong>Passengers:</strong> {data.passengers}</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h2 className="text-center">Loading...</h2>
            )}
        </div>
    );
};
