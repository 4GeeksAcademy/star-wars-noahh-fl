import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light mb-3 px-3">
            <Link to="/">
                <span className="navbar-brand mb-0 h1">Star Wars</span>
            </Link>
            <div className="ml-auto dropdown">
                <button 
                    className="btn btn-primary dropdown-toggle" 
                    type="button" 
                    id="favoritesDropdown" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                >
                    Favorites {store.favorites.length > 0 && `(${store.favorites.length})`}
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown">
                    {store.favorites.length === 0 ? (
                        <li className="dropdown-item text-muted">No favorites yet</li>
                    ) : (
                        store.favorites.map((fav, index) => (
                            <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                                <Link to={`/single/${fav.uid}`} className="text-decoration-none text-dark">
                                    {fav.name}
                                </Link>
                                <button 
                                    className="btn btn-sm btn-outline-danger ms-2" 
                                    onClick={() => actions.toggleFavorite(fav)}
                                >
                                    ❌
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </nav>
    );
};
