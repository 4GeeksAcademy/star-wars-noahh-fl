const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            demo: [
                {
                    title: "FIRST",
                    background: "white",
                    initial: "white"
                },
                {
                    title: "SECOND",
                    background: "white",
                    initial: "white"
                }
            ],
            people: [],
            planets: [],
            vehicles: [],
            favorites: []  // ✅ New favorites array
        },
        
        actions: {
            // Use getActions to call a function within a function
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },
            
            loadSomeData: async () => {
				try {
					// Fetch characters list
					const peopleResponse = await fetch("https://www.swapi.tech/api/people/");
					const peopleData = await peopleResponse.json();
			
					// Fetch full details for each character
					const fullPeople = await Promise.all(
						peopleData.results.map(async (person) => {
							const res = await fetch(`https://www.swapi.tech/api/people/${person.uid}`);
							const data = await res.json();
							return { uid: person.uid, ...data.result };
						})
					);
					setStore({ people: fullPeople });
			
					// Fetch planets list
					const planetsResponse = await fetch("https://www.swapi.tech/api/planets/");
					const planetsData = await planetsResponse.json();
			
					// Fetch full details for each planet
					const fullPlanets = await Promise.all(
						planetsData.results.map(async (planet) => {
							const res = await fetch(`https://www.swapi.tech/api/planets/${planet.uid}`);
							const data = await res.json();
							return { uid: planet.uid, ...data.result };
						})
					);
					setStore({ planets: fullPlanets });
			
					// Fetch vehicles list
					const vehiclesResponse = await fetch("https://www.swapi.tech/api/vehicles/");
					const vehiclesData = await vehiclesResponse.json();
			
					// Fetch full details for each vehicle
					const fullVehicles = await Promise.all(
						vehiclesData.results.map(async (vehicle) => {
							const res = await fetch(`https://www.swapi.tech/api/vehicles/${vehicle.uid}`);
							const data = await res.json();
							return { uid: vehicle.uid, ...data.result };
						})
					);
					setStore({ vehicles: fullVehicles });
			
				} catch (error) {
					console.error("Error loading data from SWAPI:", error);
				}
			},			
			

            toggleFavorite: (item, type) => {
				const store = getStore();
				const uniqueId = `${type}-${item.uid}`; // Create a unique key
			
				const exists = store.favorites.some(fav => fav.id === uniqueId);
			
				if (exists) {
					// Remove from favorites
					setStore({
						favorites: store.favorites.filter(fav => fav.id !== uniqueId)
					});
				} else {
					// Add to favorites with unique id
					setStore({
						favorites: [...store.favorites, { ...item, id: uniqueId }]
					});
				}
			},
			

            changeColor: (index, color) => {
                //get the store
                const store = getStore();

                //we have to loop the entire demo array to look for the respective index
                //and change its color
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
            }
        }
    };
};

export default getState;
